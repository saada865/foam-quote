import React from 'react';

export function DashboardHeader({ logo }) {
  return (
    <div className="dashboard-view" style={{ marginBottom: "40px", display: "flex", alignItems: "center", gap: "20px" }}>
      <img src={logo} alt="Beyond Group Logo" style={{ height: "60px", width: "auto" }} />
      <div>
        <h1 style={{ fontSize: "32px", margin: "0", color: "var(--accent)" }}>Beyond Group</h1>
        <p style={{ color: "var(--text-secondary)", margin: "0" }}>Foam Quote Builder & Cost Estimator</p>
      </div>
    </div>
  );
}

export function InputPanel({ inputs, handleChange, loadScenario, handleCalculate }) {
  return (
    <div className="dashboard-panel">
      <div className="card">
        <div className="card-title">
          <span>⚙️</span> Job Parameters
        </div>
        
        <div className="input-group">
          <label className="input-label">Project / Scenario Name</label>
          <input type="text" name="scenarioName" value={inputs.scenarioName || ''} onChange={(e) => handleChange({ target: { name: 'scenarioName', value: e.target.value } })} placeholder="e.g. Lethbridge Bridge Rehab" />
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
        
        <div className="input-group">
          <label className="input-label">Price Escalation % (2027)</label>
          <input type="number" name="escalation" value={inputs.escalation} onChange={handleChange} />
        </div>

        <button onClick={handleCalculate} style={{ marginTop: "20px" }}>Generate Quote</button>
        <button className="secondary" onClick={loadScenario} style={{ marginTop: "12px" }}>Load Lethbridge Example</button>
      </div>
    </div>
  );
}

export function AnalysisPanel({ result, inputs, showInternal, setShowInternal, handleDownload }) {
  if (!result) return null;

  return (
    <div className="dashboard-panel">
      <div className="card">
        <div className="card-title" style={{ color: "var(--success)" }}>
          <span>📄</span> Quote Overview
        </div>
        
        <div className="result-item">
          <span className="result-label">1. Material Calculation</span>
          <span className="result-value">{result.rawLbs.toLocaleString()} lbs raw</span>
        </div>
        <div className="result-item">
          <span className="result-label">2. Mobilization Charge</span>
          <span className="result-value">${result.totalMobRevenue.toLocaleString()}</span>
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
    </div>
  );
}
