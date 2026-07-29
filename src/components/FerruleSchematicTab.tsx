import React, { useState } from 'react';
import { ferruleList } from '../data/wiringData';
import { Tags, Search, Projector as Diagram } from 'lucide-react';

export const FerruleSchematicTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFerrules = ferruleList.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.code.toLowerCase().includes(term) ||
      item.from.toLowerCase().includes(term) ||
      item.to.toLowerCase().includes(term) ||
      item.desc.toLowerCase().includes(term) ||
      item.spec.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Ferrule Tags Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Tags className="w-6 h-6 text-indigo-600" />
              Jadual Penandaan Kabel (Ferrule Tags)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Sistem Siri [X00] - Penandaan dua hujung wayar untuk memudahkan pemasangan & troubleshooting.
            </p>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari Ferrule / Lokasi..."
              className="bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-lg px-3 py-2 pl-9 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-full md:w-64 shadow-2xs"
            />
            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-slate-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-700">
            <thead className="bg-slate-100 text-slate-700 uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="p-3 border-b border-slate-200">Kod Tag</th>
                <th className="p-3 border-b border-slate-200">Saiz & Warna Wayar</th>
                <th className="p-3 border-b border-slate-200">Dari Terminal (Punca)</th>
                <th className="p-3 border-b border-slate-200">Ke Terminal (Destinasi)</th>
                <th className="p-3 border-b border-slate-200">Fungsi / Deskripsi Litar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredFerrules.length > 0 ? (
                filteredFerrules.map((item, idx) => {
                  let badgeColor = 'text-amber-800 bg-amber-50 border border-amber-200';
                  if (item.code.startsWith('L1') || item.code.startsWith('U1') || item.code === '104') {
                    badgeColor = 'text-red-700 bg-red-50 border border-red-200';
                  } else if (item.code.startsWith('L2') || item.code.startsWith('V1') || item.code === '108') {
                    badgeColor = 'text-amber-800 bg-amber-50 border border-amber-200';
                  } else if (item.code.startsWith('L3') || item.code.startsWith('W1')) {
                    badgeColor = 'text-blue-700 bg-blue-50 border border-blue-200';
                  } else if (item.code === 'E') {
                    badgeColor = 'text-emerald-700 bg-emerald-50 border border-emerald-200';
                  } else if (item.code === '105') {
                    badgeColor = 'text-indigo-700 bg-indigo-50 border border-indigo-200';
                  } else if (item.code === '106') {
                    badgeColor = 'text-emerald-700 bg-emerald-50 border border-emerald-200';
                  } else if (item.code === 'N') {
                    badgeColor = 'text-sky-700 bg-sky-50 border border-sky-200';
                  }

                  return (
                    <tr key={idx} className="hover:bg-slate-50 transition">
                      <td className="p-3">
                        <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${badgeColor}`}>
                          {item.code}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-slate-800">{item.spec}</td>
                      <td className="p-3 text-slate-600">{item.from}</td>
                      <td className="p-3 text-slate-600">{item.to}</td>
                      <td className="p-3 text-slate-600">{item.desc}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-500 text-xs">
                    Tiada ferrule ditemui bagi carian "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schematic Circuit Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Diagram className="w-6 h-6 text-indigo-600" />
          Rajah Skematik Litar Kawalan DOL
        </h3>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
          <svg viewBox="0 0 800 420" className="w-full max-w-3xl h-auto text-slate-200 font-sans text-xs select-none">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="800" height="420" fill="#0f172a" />
            <rect width="800" height="420" fill="url(#grid)" />

            {/* Power rails */}
            <path d="M 50 40 L 750 40" stroke="#ef4444" strokeWidth="3" fill="none"/>
            <text x="50" y="28" fill="#ef4444" fontWeight="bold">Fasa L1 (240V AC)</text>

            <path d="M 50 380 L 750 380" stroke="#38bdf8" strokeWidth="3" fill="none"/>
            <text x="50" y="400" fill="#38bdf8" fontWeight="bold">Neutral [N]</text>

            {/* MCB 6A */}
            <path d="M 100 40 L 100 80" stroke="#ef4444" strokeWidth="2"/>
            <rect x="85" y="80" width="30" height="30" fill="#334155" stroke="#94a3b8" rx="3"/>
            <text x="122" y="98" fill="#cbd5e1">MCB 6A</text>
            <path d="M 100 110 L 100 140" stroke="#f59e0b" strokeWidth="2"/>
            <text x="108" y="130" fill="#f59e0b" fontWeight="bold">[003]</text>

            {/* TOR NC 95-96 */}
            <line x1="100" y1="140" x2="100" y2="180" stroke="#cbd5e1" strokeWidth="2"/>
            <circle cx="100" cy="140" r="4" fill="#ef4444"/>
            <circle cx="100" cy="180" r="4" fill="#ef4444"/>
            <line x1="94" y1="140" x2="106" y2="175" stroke="#ef4444" strokeWidth="3"/>
            <text x="65" y="145" fill="#f87171" fontWeight="bold">95</text>
            <text x="65" y="185" fill="#f87171" fontWeight="bold">96 (TOR NC)</text>

            <path d="M 100 180 L 100 210 L 250 210 L 250 230" stroke="#ef4444" strokeWidth="2" fill="none"/>
            <text x="140" y="205" fill="#ef4444" fontWeight="bold">[104]</text>

            {/* Aux NC Branch to OFF Lamp H1 */}
            <path d="M 250 210 L 550 210 L 550 230" stroke="#ef4444" strokeWidth="2" fill="none"/>
            <circle cx="550" cy="230" r="4" fill="#ef4444"/>
            <circle cx="550" cy="270" r="4" fill="#ef4444"/>
            <line x1="544" y1="230" x2="556" y2="265" stroke="#ef4444" strokeWidth="3"/>
            <text x="560" y="235" fill="#cbd5e1">21 NC</text>
            <text x="560" y="275" fill="#cbd5e1">22</text>
            <path d="M 550 270 L 550 300" stroke="#ef4444" strokeWidth="2"/>
            <circle cx="550" cy="320" r="16" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2"/>
            <text x="543" y="325" fill="#ffffff" fontWeight="bold">H1</text>
            <text x="575" y="325" fill="#ef4444" fontWeight="bold">OFF (Merah)</text>
            <path d="M 550 336 L 550 380" stroke="#38bdf8" strokeWidth="2"/>

            {/* Push Button STOP NC */}
            <circle cx="250" cy="230" r="4" fill="#ef4444"/>
            <circle cx="250" cy="270" r="4" fill="#ef4444"/>
            <line x1="242" y1="230" x2="258" y2="230" stroke="#ef4444" strokeWidth="3"/>
            <line x1="250" y1="230" x2="250" y2="268" stroke="#ef4444" strokeWidth="3"/>
            <text x="180" y="255" fill="#ef4444" fontWeight="bold">PB STOP (NC)</text>

            <path d="M 250 270 L 250 290" stroke="#818cf8" strokeWidth="2"/>
            <text x="258" y="285" fill="#818cf8" fontWeight="bold">[105]</text>

            <path d="M 250 290 L 200 290 L 200 310" stroke="#818cf8" strokeWidth="2" fill="none"/>
            <path d="M 250 290 L 320 290 L 320 310" stroke="#818cf8" strokeWidth="2" fill="none"/>

            {/* Push Button START NO */}
            <circle cx="200" cy="310" r="4" fill="#22c55e"/>
            <circle cx="200" cy="350" r="4" fill="#22c55e"/>
            <line x1="188" y1="325" x2="212" y2="325" stroke="#22c55e" strokeWidth="3"/>
            <line x1="200" y1="325" x2="200" y2="305" stroke="#22c55e" strokeWidth="2"/>
            <text x="110" y="335" fill="#22c55e" fontWeight="bold">PB START (NO)</text>

            {/* Aux NO 13-14 Latching */}
            <circle cx="320" cy="310" r="4" fill="#22c55e"/>
            <circle cx="320" cy="350" r="4" fill="#22c55e"/>
            <line x1="320" y1="350" x2="332" y2="312" stroke="#22c55e" strokeWidth="3"/>
            <text x="330" y="335" fill="#cbd5e1">13-14 (Aux NO)</text>

            <path d="M 200 350 L 200 365 L 320 365 L 320 350" stroke="#22c55e" strokeWidth="2" fill="none"/>
            <path d="M 260 365 L 430 365 L 430 230" stroke="#22c55e" strokeWidth="2" fill="none"/>
            <text x="360" y="360" fill="#22c55e" fontWeight="bold">[106]</text>

            {/* Coil A1-A2 */}
            <rect x="410" y="230" width="40" height="30" fill="#1e293b" stroke="#22c55e" strokeWidth="2" rx="4"/>
            <text x="422" y="250" fill="#ffffff" fontWeight="bold">Coil</text>
            <text x="390" y="235" fill="#a7f3d0">A1</text>
            <text x="390" y="270" fill="#a7f3d0">A2</text>
            <path d="M 430 260 L 430 380" stroke="#38bdf8" strokeWidth="2"/>

            {/* Lamp RUN H2 */}
            <path d="M 430 290 L 480 290 L 480 300" stroke="#22c55e" strokeWidth="2" fill="none"/>
            <circle cx="480" cy="320" r="16" fill="#14532d" stroke="#22c55e" strokeWidth="2"/>
            <text x="473" y="325" fill="#ffffff" fontWeight="bold">H2</text>
            <text x="450" y="355" fill="#22c55e" fontWeight="bold">RUN (Hijau)</text>
            <path d="M 480 336 L 480 380" stroke="#38bdf8" strokeWidth="2"/>

            {/* TOR 97-98 NO Branch to TRIP Lamp H3 */}
            <path d="M 100 110 L 680 110 L 680 140" stroke="#f59e0b" strokeWidth="2" fill="none"/>
            <circle cx="680" cy="140" r="4" fill="#eab308"/>
            <circle cx="680" cy="180" r="4" fill="#eab308"/>
            <line x1="680" y1="180" x2="692" y2="142" stroke="#eab308" strokeWidth="3"/>
            <text x="645" y="145" fill="#eab308">97</text>
            <text x="645" y="185" fill="#eab308">98 (TOR NO)</text>

            <path d="M 680 180 L 680 300" stroke="#eab308" strokeWidth="2"/>
            <text x="688" y="240" fill="#eab308" fontWeight="bold">[108]</text>
            <circle cx="680" cy="320" r="16" fill="#713f12" stroke="#eab308" strokeWidth="2"/>
            <text x="673" y="325" fill="#ffffff" fontWeight="bold">H3</text>
            <text x="650" y="355" fill="#eab308" fontWeight="bold">TRIP (Kuning)</text>
            <path d="M 680 336 L 680 380" stroke="#38bdf8" strokeWidth="2"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
