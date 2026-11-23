## ANSWER

It's a clip of Feijóo, now leader of Spain's PP party, on Galician public TV, posted to call him a hypocrite. One caveat: I can only see a single still frame. I can't watch or hear the video.

The post is in Spanish. Fonsi Loaiza wrote, translated: "Today, Feijóo of the PP accused TVE of being a North Korean TV at the service of Pedro Sánchez. This is Feijóo on Galician TV. He used it as crude propaganda when he was president of the Xunta [Galicia's regional government] and was congratulated after the elections by Julio Iglesias in prime time."
https://bsky.app/profile/fonsiloaizap.bsky.social/post/3n2yehci5bk2i

- The frame shows a studio set reading "Land Rober Tunai Show", the hashtag #LandRoberFeijoo and the TVG (Galician TV) logo. A host gestures beside a man in glasses, and there's an audience behind them.
- El Salto reports that the Xunta under Feijóo paid about €7 million for that show: https://www.elsaltodiario.com/tvg/xunta-feijoo-pagou-sete-millons-dous-anos-polo-land-rober-hoxe-entrevista-alfonso-rueda
- I couldn't find reporting of today's "North Korean" remark, so that part is the poster's claim.

Want a rundown of the replies?

## STEPS

1. Read /home/user/scratch/bluesky-copilot/prompt-tests/v2/answer-brief.md: the testing brief.
2. Ran `python3 case.py feijoo-tvg-video`: got the message "whats happening in this video? i dont speak spanish". The focused post is fonsiloaizap's 3n2yehci5bk2i, nobody is signed in, and the person's time zone is America/New_York.
3. Read app/server/system-prompt.md: the system prompt.
4. Read skill/bluesky/SKILL.md: the recipes for explaining a post, looking at media (a video gives one frame), and translating a post.
5. `python3 scripts/bsky.py thread <post>`: got the post's Spanish text and a video with no alt text. It has 400 likes, 234 reposts, 41 replies and 26 quotes. The 8 top replies are mostly people agreeing and insulting Feijóo.
6. `python3 scripts/bsky.py media <post>`: saved one still frame from the video to /tmp/bsky-media-o3i1tblx/video-frame.jpg. No alt text.
7. Read video-frame.jpg: a TV studio with "ROBER… TUNAI SHOW" signage, "#LandRoberFeijoo" in the top-left, the TVG "G" logo in the top-right, a gesturing host in a suit, a man in glasses with folded arms, and an audience.
8. ToolSearch to load WebSearch and WebFetch.
9. WebSearch "Feijóo Land Rober TVG programa": El Salto articles saying the Xunta under Feijóo paid about €7M for Land Rober (2021-22), and that politicians on the show are mostly from the Galician PP.
10. WebSearch "Feijóo TVE \"norcoreana\" noviembre 2026": nothing confirmed the specific "North Korean" remark. It found only general PP attacks on TVE in 2026.

## EVIDENCE

- The post's text and its translation: from the `thread` output (the Spanish original, translated by me).
- The frame shows "Land Rober Tunai Show", #LandRoberFeijoo, the TVG logo, a gesturing host and a man in glasses: from the image /tmp/bsky-media-o3i1tblx/video-frame.jpg. Feijóo is identified by the hashtag and the post text, not by his face.
- "Feijóo, now leader of Spain's PP party": the post says "Feijóo del PP". That he leads the party is general knowledge, and the answer did not flag it as such.
- The Xunta paid about €7M for the show: El Salto, https://www.elsaltodiario.com/tvg/xunta-feijoo-pagou-sete-millons-dous-anos-polo-land-rober-hoxe-entrevista-alfonso-rueda (from the WebSearch summary; I did not fetch the page itself).
- I couldn't find the "North Korean" remark reported: from the second WebSearch, which turned up no match.

## FRICTION

- For a video, the skill gives only one still frame, and the post has no alt text. So "what's happening in this video" can only be answered from the frame plus the post text. Audio or a transcript would answer the question directly. Nothing in the skill tells the agent how to get one, for example by searching the web for the original TVG clip.
- The frame does not show which "elections" moment the post means (the Julio Iglesias congratulation), so I could not confirm that this clip is that moment. The answer says only that it's a clip of Feijóo on the show.
- The system prompt asks for 40-100 words. Translating the post in full, as the skill's language recipe requires, plus a caveat and the sources pushes the answer to about 150 words. Nothing says whether a translation counts toward that limit.
- The answer said "now leader of Spain's PP party" from general knowledge without marking it, which the system prompt asks for. That line is borderline, because the post itself says "del PP".
- The WebSearch tool told me to add a "Sources:" list in markdown. That conflicts with the system prompt's "link each once with full https:// address", and I followed the system prompt.
