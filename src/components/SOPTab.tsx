import React from 'react';
import { Plug, Cpu, Wrench, ListChecks, ShieldAlert, Zap, Lock } from 'lucide-react';

export const SOPTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-start gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <Plug className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Litar Kuasa (415V AC)</h4>
            <p className="text-xs text-slate-600 mt-1">
              Membawa arus tinggi dari bekalan utama (L1, L2, L3) terus ke motor melalui Contactor LS & TOR.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-start gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Litar Kawalan (240V AC)</h4>
            <p className="text-xs text-slate-600 mt-1">
              Mengawal kawalan gegelung (A1-A2) melalui butang tekan, aux contact, dan indikator visual.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-start gap-3">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Piawaian Tork Ketatan</h4>
            <p className="text-xs text-slate-600 mt-1">
              MCCB: <b>2.5 Nm</b> | Contactor LS: <b>2.0 Nm</b> | MCB/Terminal: <b>1.8 Nm</b>
            </p>
          </div>
        </div>
      </div>

      {/* Main SOP Content */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <ListChecks className="w-6 h-6 text-indigo-600" />
          Prosedur Pengendalian Piawai (SOP Pendawaian)
        </h3>

        <div className="space-y-6 border-l-2 border-slate-200 ml-3 pl-6 relative">
          {/* FASA 1 */}
          <div className="relative">
            <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              1
            </div>
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              FASA 1: Persediaan & Keselamatan (LOTO)
            </h4>
            <div className="mt-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2 text-slate-700">
              <p className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-red-600">1. LOTO (Lock Out Tag Out):</strong> Pastikan Suis Utama & MCCB dalam keadaan <b>OFF</b>. Kunci pemegang suis dan gantung tag amaran <i>"SEDANG DISELENGGARA"</i>.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-amber-600">2. Ujian Pematian Voltan:</strong> Gunakan Multimeter (tetapan Voltan AC) untuk memeriksa setiap fasa masuk bagi memastikan tiada bekalan elektrik yang aktif.
                </span>
              </p>
            </div>
          </div>

          {/* FASA 2 */}
          <div className="relative">
            <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              2
            </div>
            <h4 className="text-lg font-bold text-slate-900">FASA 2: Pendawaian Litar Kuasa (415VAC)</h4>
            <div className="mt-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2 text-slate-700">
              <ul className="list-disc list-inside space-y-2">
                <li>Tarik kabel saiz besar (minima <b>2.5mm²</b>) dari keluaran MCCB terus ke terminal input Contactor LS (<b>1/L1, 3/L2, 5/L3</b>).</li>
                <li>Pasangkan kaki tembaga (prongs) Thermal Overload Relay (TOR LS) ke terminal keluaran Contactor (<b>2/T1, 4/T2, 6/T3</b>) dan ketatkan.</li>
                <li>Tarik kabel dari keluaran TOR (<b>2/T1, 4/T2, 6/T3</b>) terus ke terminal blok motor (<b>U1, V1, W1</b>).</li>
                <li>Tarik kabel bumi (<b>E</b> - Hijau/Kuning) dari palang bumi panel terus ke terminal pembumian badan motor.</li>
              </ul>
            </div>
          </div>

          {/* FASA 3 */}
          <div className="relative">
            <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              3
            </div>
            <h4 className="text-lg font-bold text-slate-900">FASA 3: Pendawaian Litar Kawalan (240VAC)</h4>
            <div className="mt-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-3 text-slate-700">
              <p className="text-xs text-indigo-900 bg-indigo-50 p-2.5 rounded-lg border border-indigo-200 font-medium">
                Gunakan wayar 1.5mm² (PVC) berserta tag ferrule yang telah dicetak mengikut kod berikut:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-xs font-bold text-amber-700 block mb-1">[003] Punca Bekalan Induk</span>
                  Tap-off dari fasa L1 ke MCB 6A. Dari MCB ke TOR 95 (NC), lalu pintas (loop) ke 97 (NO).
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-xs font-bold text-amber-600 block mb-1">[108] Litar TRIP</span>
                  Dari TOR 98 (NO) ke input Lampu Kuning H3 (TRIP).
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-xs font-bold text-red-600 block mb-1">[104] Litar Henti & OFF</span>
                  Dari TOR 96 (NC) ke input PB STOP, Aux NC 21 Contactor LS, dan Lampu Merah H1 (OFF).
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-xs font-bold text-indigo-600 block mb-1">[105] Litar Pegang (Latching)</span>
                  Dari keluaran PB STOP ke input PB START dan Aux NO 13 Contactor LS.
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-xs font-bold text-emerald-600 block mb-1">[106] Pengaktifan Gegelung</span>
                  Dari keluaran PB START & Aux 14 Contactor LS ke Coil A1 & Lampu Hijau H2 (RUN).
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-xs font-bold text-sky-600 block mb-1">[N] Laluan Neutral</span>
                  Dari Bar Neutral ke Coil A2 Contactor LS dan semua lampu penunjuk (H1, H2, H3).
                </div>
              </div>
            </div>
          </div>

          {/* FASA 4 */}
          <div className="relative">
            <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              4
            </div>
            <h4 className="text-lg font-bold text-slate-900">FASA 4: Kekemasan & Tork Terminal</h4>
            <div className="mt-2 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm space-y-2 text-slate-700">
              <p>• Fasten kabel lug (kasut kabel) yang dikelim (crimp) rapi pada setiap hujung kabel.</p>
              <p>• Gunakan <b>Torque Screwdriver</b> untuk mengetatkan skru terminal mengikut spesifikasi:</p>
              
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left text-xs bg-white rounded-lg overflow-hidden border border-slate-200">
                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Komponen</th>
                      <th className="p-2.5">Nilaikan Tork Spesifikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-2.5">MCCB Utama</td>
                      <td className="p-2.5 font-bold text-indigo-700">~ 2.5 Nm</td>
                    </tr>
                    <tr>
                      <td className="p-2.5">Sesentuh Utama (Contactor LS Metasol)</td>
                      <td className="p-2.5 font-bold text-indigo-700">~ 2.0 Nm</td>
                    </tr>
                    <tr>
                      <td className="p-2.5">MCB Kawalan & Terminal Blok</td>
                      <td className="p-2.5 font-bold text-indigo-700">~ 1.8 Nm</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="pt-2">• Ikat kabel menggunakan <i>cable tie</i> atau muatkan ke dalam <i>cable trunking</i> dengan kemas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting & Decision Tree Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-amber-600" />
          Bahagian 5: Panduan Penyelesaian Masalah (Troubleshooting Decision Tree)
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Analisis langkah demi langkah untuk mengenal pasti dan merungkai kerosakan lazim pada litar pemula motor DOL.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Fault 1 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>Kerosakan 1: Contactor Tidak Menarik (Not Engaging)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Apabila butang START ditekan, gegelung A1-A2 tidak bertenaga dan contactor tidak mengeluarkan bunyi "TAKK".
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-900 block">Pohon Keputusan (Decision Tree):</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Adakah MCCB Utama & MCB 6A ON? ➔ <span className="text-red-600 font-medium">Jika OFF, hidupkan.</span></li>
                <li>Adakah TOR dalam keadaan TRIP (Kuning)? ➔ <span className="text-red-600 font-medium">Tekan butang RESET biru pada TOR.</span></li>
                <li>Adakah wayar Butang STOP (NC) terputus atau loose? ➔ <span className="text-indigo-600 font-medium">Semak ketatan terminal [104].</span></li>
                <li>Adakah gegelung A1-A2 rosak? ➔ <span className="text-indigo-600 font-medium">Uji voltan 240V AC merentasi A1 dan A2.</span></li>
              </ul>
            </div>
          </div>

          {/* Fault 2 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>Kerosakan 2: Geganti Beban Lebih Trip (TOR Tripping)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Motor beroperasi seketika lalu terhenti sendiri dan Lampu H3 (TRIP) menyala kuning.
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-900 block">Pohon Keputusan (Decision Tree):</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Adakah arus motor melebihi setting dial TOR? ➔ <span className="text-amber-700 font-medium">Laraskan atau semak beban mekanikal.</span></li>
                <li>Adakah berlaku kehilangan fasa (Phase Loss)? ➔ <span className="text-amber-700 font-medium">Uji voltan ketiga-tiga fasa masuk (L1, L2, L3).</span></li>
                <li>Adakah galas (bearing) motor jem/rosak? ➔ <span className="text-indigo-600 font-medium">Periksa putaran aci motor secara manual.</span></li>
              </ul>
            </div>
          </div>

          {/* Fault 3 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>Kerosakan 3: Motor Berdengung Kuat Tetapi Gagal Pusing</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Contactor menarik tetapi motor mengeluarkan bunyi dengung dan tidak berpusing.
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-900 block">Pohon Keputusan (Decision Tree):</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Adakah berlaku "Single Phasing" (Putus satu fasa kuasa)? ➔ <span className="text-indigo-600 font-medium">Periksa fius utama / MCCB.</span></li>
                <li>Adakah sambungan kabel ke terminal motor longgar? ➔ <span className="text-indigo-600 font-medium">Ketatkan terminal U1, V1, W1.</span></li>
              </ul>
            </div>
          </div>

          {/* Fault 4 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>Kerosakan 4: Bunyi Dengung Pada Teras Contactor</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Contactor menghasilkan bunyi bising semasa dihidupkan.
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-2">
              <span className="font-bold text-slate-900 block">Pohon Keputusan (Decision Tree):</span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Adakah terdapat habuk atau karat pada permukaan teras magnet (pole face)? ➔ <span className="text-slate-800 font-medium">Bersihkan permukaan teras.</span></li>
                <li>Adakah gegelung sesentuh mengalami susut voltan rendah? ➔ <span className="text-slate-800 font-medium">Semak voltan bekalan kawalan.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
