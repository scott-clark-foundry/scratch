## ANSWER

Mostly yes, though the post skips the Army's reason. Iowa Public Radio, citing The New York Times, reports the Army hired MuniRem Environmental in March to chemically neutralize nearly five tons of degraded lead azide at the Iowa Army Ammunition Plant, then canceled two months later. An Army contracting officer's email said it wasn't over flaws in MuniRem's proposal.

The Army's side, per an EPA letter: the explosive had recrystallized, so moving the 68 drums or even opening them could set it off. The Army admits chemical treatment would have avoided the lead dust plume; the sand barriers and water mist are meant to limit it.

The "dirty bomb" and "against a court order" lines are the poster's graphic, not the article. An appeals court did put the permit on hold, but the Justice Department says the Army can still go ahead under an emergency exception. The blast was set for today; I couldn't find whether it happened.

Source: https://www.iowapublicradio.org/environment/2026-11-21/army-canceled-a-chemical-treatment-contract-toxic-explosives-iowa

Want me to check for newer coverage?

## STEPS

- Read app/server/system-prompt.md: system prompt (tone, length, sourcing rules).
- Read skill/bluesky/SKILL.md: recipes; "Is this real?" and "What does the article say?" apply.
- ToolSearch select:WebSearch,WebFetch: loaded web tools.
- `python3 scripts/bsky.py thread https://bsky.app/profile/esepajaronegro.bsky.social/post/3n2ymqrukmk24`: post text, truncated IPR link, image alt text, two self-replies (Exploding Whale links), 9 of 10 replies.
- `python3 scripts/bsky.py post ... --json | grep`: full IPR article URL (thread output only showed the truncated display text).
- `python3 scripts/bsky.py read-link https://www.iowapublicradio.org/environment/2026-11-21/army-canceled-...`: IPR article by Tom Barton, Nov 21 2026: contract canceled, EPA letter reasoning, mitigation, 8th Circuit hold, DOJ emergency exception, Monday schedule.
- WebSearch "Iowa Army Ammunition Plant lead azide detonation MuniRem": general coverage (Task & Purpose, ABC, Fox), originally scheduled Friday Nov 20; nothing on whether it happened.
- WebSearch "Iowa Army Ammunition Plant detonation Monday November 23 court ruling": Earthjustice lawsuit, 8th Circuit; no report of outcome today.
- `python3 scripts/bsky.py media https://bsky.app/profile/esepajaronegro.bsky.social/post/3n2ymqrukmk24`: saved image, alt text.
- Read /tmp/bsky-media-globa843/image1.jpg: graphic with plume map, plant sign, and text "...blow up nearly five tons of lead-based explosives in Iowa today — against a court order — is peak MAGA."

## EVIDENCE

- Army hired MuniRem Environmental in March, canceled two months later (citing NYT): IPR article via read-link.
- Contracting officer email said cancellation unrelated to shortcomings in technical proposal: IPR article.
- Lead azide recrystallized; disturbing 68 drums / removing lids could trigger explosion (EPA letter from Jim Macy): IPR article.
- Army acknowledged chemical treatment avoided the lead dust plume: IPR article.
- Sand barriers about two stories high and water mist to limit lead dust: IPR article.
- "Dirty bomb" and "against a court order" wording is in the post's graphic: media image1.jpg and alt text.
- 8th Circuit put the permit on hold; DOJ says Army can proceed under emergency exception: IPR article.
- Detonation scheduled for Monday (= today, Nov 23 2026): IPR article ("scheduled the detonation for Monday"; Acting Secretary Telle said no later than Monday).
- Couldn't find whether it happened: two WebSearch queries returned no outcome reporting.

## FRICTION

- `thread` output shows only the truncated link text from the post body (www.iowapublicradio.org/environment/...), with no `[link: …]` line giving the full URL, even though SKILL.md says to run `read-link` on the URL from the `[link: …]` line. I had to use `post --json` and grep to find the full URI in the facets. The script should print the full URL of facet links (or of the external embed) in text output.
- The truncated-link case is not covered in SKILL.md.
- Time-sensitive story (event scheduled for "today"): the system prompt and skill give no guidance on how hard to look for the latest status, or how to word "may have happened since". Web search returned nothing newer than the article, so I said I couldn't find out.
- The graphic's text ("against a court order") differs slightly from the alt text; I relied on the image itself. No friction beyond noting that alt text was a paraphrase.
- Length: the answer is about 175 words, near the fact-check ceiling. Fitting the Army's reasoning, the image's framing and the court status took that much room.
