<!-- Copyright 2026 Zozimus Technologies -->

# QR Code Reader

A fast, private, and free QR code scanner available as a **web app** and a **browser extension** for Microsoft Edge and Chromium-based browsers.

**Web App:** https://the-qrcode-reader.netlify.app

---

## Features

- **Camera Scanning** — Point your webcam at any QR code for instant decoding
- **Image File Scanning** — Upload a screenshot or photo containing a QR code
- **100% Private** — All processing happens locally in your browser; no data is collected or transmitted
- **Clean, Modern UI** — Gradient-themed design with smooth animations and responsive layout
- **Clean Camera Labels** — Automatically removes verbose camera IDs from the dropdown for a cleaner experience
- **Lightweight** — No background processes; the extension only runs when you open it
- **Free & Open Source** — MIT licensed, no ads, no premium tiers

---

## Project Structure

```
the-qrcode-reader/
├── web/                    # Netlify-hosted web app
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── images/
├── extension/              # Browser extension (Manifest V3)
│   ├── manifest.json
│   ├── background.js
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   ├── html5-qrcode.min.js
│   └── images/
├── storeassets/            # Edge Add-on store assets
│   ├── description.md
│   ├── extensionlogo-300x300.svg
│   ├── smallpromotionaltile-440x280.svg
│   ├── largepromotionaltile-1400x560.svg
│   ├── screenshot-1280x800.svg
│   └── screenshot-640x400.svg
├── netlify.toml
├── LICENSE
└── README.md
```

---

## Web App

Hosted on Netlify at https://the-qrcode-reader.netlify.app. The `web/` folder is published as a static site with security headers configured in `netlify.toml`.

---

## Browser Extension

A self-contained Manifest V3 extension that bundles the html5-qrcode library locally. Clicking the extension icon opens the QR scanner in a new tab.

### Install from Source

1. Clone this repository
2. Open `edge://extensions` (or `chrome://extensions`)
3. Enable **Developer mode**
4. Click **Load unpacked** and select the `extension/` folder
5. Click the QR Code Reader icon in the toolbar to start scanning

### Permissions

The extension requires **no special permissions**. Camera access is requested by the page only when you choose camera scanning.

---

## Store Assets

The `storeassets/` folder contains ready-to-use assets for the Microsoft Edge Add-on store:

| Asset | Dimensions | Format |
|---|---|---|
| Extension Logo | 300×300 px (1:1) | SVG |
| Small Promotional Tile | 440×280 px | SVG |
| Large Promotional Tile | 1400×560 px | SVG |
| Screenshot (large) | 1280×800 px | SVG |
| Screenshot (small) | 640×400 px | SVG |

> **Note:** Convert SVGs to PNG at the exact pixel dimensions before uploading to the store.

---

## Privacy

QR Code Reader does **not** collect, store, transmit, or share any user data. There is no analytics, telemetry, or server-side processing. All QR code decoding happens entirely client-side using the open-source [html5-qrcode](https://github.com/mebjas/html5-qrcode) library.

---

## Technology

- [html5-qrcode](https://github.com/mebjas/html5-qrcode) — QR/barcode scanning library
- Manifest V3 — Modern Chrome/Edge extension architecture
- Netlify — Static hosting with security headers

---

## License

[MIT License](LICENSE)

© 2026 Zozimus Technologies. All rights reserved.
