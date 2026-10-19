# Herd Scout

Phone app for tracking cattle by face. Scan animals while you walk a field, and it logs who is there. It keeps working with no cell service, stores everything on the phone, and uploads when you have signal again.

## Files

- `index.html`: the whole app (no build step, no libraries)
- `sw.js`, `manifest.webmanifest`, `icon-*.png`: make it installable and fully offline
- `apps-script.gs`: optional Google Sheets receiver for the sync

## Getting it on your phone

The live camera and home-screen install need a secure (https) address. Easiest free options:

1. **Netlify Drop** (app.netlify.com/drop): drag this folder in, get an https link.
2. **GitHub Pages**: put the files in a repo, turn on Pages.

Open the link on the phone **once while you have service**, then choose "Add to Home Screen" (iPhone: Share, then Add to Home Screen; Android: menu, then Install app). After that it opens and runs with no signal.

Opening `index.html` straight from the phone's files still works for everything except the live viewfinder. Use the **Camera app** button instead.

## Using it

1. **Enroll the herd.** Scan an animal (or Herd, then Add animal) and fill in tag, name, sex, birth date. Then open her record and add 2–4 more photos (Take photo or From gallery). Frame the face head-on, filling the square.
2. **Walk the field.** Name the field, tap Start walk, point at faces. Tap the shutter, or switch on **Auto** to scan every 1–4 seconds. Each animal is counted once per walk and appears in the "head counted" list.
3. **When it isn't sure**, tapping the shutter shows the closest matches. Tap the right one, or add a new animal. Confirmed photos are added to that animal so recognition improves.
4. **End walk** shows who was seen and who was not, with a CSV export.
5. **Calving:** open a cow, Add calf (date, sex, tag). Leave "add calf to herd" ticked and the calf gets its own record linked to its dam.
6. **Search** (Herd tab) matches tag, name, breed, notes, calf tags and dates. Try `bull calf`, `2026-03`, `angus`. Filter chips: Calf at side, Bulls, Under 1 yr, Not seen 7 d.

## Offline backup and sync

All data lives in the phone's browser storage and is saved the moment you scan. The top-right pill shows `Saved on this phone`, `Offline · N saved`, `N waiting to sync`, or `Synced`.

To also upload to your own Google Sheet:

1. Create a Google Sheet, then Extensions, then Apps Script. Paste `apps-script.gs`, change `TOKEN`.
2. Deploy, then New deployment, then Web app. Execute as: Me. Access: Anyone. Copy the URL.
3. In the app: Settings, paste the URL and the same secret word.

Queued changes upload automatically when service returns. Settings also has a full JSON backup and restore, plus herd and calving-log CSVs. Do one backup export now and then; browsers can clear storage if the phone is very low on space.

## Honest limits

- Recognition runs on the phone using coat color layout, edge pattern and brightness pattern from the framed face. It was tested here on synthetic patterned images, **not on real cattle in a field**. Solid-colored or very similar animals will be the hardest. Check **Settings, Check my herd's numbers** after enrolling: it compares same-animal and different-animal scores and suggests an auto-accept level.
- Start with the default and watch the "Best guess" line on the viewfinder. If it counts the wrong animal, raise the threshold. If it asks too often, lower it.
- One animal per frame. Lighting and distance matter; photos taken in the same conditions you'll scan in work best.
- If you later want stronger recognition, the descriptor in `describe()` can be swapped for a neural-network embedding without changing the rest of the app.
