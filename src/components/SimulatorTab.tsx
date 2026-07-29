import React, { useState, useEffect } from 'react';
import { SimState } from '../types';
import { playContactorClick, playButtonClick, playTripAlarm } from '../utils/audio';
import { 
  Gamepad2, 
  RotateCcw, 
  Play, 
  Square, 
  AlertTriangle, 
  Wrench, 
  Monitor, 
  Power, 
  PlayCircle, 
  Fan,
  Activity,
  Sliders,
  Zap,
  Thermometer,
  ShieldAlert,
  Info
} from 'lucide-react';

interface SimulatorTabProps {
  soundEnabled: boolean;
}

export const SimulatorTab: React.FC<SimulatorTabProps> = ({ soundEnabled }) => {
  const [simState, setSimState] = useState<SimState>({
    mccb: false,
    mcb: false,
    torTripped: false,
    contactorEngaged: false,
    motorCurrent: 4.2,
    torSetting: 5.0,
    supplyVoltage: 415,
    phaseLoss: false,
    earthFault: false,
    thermalHeat: 0
  });

  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState<{ title: string; desc: string; symbol: string } | null>(null);

  const glossaryDictionary: Record<string, { title: string; desc: string; symbol: string }> = {
    'NO': {
      title: 'Normally Open (NO - Sesentuh Buka Biasa)',
      symbol: 'NO / 13-14',
      desc: 'Sesentuh yang berada dalam keadaan terbuka semasa rehat. Ia hanya akan tertutup (meneruskan arus) apabila butang atau gegelung diaktifkan (contoh: Butang START dan Sesentuh Bantu Latching 13-14).'
    },
    'NC': {
      title: 'Normally Closed (NC - Sesentuh Tutup Biasa)',
      symbol: 'NC / 21-22 / 95-96',
      desc: 'Sesentuh yang sentiasa tertutup untuk membenarkan arus mengalir semasa rehat. Ia akan terbuka apabila ditekan atau berlaku kerosakan untuk memutuskan litar (contoh: Butang STOP dan TOR 95-96).'
    },
    'TOR': {
      title: 'Thermal Overload Relay (TOR - Geganti Beban Lebih)',
      symbol: 'TOR (95-96, 97-98)',
      desc: 'Peranti perlindungan motor berasaskan jalur bimetal. Jika arus motor melebihi nilai setting (A) terlalu lama, jalur melentur, membuka sesentuh 95-96 (trip litar) dan menutup 97-98 (menyalakan lampu H3).'
    },
    'MCCB': {
      title: 'Molded Case Circuit Breaker (MCCB Utama)',
      symbol: '415V 3-Fasa',
      desc: 'Pemutus litar kes perumah teracu bertaraf tinggi untuk mengawal dan melindungi litar kuasa utama 3-fasa daripada litar pintas dan beban berlebihan arus tinggi.'
    },
    'MCB': {
      title: 'Miniature Circuit Breaker (MCB Kawalan 6A)',
      symbol: '240V 1-Fasa',
      desc: 'Pemutus litar mini yang melindungi litar kawalan (Control Circuit) daripada arus lebihan pada talian fasa 240V.'
    },
    'A1A2': {
      title: 'Terminal Gegelung Contactor (Coil A1 - A2)',
      symbol: 'A1 / A2',
      desc: 'Terminal gegelung elektromagnetik pada sesentuh utama (contactor). Apabila dibekalkan voltan 240V AC, ia mewujudkan medan magnet yang menarik teras besi dan menggerakkan semua sesentuh utama & bantu.'
    },
    'Latching': {
      title: 'Latching Circuit (Sesentuh Bantu 13-14)',
      symbol: 'Aux NO 13-14',
      desc: 'Skim litar ingatan (memory circuit) selari dengan butang START. Membolehkan contactor terus kekal bertenaga walaupun butang START dilepaskan selepas ditekan.'
    }
  };

  const [logs, setLogs] = useState<string[]>([
    '> Litar sedia. Sila hidupkan MCCB & MCB Kawalan. Pelarasan masa-nyata diaktifkan.'
  ]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [...prev.slice(-30), `[${time}] ${msg}`]);
  };

  // Real-time simulation physics loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSimState((prev) => {
        const isRunning = prev.contactorEngaged && prev.mccb && prev.mcb && !prev.torTripped;
        let newHeat = prev.thermalHeat;

        if (isRunning) {
          // Calculate thermal accumulation
          const loadRatio = prev.motorCurrent / prev.torSetting;
          let heatDelta = 0;
          if (loadRatio > 1.0) {
            // Overloaded: heats up rapidly proportional to excess current
            heatDelta = (loadRatio - 1.0) * 8 + (prev.phaseLoss ? 15 : 0);
          } else {
            // Normal operating temperature stabilization
            heatDelta = (loadRatio * 2) - 3;
          }

          if (prev.earthFault) {
            heatDelta += 30;
          }

          newHeat = Math.max(0, Math.min(100, prev.thermalHeat + heatDelta));

          // Auto-trip on 100% heat
          if (newHeat >= 100 && !prev.torTripped) {
            if (soundEnabled) playTripAlarm();
            setTimeout(() => {
              addLog('AMARAN: Suhu geganti (TOR) mencapai 100% akibat beban lebih! Litar TRIP automatik.');
            }, 10);
            return {
              ...prev,
              thermalHeat: 100,
              torTripped: true,
              contactorEngaged: false
            };
          }
        } else {
          // Cooling down when stopped
          newHeat = Math.max(0, prev.thermalHeat - 4);
        }

        return {
          ...prev,
          thermalHeat: newHeat,
          ...(prev.phaseLoss && isRunning && newHeat > 80 ? { torTripped: true, contactorEngaged: false } : {})
        };
      });
    }, 300);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const handleToggleMCCB = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (soundEnabled) playButtonClick();
    setSimState((prev) => {
      const nextEngaged = checked ? prev.contactorEngaged : false;
      return { ...prev, mccb: checked, contactorEngaged: nextEngaged };
    });
    addLog(checked ? 'MCCB Utama 415V dihidupkan (ON).' : 'MCCB Utama dimatikan (OFF).');
  };

  const handleToggleMCB = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (soundEnabled) playButtonClick();
    setSimState((prev) => {
      const nextEngaged = checked ? prev.contactorEngaged : false;
      return { ...prev, mcb: checked, contactorEngaged: nextEngaged };
    });
    addLog(checked ? 'MCB Kawalan 6A (240V) dihidupkan (ON).' : 'MCB Kawalan dimatikan (OFF).');
  };

  const handlePressStart = () => {
    if (soundEnabled) playButtonClick();

    if (!simState.mccb || !simState.mcb) {
      addLog('Gagal: Bekalan Utama / MCB Kawalan belum dihidupkan!');
      return;
    }
    if (simState.torTripped) {
      addLog('Gagal: TOR dalam keadaan TRIP. Tekan butang RESET pada TOR dahulu!');
      return;
    }

    if (soundEnabled) playContactorClick(true);
    setSimState((prev) => ({ ...prev, contactorEngaged: true }));
    addLog('Butang START ditekan ➔ Coil A1 bertenaga ➔ Contactor Terikat (Latched) ➔ Motor Dihidupkan!');
  };

  const handlePressStop = () => {
    if (soundEnabled) playButtonClick();

    if (simState.contactorEngaged) {
      if (soundEnabled) playContactorClick(false);
      setSimState((prev) => ({ ...prev, contactorEngaged: false }));
      addLog('Butang STOP ditekan ➔ Litar terputus ➔ Contactor terlepas ➔ Motor Berhenti.');
    } else {
      addLog('Butang STOP ditekan.');
    }
  };

  const handleTriggerTOR = () => {
    if (soundEnabled) playTripAlarm();
    addLog('AMARAN: Ujian TOR Trip manual dicetuskan! Contactor Terputus.');
    setSimState((prev) => ({
      ...prev,
      torTripped: true,
      contactorEngaged: false,
      thermalHeat: 100
    }));
  };

  const handleResetTOR = () => {
    if (soundEnabled) playButtonClick();
    setSimState((prev) => ({ ...prev, torTripped: false, thermalHeat: 15 }));
    addLog('Butang RESET TOR ditekan. Contact TOR 95-96 kembali Normal NC.');
  };

  const handleResetSim = () => {
    if (soundEnabled) playButtonClick();
    setSimState({ 
      mccb: false, 
      mcb: false, 
      torTripped: false, 
      contactorEngaged: false,
      motorCurrent: 4.2,
      torSetting: 5.0,
      supplyVoltage: 415,
      phaseLoss: false,
      earthFault: false,
      thermalHeat: 0
    });
    setLogs(['> Litar di-reset sepenuhnya.']);
  };

  const handleCurrentChange = (val: number) => {
    setSimState(prev => ({ ...prev, motorCurrent: val }));
  };

  const handleTorSettingChange = (val: number) => {
    setSimState(prev => ({ ...prev, torSetting: val }));
  };

  const handleVoltageChange = (val: number) => {
    setSimState(prev => ({ ...prev, supplyVoltage: val }));
  };

  const handleTogglePhaseLoss = () => {
    setSimState(prev => {
      const next = !prev.phaseLoss;
      addLog(next ? 'INFO: Simulasi Kehilangan Fasa (Phase Loss) DIHIDUPKAN.' : 'INFO: Kehilangan Fasa dinyahaktifkan.');
      return { ...prev, phaseLoss: next };
    });
  };

  const handleToggleEarthFault = () => {
    setSimState(prev => {
      const next = !prev.earthFault;
      addLog(next ? 'INFO: Simulasi Kerosakan Bumi (Earth Fault) DIHIDUPKAN.' : 'INFO: Kerosakan Bumi dinyahaktifkan.');
      if (next && prev.contactorEngaged) {
        setTimeout(() => {
          if (soundEnabled) playTripAlarm();
          addLog('KECEMASAN: Kerosakan Bumi dikesan! MCCB Trip serta-merta.');
        }, 100);
        return { ...prev, earthFault: next, mccb: false, contactorEngaged: false, torTripped: true };
      }
      return { ...prev, earthFault: next };
    });
  };

  // State calculations
  const hasMainPower = simState.mccb;
  const hasControlPower = simState.mccb && simState.mcb;
  const isRunning = simState.contactorEngaged && hasMainPower && !simState.torTripped;
  const effectiveVoltage = isRunning ? Math.round(simState.supplyVoltage * (simState.phaseLoss ? 0.65 : 1)) : (hasMainPower ? simState.supplyVoltage : 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Console Panel */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-indigo-600" />
                Konsol Kawalan & Parameter Masa-Nyata
              </h3>
              <button
                onClick={handleResetSim}
                className="text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset</span>
              </button>
            </div>

            {/* Popup Glossary Quick Bar */}
            <div className="bg-indigo-50/80 p-3 rounded-xl border border-indigo-100 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-600" />
                  Kamus Simbol & Komponen (Klik untuk info):
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(glossaryDictionary).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveGlossaryTerm(glossaryDictionary[key])}
                    className="px-2 py-1 text-[11px] font-bold font-mono bg-white text-indigo-700 border border-indigo-200 rounded-md hover:bg-indigo-600 hover:text-white transition shadow-2xs cursor-pointer"
                  >
                    {key}
                  </button>
                ))}
              </div>

              {activeGlossaryTerm && (
                <div className="mt-3 bg-white p-3 rounded-lg border border-indigo-200 text-xs relative animate-fade-in">
                  <button
                    onClick={() => setActiveGlossaryTerm(null)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-700 font-bold text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                  <span className="font-bold text-indigo-900 block mb-0.5">{activeGlossaryTerm.title}</span>
                  <span className="text-indigo-700 font-mono text-[10px] block mb-1">Simbol / Rujukan: {activeGlossaryTerm.symbol}</span>
                  <p className="text-slate-600 leading-relaxed">{activeGlossaryTerm.desc}</p>
                </div>
              )}
            </div>

            {/* Switches */}
            <div className="space-y-3 mb-5">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">MCCB Utama (415V)</span>
                  <span className="text-xs text-slate-500">Bekalan Kuasa Utama</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simState.mccb}
                    onChange={handleToggleMCCB}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">MCB Kawalan 6A (240V)</span>
                  <span className="text-xs text-slate-500">Suis Litar Kawalan</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simState.mcb}
                    onChange={handleToggleMCB}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>

            {/* Push Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                onClick={handlePressStart}
                className="relative group bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-xl shadow-xs border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition text-center cursor-pointer"
              >
                <div className="text-xl mb-1 flex justify-center">
                  <Play className="w-5 h-5 fill-white" />
                </div>
                <span className="text-xs block tracking-wider uppercase">START (Hijau)</span>
                <span className="text-[10px] text-emerald-100 block font-normal">Push-NO</span>
              </button>

              <button
                onClick={handlePressStop}
                className="relative group bg-red-600 hover:bg-red-700 text-white font-bold p-3 rounded-xl shadow-xs border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition text-center cursor-pointer"
              >
                <div className="text-xl mb-1 flex justify-center">
                  <Square className="w-5 h-5 fill-white" />
                </div>
                <span className="text-xs block tracking-wider uppercase">STOP (Merah)</span>
                <span className="text-[10px] text-red-100 block font-normal">Push-NC</span>
              </button>
            </div>

            {/* Live Sliders for Dynamic Parameters */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3 mb-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5"><Sliders className="w-3.5 h-3.5 text-indigo-600" /> Pelarasan Arus Motor (Load Current):</span>
                <span className="font-mono text-indigo-700">{simState.motorCurrent.toFixed(1)} A</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="9.0"
                step="0.1"
                value={simState.motorCurrent}
                onChange={(e) => handleCurrentChange(parseFloat(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1.0A (Ringan)</span>
                <span>4.2A (Normal)</span>
                <span>9.0A (Lebihan Beza)</span>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                  <span>Setting TOR Dial (Arus Lampau):</span>
                  <span className="font-mono text-amber-700">{simState.torSetting.toFixed(1)} A</span>
                </div>
                <input
                  type="range"
                  min="2.5"
                  max="7.5"
                  step="0.1"
                  value={simState.torSetting}
                  onChange={(e) => handleTorSettingChange(parseFloat(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                  <span>Voltan Bekalan Utama (415V):</span>
                  <span className="font-mono text-sky-700">{simState.supplyVoltage} V</span>
                </div>
                <input
                  type="range"
                  min="360"
                  max="460"
                  step="5"
                  value={simState.supplyVoltage}
                  onChange={(e) => handleVoltageChange(parseInt(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Fault Simulation Toggles */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={handleTogglePhaseLoss}
                className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition flex items-center justify-center gap-1 cursor-pointer ${
                  simState.phaseLoss
                    ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Phase Loss {simState.phaseLoss ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={handleToggleEarthFault}
                className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition flex items-center justify-center gap-1 cursor-pointer ${
                  simState.earthFault
                    ? 'bg-red-600 text-white border-red-700 shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Earth Fault {simState.earthFault ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            {/* TOR Overload Manual Controls */}
            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 flex gap-2">
              <button
                onClick={handleTriggerTOR}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Test Trip TOR</span>
              </button>
              <button
                onClick={handleResetTOR}
                className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-bold py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Reset TOR</span>
              </button>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="mt-5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-slate-500 block">Log Aktiviti Litar Masa-Nyata:</span>
              <button
                onClick={() => setLogs(['> Log dibersihkan.'])}
                className="text-[10px] text-slate-400 hover:text-slate-600 font-medium"
              >
                Bersihkan
              </button>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 h-24 overflow-y-auto font-mono text-[11px] text-slate-300 space-y-1">
              {logs.map((log, idx) => (
                <div key={idx} className={log.includes('AMARAN') || log.includes('KECEMASAN') ? 'text-amber-400 font-bold' : ''}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Status Response Panel */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-indigo-600" />
              Status Litar, Telemetri & Tindak Balas Visual Masa-Nyata
            </h3>

            {/* Pilot Lamps */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {/* H1 Red OFF Lamp */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    hasControlPower && !simState.torTripped && !simState.contactorEngaged
                      ? 'border-red-500 bg-red-600 text-white shadow-md shadow-red-500/30'
                      : 'border-slate-300 bg-slate-200 text-slate-400'
                  }`}
                >
                  <Power className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold mt-2 text-slate-800">H1 (OFF)</span>
                <span className="text-[10px] text-slate-500">Merah - 240V</span>
              </div>

              {/* H2 Green RUN Lamp */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    hasControlPower && !simState.torTripped && simState.contactorEngaged
                      ? 'border-emerald-500 bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
                      : 'border-slate-300 bg-slate-200 text-slate-400'
                  }`}
                >
                  <PlayCircle className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold mt-2 text-slate-800">H2 (RUN)</span>
                <span className="text-[10px] text-slate-500">Hijau - 240V</span>
              </div>

              {/* H3 Yellow TRIP Lamp */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    hasControlPower && simState.torTripped
                      ? 'border-amber-500 bg-amber-500 text-white shadow-md shadow-amber-500/30 animate-pulse'
                      : 'border-slate-300 bg-slate-200 text-slate-400'
                  }`}
                >
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold mt-2 text-slate-800">H3 (TRIP)</span>
                <span className="text-[10px] text-slate-500">Kuning - 240V</span>
              </div>
            </div>

            {/* Component State Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Contactor Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center relative overflow-hidden">
                <span className="text-xs text-slate-500 font-bold block mb-2">SESENTUH UTAMA (LS CONTACTOR)</span>
                <div
                  className={`p-3 rounded-lg border font-bold text-sm transition-all duration-300 ${
                    simState.contactorEngaged && hasControlPower && !simState.torTripped
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  <Activity className="w-5 h-5 mx-auto mb-1 text-indigo-600" />
                  <span>
                    {simState.contactorEngaged && hasControlPower && !simState.torTripped
                      ? "A1-A2 Bertenaga / Tertarik ('TAKK!')"
                      : 'A1-A2 Terputus / Terlepas'}
                  </span>
                </div>
                {simState.contactorEngaged && hasControlPower && !simState.torTripped && (
                  <div className="mt-2 inline-block bg-indigo-100 text-indigo-800 border border-indigo-200 text-[10px] px-2.5 py-0.5 rounded-full font-semibold">
                    Latching (13-14 Active)
                  </div>
                )}
              </div>

              {/* Motor Card */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 font-bold block mb-2">MOTOR ARUHAN 3-FASA</span>
                <div className="flex items-center justify-center space-x-3">
                  <div
                    className={`w-14 h-14 rounded-full border-4 flex items-center justify-center transition-all ${
                      isRunning
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-600 animate-spin shadow-md shadow-emerald-500/25'
                        : 'border-slate-300 bg-white text-slate-400'
                    }`}
                  >
                    <Fan className="w-7 h-7" />
                  </div>
                  <div className="text-left">
                    <div className={`text-xs font-bold ${isRunning ? 'text-emerald-700' : 'text-slate-600'}`}>
                      {isRunning ? 'BEROPERASI (RUN)' : 'BERHENTI'}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      {isRunning ? `${(1450 * (simState.supplyVoltage / 415)).toFixed(0)} RPM / ${simState.motorCurrent.toFixed(1)} A` : '0 RPM / 0.0 A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thermal Overload Heat Accumulation Gauge */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Thermometer className={`w-4 h-4 ${simState.thermalHeat > 75 ? 'text-red-600 animate-bounce' : 'text-amber-600'}`} />
                  Suhu Terma Geganti (TOR Thermal Accumulator):
                </span>
                <span className={`font-mono font-bold ${simState.thermalHeat > 80 ? 'text-red-600' : simState.thermalHeat > 50 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {simState.thermalHeat.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    simState.thermalHeat > 80 ? 'bg-red-600' : simState.thermalHeat > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${simState.thermalHeat}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Normal (Suhu Bilik)</span>
                <span>Amaran Thermal (&gt;80%)</span>
                <span>Trip Batas (100%)</span>
              </div>
            </div>

            {/* Detailed Circuit Status */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-indigo-400 block uppercase tracking-wider">
                Status Terperinci & Telemetri Litar Masa-Nyata:
              </span>
              <div className="flex justify-between text-slate-300">
                <span>Voltan Utama Efektif:</span>
                <span className={`font-bold ${hasMainPower ? 'text-emerald-400' : 'text-red-400'}`}>
                  {effectiveVoltage}V AC {simState.phaseLoss ? '(Kehilangan Fasa L3)' : ''}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Arus Beban Semasa:</span>
                <span className={`font-bold ${simState.motorCurrent > simState.torSetting ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>
                  {simState.motorCurrent.toFixed(1)} A (Setting TOR: {simState.torSetting.toFixed(1)}A)
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Geganti Beban Lebih (TOR LS):</span>
                <span className={`font-bold ${simState.torTripped ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {simState.torTripped ? 'TRIPPED (97-98 Closed)' : 'Normal (95-96 Closed)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
