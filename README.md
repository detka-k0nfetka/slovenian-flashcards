# Slovenian Flashcards

This project is a tiny progressive web app for practicing Slovenian words with Russian translations. Word data now comes from a Google Sheet so units and topics can be edited online.

## Google Sheets configuration
1. Create a sheet with the following columns: `Unit`, `Topic`, `Slovenian`, `Russian`.
2. Publish the sheet to the web as **CSV** (File → Share → Publish to web) and copy the spreadsheet ID from the URL. If your data is on another tab, grab its `gid` as well.
3. Replace `YOUR_SHEET_ID` in `app.js` with your sheet ID. Update `SHEET_GID` if needed.

The app will load the CSV at runtime and group words by unit and topic.

## Development
Simply open `index.html` in a browser. For local testing with the service worker you may need to run a small server, e.g.:

```bash
python3 -m http.server
```

## Publishing
Commit your changes to Git and push them to GitHub. Then enable **GitHub Pages** for the repository using the `main` branch. After a few minutes your flashcards will be available at:

```
https://<your-username>.github.io/<repository-name>/
```
