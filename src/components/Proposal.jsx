import React from 'react';

export default function Proposal({ inputs, result, logo }) {
  if (!result) return null;

  return (
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
  );
}
