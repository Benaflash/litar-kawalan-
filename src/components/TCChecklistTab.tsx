import React, { useState } from 'react';
import { tcChecklistData } from '../data/wiringData';
import { ClipboardCheck, Snowflake, Flame, RotateCcw, Printer } from 'lucide-react';

export const TCChecklistTab: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalCount = tcChecklistData.length;
  const completedCount = Object.values(checkedIds).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const resetChecklist = () => {
    setCheckedIds({});
  };

  const handlePrint = () => {
    window.print();
  };

  const coldItems = tcChecklistData.filter((item) => item.category === 'cold');
  const hotItems = tcChecklistData.filter((item) => item.category === 'hot');

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm print:border-none print:shadow-none print:p-0">
        {/* Printable Header (Only visible when printing / PDF export) */}
        <div className="hidden print:block mb-6 border-b-2 border-slate-900 pb-4">
          <h1 className="text-2xl font-bold text-slate-900">RASMI: LAPORAN PENGUJIAN & PENTAULIAHAN (T&C) DOL MOTOR STARTER</h1>
          <p className="text-xs text-slate-600 mt-1">Rujukan Standard MS IEC 60204-1 • Laporan Rekod Penyelenggaraan Lapangan</p>
          <div className="flex justify-between text-xs font-mono mt-3 text-slate-700">
            <span>Tarikh Cetakan: {new Date().toLocaleDateString('ms-MY')}</span>
            <span>Status Kemajuan: {completedCount} / {totalCount} Selesai ({progressPercent}%)</span>
          </div>
        </div>

        {/* Header & Progress */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4 print:hidden">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ClipboardCheck className="w-6 h-6 text-indigo-600" />
              Prosedur Pengujian & Pentauliahan (T&C)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Lengkapkan ujian berikut sebelum menyerahkan litar untuk pengoperasian rasmi.
            </p>
          </div>

          <div className="w-full md:w-64 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="flex justify-between text-xs mb-1.5 font-bold">
              <span className="text-slate-700">Kemajuan Ujian T&C:</span>
              <span className="text-indigo-600 font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cold Test Section */}
        <div className="mb-8">
          <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Snowflake className="w-5 h-5 text-indigo-600 print:hidden" />
            Ujian Litar Mati (Cold Test - Bekalan OFF)
          </h4>
          <div className="space-y-3">
            {coldItems.map((item) => {
              const isChecked = !!checkedIds[item.id];
              return (
                <label
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition select-none print:border-slate-300 print:bg-white ${
                    isChecked
                      ? 'bg-indigo-50/60 border-indigo-200 text-slate-900'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-1 w-4 h-4 text-indigo-600 rounded bg-white border-slate-300 focus:ring-indigo-600 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-bold block text-slate-900">
                      {isChecked ? '☑ ' : '☐ '} {item.title}
                    </span>
                    <span className="text-xs text-slate-600 mt-0.5 block leading-relaxed">
                      {item.description}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Hot Test Section */}
        <div className="mb-6">
          <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-600 print:hidden" />
            Ujian Litar Hidup (Hot Test - Bekalan ON)
          </h4>
          <div className="space-y-3">
            {hotItems.map((item) => {
              const isChecked = !!checkedIds[item.id];
              return (
                <label
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition select-none print:border-slate-300 print:bg-white ${
                    isChecked
                      ? 'bg-indigo-50/60 border-indigo-200 text-slate-900'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-1 w-4 h-4 text-indigo-600 rounded bg-white border-slate-300 focus:ring-indigo-600 cursor-pointer"
                  />
                  <div>
                    <span className="text-sm font-bold block text-slate-900">
                      {isChecked ? '☑ ' : '☐ '} {item.title}
                    </span>
                    <span className="text-xs text-slate-600 mt-0.5 block leading-relaxed">
                      {item.description}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Printable Signature Block (Only visible when printing / PDF export) */}
        <div className="hidden print:grid grid-cols-2 gap-8 mt-12 pt-8 border-t border-slate-400 text-xs">
          <div>
            <p className="font-bold mb-12">Disedahkan & Disahkan Oleh (Jurutera Penyelenggaraan):</p>
            <div className="border-b border-slate-800 pb-1 mb-1">Tandatangan & Cop:</div>
            <p className="text-[10px] text-slate-500">Nama: ___________________________</p>
            <p className="text-[10px] text-slate-500">Tarikh: ___________________________</p>
          </div>
          <div>
            <p className="font-bold mb-12">Diluluskan Oleh (Ketua Jurutera / Pihak Berkuasa):</p>
            <div className="border-b border-slate-800 pb-1 mb-1">Tandatangan & Cop:</div>
            <p className="text-[10px] text-slate-500">Nama: ___________________________</p>
            <p className="text-[10px] text-slate-500">Tarikh: ___________________________</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-200 print:hidden">
          <button
            onClick={resetChecklist}
            className="w-full sm:w-auto text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 px-3.5 py-2 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Senarai Semak</span>
          </button>
          
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-lg shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Eksport Laporan T&C ke PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
