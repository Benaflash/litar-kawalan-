import React, { useState } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { PhysicalWiringTab } from './components/PhysicalWiringTab';
import { LSTerminalsTab } from './components/LSTerminalsTab';
import { SOPTab } from './components/SOPTab';
import { FerruleSchematicTab } from './components/FerruleSchematicTab';
import { SimulatorTab } from './components/SimulatorTab';
import { TCChecklistTab } from './components/TCChecklistTab';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('full-visual');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
      />

      {/* Main Content View Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'full-visual' && <PhysicalWiringTab />}
        {activeTab === 'ls-visual' && <LSTerminalsTab />}
        {activeTab === 'sop' && <SOPTab />}
        {activeTab === 'ferrule' && <FerruleSchematicTab />}
        {activeTab === 'simulator' && <SimulatorTab soundEnabled={soundEnabled} />}
        {activeTab === 'tc' && <TCChecklistTab />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 shadow-xs">
        <p className="max-w-7xl mx-auto px-4">
          SOP & Sistem Simulasi Litar DOL Motor Starter • Rujukan Piawaian MS IEC 60204-1 (LS Electric Metasol Hardware)
        </p>
      </footer>
    </div>
  );
}

export default App;
