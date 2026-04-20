# 🏗️ Beyond Group: Industrial Foam Quote Tool

A professional, enterprise-grade React application for calculating and presenting bridge abutment rehabilitation bids. This tool transforms complex industrial job-costing into a streamlined, modular experiences for the Beyond Group team.

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

### 3. Intelligent Estimation
The tool automates three critical pain points:
- **Automated Fuel Tracking**: Estimates distance based on Highway Travel Time (90km/h avg) and current fleet fuel rates ($0.75/km).
- **Revenue Protection**: Automatically applies a $750/day standby fee for projects exceeding the standard 2-day window.
- **Calculations During Render**: To eliminate the "white screen" bugs found in standard React apps, I refactored the logic to compute results on-the-fly, ensuring the UI is always stable and accurate.

---

## 🔢 Mathematical Verification (Lethbridge Job)
For the standard 18 m³ project, the tool calculates:
- **Material Selection**: 2,354.4 lbs (incl. 12% waste).
- **Total Revenue**: **$32,807.20** (Supply & Install + Mobilization).
- **2027 Contingency**: **$34,119.49** (Using 4% compounded escalation).

---

## 🚀 The Road Ahead (What I'd build next)
If I had another 24 hours with this codebase, I would implement:


---

## 🛠️ Setup & Deployment

**Local Development**:
1. `npm install`
2. `npm run dev`

**GitHub Sync**:
1. `git remote add origin https://github.com/saada865/foam-quote.git`
2. `git push -u origin main`

**Vercel Hosting**:
- Connect the GitHub repository at [vercel.com](https://vercel.com/new) for automated CI/CD.
