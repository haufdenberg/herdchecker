# Herd Scout

Phone app for tracking cattle by face. Scan animals while you walk a field, and it logs who is there. It keeps working with no cell service, stores everything on the phone, and uploads when you have signal again.

## Files

- `index.html`: the whole app (no build step, no libraries)
- `sw.js`, `manifest.webmanifest`, `icon-*.png`: make it installable and fully offline
- `apps-script.gs`: the shared sync server (runs free in your Google account)

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
4. **End walk** shows who was seen and who was not, with an Excel export.
5. **Calving:** open a cow, Add calf (date, sex, tag). Leave "add calf to herd" ticked and the calf gets its own record linked to its dam.
6. **Search** (Herd tab) matches tag, name, breed, notes, calf tags and dates. Try `bull calf`, `2026-03`, `angus`. Filter chips: Calf at side, Bulls, Under 1 yr, Not seen 7 d.

## Sharing the herd between phones and tablets

Every device keeps its own full copy and works with no signal. When service returns, each device sends what it changed and receives what the others changed: animals, photos (so every device can recognize every animal), calving records, walks and sightings. If two people edit the same record, the newest edit wins. A walk by one person shows on everyone else's Walks tab as "by iPad" (using the device name in Settings), and Last seen updates for everyone.

**One-time setup (about 5 minutes, free):**

1. In Google Sheets create a new blank spreadsheet. Extensions, then Apps Script.
2. Delete the sample code and paste all of `apps-script.gs`. Change `TOKEN` to a secret word of your own. Save.
3. Deploy, then New deployment, then the gear icon, then Web app. Execute as: **Me**. Who has access: **Anyone**. Deploy and approve the permissions (Google shows an "unverified app" notice because it is your own script: Advanced, then continue).
4. Copy the Web app URL.
5. In Herd Scout on your phone: Settings, then Connection details. Paste the URL and your secret word. Your phone uploads everything it already has.
6. Still in Settings, tap **Copy setup code** and send it to your coworker (text or email).
7. On their device: open Herd Scout, Settings, paste the code into **Paste setup code**. The herd downloads (use Wi-Fi the first time; photos make it a few MB).

Name each device in Settings (for example iPhone, iPad) so walks show who did them.

**Updating the script later:** Deploy, then Manage deployments, then the pencil, then Version: New version, then Deploy. The address stays the same.

**Good to know**
- Anyone with the setup code can read and change the herd. Share it only with people you trust, and change `TOKEN` in the script (then re-enter it) if it leaks.
- The data lives in the `HerdData` sheet of your own Google account. It is readable, but do not edit it by hand.
- Devices need roughly correct clocks (phones set theirs automatically) because the newest edit wins.
- You can still use Settings, Full backup (.json) as a safety copy.
- Older versions of this script (the one that only logged uploads) must be replaced with the new one, then redeploy as a new version.

## Location

Location is requested **once per walk** (a single GPS watch, no repeated prompts) and stops when you end the walk. Each sighting stores the raw device latitude, longitude and accuracy in metres, never a place name. Turn it off with the checkbox on the Scan tab or in Settings; with it off nothing is saved and the phone is never asked. If you block it in the browser, the app stops asking until you switch the setting off and on again. Maps links open the exact coordinates.

## Spreadsheets

Herd list, calving log and each walk export as real Excel (`.xlsx`) files: a bold title, a blank row, shaded column headings that stay frozen, filter buttons, and sensible column widths. They open in Excel by default and import into Google Sheets (upload to Drive, or File, then Import). Tags stay as text, so leading zeros survive (0203 stays 0203). The Herd tab has a Download Excel button that exports exactly what is shown (including a filter or search). Settings has the full herd list and the calving log.

## Honest limits

- Recognition runs on the phone using coat color layout, edge pattern and brightness pattern from the framed face. It was tested here on synthetic patterned images, **not on real cattle in a field**. Solid-colored or very similar animals will be the hardest. Check **Settings, Check my herd's numbers** after enrolling: it compares same-animal and different-animal scores and suggests an auto-accept level.
- Start with the default and watch the "Best guess" line on the viewfinder. If it counts the wrong animal, raise the threshold. If it asks too often, lower it.
- One animal per frame. Lighting and distance matter; photos taken in the same conditions you'll scan in work best.
- If you later want stronger recognition, the descriptor in `describe()` can be swapped for a neural-network embedding without changing the rest of the app.
