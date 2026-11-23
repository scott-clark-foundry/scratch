## VERDICT
PASS

## CHECKS
answers-the-question: PASS
grounded: PASS
used-what-was-attached: PASS
calibrated: PASS
fair-and-safe: PASS
useful-in-a-side-panel: PASS

## CRITIQUE
The person saw "Weather forecasts include lead plume" in Bluesky's trending list and wanted to know two things: is it a joke, and why is it trending. The answer opens with "Not a joke, sadly" and then gives the cause in two sentences, so the person has what they need before the bullet list starts. I checked each main claim against the live network. (1) The Army plans to detonate "nearly 10,000 lb of degraded lead azide" at its plant in Middletown, Iowa, producing a lead dust plume: the ABC News page the answer links says exactly this ("nearly 10,000 pounds", "degraded lead azide", Middletown, a dust plume "that will contain some lead"). (2) KCRG showed a "FIRST ALERT LEAD PLUME" wind map: I downloaded the picture on the cited post and it shows that banner, "WED 12:00 PM", low-level wind arrows around Burlington and the station's ABC 9 logo; the post links to kcrg.com. (3) The quote from Alan's post, "American weather reporting now includes lead plume forecast.", is exact, and that post has about 1,545 likes and 239 quotes. (4) Laura Belin's post does say the detonation is scheduled for Wednesday, November 25, and its image alt text says it is the Army's latest statement. (5) "Most of the trend is people quoting it with dark jokes": 7 of the first 12 posts in the trending topic's own feed quote Alan's post, mostly with grim or sarcastic remarks, so this is a fair summary, if a little loose (several are angry rather than joking). The copilot did not open the ABC article itself (it says so in its evidence notes), but the link is real and supports the sentence it is attached to; the article is from 20 November and gives an older date, and the answer correctly takes the Wednesday date from the newer Army statement instead. The answer leaves out the court fight over the permit, but it only says the Army "plans" the detonation and ties the date to the Army's statement, so it does not overstate anything. It does not name the meteorologist in the picture, takes no side, is about 130 words, and links every source it relies on. The closing offer about wind direction is a sensible next step, not padding. No check failed.

## WHAT-I-VERIFIED
- `case.py trending-lead-plume-iowa --with-grounding`: question and scout facts (real event, KCRG forecast set off the trend, rescheduled for Wednesday).
- `bsky.py post` on the gammacounter post: text matches the quote exactly; 1,545 likes, 704 reposts, 239 quotes; links kcrg.com video.
- `bsky.py media` on that post, then opened the image: "FIRST ALERT LEAD PLUME", "WED 12:00 PM", "LOW-LEVEL WINDS About 5,000 Ft.", Burlington area, ABC 9 logo.
- `bsky.py post` on the Laura Belin post: "nearly 10,000 pounds of toxic explosives ... scheduled for Wednesday, November 25"; alt text says it is the Army's latest statement.
- `bsky.py trending`: "Weather forecasts include lead plume" is at number 6 now.
- `bsky.py feed` on that topic's feed (12 posts): 7 quote Alan's post, mostly grim or sarcastic comments; also Mother Jones and Iowa Public Radio news links.
- `bsky.py read-link` and curl on the ABC News address: returns 200; article dated 20 November, "nearly 10,000 pounds of lead azide", degraded, Middletown, dust plume "that will contain some lead"; it gives the earlier postponement to Monday 23 November, which the answer does not repeat.
