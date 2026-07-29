import { WireDetail, LSTerminalDetail, FerruleItem, TCCheckItem } from '../types';

export const fullWireDictionary: Record<string, WireDetail> = {
  'L1': {
    tag: '[L1]',
    code: '[L1]',
    spec: '2.5mm² PVC (Merah)',
    category: 'Litar Kuasa Utama (415V AC)',
    route: '[Bekalan Utama Fasa Merah] ➔ [MCCB Top L1] ➔ [MCCB Bot L1] ➔ [Contactor 1/L1]',
    desc: 'Talian kuasa fasa Merah 415V AC dari suis utama membekalkan tenaga kuasa terus ke terminal input sesentuh utama Contactor 1/L1.'
  },
  'L2': {
    tag: '[L2]',
    code: '[L2]',
    spec: '2.5mm² PVC (Kuning)',
    category: 'Litar Kuasa Utama (415V AC)',
    route: '[Bekalan Utama Fasa Kuning] ➔ [MCCB Top L2] ➔ [MCCB Bot L2] ➔ [Contactor 3/L2]',
    desc: 'Talian kuasa fasa Kuning 415V AC membekalkan tenaga fasa kedua ke terminal 3/L2 Contactor.'
  },
  'L3': {
    tag: '[L3]',
    code: '[L3]',
    spec: '2.5mm² PVC (Biru)',
    category: 'Litar Kuasa Utama (415V AC)',
    route: '[Bekalan Utama Fasa Biru] ➔ [MCCB Top L3] ➔ [MCCB Bot L3] ➔ [Contactor 5/L3]',
    desc: 'Talian kuasa fasa Biru 415V AC membekalkan tenaga fasa ketiga ke terminal 5/L3 Contactor.'
  },
  'U1': {
    tag: 'U1',
    code: 'U1',
    spec: '2.5mm² PVC (Merah)',
    category: 'Litar Kuasa Motor (415V AC)',
    route: '[Contactor 2/T1] ➔ [Prong TOR 2/T1] ➔ [Terminal TOR Out 2/T1] ➔ [Terminal Motor U1]',
    desc: 'Saluran kuasa fasa Merah dari keluaran TOR terus menyalurkan arus tinggi ke belitan Motor U1.'
  },
  'V1': {
    tag: 'V1',
    code: 'V1',
    spec: '2.5mm² PVC (Kuning)',
    category: 'Litar Kuasa Motor (415V AC)',
    route: '[Contactor 4/T2] ➔ [Prong TOR 4/T2] ➔ [Terminal TOR Out 4/T2] ➔ [Terminal Motor V1]',
    desc: 'Saluran kuasa fasa Kuning dari keluaran TOR menyalurkan arus ke belitan Motor V1.'
  },
  'W1': {
    tag: 'W1',
    code: 'W1',
    spec: '2.5mm² PVC (Biru)',
    category: 'Litar Kuasa Motor (415V AC)',
    route: '[Contactor 6/T3] ➔ [Prong TOR 6/T3] ➔ [Terminal TOR Out 6/T3] ➔ [Terminal Motor W1]',
    desc: 'Saluran kuasa fasa Biru dari keluaran TOR menyalurkan arus ke belitan Motor W1.'
  },
  '003': {
    tag: '[003]',
    code: '[003]',
    spec: '1.5mm² PVC (Merah)',
    category: 'Litar Kawalan Induk (240V AC)',
    route: '[Tap-off MCCB L1] ➔ [MCB Kawalan 6A] ➔ [TOR 95 NC] ➔ [Pintas Loop ke TOR 97 NO]',
    desc: 'Bekalan 240V AC untuk litar kawalan. Melalui MCB 6A ke terminal 95 (NC) dan dipintas ke terminal 97 (NO) pada TOR.'
  },
  '104': {
    tag: '[104]',
    code: '[104]',
    spec: '1.5mm² PVC (Merah)',
    category: 'Litar Kawalan Henti & OFF (240V AC)',
    route: '[TOR 96 NC] ➔ [PB STOP In (NC)] & [Aux NC 21 Contactor] ➔ [Aux NC 22] ➔ [Lampu Merah H1]',
    desc: 'Laluan kuasa kawalan selepas TOR NC. Membekalkan kuasa ke PB STOP dan ke Lampu Merah H1 (OFF) hanya bila Contactor terlepas.'
  },
  '105': {
    tag: '[105]',
    code: '[105]',
    spec: '1.5mm² PVC (Merah)',
    category: 'Litar Latching / Pegang (240V AC)',
    route: '[PB STOP Out] ➔ [PB START In (NO)] & [Aux NO 13 Contactor]',
    desc: 'Wayar penghubung dari keluaran PB STOP ke input PB START serta ke terminal 13 (NO) Contactor sebagai litar bypass pegang.'
  },
  '106': {
    tag: '[106]',
    code: '[106]',
    spec: '1.5mm² PVC (Merah)',
    category: 'Litar Gegelung Coil A1 & RUN (240V AC)',
    route: '[PB START Out] & [Aux NO 14 Contactor] ➔ [Coil A1 Contactor] & [Lampu Hijau H2]',
    desc: 'Keluaran butang START yang memberi voltan 240V ke Coil A1 untuk menarik Contactor ("Takk!") dan menyalakan Lampu Hijau H2 (RUN).'
  },
  '108': {
    tag: '[108]',
    code: '[108]',
    spec: '1.5mm² PVC (Merah)',
    category: 'Litar Kerosakan / Trip (240V AC)',
    route: '[TOR 98 NO] ➔ [Input Lampu Kuning H3 (TRIP)]',
    desc: 'Apabila TOR mengesan beban lebih/trip, contact 97-98 akan tertutup lalu menyalurkan voltan terus ke Lampu Kuning H3.'
  },
  'N': {
    tag: '[N]',
    code: '[N]',
    spec: '1.5mm² PVC (Biru/Hitam)',
    category: 'Laluan Neutral Lengkap (0V)',
    route: '[Palang Neutral Panel] ➔ [Coil A2 Contactor] & [Terminal Neutral Lampu H1, H2, H3]',
    desc: 'Laluan neutral lengkap untuk melengkapkan litar 240V bagi gegelung Contactor dan ketiga-tiga pilot lamp.'
  },
  'E': {
    tag: '[E]',
    code: '[E]',
    spec: '2.5mm² PVC (Hijau/Kuning)',
    category: 'Pembumian Keselamatan (Earth)',
    route: '[Palang Bumi Panel (Earth Bar)] ➔ [Terminal Pembumian Badan Motor]',
    desc: 'Penyambungan pembumian wajib untuk melindungi pengguna daripada bahaya kejutan elektrik sekiranya berlaku kebocoran arus ke badan motor.'
  }
};

