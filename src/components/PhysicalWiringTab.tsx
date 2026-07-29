import React, { useState } from 'react';
import { WireFilter, WireDetail } from '../types';
import { fullWireDictionary } from '../data/wiringData';
import { Network, Info, CheckCircle2, CheckSquare, Square } from 'lucide-react';

export const PhysicalWiringTab: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<WireFilter>('all');
  const [selectedWireKey, setSelectedWireKey] = useState<string>('003');
  const [wiringSteps, setWiringSteps] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: false,
    5: false,
    6: false
  });

  const toggleWiringStep = (stepId: number) => {
    setWiringSteps(prev => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const stepsList = [
    { id: 1, title: 'Fasa Kuasa Utama (MCCB ke Contactor 1/L1, 3/L2, 5/L3)' },
    { id: 2, title: 'Penyambungan Fasa TOR (Contactor 2/T1, 4/T2, 6/T3 ke TOR)' },
    { id: 3, title: 'Pendawaian Keluar TOR ke Blok Terminal Motor (U1, V1, W1)' },
    { id: 4, title: 'Litar Kawalan 240V (MCB 6A ke TOR 95 NC & 97 NO)' },
    { id: 5, title: 'Butang Tekan & Latching (PB STOP, START & Aux 13-14)' },
    { id: 6, title: 'Lampu Penunjuk H1, H2, H3 & Sambungan Neutral [N]' }
  ];

  const completedStepsCount = Object.values(wiringSteps).filter(Boolean).length;
  const wiringProgressPercent = Math.round((completedStepsCount / stepsList.length) * 100);

  const wireData: WireDetail = fullWireDictionary[selectedWireKey] || fullWireDictionary['003'];

  // Opacity styles based on filter
  const getGroupOpacity = (groupType: 'power' | 'control' | 'earth') => {
    if (activeFilter === 'all') return 1;
    return activeFilter === groupType ? 1 : 0.15;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        {/* Toolbar Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Network className="w-6 h-6 text-indigo-600" />
              Rajah Pendawaian Fizikal Panel DOL Lengkap
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Visual penyambungan kabel dari komponen ke komponen berserta <b>tag ferrule</b> dan kod warna kabel sebenar.
            </p>
          </div>

          {/* Wire Layer Filters */}
          <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Semua Talian
            </button>
            <button
              onClick={() => setActiveFilter('power')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeFilter === 'power'
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Litar Kuasa (415V)
            </button>
            <button
              onClick={() => setActiveFilter('control')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeFilter === 'control'
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Litar Kawalan (240V)
            </button>
            <button
              onClick={() => setActiveFilter('earth')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                activeFilter === 'earth'
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              Pembumian (E)
            </button>
          </div>
        </div>

        {/* Visual Progress Bar & Wiring Steps Checklist */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-900 block uppercase tracking-wide">
                Progress Pemasangan Pendawaian Fizikal Panel
              </span>
              <span className="text-[11px] text-slate-500">
                Tandakan langkah pendawaian yang telah selesai dilaksanakan pada panel fizikal.
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>{completedStepsCount} / {stepsList.length} Selesai ({wiringProgressPercent}%)</span>
            </div>
          </div>

          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${wiringProgressPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
            {stepsList.map((step) => {
              const isChecked = !!wiringSteps[step.id];
              return (
                <div
                  key={step.id}
                  onClick={() => toggleWiringStep(step.id)}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition select-none ${
                    isChecked
                      ? 'bg-indigo-50/70 border-indigo-200 text-slate-900 font-medium'
                      : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-indigo-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className="line-clamp-1">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* SVG Canvas Panel */}
          <div className="lg:col-span-8 bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center overflow-x-auto">
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-400 mb-2 px-1 gap-1">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Hover / Klik pada mana-mana laluan kabel untuk highlight & memperolehi perincian:</span>
              </span>
              <span className="text-slate-500 text-[10px]">Piawaian Kod Warna: Merah/Kuning/Biru (415V), Merah (Kawalan 240V), Biru (Neutral), Hijau/Kuning (Bumi)</span>
            </div>

            {/* Full Wiring SVG */}
            <svg viewBox="0 0 920 720" className="w-full max-w-4xl h-auto font-sans text-xs select-none">
              <defs>
                <pattern id="panelGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="920" height="720" rx="12" fill="#090d16"/>
              <rect width="920" height="720" rx="12" fill="url(#panelGrid)"/>

              {/* ================= PANEL COMPONENTS OUTLINES ================= */}

              {/* 1. MCCB Utama 3P */}
              <g id="comp-mccb">
                <rect x="50" y="60" width="120" height="130" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
                <rect x="65" y="105" width="90" height="40" rx="4" fill="#0f172a"/>
                <rect x="95" y="115" width="30" height="20" rx="2" fill="#dc2626"/>
                <text x="110" y="80" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">MCCB UTAMA</text>
                <text x="110" y="93" fill="#cbd5e1" fontSize="9" textAnchor="middle">3-Fasa (415V)</text>
                {/* Terminals */}
                <circle cx="70" cy="60" r="5" fill="#ef4444"/>
                <circle cx="110" cy="60" r="5" fill="#eab308"/>
                <circle cx="150" cy="60" r="5" fill="#3b82f6"/>
                <circle cx="70" cy="190" r="5" fill="#ef4444"/>
                <circle cx="110" cy="190" r="5" fill="#eab308"/>
                <circle cx="150" cy="190" r="5" fill="#3b82f6"/>
              </g>

              {/* 2. MCB Kawalan 6A */}
              <g id="comp-mcb">
                <rect x="220" y="60" width="50" height="100" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
                <rect x="232" y="95" width="26" height="30" rx="3" fill="#0f172a"/>
                <rect x="238" y="102" width="14" height="16" rx="2" fill="#22c55e"/>
                <text x="245" y="76" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">MCB 6A</text>
                <text x="245" y="87" fill="#cbd5e1" fontSize="8" textAnchor="middle">Kawalan</text>
                <circle cx="245" cy="60" r="4" fill="#ef4444"/>
                <circle cx="245" cy="160" r="4" fill="#ef4444"/>
              </g>

              {/* 3. Pilot Lamps Box (Top Right) */}
              <g id="comp-lamps">
                <rect x="580" y="50" width="290" height="100" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
                <text x="725" y="72" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">PANEL LAMPU PENUNJUK</text>

                {/* H1 Red (OFF) */}
                <circle cx="630" cy="105" r="18" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2"/>
                <text x="630" y="110" fill="#ffffff" fontWeight="bold" textAnchor="middle" fontSize="10">H1</text>
                <text x="630" y="135" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">OFF (Merah)</text>
                <circle cx="620" cy="90" r="3" fill="#ef4444"/>
                <circle cx="640" cy="90" r="3" fill="#38bdf8"/>

                {/* H2 Green (RUN) */}
                <circle cx="725" cy="105" r="18" fill="#14532d" stroke="#22c55e" strokeWidth="2"/>
                <text x="725" y="110" fill="#ffffff" fontWeight="bold" textAnchor="middle" fontSize="10">H2</text>
                <text x="725" y="135" fill="#22c55e" fontSize="9" fontWeight="bold" textAnchor="middle">RUN (Hijau)</text>
                <circle cx="715" cy="90" r="3" fill="#22c55e"/>
                <circle cx="735" cy="90" r="3" fill="#38bdf8"/>

                {/* H3 Yellow (TRIP) */}
                <circle cx="820" cy="105" r="18" fill="#713f12" stroke="#eab308" strokeWidth="2"/>
                <text x="820" y="110" fill="#ffffff" fontWeight="bold" textAnchor="middle" fontSize="10">H3</text>
                <text x="820" y="135" fill="#eab308" fontSize="9" fontWeight="bold" textAnchor="middle">TRIP (Kuning)</text>
                <circle cx="810" cy="90" r="3" fill="#eab308"/>
                <circle cx="830" cy="90" r="3" fill="#38bdf8"/>
              </g>

              {/* 4. Contactor & TOR LS Assembly (Center) */}
              <g id="comp-contactor-tor">
                {/* Contactor Body */}
                <rect x="310" y="160" width="200" height="150" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
                <rect x="380" y="170" width="60" height="16" rx="3" fill="#dc2626"/>
                <text x="410" y="182" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">LS CONTACTOR</text>

                {/* Contactor Top Terminals */}
                <circle cx="330" cy="160" r="4" fill="#ef4444"/><text x="330" y="152" fill="#f87171" fontSize="8" textAnchor="middle">1/L1</text>
                <circle cx="360" cy="160" r="4" fill="#eab308"/><text x="360" y="152" fill="#facc15" fontSize="8" textAnchor="middle">3/L2</text>
                <circle cx="390" cy="160" r="4" fill="#3b82f6"/><text x="390" y="152" fill="#60a5fa" fontSize="8" textAnchor="middle">5/L3</text>
                <circle cx="430" cy="160" r="4" fill="#818cf8"/><text x="430" y="152" fill="#a5b4fc" fontSize="8" textAnchor="middle">13 NO</text>
                <circle cx="470" cy="160" r="4" fill="#ef4444"/><text x="470" y="152" fill="#f87171" fontSize="8" textAnchor="middle">21 NC</text>
                <circle cx="320" cy="200" r="4" fill="#10b981"/><text x="308" y="203" fill="#34d399" fontSize="8" textAnchor="end">A1</text>

                {/* Contactor Bottom Terminals */}
                <circle cx="330" cy="310" r="4" fill="#cbd5e1"/>
                <circle cx="360" cy="310" r="4" fill="#cbd5e1"/>
                <circle cx="390" cy="310" r="4" fill="#cbd5e1"/>
                <circle cx="430" cy="310" r="4" fill="#10b981"/><text x="430" y="322" fill="#a7f3d0" fontSize="8" textAnchor="middle">14 NO</text>
                <circle cx="470" cy="310" r="4" fill="#ef4444"/><text x="470" y="322" fill="#f87171" fontSize="8" textAnchor="middle">22 NC</text>
                <circle cx="500" cy="200" r="4" fill="#38bdf8"/><text x="512" y="203" fill="#7dd3fc" fontSize="8" textAnchor="start">A2</text>

                {/* TOR Body */}
                <rect x="310" y="330" width="200" height="140" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2"/>
                <rect x="325" y="340" width="60" height="14" rx="2" fill="#dc2626"/>
                <text x="355" y="351" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">LS TOR MT-32</text>

                {/* TOR Terminals */}
                <circle cx="430" cy="360" r="4" fill="#f59e0b"/><text x="430" y="352" fill="#fbbf24" fontSize="8" textAnchor="middle">95 NC</text>
                <circle cx="470" cy="360" r="4" fill="#ef4444"/><text x="470" y="352" fill="#f87171" fontSize="8" textAnchor="middle">96 NC</text>
                <circle cx="430" cy="400" r="4" fill="#f59e0b"/><text x="430" y="413" fill="#fbbf24" fontSize="8" textAnchor="middle">97 NO</text>
                <circle cx="470" cy="400" r="4" fill="#eab308"/><text x="470" y="413" fill="#facc15" fontSize="8" textAnchor="middle">98 NO</text>

                {/* TOR Power Out to Motor */}
                <circle cx="330" cy="470" r="4" fill="#ef4444"/><text x="330" y="483" fill="#f87171" fontSize="8" textAnchor="middle">2/T1</text>
                <circle cx="360" cy="470" r="4" fill="#eab308"/><text x="360" y="483" fill="#facc15" fontSize="8" textAnchor="middle">4/T2</text>
                <circle cx="390" cy="470" r="4" fill="#3b82f6"/><text x="390" y="483" fill="#60a5fa" fontSize="8" textAnchor="middle">6/T3</text>
              </g>

              {/* 5. Push Button Station Box (Middle Right) */}
              <g id="comp-pushbuttons">
                <rect x="620" y="220" width="180" height="180" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
                <text x="710" y="240" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">STESEN BUTANG TEKAN</text>

                {/* STOP PB (NC) Red */}
                <circle cx="670" cy="280" r="16" fill="#dc2626" stroke="#f87171" strokeWidth="2"/>
                <text x="670" y="284" fill="#ffffff" fontWeight="bold" fontSize="9" textAnchor="middle">STOP</text>
                <text x="670" y="308" fill="#f87171" fontSize="8" textAnchor="middle">Merah (NC)</text>
                <circle cx="655" cy="280" r="3" fill="#ef4444"/>
                <circle cx="685" cy="280" r="3" fill="#ef4444"/>

                {/* START PB (NO) Green */}
                <circle cx="750" cy="340" r="16" fill="#16a34a" stroke="#4ade80" strokeWidth="2"/>
                <text x="750" y="344" fill="#ffffff" fontWeight="bold" fontSize="9" textAnchor="middle">START</text>
                <text x="750" y="368" fill="#4ade80" fontSize="8" textAnchor="middle">Hijau (NO)</text>
                <circle cx="735" cy="340" r="3" fill="#818cf8"/>
                <circle cx="765" cy="340" r="3" fill="#10b981"/>
              </g>

              {/* 6. Neutral Bar & Earth Bar (Bottom Left) */}
              <g id="comp-bars">
                {/* Neutral Bar */}
                <rect x="50" y="520" width="130" height="25" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5"/>
                <text x="115" y="536" fill="#ffffff" fontWeight="bold" fontSize="9" textAnchor="middle">PALANG NEUTRAL [N]</text>

                {/* Earth Bar */}
                <rect x="50" y="580" width="130" height="25" rx="4" fill="#15803d" stroke="#4ade80" strokeWidth="1.5"/>
                <text x="115" y="596" fill="#ffffff" fontWeight="bold" fontSize="9" textAnchor="middle">PALANG BUMI [E]</text>
              </g>

              {/* 7. Motor 3-Phase (Bottom Center) */}
              <g id="comp-motor">
                <circle cx="390" cy="610" r="50" fill="#1e293b" stroke="#38bdf8" strokeWidth="3"/>
                <circle cx="390" cy="610" r="35" fill="#0f172a" stroke="#64748b"/>
                <text x="390" y="605" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">MOTOR</text>
                <text x="390" y="620" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">3-FASA</text>

                {/* Motor Terminals U1, V1, W1, Earth */}
                <circle cx="360" cy="565" r="4" fill="#ef4444"/><text x="360" y="555" fill="#f87171" fontSize="8" textAnchor="middle">U1</text>
                <circle cx="390" cy="565" r="4" fill="#eab308"/><text x="390" y="555" fill="#facc15" fontSize="8" textAnchor="middle">V1</text>
                <circle cx="420" cy="565" r="4" fill="#3b82f6"/><text x="420" y="555" fill="#60a5fa" fontSize="8" textAnchor="middle">W1</text>
                <circle cx="440" cy="610" r="4" fill="#22c55e"/><text x="455" y="613" fill="#4ade80" fontSize="8" textAnchor="start">E</text>
              </g>

              {/* ================= WIRE PATHS WITH FERRULES ================= */}

              {/* LAYER 1: LITAR KUASA (POWER 415V) */}
              <g id="wire-group-power" style={{ opacity: getGroupOpacity('power') }}>
                {/* Supply Line 1 [L1] Red */}
                <path
                  onClick={() => setSelectedWireKey('L1')}
                  d="M 20 20 L 70 20 L 70 60"
                  stroke="#ef4444"
                  strokeWidth={selectedWireKey === 'L1' ? "5" : "3"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[5px]"
                />
                <path
                  onClick={() => setSelectedWireKey('L1')}
                  d="M 70 190 L 70 230 L 290 230 L 290 120 L 330 120 L 330 160"
                  stroke="#ef4444"
                  strokeWidth={selectedWireKey === 'L1' ? "5" : "3.5"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[5px]"
                />
                <g onClick={() => setSelectedWireKey('L1')} className="cursor-pointer">
                  <rect x="180" y="222" width="28" height="15" rx="3" fill="#ef4444"/>
                  <text x="194" y="233" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">[L1]</text>
                </g>

                {/* Supply Line 2 [L2] Yellow */}
                <path
                  onClick={() => setSelectedWireKey('L2')}
                  d="M 20 32 L 110 32 L 110 60"
                  stroke="#eab308"
                  strokeWidth={selectedWireKey === 'L2' ? "5" : "3"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[5px]"
                />
                <path
                  onClick={() => setSelectedWireKey('L2')}
                  d="M 110 190 L 110 240 L 280 240 L 280 110 L 360 110 L 360 160"
                  stroke="#eab308"
                  strokeWidth={selectedWireKey === 'L2' ? "5" : "3.5"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[5px]"
                />
                <g onClick={() => setSelectedWireKey('L2')} className="cursor-pointer">
                  <rect x="180" y="232" width="28" height="15" rx="3" fill="#eab308"/>
                  <text x="194" y="243" fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle">[L2]</text>
                </g>

                {/* Supply Line 3 [L3] Blue */}
                <path
                  onClick={() => setSelectedWireKey('L3')}
                  d="M 20 44 L 150 44 L 150 60"
                  stroke="#3b82f6"
                  strokeWidth={selectedWireKey === 'L3' ? "5" : "3"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[5px]"
                />
                <path
                  onClick={() => setSelectedWireKey('L3')}
                  d="M 150 190 L 150 250 L 270 250 L 270 100 L 390 100 L 390 160"
                  stroke="#3b82f6"
                  strokeWidth={selectedWireKey === 'L3' ? "5" : "3.5"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[5px]"
                />
                <g onClick={() => setSelectedWireKey('L3')} className="cursor-pointer">
                  <rect x="180" y="242" width="28" height="15" rx="3" fill="#3b82f6"/>
                  <text x="194" y="253" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">[L3]</text>
                </g>

                {/* TOR Out 2/T1, 4/T2, 6/T3 -> Motor U1, V1, W1 */}
                <path
                  onClick={() => setSelectedWireKey('U1')}
                  d="M 330 470 L 330 510 L 360 510 L 360 565"
                  stroke="#ef4444"
                  strokeWidth={selectedWireKey === 'U1' ? "5" : "3.5"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[5px]"
                />
                <g onClick={() => setSelectedWireKey('U1')} className="cursor-pointer">
                  <rect x="335" y="490" width="22" height="14" rx="2" fill="#ef4444"/>
                  <text x="346" y="500" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">U1</text>
                </g>

                <path
                  onClick={() => setSelectedWireKey('V1')}
                  d="M 360 470 L 360 520 L 390 520 L 390 565"
                  stroke="#eab308"
                  strokeWidth={selectedWireKey === 'V1' ? "5" : "3.5"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[5px]"
                />
                <g onClick={() => setSelectedWireKey('V1')} className="cursor-pointer">
                  <rect x="365" y="490" width="22" height="14" rx="2" fill="#eab308"/>
                  <text x="376" y="500" fill="#000000" fontSize="7" fontWeight="bold" textAnchor="middle">V1</text>
                </g>

                <path
                  onClick={() => setSelectedWireKey('W1')}
                  d="M 390 470 L 390 530 L 420 530 L 420 565"
                  stroke="#3b82f6"
                  strokeWidth={selectedWireKey === 'W1' ? "5" : "3.5"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[5px]"
                />
                <g onClick={() => setSelectedWireKey('W1')} className="cursor-pointer">
                  <rect x="395" y="490" width="22" height="14" rx="2" fill="#3b82f6"/>
                  <text x="406" y="500" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">W1</text>
                </g>
              </g>

              {/* LAYER 2: LITAR KAWALAN (CONTROL 240V) */}
              <g id="wire-group-control" style={{ opacity: getGroupOpacity('control') }}>
                {/* Tap-Off L1 In to MCB In [003 In] */}
                <path
                  onClick={() => setSelectedWireKey('003')}
                  d="M 70 20 L 70 12 L 245 12 L 245 60"
                  stroke="#f59e0b"
                  strokeWidth={selectedWireKey === '003' ? "4" : "2"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[4px]"
                />

                {/* MCB Out -> TOR 95 NC [003] */}
                <path
                  onClick={() => setSelectedWireKey('003')}
                  d="M 245 160 L 245 370 L 420 370 L 420 360 C 420 360, 430 360, 430 360"
                  stroke="#f59e0b"
                  strokeWidth={selectedWireKey === '003' ? "4" : "2.5"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[4px]"
                />
                <g onClick={() => setSelectedWireKey('003')} className="cursor-pointer">
                  <rect x="255" y="358" width="28" height="15" rx="3" fill="#f59e0b"/>
                  <text x="269" y="369" fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle">[003]</text>
                </g>

                {/* TOR 95 NC Loop to TOR 97 NO [003 Loop] */}
                <path
                  onClick={() => setSelectedWireKey('003')}
                  d="M 430 360 L 415 360 L 415 400 L 430 400"
                  stroke="#f59e0b"
                  strokeWidth={selectedWireKey === '003' ? "4" : "2"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[4px]"
                />

                {/* TOR 96 NC -> PB STOP In [104] */}
                <path
                  onClick={() => setSelectedWireKey('104')}
                  d="M 470 360 L 550 360 L 550 280 L 655 280"
                  stroke="#ef4444"
                  strokeWidth={selectedWireKey === '104' ? "4" : "2.5"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[4px]"
                />
                <g onClick={() => setSelectedWireKey('104')} className="cursor-pointer">
                  <rect x="560" y="320" width="28" height="15" rx="3" fill="#ef4444"/>
                  <text x="574" y="331" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">[104]</text>
                </g>

                {/* Branch TOR 96 / PB STOP In -> Contactor Aux 21 NC [104] */}
                <path
                  onClick={() => setSelectedWireKey('104')}
                  d="M 550 280 L 550 140 L 470 140 L 470 160"
                  stroke="#ef4444"
                  strokeWidth={selectedWireKey === '104' ? "4" : "2"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[4px]"
                />

                {/* Contactor Aux 22 NC -> Lamp H1 OFF Input [104 Lamp H1] */}
                <path
                  onClick={() => setSelectedWireKey('104')}
                  d="M 470 310 L 470 320 L 520 320 L 520 25 L 620 25 L 620 90"
                  stroke="#ef4444"
                  strokeWidth={selectedWireKey === '104' ? "4" : "2"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[4px]"
                />
                <g onClick={() => setSelectedWireKey('104')} className="cursor-pointer">
                  <rect x="530" y="20" width="36" height="15" rx="3" fill="#ef4444"/>
                  <text x="548" y="31" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">[104-H1]</text>
                </g>

                {/* PB STOP Out -> PB START In [105] */}
                <path
                  onClick={() => setSelectedWireKey('105')}
                  d="M 685 280 L 710 280 L 710 340 L 735 340"
                  stroke="#818cf8"
                  strokeWidth={selectedWireKey === '105' ? "4" : "2.5"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[4px]"
                />
                <g onClick={() => setSelectedWireKey('105')} className="cursor-pointer">
                  <rect x="690" y="295" width="28" height="15" rx="3" fill="#818cf8"/>
                  <text x="704" y="306" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">[105]</text>
                </g>

                {/* Branch PB STOP Out -> Contactor Aux 13 NO [105 Bypass] */}
                <path
                  onClick={() => setSelectedWireKey('105')}
                  d="M 710 280 L 710 130 L 430 130 L 430 160"
                  stroke="#818cf8"
                  strokeWidth={selectedWireKey === '105' ? "4" : "2"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[4px]"
                />

                {/* PB START Out -> Contactor Coil A1 & Lamp H2 RUN [106] */}
                <path
                  onClick={() => setSelectedWireKey('106')}
                  d="M 765 340 L 790 340 L 790 440 L 300 440 L 300 200 L 320 200"
                  stroke="#10b981"
                  strokeWidth={selectedWireKey === '106' ? "4" : "2.5"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[4px]"
                />
                <g onClick={() => setSelectedWireKey('106')} className="cursor-pointer">
                  <rect x="650" y="432" width="28" height="15" rx="3" fill="#10b981"/>
                  <text x="664" y="443" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">[106]</text>
                </g>

                {/* Contactor Aux 14 NO -> Contactor Coil A1 [106 Latching] */}
                <path
                  onClick={() => setSelectedWireKey('106')}
                  d="M 430 310 L 430 420 L 310 420 L 310 200 L 320 200"
                  stroke="#10b981"
                  strokeWidth={selectedWireKey === '106' ? "4" : "2"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[4px]"
                />

                {/* Branch Coil A1 -> Lamp H2 RUN Input [106 Lamp H2] */}
                <path
                  onClick={() => setSelectedWireKey('106')}
                  d="M 300 200 L 300 15 L 715 15 L 715 90"
                  stroke="#10b981"
                  strokeWidth={selectedWireKey === '106' ? "4" : "2"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[4px]"
                />
                <g onClick={() => setSelectedWireKey('106')} className="cursor-pointer">
                  <rect x="630" y="10" width="36" height="15" rx="3" fill="#10b981"/>
                  <text x="648" y="21" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">[106-H2]</text>
                </g>

                {/* TOR 98 NO -> Lamp H3 TRIP Input [108 Lamp H3] */}
                <path
                  onClick={() => setSelectedWireKey('108')}
                  d="M 470 400 L 810 400 L 810 90"
                  stroke="#eab308"
                  strokeWidth={selectedWireKey === '108' ? "4" : "2.5"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[4px]"
                />
                <g onClick={() => setSelectedWireKey('108')} className="cursor-pointer">
                  <rect x="520" y="392" width="28" height="15" rx="3" fill="#eab308"/>
                  <text x="534" y="403" fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle">[108]</text>
                </g>

                {/* Neutral Line [N] Blue */}
                <path
                  onClick={() => setSelectedWireKey('N')}
                  d="M 180 532 L 500 532 L 500 200"
                  stroke="#38bdf8"
                  strokeWidth={selectedWireKey === 'N' ? "4" : "2.5"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[4px]"
                />
                <g onClick={() => setSelectedWireKey('N')} className="cursor-pointer">
                  <rect x="200" y="524" width="22" height="15" rx="3" fill="#0284c7"/>
                  <text x="211" y="535" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">[N]</text>
                </g>

                {/* Neutral Loops to Lamp H1, H2, H3 */}
                <path
                  onClick={() => setSelectedWireKey('N')}
                  d="M 500 200 L 500 5 L 850 5 L 850 90 L 830 90 M 850 35 L 735 35 L 735 90 M 735 35 L 640 35 L 640 90"
                  stroke="#38bdf8"
                  strokeWidth={selectedWireKey === 'N' ? "4" : "2"}
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[4px]"
                />
              </g>

              {/* LAYER 3: PEMBUMIAN (EARTH E) */}
              <g id="wire-group-earth" style={{ opacity: getGroupOpacity('earth') }}>
                <path
                  onClick={() => setSelectedWireKey('E')}
                  d="M 180 592 L 440 592 L 440 610"
                  stroke="#22c55e"
                  strokeWidth={selectedWireKey === 'E' ? "5" : "3"}
                  strokeDasharray="8,4"
                  fill="none"
                  className="cursor-pointer transition-all hover:stroke-[5px]"
                />
                <g onClick={() => setSelectedWireKey('E')} className="cursor-pointer">
                  <rect x="200" y="584" width="22" height="15" rx="3" fill="#15803d"/>
                  <text x="211" y="595" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">[E]</text>
                </g>
              </g>
            </svg>
          </div>

          {/* Interactive Wiring Inspector Side Panel */}
          <div className="lg:col-span-4 bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Pemeriksa Wayar & Ferrule</span>
                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-md font-mono border border-indigo-500/30">
                  {wireData.tag}
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>Kabel Ferrule {wireData.code}</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">{wireData.category}</p>
                </div>

                <div className="bg-slate-800 p-3.5 rounded-lg border border-slate-700 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kod Tag Ferrule:</span>
                    <span className="font-mono font-bold text-amber-400">{wireData.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Saiz & Kod Warna:</span>
                    <span className="font-bold text-slate-200">{wireData.spec}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kategori Litar:</span>
                    <span className="font-bold text-emerald-400">{wireData.category}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-1">Terminal Punca (Mula) ➔ Destinasi:</span>
                  <p className="text-xs text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed font-mono">
                    {wireData.route}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-1">Fungsi Utama Litar:</span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-3 rounded-lg border border-slate-700/80">
                    {wireData.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Ferrule Buttons for Easy Selection */}
            <div>
              <span className="text-xs font-bold text-slate-400 block mb-2">Pilihan Pantas Tag Ferrule:</span>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(fullWireDictionary).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedWireKey(key)}
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded border transition cursor-pointer ${
                      selectedWireKey === key
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            {/* Panel Quick Legend */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
              <span className="font-bold text-slate-300 block">Petunjuk Warna Kabel:</span>
              <div className="grid grid-cols-2 gap-1.5">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-500 rounded-full inline-block"></span> Fasa L1 / Control</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-yellow-500 rounded-full inline-block"></span> Fasa L2 / Trip</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-500 rounded-full inline-block"></span> Fasa L3</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-sky-400 rounded-full inline-block"></span> Neutral [N]</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-indigo-400 rounded-full inline-block"></span> Latching [105]</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-500 rounded-full inline-block"></span> Coil [106] / Bumi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
