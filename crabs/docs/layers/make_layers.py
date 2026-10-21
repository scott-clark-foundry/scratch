"""Render the layer explainer figures for a 5 x 5 km patch of Bristol Bay.

Run from the repo root:  python crabs/docs/layers/make_layers.py
Writes PNGs next to this file.

What is real and what is made up:
- Depth comes from NOAA's DEM mosaic (data/port_moller_nw_elev_100m.npy),
  requested at 100 m pixels. The underlying survey data here is coarser
  (roughly 500-700 m), so the 100 m detail is interpolated, not measured.
- Everything else (substrate, temperature, current, crab density, bait
  plume) is a plausible stand-in built from the depth map plus seeded noise,
  with the numbers taken from docs/research.md where we have them. These are
  illustrations of the layer design, not model output.
"""
from __future__ import annotations

from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib import patches
from matplotlib.colors import LinearSegmentedColormap, ListedColormap
from matplotlib.transforms import Affine2D
from scipy.ndimage import gaussian_filter

HERE = Path(__file__).resolve().parent
DATA = HERE.parents[1] / "data" / "port_moller_nw_elev_100m.npy"

# ---------------------------------------------------------------- geometry
# Context tile: lon -161.0..-160.2, lat 56.0..56.5, 500 x 500 px, row 0 = north.
CTX_LON0, CTX_LON1, CTX_LAT0, CTX_LAT1 = -161.0, -160.2, 56.0, 56.5
CELL_M = 100            # fine cell size
COARSE_M = 5000         # ocean grid cell size
R0, C0, N = 150, 250, 50  # the 5 km square: rows 150-200, cols 250-300

FATHOM = 1.8288
NMI = 1852.0

# ---------------------------------------------------------------- palette
SURFACE = "#fcfcfb"
INK, INK2, MUTED, GRID = "#0b0b0b", "#52514e", "#898781", "#e1e0d9"
LAND = "#d9d4c7"
BLUE, ORANGE, AQUA, YELLOW, VIOLET, RED = (
    "#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#6250d6", "#e34948")


def ramp(hex_color: str, name: str) -> LinearSegmentedColormap:
    """One-hue sequential ramp: near-surface tint -> hue -> dark shade."""
    c = np.array(matplotlib.colors.to_rgb(hex_color))
    light = 1 - (1 - c) * 0.18
    dark = c * 0.45
    return LinearSegmentedColormap.from_list(name, [light, c, dark])


CM_DEPTH = ramp(BLUE, "depth")
CM_SLOPE = ramp(VIOLET, "slope")
CM_TEMP = ramp(RED, "temp")
CM_SCORE = ramp(AQUA, "score")
CM_DENSITY = ramp(ORANGE, "density")
CM_SUBSTRATE = ListedColormap([BLUE, ORANGE, AQUA])  # mud, sand, gravel/shell

plt.rcParams.update({
    "font.family": "sans-serif",
    "font.size": 10,
    "axes.edgecolor": GRID,
    "axes.labelcolor": INK2,
    "xtick.color": MUTED,
    "ytick.color": MUTED,
    "text.color": INK,
    "figure.facecolor": SURFACE,
    "axes.facecolor": SURFACE,
    "savefig.facecolor": SURFACE,
    "savefig.dpi": 160,
})

rng = np.random.default_rng(56_160)  # seeded: same texture every run

# ---------------------------------------------------------------- layers
elev_ctx = np.load(DATA)                     # metres, positive = land
depth_ctx = np.clip(-elev_ctx, 0, None)      # metres of water, 0 on land
land_ctx = elev_ctx > 0

depth = depth_ctx[R0:R0 + N, C0:C0 + N]      # the 5 km square, 50 x 50


def slope_of(d: np.ndarray) -> np.ndarray:
    gy, gx = np.gradient(d, CELL_M)
    return np.hypot(gx, gy) * 1000  # metres of rise per km


slope = slope_of(depth)

# Substrate (synthetic): finer sediment where it's deeper and flatter.
fine_noise = gaussian_filter(rng.normal(size=(N, N)), 2.5)
sub_score = (depth - depth.mean()) / depth.std() * 0.8 - slope / slope.std() * 0.4 + fine_noise
substrate = np.digitize(sub_score, [-0.5, 0.6])  # 0 mud, 1 sand, 2 gravel/shell