export const lsTerminalDictionary: Record<string, LSTerminalDetail> = {
  '1L1': {
    name: 'Terminal 1/L1 (Input Power)',
    comp: 'LS Metasol Contactor (Tolak Atas)',
    tag: '[L1]',
    ferrule: '[L1]',
    wire: '2.5mm² (Merah)',
    volt: '415V AC (Fasa Merah Utama)',
    path: 'Dari keluaran MCCB Fasa Merah terus ke Terminal 1/L1 Contactor.',
    func: 'Input talian kuasa utama Fasa L1 (Merah) untuk motor.'
  },
  '3L2': {
    name: 'Terminal 3/L2 (Input Power)',
    comp: 'LS Metasol Contactor (Tolak Atas)',
    tag: '[L2]',
    ferrule: '[L2]',
    wire: '2.5mm² (Kuning)',
    volt: '415V AC (Fasa Kuning Utama)',
    path: 'Dari keluaran MCCB Fasa Kuning terus ke Terminal 3/L2 Contactor.',
    func: 'Input talian kuasa utama Fasa L2 (Kuning) untuk motor.'
  },
  '5L3': {
    name: 'Terminal 5/L3 (Input Power)',
    comp: 'LS Metasol Contactor (Tolak Atas)',
    tag: '[L3]',
    ferrule: '[L3]',
    wire: '2.5mm² (Biru)',
    volt: '415V AC (Fasa Biru Utama)',
    path: 'Dari keluaran MCCB Fasa Biru terus ke Terminal 5/L3 Contactor.',
    func: 'Input talian kuasa utama Fasa L3 (Biru) untuk motor.'
  },
  '13NO': {
    name: 'Terminal Aux 13 (NO - Latching)',
    comp: 'LS Metasol Contactor (Depan Atas)',
    tag: '[105]',
    ferrule: '[105]',
    wire: '1.5mm² (Merah)',
    volt: '240V AC (Kawalan)',
    path: 'Dari Out PB STOP disambung ke Terminal 13 (NO) Contactor.',
    func: 'Sesentuh Tambahan Normally Open (NO) berfungsi sebagai Latching/Bypass butang START.'
  },
  '21NC': {
    name: 'Terminal Aux 21 (NC - OFF Signal)',
    comp: 'LS Metasol Contactor (Depan Atas)',
    tag: '[104]',
    ferrule: '[104]',
    wire: '1.5mm² (Merah)',
    volt: '240V AC (Kawalan)',
    path: 'Dari TOR Terminal 96 (NC) ditarik ke Terminal 21 (NC) Contactor.',
    func: 'Membekalkan arus ke Lampu Merah (OFF) hanya apabila contactor terlepas (Kondisi OFF).'
  },
  'A1': {
    name: 'Terminal Gegelung Coil A1',
    comp: 'LS Metasol Contactor (Atas Kiri)',
    tag: '[106]',
    ferrule: '[106]',
    wire: '1.5mm² (Merah)',
    volt: '240V AC (Kawalan)',
    path: 'Dari Out PB START & Aux 14 (NO) disambung terus ke A1 Coil & Lampu Hijau H2.',
    func: 'Punca bekalan 240V AC untuk mengaruhkan elektromagnet gegelung (Coil) Contactor.'
  },
  'A2': {
    name: 'Terminal Gegelung Coil A2 (Neutral)',
    comp: 'LS Metasol Contactor (Bawah Kanan)',
    tag: '[N]',
    ferrule: '[N]',
    wire: '1.5mm² (Biru/Hitam)',
    volt: '0V (Neutral)',
    path: 'Dari Bar Neutral Panel terus ke Terminal A2 Coil Contactor.',
    func: 'Laluan Neutral melengkapkan litar elektromagnet 240V gegelung Contactor.'
  },
  '2T1': {
    name: 'Terminal Output 2/T1',
    comp: 'LS Metasol Contactor (Tolak Bawah)',
    tag: 'TOR Prong',
    ferrule: 'Prongs Tembaga',
    wire: 'Bar Tembaga TOR',
    volt: '415V AC',
    path: 'Prong tembaga TOR MT-32 dipasang terus ke Terminal 2/T1 Contactor.',
    func: 'Menyambung kuasa Fasa Merah dari Contactor ke elemen bi-metal TOR.'
  },
  '4T2': {
    name: 'Terminal Output 4/T2',
    comp: 'LS Metasol Contactor (Tolak Bawah)',
    tag: 'TOR Prong',
    ferrule: 'Prongs Tembaga',
    wire: 'Bar Tembaga TOR',
    volt: '415V AC',
    path: 'Prong tembaga TOR MT-32 dipasang terus ke Terminal 4/T2 Contactor.',
    func: 'Menyambung kuasa Fasa Kuning dari Contactor ke elemen bi-metal TOR.'
  },
  '6T3': {
    name: 'Terminal Output 6/T3',
    comp: 'LS Metasol Contactor (Tolak Bawah)',
    tag: 'TOR Prong',
    ferrule: 'Prongs Tembaga',
    wire: 'Bar Tembaga TOR',
    volt: '415V AC',
    path: 'Prong tembaga TOR MT-32 dipasang terus ke Terminal 6/T3 Contactor.',
    func: 'Menyambung kuasa Fasa Biru dari Contactor ke elemen bi-metal TOR.'
  },
  '14NO': {
    name: 'Terminal Aux 14 (NO - Latching Out)',
    comp: 'LS Metasol Contactor (Depan Bawah)',
    tag: '[106]',
    ferrule: '[106]',
    wire: '1.5mm² (Merah)',
    volt: '240V AC (Kawalan)',
    path: 'Dari Terminal 14 (NO) disambung ke Coil A1 & Lampu Hijau H2 (RUN).',
    func: 'Keluaran litar pegang (latching) mengekalkan bekalan A1 selepas PB START dilepaskan.'
  },
  '22NC': {
    name: 'Terminal Aux 22 (NC - OFF Lamp Out)',
    comp: 'LS Metasol Contactor (Depan Bawah)',
    tag: '[104 Lamp H1]',
    ferrule: '[104]',
    wire: '1.5mm² (Merah)',
    volt: '240V AC (Kawalan)',
    path: 'Dari Terminal 22 (NC) disambung terus ke input Lampu Merah H1 (OFF).',
    func: 'Menyalakan Lampu Merah H1 menandakan motor dalam keadaan selamat/berhenti.'
  },
  '95NC': {
    name: 'Terminal TOR 95 (NC Input)',
    comp: 'LS Metasol Overload Relay MT-32',
    tag: '[003 In]',
    ferrule: '[003]',
    wire: '1.5mm² (Merah)',
    volt: '240V AC (Kawalan Induk)',
    path: 'Dari MCB Kawalan 6A ke Terminal TOR 95 (NC), dipintas ke 97 (NO).',
    func: 'Masukan bekalan induk kawalan. Putus automatik jika dikesan arus lampau/overload.'
  },
  '96NC': {
    name: 'Terminal TOR 96 (NC Output)',
    comp: 'LS Metasol Overload Relay MT-32',
    tag: '[104 Out]',
    ferrule: '[104]',
    wire: '1.5mm² (Merah)',
    volt: '240V AC (Kawalan Selamat)',
    path: 'Dari TOR 96 (NC) ke PB STOP, Aux NC 21, dan Lampu Merah H1.',
    func: 'Menyalurkan bekalan kawalan utama. Memutuskan seluruh litar jika TOR TRIP.'
  },
  '97NO': {
    name: 'Terminal TOR 97 (NO Input)',
    comp: 'LS Metasol Overload Relay MT-32',
    tag: '[003 Loop]',
    ferrule: '[003]',
    wire: '1.5mm² (Merah Loop)',
    volt: '240V AC (Litar Trip)',
    path: 'Pintasan (looping) wayar pendek dari Terminal TOR 95 ke 97.',
    func: 'Menyediakan voltan sedia ada untuk litar isyarat amaran trip.'
  },
  '98NO': {
    name: 'Terminal TOR 98 (NO Output Signal)',
    comp: 'LS Metasol Overload Relay MT-32',
    tag: '[108 Lamp H3]',
    ferrule: '[108]',
    wire: '1.5mm² (Merah)',
    volt: '240V AC (Isyarat Kerosakan)',
    path: 'Dari TOR 98 (NO) terus ke input Lampu Kuning H3 (TRIP).',
    func: 'Menyalakan Lampu Kuning H3 apabila geganti mengesan beban lebih/trip.'
  },
  'motorU1': {
    name: 'Terminal TOR 2/T1 (Motor Out U1)',
    comp: 'LS Metasol Overload Relay MT-32 (Bawah)',
    tag: 'U1',
    ferrule: 'U1',
    wire: '2.5mm² (Merah)',
    volt: '415V AC (Fasa U1)',
    path: 'Dari keluaran TOR 2/T1 terus ke terminal motor U1.',
    func: 'Membekalkan kuasa Fasa Merah terus ke belitan gegelung motor 3-fasa.'
  },
  'motorV1': {
    name: 'Terminal TOR 4/T2 (Motor Out V1)',
    comp: 'LS Metasol Overload Relay MT-32 (Bawah)',
    tag: 'V1',
    ferrule: 'V1',
    wire: '2.5mm² (Kuning)',
    volt: '415V AC (Fasa V1)',
    path: 'Dari keluaran TOR 4/T2 terus ke terminal motor V1.',
    func: 'Membekalkan kuasa Fasa Kuning terus ke belitan gegelung motor 3-fasa.'
  },
  'motorW1': {
    name: 'Terminal TOR 6/T3 (Motor Out W1)',
    comp: 'LS Metasol Overload Relay MT-32 (Bawah)',
    tag: 'W1',
    ferrule: 'W1',
    wire: '2.5mm² (Biru)',
    volt: '415V AC (Fasa W1)',
    path: 'Dari keluaran TOR 6/T3 terus ke terminal motor W1.',
    func: 'Membekalkan kuasa Fasa Biru terus ke belitan gegelung motor 3-fasa.'
  }
};

