import React from 'react';
import { TabType } from '../types';
import { 
  Zap, 
  Network, 
  Cpu, 
  BookOpen, 
  Tags, 
  FlaskConical, 
  ClipboardCheck,
  Volume2,
  VolumeX
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  soundEnabled,
  onToggleSound
}) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'full-visual', label: 'Pendawaian Fizikal Panel', icon: <Network className="w-4 h-4" /> },
    { id: 'ls-visual', label: 'Terminal LS Electric', icon: <Cpu className="w-4 h-4" /> },
    { id: 'sop', label: 'SOP Pendawaian', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'ferrule', label: 'Ferrule & Skematik', icon: <Tags className="w-4 h-4" /> },
    { id: 'simulator', label: 'Simulasi Interaktif', icon: <FlaskConical className="w-4 h-4" /> },
    { id: 'tc', label: 'Ujian T&C', icon: <ClipboardCheck className="w-4 h-4" /> }
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-700 rounded-xl text-white shadow-sm flex items-center justify-center">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight flex items-center gap-2">
                SOP Pendawaian & Simulasi Pemula Motor DOL
              </h1>
              <p className="text-xs text-slate-500">
                Piawaian Rujukan: <span className="text-indigo-600 font-bold">MS IEC 60204-1</span> (LS Electric Metasol)
              </p>
            </div>
          </div>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? "Nyahaktifkan Bunyi Sintesis" : "Aktifkan Bunyi Sintesis"}
            className={`md:hidden p-2 rounded-lg border transition ${
              soundEnabled
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Navigation Tabs */}
          <nav className="flex space-x-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200 overflow-x-auto text-xs sm:text-sm no-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`px-3 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? "Nyahaktifkan Bunyi Sintesis (Kesan Suara)" : "Aktifkan Bunyi Sintesis (Kesan Suara)"}
            className={`hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition cursor-pointer ${
              soundEnabled
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-600" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            <span>{soundEnabled ? 'Bunyi ON' : 'Bunyi OFF'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
