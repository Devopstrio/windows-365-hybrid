import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import HybridDashboard from './pages/HybridDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400 max-w-md mx-auto">The hybrid workplace engine is currently synchronizing identity objects and orchestrating cloud PC lifecycle events. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<HybridDashboard />} />
          <Route path="/identity" element={<Placeholder name="Identity Sync & Hybrid Join Hub" />} />
          <Route path="/provisioning" element={<Placeholder name="Cloud PC Provisioning Factory" />} />
          <Route path="/fleet" element={<Placeholder name="Managed Device Fleet & Compliance" />} />
          <Route path="/networking" element={<Placeholder name="Hybrid Network & VNet Topology" />} />
          <Route path="/policies" element={<Placeholder name="Intune Policies & Configuration" />} />
          <Route path="/performance" element={<Placeholder name="User Session & Performance Metrics" />} />
          <Route path="/cost" element={<Placeholder name="Windows 365 License & Cost Control" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