export const ferruleList: FerruleItem[] = [
  { code: 'L1', spec: '2.5mm² (Merah)', from: 'Bekalan Utama', to: 'MCCB In (L1) / MCB Kawalan', desc: 'Fasa Merah 415VAC Utama', type: 'power' },
  { code: 'L2', spec: '2.5mm² (Kuning)', from: 'Bekalan Utama', to: 'MCCB In (L2)', desc: 'Fasa Kuning 415VAC Utama', type: 'power' },
  { code: 'L3', spec: '2.5mm² (Biru)', from: 'Bekalan Utama', to: 'MCCB In (L3)', desc: 'Fasa Biru 415VAC Utama', type: 'power' },
  { code: 'U1', spec: '2.5mm² (Merah)', from: 'TOR Out 2/T1', to: 'Motor Terminal U1', desc: 'Saluran Kuasa Motor Fasa U1', type: 'power' },
  { code: 'V1', spec: '2.5mm² (Kuning)', from: 'TOR Out 4/T2', to: 'Motor Terminal V1', desc: 'Saluran Kuasa Motor Fasa V1', type: 'power' },
  { code: 'W1', spec: '2.5mm² (Biru)', from: 'TOR Out 6/T3', to: 'Motor Terminal W1', desc: 'Saluran Kuasa Motor Fasa W1', type: 'power' },
  { code: 'E', spec: '2.5mm² (Hijau/Kuning)', from: 'Earth Bar Panel', to: 'Badan Motor', desc: 'Pembumian Keselamatan', type: 'earth' },
  { code: '003', spec: '1.5mm² (Merah)', from: 'Out MCB Kawalan 6A', to: 'TOR Terminal 95 (NC) & 97 (NO)', desc: 'Bekalan Induk Kawalan 240VAC', type: 'control' },
  { code: '104', spec: '1.5mm² (Merah)', from: 'TOR Terminal 96 (NC)', to: 'PB STOP, Aux 21 (NC), Lampu H1 (OFF)', desc: 'Litar Henti & Indikator OFF', type: 'control' },
  { code: '105', spec: '1.5mm² (Merah)', from: 'Out PB STOP', to: 'In PB START & Aux 13 (NO) Contactor', desc: 'Litar Pegang / Latching Bypass', type: 'control' },
  { code: '106', spec: '1.5mm² (Merah)', from: 'Out PB START & Aux 14 (NO)', to: 'Coil A1 & Lampu H2 (RUN)', desc: 'Pengaktifan Gegelung & Indikator RUN', type: 'control' },
  { code: '108', spec: '1.5mm² (Merah)', from: 'TOR Terminal 98 (NO)', to: 'Lampu H3 (TRIP)', desc: 'Isyarat Kerosakan / Overload Trip', type: 'control' },
  { code: 'N', spec: '1.5mm² (Biru/Hitam)', from: 'Neutral Bar Panel', to: 'Coil A2, Lampu H1, H2, H3', desc: 'Laluan Neutral Lengkap 240V', type: 'neutral' }
];

