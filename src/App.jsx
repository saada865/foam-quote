import { useState } from "react";
import logo from './assets/beyond_group_logo.svg';

// Custom Modules
import { calculateQuote } from './utils/calculator';
import { DashboardHeader, InputPanel, AnalysisPanel } from './components/Dashboard';
import Proposal from './components/Proposal';

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

  const [showInternal, setShowInternal] = useState(false);

  // Directly calculate result during render - no side effects or loops possible
  const result = calculateQuote(inputs);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'scenarioName') {
      setInputs(prev => ({ ...prev, [name]: value }));
    } else {
      setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    }
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
      scenarioName: "Bridge Abutment Rehabilitation - Lethbridge",
      fuelRate: 0.75
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

  return (
    <div className="app-wrapper">
      <DashboardHeader logo={logo} />
      
      {/* Container class here enables the side-by-side grid for its children */}
      <div className="main-content container dashboard-view">
        <InputPanel 
          inputs={inputs} 
          handleChange={handleChange} 
          loadScenario={loadScenario} 
          handleCalculate={() => {}} // No-op, auto-calculates now
        />
        
        <AnalysisPanel 
          result={result} 
          inputs={inputs}
          showInternal={showInternal}
          setShowInternal={setShowInternal}
          handleDownload={handleDownload}
        />
      </div>

      <Proposal 
        inputs={inputs} 
        result={result} 
        logo={logo} 
      />
    </div>
  );
}