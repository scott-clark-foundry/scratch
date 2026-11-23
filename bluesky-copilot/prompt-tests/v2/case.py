#!/usr/bin/env python3
"""Print one test case. Usage: case.py CASE_ID [--with-grounding]"""
import glob, json, os, sys

here = os.path.dirname(os.path.abspath(__file__))
for path in sorted(glob.glob(os.path.join(here, "cases-*.json"))):
    for case in json.load(open(path)):
        if case["id"] == sys.argv[1]:
            print(case["message"])
            if "--with-grounding" in sys.argv:
                print("\n--- GROUNDING (verified by the scout who wrote the case) ---\n" + case.get("grounding", ""))
            sys.exit(0)
sys.exit(f"no case with id {sys.argv[1]}")