export const tcChecklistData: TCCheckItem[] = [
  {
    id: 'tc1',
    title: '1. Ujian Keterusan (Continuity Test)',
    category: 'cold',
    description: 'Menggunakan Multimeter (mod Buzzer). Menguji semua talian kabel kawalan ([003], [104], [105], [106], [108], [N]) untuk memastikan tiada litar terbuka / wayar putus.'
  },
  {
    id: 'tc2',
    title: '2. Ujian Rintangan Penebatan (Megger Test - 500V DC)',
    category: 'cold',
    description: 'Uji rintangan antara (L-L), (L-N), dan (L-E). Bacaan WAJIB > 1.0 MΩ (MegaOhm) untuk mencegah litar pintas semasa bekalan dihidupkan.'
  },
  {
    id: 'tc3',
    title: '3. Status Awal (Kondisi Tunggu / Standby)',
    category: 'hot',
    description: 'Tanggalkan LOTO. ON-kan MCCB & MCB Kawalan. Lampu Merah H1 (OFF) WAJIB menyala. Contactor & Motor belum beroperasi.'
  },
  {
    id: 'tc4',
    title: '4. Ujian Operasi Mula (Press START)',
    category: 'hot',
    description: 'Tekan Butang START (Hijau). Contactor ditarik ("Takk!"). Lampu Merah H1 padam, Lampu Hijau H2 (RUN) menyala, Motor mula berpusing.'
  },
  {
    id: 'tc5',
    title: '5. Ujian Pegang Litar (Latching Verification)',
    category: 'hot',
    description: 'Lepaskan Butang START (Hijau). Contactor mesti kekal terikat (latched) melalui Aux NO 13-14 dan Motor terus beroperasi.'
  },
  {
    id: 'tc6',
    title: '6. Ujian Operasi Henti (Press STOP)',
    category: 'hot',
    description: 'Tekan Butang STOP (Merah). Contactor terlepas, Motor berhenti serta-merta, Lampu Hijau H2 padam, Lampu Merah H1 menyala semula.'
  },
  {
    id: 'tc7',
    title: '7. Ujian Beban Lebih & Trip Simulation',
    category: 'hot',
    description: 'Semasa motor beroperasi, tekan butang TEST/TRIP pada TOR. Contactor mesti terputus serta-merta, Motor berhenti, dan Lampu Kuning H3 (TRIP) menyala.'
  },
  {
    id: 'tc8',
    title: '8. Ujian Tetapan Semula (TOR Reset)',
    category: 'hot',
    description: 'Mencuba menekan START tidak menghidupkan motor sehingga Butang RESET (Biru) pada TOR ditekan semula.'
  }
];
