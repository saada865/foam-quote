import { useState } from "react";
import logo from './assets/beyond_group_logo.svg';

export default function App() {
    const [inputs, setInputs] = useState({
        volume: 18,
        travelHours: 2.5,
        workers: 2,
        days: 2,
        waste: 12,
        labourRate: 40,
        escalation: 4,
        markup: 0,
        scenarioName: "Bridge Abutment Rehabilitation - Lethbridge",
        fuelRate: 0.75
    });
    const [result, setResult] = useState(null);
    const [showInternal, setShowInternal] = useState(false);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) || 0 });
    };

    const loadScenario = () => {
        setInputs({
            volume: 18,
            travelHours: 2.5,
            workers: 2,
            days: 2,
            waste: 12,
            labourRate: 40,
            escalation: 4,
            markup: 0,
            scenarioName: "Bridge Abutment Rehabilitation - Lethbridge"
        });
    };

    const handleDownload = () => {
        const originalTitle = document.title;
        document.title = `Project Proposal - ${inputs.scenarioName || 'Beyond Group'}`;
        window.print();
        setTimeout(() => {
            document.title = originalTitle;
        }, 1000);
    };

    const calculate = () => {
        const {
            volume,
            travelHours,
            workers,
            days,
            waste,
            labourRate,
            escalation,
        } = inputs;

        // ---- CONSTANTS (per brief) ----
        const ydConversion = 1.308;
        const lbsPerYd = 100;
        const sAndIPrice = 13; // Revenue per lb
        const mobFee = 2200;
        const drumSetCost = 2300; // 1 set = 1000 lbs
        const payrollBurden = 1.2; // 20%
        const hotelRate = 200;
        const perDiem = 75;
        const extendedDayRate = 750;
        const ppe = 150;
        const maintenance = 300;
        const misc = 300;
        const overhead = 500;

        // ---- MATERIAL CALCULATIONS ----
        const rawLbs = volume * ydConversion * lbsPerYd;
        const wasteLbs = rawLbs * (waste / 100);
        const totalLbs = rawLbs + wasteLbs;

        // ---- REVENUE (Quote to Client) ----
        // Charged on raw lbs before waste + flat mob fee
        const materialRevenue = rawLbs * sAndIPrice;

        // Extended Day Charge (REVENUE: charged to client for 3rd day+)
        const extendedDayPrice = days > 2 ? (days - 2) * extendedDayRate : 0;
        const totalMobRevenue = mobFee + extendedDayPrice;

        const totalRevenue = materialRevenue + totalMobRevenue;
        const contingencyPrice = totalRevenue * (1 + escalation / 100);

        // ---- INTERNAL COST BUILD ----
        // Material Cost (Internal)
        const materialCostInternal = (totalLbs / 1000) * drumSetCost;

        // Labour (including travel)
        const travelTimeTotal = travelHours * 2; // round trip
        const dailyWorkingHours = 10; // estimate for a job like this
        const totalLabourHours = (dailyWorkingHours * days) + travelTimeTotal;
        const totalLabourCost = workers * totalLabourHours * labourRate * payrollBurden;

        // Fuel Cost (Internal)
        const estimatedDistance = travelHours * 2 * 90; // Est. 90km/h round trip
        const fuelCost = estimatedDistance * inputs.fuelRate;

        // Subsistence
        const hotelCost = workers * hotelRate * (days > 1 ? days - 1 : 0);
        const foodCost = workers * perDiem * days;

        // Final Cost Build
        const totalInternalCost =
            materialCostInternal +
            totalLabourCost +
            fuelCost +
            hotelCost +
            foodCost +
            ppe +
            maintenance +
            misc +
            overhead;

        const netProfit = totalRevenue - totalInternalCost;
        const margin = (netProfit / totalRevenue) * 100;

        setResult({
            rawLbs,
            totalLbs,
            materialRevenue,
            mobFee,
            extendedDayPrice,
            totalMobRevenue,
            totalRevenue,
            contingencyPrice,
            materialCostInternal,
            totalLabourCost,
            estimatedDistance,
            fuelCost,
            hotelCost,
            foodCost,
            totalInternalCost,
            netProfit,
            margin,
            days: inputs.days
        });
    };

    return (
        <div className="app-wrapper">
            {/* 
        This is the main dashboard for Beyond Group team members.
        The print styles in index.css will hide this and show 
        the ProposalTemplate instead during PDF export.
      */}
            <div className="dashboard-view" style={{ marginBottom: "40px", display: "flex", alignItems: "center", gap: "20px" }}>
                <img src={logo} alt="Beyond Group Logo" style={{ height: "60px", width: "auto" }} />
                <div>
                    <h1 style={{ fontSize: "32px", margin: "0", color: "var(--accent)" }}>Beyond Group</h1>
                    <p style={{ color: "var(--text-secondary)", margin: "0" }}>Foam Quote Builder & Cost Estimator</p>
                </div>
            </div>

            <div className="container dashboard-view">
                {/* Left Column: Inputs */}
                <div className="card">
                    <div className="card-title">
                        <span>⚙️</span> Job Parameters
                    </div>

                    <div className="input-group">
                        <label className="input-label">Project / Scenario Name</label>
                        <input type="text" name="scenarioName" value={inputs.scenarioName || ''} onChange={(e) => setInputs({ ...inputs, scenarioName: e.target.value })} placeholder="e.g. Lethbridge Bridge Rehab" />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Void Volume (m³)</label>
                        <input type="number" name="volume" value={inputs.volume} onChange={handleChange} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div className="input-group">
                            <label className="input-label">Days on Site</label>
                            <input type="number" name="days" value={inputs.days} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Travel Path (hrs)</label>
                            <input type="number" name="travelHours" value={inputs.travelHours} onChange={handleChange} />
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div className="input-group">
                            <label className="input-label">Crew size</label>
                            <input type="number" name="workers" value={inputs.workers} onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Labour Rate ($/hr)</label>
                            <input type="number" name="labourRate" value={inputs.labourRate} onChange={handleChange} />
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div className="input-group">
                            <label className="input-label">Fuel Rate ($/km)</label>
                            <input type="number" name="fuelRate" value={inputs.fuelRate} onChange={handleChange} step="0.01" />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Waste %</label>
                            <input type="number" name="waste" value={inputs.waste} onChange={handleChange} />
                        </div>
                    </div>

                    <button onClick={calculate} style={{ marginTop: "20px" }}>Generate Quote</button>
                    <button className="secondary" onClick={loadScenario}>Load Lethbridge Example</button>
                </div>

                {/* Right Column: Output */}
                <div className="card">
                    {!result ? (
                        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", textAlign: "center" }}>
                            Fill in the job details and click<br />"Generate Quote" to see the breakdown.
                        </div>
                    ) : (
                        <div>
                            <div className="card-title" style={{ color: "var(--success)" }}>
                                <span>📄</span> Quote Overview
                            </div>

                            <div className="result-item">
                                <span className="result-label">1. Material Calculation</span>
                                <span className="result-value">{result.rawLbs.toLocaleString()} lbs raw</span>
                            </div>

                            <div className="result-item">
                                <span className="result-label">2. Mobilization Charge</span>
                                <span className="result-value">${result.mobFee.toLocaleString()}</span>
                            </div>

                            <div className="result-item" style={{ marginTop: "16px", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                                <span className="result-label">3. Total Foam Revenue</span>
                                <span className="result-value" style={{ fontSize: "24px", color: "var(--success)" }}>
                                    ${result.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>

                            <div className="result-item">
                                <span className="result-label">4. One-Year Contingency</span>
                                <span className="result-value">${result.contingencyPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>

                            <button
                                onClick={handleDownload}
                                style={{ background: "#2563eb", marginTop: "24px" }}
                            >
                                📥 Download Professional Bid (PDF)
                            </button>

                            <div
                                style={{
                                    marginTop: "40px",
                                    background: "#f1f5f9",
                                    padding: "16px",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    border: "1px solid var(--border)",
                                    transition: "all 0.2s"
                                }}
                                className="internal-toggle"
                                onClick={() => setShowInternal(!showInternal)}
                            >
                                <div>
                                    <span style={{ fontSize: "18px", fontWeight: "600", color: "var(--text-primary)" }}>🔒 Internal Cost Build</span>
                                    <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Private margins & expense breakdown</div>
                                </div>
                                <button
                                    className="secondary"
                                    style={{
                                        margin: 0,
                                        padding: "8px 16px",
                                        width: "auto",
                                        fontSize: "14px",
                                        background: showInternal ? "#e2e8f0" : "var(--accent)",
                                        color: showInternal ? "var(--text-primary)" : "white",
                                        border: "none"
                                    }}
                                >
                                    {showInternal ? "Hide Details ▲" : "View Margins ▼"}
                                </button>
                            </div>

                            {showInternal && (
                                <div style={{ padding: "8px 0" }}>
                                    <div className="result-item">
                                        <span className="result-label">Material (incl. {inputs.waste}% waste)</span>
                                        <span className="result-value">${(result.materialCostInternal).toFixed(2)}</span>
                                    </div>
                                    <div className="result-item">
                                        <span className="result-label">Labour Build (Full Shift)</span>
                                        <span className="result-value">${result.totalLabourCost.toLocaleString()}</span>
                                    </div>
                                    <div className="result-item">
                                        <span className="result-label">Fuel Estimate ({result.estimatedDistance}km trip)</span>
                                        <span className="result-value">${result.fuelCost.toLocaleString()}</span>
                                    </div>
                                    <div className="result-item">
                                        <span className="result-label">Subsistence & Fixed Overheads</span>
                                        <span className="result-value">${(result.hotelCost + result.foodCost + 1250).toLocaleString()}</span>
                                    </div>
                                    <div className="result-item" style={{ marginTop: "8px", paddingTop: "12px", borderTop: "2px solid var(--border)" }}>
                                        <span className="result-label">Estimated Project Margin</span>
                                        <span className="result-value" style={{ color: "var(--success)" }}>{result.margin.toFixed(1)}%</span>
                                    </div>
                                    <div className="result-item">
                                        <span className="result-label">Net Profit</span>
                                        <span className="result-value" style={{ color: "var(--success)" }}>${result.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* --- PROFESSIONAL PROPOSAL TEMPLATE (Hidden in Dashboard, Visible in Print) --- */}
            {result && (
                <div className="print-only proposal-container">
                    <div className="proposal-header">
                        <img
                            src={logo}
                            className="proposal-logo"
                            alt="Beyond Group Logo"
                        />
                        <div style={{ textAlign: "right" }}>
                            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="proposal-subject">
                        <h3>PROJECT PROPOSAL: {inputs.scenarioName || 'FOAM INJECTION SERVICES'}</h3>
                    </div>

                    <table className="proposal-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Supply & Installation of HMI 2.5 lb closed-cell polyurethane foam</td>
                                <td>{result.rawLbs.toLocaleString()}</td>
                                <td>lb</td>
                                <td>${result.materialRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                            <tr>
                                <td>Mobilization & Setup ({result.days}-Day Project)</td>
                                <td>1</td>
                                <td>ls</td>
                                <td>${result.totalMobRevenue.toLocaleString()}</td>
                            </tr>
                            <tr className="total-row">
                                <td colSpan="3">TOTAL BID VALUE (2026 Season)</td>
                                <td>${result.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="proposal-clause">
                        <h4>Contingency & Escalation Clause</h4>
                        <p>
                            This proposal is valid for the 2026 construction season. Should the project be deferred
                            to the next construction season (2027), a compounded escalation rate of 4.0% will apply.
                            The anticipated 2027 contingency price is: <strong>${result.contingencyPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>.
                        </p>
                    </div>

                    <div className="proposal-footer">
                        <div className="signature-box">
                            <p>Client Acceptance:</p>
                            <div className="line"></div>
                            <span>Signature / Date</span>
                        </div>
                        <div className="signature-box">
                            <p>Beyond Group Authorization:</p>
                            <div className="line"></div>
                            <span>Signature / Date</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}