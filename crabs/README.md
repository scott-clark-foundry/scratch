# Crabs!

*(working title — rename freely; nothing depends on the name)*

A sandbox simulation of the Bristol Bay red king crab fishery. The crab population
is modeled as 2D probability distributions and vector fields over a coarse grid of
the eastern Bering Sea, driven by rules distilled from published literature. You
drop pots, pick bait and soak time, haul, and see what you caught. A developer
view reveals the hidden state: density heatmaps, currents, temperature.

Python handles the simulation. Visuals are a pygame-ce window.

See [PLAN.md](PLAN.md) for the design and milestones, and `docs/` for the
research the model is built on.

## Running

Not runnable yet. Once the MVP lands:

```sh
cd crabs
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
python -m crabs          # launch the window
pytest                   # headless sim tests
```
