# Layer explainer

A worked example of every field the sim keeps, over a real 5 × 5 km square of
Bristol Bay (56.30–56.35° N, 160.52–160.60° W, northwest of Port Moller).

- `explainer.html` — the explainer page (published as a Claude artifact; also
  opens locally).
- `make_layers.py` — generates every figure from
  `../../data/port_moller_nw_elev_100m.npy`. Run from the repo root:
  `python crabs/docs/layers/make_layers.py`.
- `*.png` — the figures.

Depth is real (NOAA DEM mosaic, interpolated to 100 m). Substrate,
temperature, current, crab patchiness and plume shape are labelled
stand-ins, with numbers from `../research.md` and `../research-bait.md`.
