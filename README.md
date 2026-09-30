# GUNA TAILOR SERVICES
> Bespoke Craftsmanship Atelier, Secure Multi-Role Portal, 5-Stage Firewall & Real-Time Tracking Platform

---

## 📌 How to Open and Run in Visual Studio / VS Code on Your Device

Follow these step-by-step instructions to set up and run this complete application on your local computer using **Visual Studio Code** or **Visual Studio**:

### 1. Prerequisites on Your Device
Make sure you have **Node.js** installed on your computer:
* Download Node.js (version 18, 20, or higher) from [https://nodejs.org](https://nodejs.org).
* Verify installation in your terminal / Command Prompt:
  ```bash
  node -v
  npm -v
  ```

---

### 2. Download / Export the Project to Your Computer
1. In the top-right corner of Google AI Studio, click the **Export** / **Download Code** (or **Export to GitHub**) button to download the project zip file or push it to your GitHub repository.
2. If downloaded as a ZIP file, extract it to a folder on your computer (e.g. `C:\Projects\GunaTailorServices` or `~/Projects/GunaTailorServices`).

---

### 3. Open in Visual Studio Code (or Visual Studio)
1. Open **Visual Studio Code** (or Visual Studio).
2. Go to **File** > **Open Folder...** (or press `Ctrl + K, Ctrl + O` on Windows/Linux, `Cmd + O` on Mac).
3. Select the extracted `GunaTailorServices` directory and click **Select Folder**.
4. Open the integrated terminal inside VS Code:
   * Press **``Ctrl + ` ``** (or **Terminal** > **New Terminal** from the top menu).

---

### 4. Install Dependencies
In the VS Code terminal, run:
```bash
npm install
```
This installs all required dependencies:
* `express` & `tsx` (Full-stack Node.js server)
* `react` & `react-dom` (React 19)
* `vite` & `@tailwindcss/vite` (Tailwind CSS v4 engine)
* `lucide-react` (Luxury tailoring & security iconography)
* `@google/genai` (Gemini API with High Thinking mode)

---

### 5. Configure Your Environment Variables
1. In the root directory, copy `.env.example` to create a new file named `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Or on Windows Command Prompt: `copy .env.example .env`)*
2. Open `.env` and configure your Gemini API Key:
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   PORT=3000
   ```
   *(You can obtain a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)).*

---

### 6. Start the Application
In your VS Code terminal, run:
```bash
npm run dev
```

You will see:
```text
Guna Tailor Services enterprise full-stack server running on http://localhost:3000
```

Open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

### 7. Available NPM Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the full-stack Express server with Vite middleware on port 3000 |
| `npm run build` | Compiles the production React application to the `dist/` directory |
| `npm start` | Runs the compiled production server (`NODE_ENV=production tsx server.ts`) |
| `npm run lint` | Runs TypeScript type checking across all server and client files |

---

### 8. Recommended VS Code Extensions
For the best development experience in VS Code, install:
* **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
* **TypeScript and JavaScript Language Features** (Built-in)
* **Prettier - Code formatter** (`esbenp.prettier-vscode`)

---

## 🛡️ Core Platform Architecture & Features

### 🌟 Atelier Public Showcase
* **Bespoke Craftsmanship Portfolio**: 3-Piece Italian Wool Suits, Banarasi Katan Sherwanis, Black-Tie Tuxedos, Haute Couture Bridal Gowns, Master Alterations, and Luxury Mill Curation.
* **Public Real-Time Order Lookup**: Instant tracking by Order ID (e.g. `GTS-8492`, `GTS-9021`) or phone number without requiring account creation.
* **AI Master Stylist & Fitting Copilot**: Server-side Gemini integration featuring **High Thinking mode** (`gemini-3.1-pro-preview` with `ThinkingLevel.HIGH`) to evaluate drape tension, shoulder slope compensations, and ceremonial styling palettes.
* **Fitting Consultation Booking**: Form reserving 36-point measurement trials in the private atelier suite or traveling home visits.

### 🔐 Multi-Role Secure Enterprise Portal
* **Client Workspace**:
  * Real-time progress bar across all tailoring stages.
  * 36-point anatomical measurement card with posture compensation directives.
  * **End-to-End File Encryption (E2EE)**: In-browser WebCrypto AES-GCM 256-bit encryption with SHA-256 integrity hash verification.
  * Encrypted direct messaging thread with assigned master tailor.
* **Artisan & Cutter Workspace**:
  * Real-time production milestone advancer that synchronizes live with client tracking.
  * Cutting table measurement inspector and chalk note logger.
  * Internal atelier communication channels (`#atelier-main`, `#cutting-room`).
* **Operations & Security Command (Admin)**:
  * **Workflow Kanban Dashboard**: Drag/advance orders across production stages (`Drafting`, `Cutting`, `Basting`, `Stitching`, `QC & Press`, `Completed`).
  * **5-Stage Active Firewall Protection**:
    1. *Stage 1*: Edge DDoS Scrubbing & Sliding-Window Rate Limiter (160 req/min).
    2. *Stage 2*: Web Application Firewall (WAF) deep packet inspection against OWASP Top 10 vulnerabilities.
    3. *Stage 3*: Zero-Trust IAM & Granular RBAC token boundaries.
    4. *Stage 4*: End-to-End Envelope Encryption (AES-GCM-256) with server-side SHA-256 verification.
    5. *Stage 5*: AI Anomaly & Intrusion Prevention System (IPS).
  * **Immutable Audit Trail & Sensitive Action Ledger**:
    * Merkle-chained SHA-256 cryptographic audit logs tracking all permission modifications, file decryptions, order stage overrides, CRM sync events, and firewall deflections.
    * Live integrity verification and one-click CSV export.
  * **CRM Bi-Directional Synchronization Hub**: Live sync integration with Salesforce and Zoho Tailor CRM.
  * **Automated Weekly Security & Compliance Reports**: Instant audit generation with ISO 27001 / GDPR compliance scores.
  * **Multi-Factor Authentication (MFA)**: Hardware/TOTP 6-digit authenticator token verification.