# Bottom temperature (synthetic): October, ~3 C, cooling very slightly offshore.
temp = 3.3 - 0.012 * (depth - depth.min()) + gaussian_filter(rng.normal(size=(N, N)), 6) * 0.03

# Tidal current (synthetic): along-shore axis (coast runs SW-NE here), flood
# toward NE, ebb toward SW. Speed grows a little where it's shallower.
coast_dir = np.deg2rad(45)
yy, xx = np.mgrid[0:N, 0:N]
speed_mod = 1 + 0.25 * (depth.max() - depth) / (depth.max() - depth.min())
wiggle = gaussian_filter(rng.normal(size=(N, N)), 5) * 0.25


def current(phase: str) -> tuple[np.ndarray, np.ndarray]:
    sign = 1 if phase == "flood" else -1
    u0 = 0.30 * sign  # m/s peak, strong Bristol Bay tides
    ang = coast_dir + wiggle
    return u0 * speed_mod * np.cos(ang), u0 * speed_mod * np.sin(ang)


# Habitat score ("desirability") per crab class for October.
def depth_pref(d, lo, hi, soft):
    """1 inside [lo, hi], falling off smoothly outside by `soft` metres."""
    below = np.clip((lo - d) / soft, 0, None)
    above = np.clip((d - hi) / soft, 0, None)
    return np.exp(-(below ** 2 + above ** 2))


def temp_pref(t, cold_pen, warm_pen):
    s = np.ones_like(t)
    s *= np.exp(-cold_pen * np.clip(2.0 - t, 0, None) ** 2)
    s *= np.exp(-warm_pen * np.clip(t - 4.0, 0, None) ** 2)
    return s


SUB_BONUS = {"legal_male": np.array([0.9, 1.0, 0.8]),
             "mature_female": np.array([0.85, 1.0, 0.9])}


def habitat(cls: str, d, t, sub):
    if cls == "legal_male":
        s = depth_pref(d, 50, 100, 25) * temp_pref(t, 0.3, 1.0)
    else:
        s = depth_pref(d, 40, 90, 25) * temp_pref(t, 2.0, 0.2)
    return s * SUB_BONUS[cls][sub]


score_m = habitat("legal_male", depth, temp, substrate)
score_f = habitat("mature_female", depth, temp, substrate)

# Crab possible mask: water, 5-120 m, score above a floor.
FLOOR = 0.05
mask_m = (depth > 5) & (depth < 120) & (score_m > FLOOR)

# Density: the coarse cell's total, spread by score, with seeded patchiness.
# A 5 km cell in a good autumn spot might hold ~5,000 legal males
# (7 M crab over roughly 1,500 live cells, unevenly).
TOTAL_M, TOTAL_F = 4000.0, 9000.0
patch_m = np.exp(gaussian_filter(rng.normal(size=(N, N)), 3) * 1.2)
patch_f = np.exp(gaussian_filter(rng.normal(size=(N, N)), 2) * 1.6)


def spread(total, score, patch, mask):
    w = score * patch * mask
    return total * w / w.sum()


dens_m = spread(TOTAL_M, score_m, patch_m, mask_m)
dens_f = spread(TOTAL_F, score_f, patch_f, mask_m)

# A string of 10 pots, 1/10 nautical mile apart, laid along the depth contour.
POT_SPACING = NMI / 10          # 185 m
string_angle = np.deg2rad(45)   # along-shore
pot_x = 1500 + np.arange(10) * POT_SPACING * np.cos(string_angle)
pot_y = 1200 + np.arange(10) * POT_SPACING * np.sin(string_angle)

# Bait plume: Gaussian downstream of each pot. Numbers from docs/research-bait.md:
# detection radius ~120 m at 10 cm/s current, growing with current speed and
# capped ~200 m; the sim stretches it downstream. Half-width ~40 m at the end.
PLUME_LEN, PLUME_W = 150.0, 40.0


