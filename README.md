# 🏗️ Beyond Group: Industrial Foam Quote Tool

A professional, enterprise-grade React application for calculating and presenting bridge abutment rehabilitation bids. This tool transforms complex industrial job-costing into a streamlined, modular experience for the Beyond Group team.


## 📖 User Guide: Navigating the Tool

### 1. The Dashboard (First Screen)
When you first open the tool, you are met with a clean, high-contrast dashboard.
- **Left Column (Job Parameters)**: This is where you input all specific data for your bid. 
- **Right Column (Quote Overview)**: This updates in real-time as you type, showing the client-facing revenue breakdown.

### 2. Smart Defaults & Scenarios
- **The "Lethbridge" Baseline**: If you enter no data, the tool defaults to the parameters for the standard **Lethbridge Bridge Rehabilitation** job (18 m³ void, 2.5h travel, $40/hr labour).
- **Auto-Calculations**: The tool automatically estimates travel distance (based on travel hours @ 90km/h) and fuel costs ($0.75/km) to save you manual odometer work.
- **Quick Load**: Use the "Load Lethbridge Example" button at the bottom of the left panel to instantly restore the standard challenge baseline.

### 3. "Hidden" Internal Analysis
To see if your bid is actually healthy, click the **🔒 Internal Cost Build** toggle at the bottom of the right panel.
- This reveals "private" costs like fuel burn, worker per-diems, hotel costs, and equipment maintenance.
- **Rationale**: This allows you to audit the **Net Profit** and **Project Margin %** privately before presenting the quote to the client.

### 4. Generating the Quote
- Once you are happy with the numbers, click **⚡ Generate Professional Quote**.
- Review the **Quote Overview** for accuracy.
- Click **📥 Download Professional Bid (PDF)**. This will trigger a print-preview of a single-page, formal proposal with official Beyond Group branding, ready to be sent to the client.

---

## 🏛️ Architecture & Design Choices

### 1. Modular "Separation of Concerns"
Instead of a monolithic application, I architected this project into four distinct layers:
- **`rates.js`**: A centralized "Source of Truth" for business constants (e.g., $2,300/drum, $750/extended day). This makes the tool future-proof as market rates change.
- **`calculator.js`**: A pure mathematical engine. It’s decoupled from React, making it incredibly fast and easy to unit-test.
- **`Dashboard.jsx`**: A high-efficiency, reactive interface for internal cost-auditing.
- **`Proposal.jsx`**: A print-optimized deliverable engine that generates official client-facing PDFs.

### 2. Job-Costing Integrity
I made a deliberate choice to maintain **Fractional Drum Usage** in the job costs. 
> **Rationale**: While some tools round up to the nearest drum (artificially inflating this job's cost and next week's profit), this tool tracks the exact value of the material consumed. This ensures accurate profit-margin reporting for the Lethbridge project without "stealing" value from the inventory for future jobs.

---

## 🔢 Mathematical Verification (Lethbridge Job)
For the standard 18 m³ project, the tool calculates:
- **Material Selection**: 2,354.4 lbs (incl. 12% waste).
- **Total Revenue**: **$32,807.20** (Supply & Install + Mobilization).
- **2027 Contingency**: **$34,119.49** (Using 4% compounded escalation).

---

## 🚀 Future Technical Roadmap
If I had another 24 hours with this codebase, I would implement:
1. **Unit Test Suite**: Implement a full suite of Vitest tests for the `calculator.js` engine to ensure zero regressions as rates change.
2. **AI-Powered Lead Parsing**: Integrate an LLM (like Gemini or GPT-4) to automatically scan incoming contractor emails, extract the volume and site location, and pre-fill the Dashboard parameters for one-click quoting.

---

## 🛠️ Setup & Deployment
**Local Development**:
1. `npm install`
2. `npm run dev`

**GitHub Sync**:
1. `git remote add origin https://github.com/saada865/foam-quote.git`
2. `git push -u origin main`


## Deployment
**By clicking this link you go to the deployed web app**:
**https://foam-quote.vercel.app/**
