# Timon & Pumba Singing chatbot! (Fanpage)


Sing/type ONE line of your favorite ***Timon and Pumba*** song, and they'll sing back (the next line)!

Try it out @ https://messenger.com/

### Current songs (more to come!):
- Hakuna Matata
- Can you feel the love tonight?
- Stand by me

### Current flexibility:
- Ignores punctuation i.e "who?" = "who"
- Ignores repeating characters i.e "whoo" = "who"
- levenshtein algorithm  i.e "And the land iz darc" = "And the land is dark"

### TODO:
- Better Regex to consider more possible versions of a string
  - punctuation agnostic (v1) - DONE
  - close/similar/typos representations of words would work i.e "wart-hoooog" = "warthog" (v2) - DONE
- More efficient searching algorithms (v3) - DONE
- Support at least 3 songs (v4) - DONE
- Sing to Timon and Bumpa and they sing back the next sentance! (v5)


NOTE: This is not affiliated with Disney or the creators of Timon & Pumba in any way.