def plume_field(phase: str) -> np.ndarray:
    u, v = current(phase)
    f = np.zeros((N, N))
    gx = (np.arange(N) + 0.5) * CELL_M
    X, Y = np.meshgrid(gx, gx)
    for px, py in zip(pot_x, pot_y):
        i, j = N - 1 - min(int(py // CELL_M), N - 1), min(int(px // CELL_M), N - 1)
        ux, uy = u[i, j], v[i, j]
        sp = np.hypot(ux, uy)
        dx, dy = X - px, Y - py
        along = (dx * ux + dy * uy) / sp
        across = (-dx * uy + dy * ux) / sp
        L = min(PLUME_LEN * sp / 0.10, 200.0)
        sig = 15 + PLUME_W * np.clip(along, 0, None) / L
        down = (along > -30) & (along < L)
        f += down * np.exp(-across ** 2 / (2 * sig ** 2)) * np.exp(-np.clip(along, 0, None) / L)
    return f


# ---------------------------------------------------------------- drawing helpers
EXT = (0, N * CELL_M, 0, N * CELL_M)  # metres; origin bottom-left (south-west)


def flip(a):
    """Rows are north->south in the data; imshow with origin='lower' wants south first."""
    return a[::-1]


def style_axes(ax, title, note=None):
    ax.set_title(title, loc="left", fontsize=11, color=INK, pad=8)
    ax.set_xticks([0, 1000, 2000, 3000, 4000, 5000])
    ax.set_yticks([0, 1000, 2000, 3000, 4000, 5000])
    ax.set_xticklabels(["0", "1", "2", "3", "4", "5 km"])
    ax.set_yticklabels(["0", "1", "2", "3", "4", "5 km"])
    ax.tick_params(length=0, labelsize=8)
    for s in ax.spines.values():
        s.set_color(GRID)
    ax.set_aspect("equal")
    ax.set_xlim(0, N * CELL_M)
    ax.set_ylim(0, N * CELL_M)
    if note:
        ax.text(0, -0.1, note, transform=ax.transAxes, fontsize=8, color=INK2, va="top")


def scalebar(ax, x=3300, y=250):
    ax.plot([x, x + NMI], [y, y], color=INK, lw=2, solid_capstyle="butt")
    ax.plot([x, x + NMI / 10], [y + 70, y + 70], color=INK, lw=2, solid_capstyle="butt")
    ax.text(x + NMI / 2, y - 60, "1 nautical mile", ha="center", va="top", fontsize=7.5, color=INK2)
    ax.text(x + NMI / 10 + 40, y + 70, "1/10 mile", va="center", fontsize=7.5, color=INK2)


def colorbar(fig, im, ax, label, ticks=None, ticklabels=None):
    cb = fig.colorbar(im, ax=ax, fraction=0.046, pad=0.03)
    cb.outline.set_edgecolor(GRID)
    cb.ax.tick_params(length=0, labelsize=8, colors=MUTED)
    cb.set_label(label, color=INK2, fontsize=8.5)
    if ticks is not None:
        cb.set_ticks(ticks)
    if ticklabels is not None:
        cb.set_ticklabels(ticklabels)
    return cb


def grid_lines(ax, step=CELL_M, color=GRID, lw=0.25, alpha=0.6):
    for k in np.arange(0, N * CELL_M + 1, step):
        ax.axhline(k, color=color, lw=lw, alpha=alpha)
        ax.axvline(k, color=color, lw=lw, alpha=alpha)


def fig_note(fig, text):
    fig.text(0.01, -0.01, text, fontsize=8.5, color=INK2, va="top", wrap=True)


def save(fig, name):
    fig.savefig(HERE / name, bbox_inches="tight")
    plt.close(fig)
    print("wrote", name)


# ---------------------------------------------------------------- figures
def fig_context():
    fig, ax = plt.subplots(figsize=(8.4, 8))
    show = np.ma.masked_where(land_ctx, depth_ctx)
    cm = CM_DEPTH.copy()
    cm.set_bad(LAND)
    im = ax.imshow(show, cmap=cm, extent=(0, 50, 0, 50), vmin=0, vmax=80)
    # ocean grid: 5 km cells
    for k in range(0, 51, 5):
        ax.axhline(k, color=SURFACE, lw=0.8, alpha=0.9)
        ax.axvline(k, color=SURFACE, lw=0.8, alpha=0.9)
    # the 5 km square
    sq_x, sq_y = C0 * CELL_M / 1000, (500 - R0 - N) * CELL_M / 1000
    ax.add_patch(patches.Rectangle((sq_x, sq_y), 5, 5, fill=False, ec=ORANGE, lw=2.5))
    ax.annotate("the 5 x 5 km\nexample square", (sq_x + 5, sq_y + 2.5), (sq_x + 11, sq_y + 9),
                fontsize=9, color=INK, arrowprops=dict(arrowstyle="-", color=INK2, lw=0.8))
    ax.text(38, 4, "Alaska Peninsula", fontsize=9, color=INK2, rotation=28, style="italic")
    ax.text(1, 48, "Bristol Bay", fontsize=10, color=SURFACE, style="italic")
    ax.set_title("Where the square sits: 50 x 50 km of coast northwest of Port Moller", loc="left", fontsize=11)
    ax.set_xticks([0, 10, 20, 30, 40, 50]); ax.set_yticks([0, 10, 20, 30, 40, 50])
    ax.set_xticklabels(["0", "10", "20", "30", "40", "50 km"]); ax.set_yticklabels(["0", "10", "20", "30", "40", "50 km"])
    ax.tick_params(length=0, labelsize=8)
    colorbar(fig, im, ax, "depth  (m / fathoms)", ticks=[0, 20, 40, 60, 80],
             ticklabels=[f"{m} m / {m / FATHOM:.0f} fm" for m in [0, 20, 40, 60, 80]])
    ax.text(0, -0.06, "White lines: the 5 km ocean grid (100 cells here). Depth: NOAA DEM mosaic. "
            "56.0-56.5 N, 161.0-160.2 W.", transform=ax.transAxes, fontsize=8, color=INK2, va="top")
    save(fig, "00_context.png")


def fig_active_mask():
    """Which coarse cells does the sim need to update at all?"""
    # coarse 5 km cells over the 50 km tile: mean depth and land fraction
    d = depth_ctx.reshape(10, 50, 10, 50)
    land = land_ctx.reshape(10, 50, 10, 50).mean(axis=(1, 3))
    dmean = np.where(land < 1, np.ma.masked_array(d, mask=np.repeat(np.repeat(land_ctx.reshape(10,50,10,50), 1, 0), 1, 0)).mean(axis=(1, 3)), 0)
    t_oct = 3.3 - 0.012 * (dmean - 20)
    score = depth_pref(dmean, 50, 100, 25) * temp_pref(t_oct, 0.3, 1.0)
    state = np.full((10, 10), 2)             # 2 = live
    state[score <= FLOOR] = 1                # 1 = below floor, skipped
    state[land > 0.5] = 0                    # 0 = land
    fig, ax = plt.subplots(figsize=(7.2, 6.4))
    cmap = ListedColormap([LAND, "#efeee9", AQUA])
    ax.imshow(state, cmap=cmap, extent=(0, 50, 0, 50), vmin=-0.5, vmax=2.5)
    for k in range(0, 51, 5):
        ax.axhline(k, color=SURFACE, lw=1.2); ax.axvline(k, color=SURFACE, lw=1.2)
    for i in range(10):
        for j in range(10):
            if state[i, j] == 2:
                ax.text(j * 5 + 2.5, 50 - i * 5 - 2.5, f"{score[i, j]:.2f}", ha="center", va="center", fontsize=7.5, color=SURFACE)
    live = int((state == 2).sum())
    ax.set_title(f"Which ocean cells the sim updates in October: {live} of 100 (legal males)", loc="left", fontsize=11)
    ax.set_xticks([]); ax.set_yticks([])
    handles = [patches.Patch(color=AQUA, label="live: habitat score above the floor (score shown)"),
               patches.Patch(color="#efeee9", label="skipped: water, but score below the floor (too shallow for October adults)"),
               patches.Patch(color=LAND, label="land")]
    ax.legend(handles=handles, loc="upper center", bbox_to_anchor=(0.5, -0.02), frameon=False, fontsize=8, ncol=1)
    save(fig, "01_active_cells.png")


def fig_depth():
    fig, ax = plt.subplots(figsize=(7.2, 6.2))
    im = ax.imshow(flip(depth), cmap=CM_DEPTH, extent=EXT, origin="lower", vmin=20, vmax=46)
    cs = ax.contour(flip(depth), levels=[25, 30, 35, 40, 45], colors=SURFACE, linewidths=0.6, extent=EXT, origin="lower")
    ax.clabel(cs, fmt=lambda v: f"{v:.0f} m", fontsize=7, colors=SURFACE)
    grid_lines(ax)
    scalebar(ax)
    style_axes(ax, "Layer 1. Depth, 100 m cells (2,500 cells)",
               "Shape from NOAA's DEM mosaic; the survey data here is ~500-700 m, so the 100 m detail is interpolated. "
               "Static: load once.")
    colorbar(fig, im, ax, "depth  (m / fathoms)", ticks=[20, 25, 30, 35, 40, 45],
             ticklabels=[f"{m} m / {m / FATHOM:.0f} fm" for m in [20, 25, 30, 35, 40, 45]])
    save(fig, "10_depth.png")


def fig_slope_substrate():
    fig, axs = plt.subplots(1, 2, figsize=(13, 6))
    im = axs[0].imshow(flip(slope), cmap=CM_SLOPE, extent=EXT, origin="lower", vmin=0, vmax=slope.max())
    grid_lines(axs[0])
    style_axes(axs[0], "Layer 2. Slope, derived from depth",
               "Metres of rise per km. Edges and ledges matter to crab more than flat bottom. Static.")
    colorbar(fig, im, axs[0], "slope  (m per km)")
    im2 = axs[1].imshow(flip(substrate), cmap=CM_SUBSTRATE, extent=EXT, origin="lower", vmin=-0.5, vmax=2.5)
    grid_lines(axs[1])
    style_axes(axs[1], "Layer 3. Substrate (synthetic stand-in)")
    fig_note(fig, "Slope: metres of rise per km, derived from depth; edges and ledges matter to crab more than flat bottom. "
             "Substrate: no public 100 m sediment map exists here, so this is generated from depth and slope plus seeded noise "
             "(finer sediment where deeper and flatter). Both static.")
    handles = [patches.Patch(color=BLUE, label="mud"), patches.Patch(color=ORANGE, label="sand"),
               patches.Patch(color=AQUA, label="gravel / shell hash")]
    axs[1].legend(handles=handles, loc="upper left", frameon=False, fontsize=8)
    save(fig, "11_slope_substrate.png")


def fig_temp():
    fig, ax = plt.subplots(figsize=(7.2, 6.2))
    im = ax.imshow(flip(temp), cmap=CM_TEMP, extent=EXT, origin="lower", vmin=2.9, vmax=3.4)
    grid_lines(ax)
    style_axes(ax, "Layer 4. Bottom temperature in October (synthetic)",
               f"Varies only {temp.max() - temp.min():.2f} C across the whole square. Temperature needs 5-10 km "
               "resolution, not 100 m: one value per ocean cell is enough. Changes daily.")
    colorbar(fig, im, ax, "bottom temperature  (C / F)", ticks=[2.9, 3.0, 3.1, 3.2, 3.3, 3.4],
             ticklabels=[f"{c:.1f} C / {c * 9 / 5 + 32:.1f} F" for c in [2.9, 3.0, 3.1, 3.2, 3.3, 3.4]])
    save(fig, "12_temperature.png")


def fig_current():
    fig, axs = plt.subplots(1, 2, figsize=(13, 6))
    for ax, phase in zip(axs, ["flood", "ebb"]):
        u, v = current(phase)
        sp = np.hypot(u, v)
        im = ax.imshow(flip(sp), cmap=CM_DEPTH, extent=EXT, origin="lower", vmin=0.2, vmax=0.4, alpha=0.5)
        step = 4
        gx = (np.arange(0, N, step) + 0.5) * CELL_M
        X, Y = np.meshgrid(gx, gx)
        ax.quiver(X, Y, flip(u)[::step, ::step], flip(v)[::step, ::step], color=INK, scale=6, width=0.003, headwidth=4)
        grid_lines(ax)
        style_axes(ax, f"Layer 5. Tidal current, {phase} tide")
        colorbar(fig, im, ax, "speed  (m/s / knots)", ticks=[0.2, 0.3, 0.4],
                 ticklabels=[f"{s:.1f} m/s / {s * 1.944:.1f} kn" for s in [0.2, 0.3, 0.4]])
    fig_note(fig, "Synthetic: along-shore flow that reverses with the tide, about 0.3 m/s (0.6 knots) at peak. "
             "A resolution of 1-5 km is plenty; it changes hourly. It drives the bait plume in layer 9.")
    save(fig, "13_current.png")


def fig_score():
    fig, axs = plt.subplots(1, 2, figsize=(13, 6))
    for ax, (s, title) in zip(axs, [(score_m, "legal males"), (score_f, "mature females")]):
        im = ax.imshow(flip(s), cmap=CM_SCORE, extent=EXT, origin="lower", vmin=0, vmax=1)
        grid_lines(ax)
        style_axes(ax, f"Layer 6. Habitat score, October, {title}")
        colorbar(fig, im, ax, "habitat score  (0 = avoid, 1 = ideal)")
    fig_note(fig, "Depth preference x temperature preference x substrate bonus, each from docs/rules.md. "
             "Autumn adults want 50-100 m, so this 22-45 m square scores better toward its deeper edge. Recomputed daily.")
    save(fig, "14_habitat_score.png")


def fig_mask():
    fig, ax = plt.subplots(figsize=(7.2, 6.2))
    cmap = ListedColormap(["#efeee9", AQUA])
    ax.imshow(flip(mask_m.astype(int)), cmap=cmap, extent=EXT, origin="lower", vmin=-0.5, vmax=1.5)
    grid_lines(ax)
    live = int(mask_m.sum())
    style_axes(ax, f"Layer 7. Where crab are possible: {live} of 2,500 fine cells",
               "Water, 5-120 m deep, and habitat score above a floor (0.05). The sim only moves crab through these cells. "
               "In this square the floor only trims the shallow north-west corner.")
    save(fig, "15_mask.png")


def fig_density():
    fig, axs = plt.subplots(1, 2, figsize=(13, 6))
    for ax, (d, title, tot) in zip(axs, [(dens_m, "legal males", TOTAL_M), (dens_f, "mature females", TOTAL_F)]):
        im = ax.imshow(flip(d), cmap=CM_DENSITY, extent=EXT, origin="lower", vmin=0, vmax=np.percentile(d, 99))
        grid_lines(ax)
        style_axes(ax, f"Layer 8. Crab density, {title}: {tot:,.0f} crab in this ocean cell")
        colorbar(fig, im, ax, "crab per 100 m cell (1 hectare)")
    fig_note(fig, "Ocean cell total x habitat score x seeded patchiness (which stands in for podding). "
             "The fine cells sum exactly to the ocean cell's count. Moves hourly inside a fine patch.")
    save(fig, "16_density.png")


def fig_pots():
    fig, axs = plt.subplots(1, 2, figsize=(13, 6))
    for ax, phase in zip(axs, ["flood", "ebb"]):
        pf = plume_field(phase)
        ax.imshow(flip(dens_m), cmap=CM_DENSITY, extent=EXT, origin="lower", vmin=0, vmax=np.percentile(dens_m, 99), alpha=0.35)
        ax.imshow(pf, cmap=CM_SCORE, extent=EXT, origin="lower", vmin=0, vmax=1, alpha=np.clip(pf, 0, 1) ** 0.5)
        ax.scatter(pot_x, pot_y, s=28, c=INK, marker="s", zorder=5, label="pot")
        u, v = current(phase)
        ax.quiver([4300], [4300], [u.mean()], [v.mean()], color=INK, scale=3, width=0.006)
        ax.text(4300, 3850, f"current, {phase}", ha="center", va="top", fontsize=8, color=INK2)
        grid_lines(ax)
        scalebar(ax, x=300, y=4600)
        style_axes(ax, f"Layer 9. A 10-pot string and its bait plumes, {phase} tide")
    axs[0].legend(loc="lower right", frameon=False, fontsize=8)
    fig_note(fig, "Pots 1/10 nautical mile (185 m) apart along the depth contour, over the legal-male density from layer 8. "
             "Each plume reaches ~120-200 m downstream (snow crab tagging analog; docs/research-bait.md), so at 185 m "
             "spacing neighbouring plumes just touch. Each pot's footprint swings with the tide.")
    save(fig, "17_pots_plume.png")


def fig_stack():
    """All layers as an oblique stack, like map transparencies."""
    layers = [
        ("Depth (static, 100 m)", flip(depth), CM_DEPTH, (20, 46), None),
        ("Substrate (static, 100 m)", flip(substrate), CM_SUBSTRATE, (-0.5, 2.5), None),
        ("Temperature (daily, 5 km)", flip(temp), CM_TEMP, (2.9, 3.4), None),
        ("Current (hourly, 1-5 km)", flip(np.hypot(*current("flood"))), CM_DEPTH, (0.2, 0.4), None),
        ("Habitat score (daily, 100 m)", flip(score_m), CM_SCORE, (0, 1), None),
        ("Crab possible (daily, 100 m)", flip(mask_m.astype(float)), ListedColormap(["#efeee9", AQUA]), (-0.5, 1.5), None),
        ("Crab density (hourly in patches, 100 m)", flip(dens_m), CM_DENSITY, (0, np.percentile(dens_m, 99)), None),
        ("Bait plumes + pots (hourly, 100 m)", plume_field("flood"), CM_SCORE, (0, 1), "pots"),
    ]
    n = len(layers)
    fig, ax = plt.subplots(figsize=(9, 12))
    ax.set_axis_off()
    gap = 0.72
    skew = Affine2D().skew_deg(0, 22).scale(1.5, 0.5)
    for k, (label, arr, cm, (vmin, vmax), extra) in enumerate(layers):
        tr = skew + Affine2D().translate(0, k * gap) + ax.transData
        ax.imshow(arr, cmap=cm, extent=(0, 1, 0, 1), origin="lower", vmin=vmin, vmax=vmax,
                  transform=tr, interpolation="nearest", zorder=k)
        ax.add_patch(patches.Rectangle((0, 0), 1, 1, fill=False, ec=INK2, lw=0.6, transform=tr, zorder=k + 0.1))
        if extra == "pots":
            ax.scatter(pot_x / (N * CELL_M), pot_y / (N * CELL_M), s=10, c=INK, marker="s", transform=tr, zorder=k + 0.2)
        # label to the right of the sheet's right edge
        ax.text(1.62, k * gap + 0.25 + 0.3, label, fontsize=9.5, color=INK, va="center")
    ax.set_xlim(-0.05, 2.6)
    ax.set_ylim(-0.1, n * gap + 0.6)
    ax.set_title("The stack: eight layers over the same 5 x 5 km of seabed", loc="left", fontsize=12)
    ax.text(0, -0.08, "Bottom to top: terrain that never changes, then slowly changing water, then the crab, then the gear. "
            "Each layer up the stack is computed from the ones below it.",
            transform=ax.transAxes, fontsize=8.5, color=INK2, va="top", wrap=True)
    save(fig, "20_stack.png")


def fig_two_grids():
    """The two-layer idea: coarse everywhere, fine where pots are."""
    fig, ax = plt.subplots(figsize=(8.4, 8))
    show = np.ma.masked_where(land_ctx, depth_ctx)
    cm = CM_DEPTH.copy(); cm.set_bad(LAND)
    ax.imshow(show, cmap=cm, extent=(0, 50, 0, 50), vmin=0, vmax=80, alpha=0.55)
    for k in range(0, 51, 5):
        ax.axhline(k, color=SURFACE, lw=1.0); ax.axvline(k, color=SURFACE, lw=1.0)
    # fine patches around three pot strings
    sq_x, sq_y = C0 * CELL_M / 1000, (500 - R0 - N) * CELL_M / 1000
    for (px, py) in [(sq_x, sq_y), (sq_x - 9, sq_y + 7), (sq_x + 3, sq_y + 12)]:
        for k in np.arange(0, 5.01, 0.5):   # draw every 5th fine line so it stays legible
            ax.plot([px, px + 5], [py + k, py + k], color=ORANGE, lw=0.35, alpha=0.9)
            ax.plot([px + k, px + k], [py, py + 5], color=ORANGE, lw=0.35, alpha=0.9)
        ax.add_patch(patches.Rectangle((px, py), 5, 5, fill=False, ec=ORANGE, lw=1.8))
        ax.scatter(px + 1.5 + np.arange(10) * 0.13, py + 1.2 + np.arange(10) * 0.13, s=4, c=INK, zorder=5)
    ax.set_title("Two grids: 5 km ocean cells everywhere, 100 m fine patches only around pots", loc="left", fontsize=11)
    ax.set_xticks([]); ax.set_yticks([])
    ax.text(0, -0.03, "Orange squares: fine patches (one 5 km ocean cell refined to 2,500 fine cells; lines drawn every 500 m "
            "for legibility). Black dots: pot strings. When the last pot is hauled, the patch folds back into its ocean cell.",
            transform=ax.transAxes, fontsize=8, color=INK2, va="top", wrap=True)
    save(fig, "02_two_grids.png")


if __name__ == "__main__":
    fig_context()
    fig_active_mask()
    fig_two_grids()
    fig_depth()
    fig_slope_substrate()
    fig_temp()
    fig_current()
    fig_score()
    fig_mask()
    fig_density()
    fig_pots()
    fig_stack()
    print(f"square: depth {depth.min():.0f}-{depth.max():.0f} m, live cells {int(mask_m.sum())}, "
          f"legal males {dens_m.sum():.0f}, females {dens_f.sum():.0f}")
