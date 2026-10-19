// Paste into Extensions > Apps Script of a Google Sheet, then deploy as a Web app (Execute as: Me, Access: Anyone).
const TOKEN = 'change-me'; // must match "Secret word" in Herd Scout settings

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (body.token !== TOKEN) return ContentService.createTextOutput('denied');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const log = ss.getSheetByName('Log') || ss.insertSheet('Log');
  const rows = body.items.map(i => [new Date(i.ts), body.device, i.type, JSON.stringify(i.payload)]);
  if (rows.length) log.getRange(log.getLastRow() + 1, 1, rows.length, 4).setValues(rows);
  return ContentService.createTextOutput('ok');
}
