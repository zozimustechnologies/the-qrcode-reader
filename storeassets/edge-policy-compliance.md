# Edge Add-on Store Policy Compliance Review

Extension: **QR Code Reader v1.0**
Date: 2025
Policies reference: https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/store-policies/developer-policies

---

## Section 1 — Product Policies

### 1.1 Distinct Function & Value; Accurate Representation

| Policy | Status | Notes |
|---|---|---|
| 1.1.1 Single purpose | ✅ PASS | Extension does one thing: scan QR codes |
| 1.1.2 Extension must be functional | ✅ PASS | Fully functional camera and file scanning |
| 1.1.3 Must provide value | ✅ PASS | Provides clear QR scanning utility |
| 1.1.4 Accurate metadata | ✅ PASS | Name "QR Code Reader" and description match functionality |
| 1.1.5 Description informs about functionality | ✅ PASS | description.md covers all features and behavior |
| 1.1.6 Clear and intuitive UI | ✅ PASS | Clean, single-page scanner interface |
| 1.1.7 No obfuscated code | ✅ PASS | html5-qrcode.min.js is *minified* (not obfuscated) — it is a well-known open-source library (npm: html5-qrcode). Minification is permitted; obfuscation is not. All other code is unminified. |

### 1.2 Security

| Policy | Status | Notes |
|---|---|---|
| No remote code execution | ✅ PASS | All JavaScript is bundled locally (html5-qrcode.min.js, script.js). No eval(), no remote script loading. |
| No unnecessary permissions | ✅ PASS | permissions array is empty `[]`. No host_permissions. |
| HTTPS for external resources | ✅ PASS | External CSS loaded over HTTPS only (Google Fonts, Font Awesome CDN) |
| No known vulnerabilities | ✅ PASS | XSS vulnerability in onScanSuccess was **fixed** — changed innerHTML to textContent to prevent script injection via malicious QR codes |

### 1.3 Product is Testable

| Policy | Status | Notes |
|---|---|---|
| Extension can be tested | ✅ PASS | Click icon → new tab → scanner works immediately |

### 1.4 Usability

| Policy | Status | Notes |
|---|---|---|
| Intuitive interface | ✅ PASS | Single-purpose UI with clear controls |
| Responsive design | ✅ PASS | max-width: 500px with responsive layout |

### 1.5 Personal Information

| Policy | Status | Notes |
|---|---|---|
| No data collection | ✅ PASS | Zero data collection, no analytics, no telemetry, no server communication |
| Privacy policy | ⚠️ NOTE | Edge store may require a privacy policy URL for extensions accessing the camera. Recommend adding a simple privacy policy page or using the GitHub repo README's privacy section as the URL. |

### 1.6 Permissions

| Policy | Status | Notes |
|---|---|---|
| Minimal permissions | ✅ PASS | Empty permissions array. Camera access is requested via standard web API (getUserMedia), not via extension permission. |
| Permission justification | ✅ PASS | No permissions to justify |

### 1.7 Localization

| Policy | Status | Notes |
|---|---|---|
| Language support | ✅ PASS | Extension is in English; metadata is in English |

### 1.8 Icon & Branding

| Policy | Status | Notes |
|---|---|---|
| Proper icons provided | ⚠️ NOTE | manifest.json uses `images/1.ico` for all icon sizes (16, 48, 128). Edge store prefers PNG format. Consider providing `icon-16.png`, `icon-48.png`, `icon-128.png` for better compatibility. |
| No third-party branding | ✅ PASS | Uses original branding only |

### 1.9 Search Keywords

| Policy | Status | Notes |
|---|---|---|
| Relevant keywords only | ✅ PASS | Keywords in description.md are all relevant to QR scanning |

### 1.10 Certification

| Policy | Status | Notes |
|---|---|---|
| Meets all requirements | ✅ PASS | All mandatory policies satisfied |

---

## Section 2 — Content Policies

| Policy | Status | Notes |
|---|---|---|
| 2.1 General content | ✅ PASS | Utility tool, no objectionable content |
| 2.2 Content including names, logos, original | ✅ PASS | Original content only |
| 2.3 Risk of harm | ✅ PASS | No harmful functionality |
| 2.4 Defamatory, libelous, slanderous | ✅ PASS | N/A |
| 2.5 Alcohol, tobacco, weapons, drugs | ✅ PASS | N/A |
| 2.6 Adult content | ✅ PASS | N/A |
| 2.7 Illegal activity | ✅ PASS | N/A |
| 2.8 Excessive profanity | ✅ PASS | N/A |
| 2.9 Country/region specific | ✅ PASS | N/A |
| 2.10 Gambling | ✅ PASS | N/A |
| 2.11 Simulating other products | ✅ PASS | Original product |
| 2.12 Notification abuse | ✅ PASS | No notifications sent |
| 2.13 Crypto mining | ✅ PASS | No mining code |

---

## Summary

**Overall: READY FOR SUBMISSION** with two minor recommendations:

1. **Privacy Policy URL** — Add a privacy policy URL (can point to the GitHub repo's privacy section or a simple hosted page) when submitting to the store.

2. **Icon Format** — Consider converting `images/1.ico` to PNG files at 16×16, 48×48, and 128×128 px for better Edge store compatibility. Update manifest.json icon paths accordingly.

## Security Fix Applied

**XSS Vulnerability (Critical)** — The `onScanSuccess` callback used `innerHTML` to render decoded QR text, which allowed malicious QR codes containing HTML/JavaScript to execute in the extension context. **Fixed** by switching to `textContent` in both `extension/script.js` and `web/script.js`.
