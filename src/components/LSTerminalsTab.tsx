import React, { useState } from 'react';
import { LSFilter, LSTerminalDetail } from '../types';
import { lsTerminalDictionary } from '../data/wiringData';
import { Cpu, Info, CheckCircle2 } from 'lucide-react';

export const LSTerminalsTab: React.FC = () => {
  const [selectedTermKey, setSelectedTermKey] = useState<string>('1L1');

  const termData: LSTerminalDetail = lsTerminalDictionary[selectedTermKey] || lsTerminalDictionary['1L1'];

  const filterLSWire = (filter: LSFilter) => {
    if (filter === 'all') {
      setSelectedTermKey('1L1');
      return;
    }
    for (const key in lsTerminalDictionary) {
      if (lsTerminalDictionary[key].ferrule.includes(filter)) {
        setSelectedTermKey(key);
        break;
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-indigo-600" />
              Visual Fizikal LS ELECTRIC Contactor & TOR
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Pemetaan lokasi terminal sebenar bagi komponen <b>LS Metasol MC Contactor & MT Overload Relay</b>.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => filterLSWire('all')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white transition cursor-pointer shadow-sm"
            >
              Semua Terminal
            </button>
            <button
              onClick={() => filterLSWire('003')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
            >
              [003] Induk
            </button>
            <button
              onClick={() => filterLSWire('104')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
            >
              [104] STOP/OFF
            </button>
            <button
              onClick={() => filterLSWire('105')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
            >
              [105] Latching
            </button>
            <button
              onClick={() => filterLSWire('106')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
            >
              [106] Coil/RUN
            </button>
            <button
              onClick={() => filterLSWire('108')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
            >
              [108] TRIP
            </button>
            <button
              onClick={() => filterLSWire('N')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition cursor-pointer"
            >
              [N] Neutral
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center overflow-x-auto">
            <span className="text-[11px] text-slate-400 font-bold self-start mb-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              <span>Klik mana-mana terminal untuk melihat butiran sambungan:</span>
            </span>

            <svg viewBox="0 0 520 680" className="w-full max-w-md h-auto font-sans select-none">
              <rect width="520" height="680" rx="16" fill="#0f172a"/>
              
              {/* Contactor Group */}
              <g id="ls-contactor">
                <rect x="80" y="30" width="360" height="300" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="3"/>
                <rect x="100" y="45" width="320" height="270" rx="8" fill="#334155"/>
                <rect x="200" y="55" width="120" height="24" rx="4" fill="#dc2626"/>
                <text x="260" y="71" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="1">LS ELECTRIC</text>
                <text x="260" y="90" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">Metasol MC-22b</text>

                {/* 1/L1 */}
                <g onClick={() => setSelectedTermKey('1L1')} className="cursor-pointer group">
                  <rect
                    x="120" y="105" width="45" height="35" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === '1L1' ? '#f59e0b' : '#ef4444'}
                    strokeWidth={selectedTermKey === '1L1' ? '3' : '2'}
                  />
                  <circle cx="142.5" cy="122.5" r="7" fill="#fbbf24"/>
                  <text x="142.5" y="100" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">1/L1</text>
                  <text x="142.5" y="148" fill="#cbd5e1" fontSize="8" textAnchor="middle">[L1]</text>
                </g>

                {/* 3/L2 */}
                <g onClick={() => setSelectedTermKey('3L2')} className="cursor-pointer group">
                  <rect
                    x="180" y="105" width="45" height="35" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === '3L2' ? '#f59e0b' : '#eab308'}
                    strokeWidth={selectedTermKey === '3L2' ? '3' : '2'}
                  />
                  <circle cx="202.5" cy="122.5" r="7" fill="#fbbf24"/>
                  <text x="202.5" y="100" fill="#facc15" fontSize="9" fontWeight="bold" textAnchor="middle">3/L2</text>
                  <text x="202.5" y="148" fill="#cbd5e1" fontSize="8" textAnchor="middle">[L2]</text>
                </g>

                {/* 5/L3 */}
                <g onClick={() => setSelectedTermKey('5L3')} className="cursor-pointer group">
                  <rect
                    x="240" y="105" width="45" height="35" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === '5L3' ? '#f59e0b' : '#3b82f6'}
                    strokeWidth={selectedTermKey === '5L3' ? '3' : '2'}
                  />
                  <circle cx="262.5" cy="122.5" r="7" fill="#fbbf24"/>
                  <text x="262.5" y="100" fill="#60a5fa" fontSize="9" fontWeight="bold" textAnchor="middle">5/L3</text>
                  <text x="262.5" y="148" fill="#cbd5e1" fontSize="8" textAnchor="middle">[L3]</text>
                </g>

                {/* 13 NO */}
                <g onClick={() => setSelectedTermKey('13NO')} className="cursor-pointer group">
                  <rect
                    x="300" y="105" width="45" height="35" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === '13NO' ? '#f59e0b' : '#818cf8'}
                    strokeWidth={selectedTermKey === '13NO' ? '3' : '2'}
                  />
                  <circle cx="322.5" cy="122.5" r="7" fill="#fbbf24"/>
                  <text x="322.5" y="100" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">13 (NO)</text>
                  <text x="322.5" y="148" fill="#818cf8" fontSize="8" fontWeight="bold" textAnchor="middle">[105]</text>
                </g>

                {/* 21 NC */}
                <g onClick={() => setSelectedTermKey('21NC')} className="cursor-pointer group">
                  <rect
                    x="360" y="105" width="45" height="35" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === '21NC' ? '#f59e0b' : '#ef4444'}
                    strokeWidth={selectedTermKey === '21NC' ? '3' : '2'}
                  />
                  <circle cx="382.5" cy="122.5" r="7" fill="#fbbf24"/>
                  <text x="382.5" y="100" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">21 (NC)</text>
                  <text x="382.5" y="148" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">[104]</text>
                </g>

                {/* A1 Coil */}
                <g onClick={() => setSelectedTermKey('A1')} className="cursor-pointer group">
                  <rect
                    x="110" y="160" width="35" height="28" rx="4"
                    fill="#065f46"
                    stroke={selectedTermKey === 'A1' ? '#f59e0b' : '#10b981'}
                    strokeWidth={selectedTermKey === 'A1' ? '3' : '2'}
                  />
                  <circle cx="127.5" cy="174" r="5" fill="#fbbf24"/>
                  <text x="127.5" y="155" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">A1</text>
                  <text x="127.5" y="198" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">[106]</text>
                </g>

                {/* Actuator Center */}
                <rect x="200" y="165" width="120" height="40" rx="6" fill="#0f172a" stroke="#64748b"/>
                <rect x="235" y="175" width="50" height="20" rx="3" fill="#dc2626"/>
                <text x="260" y="189" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">PULL / IN</text>

                {/* 2/T1 */}
                <g onClick={() => setSelectedTermKey('2T1')} className="cursor-pointer group">
                  <rect
                    x="120" y="240" width="45" height="35" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === '2T1' ? '#f59e0b' : '#94a3b8'}
                    strokeWidth={selectedTermKey === '2T1' ? '3' : '1.5'}
                  />
                  <circle cx="142.5" cy="257.5" r="7" fill="#fbbf24"/>
                  <text x="142.5" y="233" fill="#cbd5e1" fontSize="9" fontWeight="bold" textAnchor="middle">2/T1</text>
                  <text x="142.5" y="288" fill="#94a3b8" fontSize="8" textAnchor="middle">(Ke TOR)</text>
                </g>

                {/* 4/T2 */}
                <g onClick={() => setSelectedTermKey('4T2')} className="cursor-pointer group">
                  <rect
                    x="180" y="240" width="45" height="35" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === '4T2' ? '#f59e0b' : '#94a3b8'}
                    strokeWidth={selectedTermKey === '4T2' ? '3' : '1.5'}
                  />
                  <circle cx="202.5" cy="257.5" r="7" fill="#fbbf24"/>
                  <text x="202.5" y="233" fill="#cbd5e1" fontSize="9" fontWeight="bold" textAnchor="middle">4/T2</text>
                  <text x="202.5" y="288" fill="#94a3b8" fontSize="8" textAnchor="middle">(Ke TOR)</text>
                </g>

                {/* 6/T3 */}
                <g onClick={() => setSelectedTermKey('6T3')} className="cursor-pointer group">
                  <rect
                    x="240" y="240" width="45" height="35" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === '6T3' ? '#f59e0b' : '#94a3b8'}
                    strokeWidth={selectedTermKey === '6T3' ? '3' : '1.5'}
                  />
                  <circle cx="262.5" cy="257.5" r="7" fill="#fbbf24"/>
                  <text x="262.5" y="233" fill="#cbd5e1" fontSize="9" fontWeight="bold" textAnchor="middle">6/T3</text>
                  <text x="262.5" y="288" fill="#94a3b8" fontSize="8" textAnchor="middle">(Ke TOR)</text>
                </g>

                {/* 14 NO */}
                <g onClick={() => setSelectedTermKey('14NO')} className="cursor-pointer group">
                  <rect
                    x="300" y="240" width="45" height="35" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === '14NO' ? '#f59e0b' : '#10b981'}
                    strokeWidth={selectedTermKey === '14NO' ? '3' : '2'}
                  />
                  <circle cx="322.5" cy="257.5" r="7" fill="#fbbf24"/>
                  <text x="322.5" y="233" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">14 (NO)</text>
                  <text x="322.5" y="288" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">[106]</text>
                </g>

                {/* 22 NC */}
                <g onClick={() => setSelectedTermKey('22NC')} className="cursor-pointer group">
                  <rect
                    x="360" y="240" width="45" height="35" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === '22NC' ? '#f59e0b' : '#ef4444'}
                    strokeWidth={selectedTermKey === '22NC' ? '3' : '2'}
                  />
                  <circle cx="382.5" cy="257.5" r="7" fill="#fbbf24"/>
                  <text x="382.5" y="233" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">22 (NC)</text>
                  <text x="382.5" y="288" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">[104 Lamp H1]</text>
                </g>

                {/* A2 Coil Neutral */}
                <g onClick={() => setSelectedTermKey('A2')} className="cursor-pointer group">
                  <rect
                    x="375" y="160" width="35" height="28" rx="4"
                    fill="#1e3a8a"
                    stroke={selectedTermKey === 'A2' ? '#f59e0b' : '#38bdf8'}
                    strokeWidth={selectedTermKey === 'A2' ? '3' : '2'}
                  />
                  <circle cx="392.5" cy="174" r="5" fill="#fbbf24"/>
                  <text x="392.5" y="155" fill="#7dd3fc" fontSize="9" fontWeight="bold" textAnchor="middle">A2</text>
                  <text x="392.5" y="198" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">[N]</text>
                </g>
              </g>

              {/* Connecting Prongs */}
              <line x1="142.5" y1="275" x2="142.5" y2="350" stroke="#f59e0b" strokeWidth="6"/>
              <line x1="202.5" y1="275" x2="202.5" y2="350" stroke="#f59e0b" strokeWidth="6"/>
              <line x1="262.5" y1="275" x2="262.5" y2="350" stroke="#f59e0b" strokeWidth="6"/>

              {/* TOR Group */}
              <g id="ls-tor">
                <rect x="80" y="340" width="360" height="280" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="3"/>
                <rect x="100" y="355" width="320" height="250" rx="8" fill="#334155"/>

                <rect x="120" y="365" width="110" height="20" rx="3" fill="#dc2626"/>
                <text x="175" y="379" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle">LS MT-32 TOR</text>

                <circle cx="150" cy="425" r="20" fill="#0f172a" stroke="#94a3b8" strokeWidth="2"/>
                <line x1="150" y1="425" x2="140" y2="412" stroke="#ef4444" strokeWidth="3"/>
                <text x="150" y="458" fill="#cbd5e1" fontSize="8" textAnchor="middle">Pelarasan Arus Ir</text>

                <circle cx="210" cy="425" r="12" fill="#2563eb" stroke="#60a5fa" strokeWidth="2"/>
                <text x="210" y="429" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">RESET</text>

                <rect x="245" y="413" width="24" height="24" rx="4" fill="#dc2626" stroke="#f87171" strokeWidth="2"/>
                <text x="257" y="428" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">STOP</text>

                {/* 95 NC */}
                <g onClick={() => setSelectedTermKey('95NC')} className="cursor-pointer group">
                  <rect
                    x="290" y="395" width="40" height="32" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === '95NC' ? '#f59e0b' : '#f59e0b'}
                    strokeWidth={selectedTermKey === '95NC' ? '3' : '2'}
                  />
                  <circle cx="310" cy="411" r="6" fill="#fbbf24"/>
                  <text x="310" y="390" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">95 (NC)</text>
                  <text x="310" y="438" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">[003 In]</text>
                </g>

                {/* 96 NC */}
                <g onClick={() => setSelectedTermKey('96NC')} className="cursor-pointer group">
                  <rect
                    x="350" y="395" width="40" height="32" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === '96NC' ? '#f59e0b' : '#ef4444'}
                    strokeWidth={selectedTermKey === '96NC' ? '3' : '2'}
                  />
                  <circle cx="370" cy="411" r="6" fill="#fbbf24"/>
                  <text x="370" y="390" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">96 (NC)</text>
                  <text x="370" y="438" fill="#f87171" fontSize="8" fontWeight="bold" textAnchor="middle">[104 Out]</text>
                </g>

                {/* 97 NO */}
                <g onClick={() => setSelectedTermKey('97NO')} className="cursor-pointer group">
                  <rect
                    x="290" y="465" width="40" height="32" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === '97NO' ? '#f59e0b' : '#f59e0b'}
                    strokeWidth={selectedTermKey === '97NO' ? '3' : '2'}
                  />
                  <circle cx="310" cy="481" r="6" fill="#fbbf24"/>
                  <text x="310" y="460" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">97 (NO)</text>
                  <text x="310" y="508" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">[003 Loop]</text>
                </g>

                {/* 98 NO */}
                <g onClick={() => setSelectedTermKey('98NO')} className="cursor-pointer group">
                  <rect
                    x="350" y="465" width="40" height="32" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === '98NO' ? '#f59e0b' : '#eab308'}
                    strokeWidth={selectedTermKey === '98NO' ? '3' : '2'}
                  />
                  <circle cx="370" cy="481" r="6" fill="#fbbf24"/>
                  <text x="370" y="460" fill="#facc15" fontSize="9" fontWeight="bold" textAnchor="middle">98 (NO)</text>
                  <text x="370" y="508" fill="#eab308" fontSize="8" fontWeight="bold" textAnchor="middle">[108 Lamp H3]</text>
                </g>

                {/* motorU1 */}
                <g onClick={() => setSelectedTermKey('motorU1')} className="cursor-pointer group">
                  <rect
                    x="130" y="525" width="50" height="40" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === 'motorU1' ? '#f59e0b' : '#ef4444'}
                    strokeWidth={selectedTermKey === 'motorU1' ? '3' : '2'}
                  />
                  <circle cx="155" cy="545" r="7" fill="#fbbf24"/>
                  <text x="155" y="520" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">2/T1</text>
                  <text x="155" y="580" fill="#cbd5e1" fontSize="8" textAnchor="middle">Ke Motor U1</text>
                </g>

                {/* motorV1 */}
                <g onClick={() => setSelectedTermKey('motorV1')} className="cursor-pointer group">
                  <rect
                    x="200" y="525" width="50" height="40" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === 'motorV1' ? '#f59e0b' : '#eab308'}
                    strokeWidth={selectedTermKey === 'motorV1' ? '3' : '2'}
                  />
                  <circle cx="225" cy="545" r="7" fill="#fbbf24"/>
                  <text x="225" y="520" fill="#facc15" fontSize="10" fontWeight="bold" textAnchor="middle">4/T2</text>
                  <text x="225" y="580" fill="#cbd5e1" fontSize="8" textAnchor="middle">Ke Motor V1</text>
                </g>

                {/* motorW1 */}
                <g onClick={() => setSelectedTermKey('motorW1')} className="cursor-pointer group">
                  <rect
                    x="270" y="525" width="50" height="40" rx="4"
                    fill="#1e293b"
                    stroke={selectedTermKey === 'motorW1' ? '#f59e0b' : '#3b82f6'}
                    strokeWidth={selectedTermKey === 'motorW1' ? '3' : '2'}
                  />
                  <circle cx="295" cy="545" r="7" fill="#fbbf24"/>
                  <text x="295" y="520" fill="#60a5fa" fontSize="10" fontWeight="bold" textAnchor="middle">6/T3</text>
                  <text x="295" y="580" fill="#cbd5e1" fontSize="8" textAnchor="middle">Ke Motor W1</text>
                </g>
              </g>
            </svg>
          </div>

          {/* Terminal Detail Side Panel */}
          <div className="lg:col-span-5 bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Maklumat Perincian Terminal</span>
                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded font-mono border border-indigo-500/30">
                  {termData.tag}
                </span>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="text-lg font-bold text-white">{termData.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{termData.comp}</p>
                </div>

                <div className="bg-slate-800 p-3.5 rounded-lg border border-slate-700 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kod Ferrule:</span>
                    <span className="font-mono font-bold text-red-400">{termData.ferrule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Saiz / Warna Wayar:</span>
                    <span className="font-bold text-slate-200">{termData.wire}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Voltan Litar:</span>
                    <span className="font-bold text-amber-400">{termData.volt}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-1">Laluan Sambungan:</span>
                  <p className="text-xs text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed font-mono">
                    {termData.path}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-1">Fungsi Dalam Litar DOL:</span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-3 rounded-lg border border-slate-700/80">
                    {termData.func}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Semua terminal LS Metasol direka khas untuk menyokong kabel lug dikelim dengan ketatan tork piawai 2.0 Nm.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
