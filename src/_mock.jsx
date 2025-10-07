// =================================================================
// ==           PUSAT DATA TIRUAN (MOCK DATABASE)                 ==
// =================================================================
// Di aplikasi nyata, semua data ini akan datang dari server/API.
// File ini mengekspor setiap set data sebagai 'named export'
// dan mengekspor 'allEmployees' sebagai 'default export'.

// --- 1. DATA MASTER PEGAWAI ---
const allEmployees = [
  {
    id: 1,
    name: 'Edwin Zhoker, S.T.',
    nip: '010229725 / 198804011990032010',
    jabatan: 'Kepala Bagian Tata Usaha',
    golongan: 'PEMBINA (IVa)',
    profilePictureUrl: '/assets/profile-pic.jpg',
    // -- Data Lengkap untuk Halaman Profil --
    ttl: 'Parepare, 01-04-1988',
    agama: 'ISLAM',
    suku: '-',
    alamat: 'Jl. Mattiro Jompi No. 5, Parepare',
    pendidikan: 'S.2 - MANAJEMEN PEMBANGUNAN DAERAH',
    instansi: 'UPT RUMAH SAKIT DR. HASRI AINUN HABIBIE',
    nomorHp: '08114225580',
    email: 'edwinzhoker@gmail.com',
    noKtp: '7372010104880001',
    noNpwp: '12.345.678.9-012.000',
    noKarpeg: 'J 123456',
    noKaris: 'K 789012',
    noAskes: '0001234567890',
    noTaspen: '9876543210',
    noRekening: '123-456-7890 (Bank Sulselbar)',
  },
  {
    id: 2,
    name: 'Dr. Bunga Citra',
    nip: '010229726 / 199005152015032001',
    jabatan: 'Dokter Spesialis Anak',
    golongan: 'PENATA (IIIc)',
    profilePictureUrl: '/assets/profile-pic-2.jpg',
    // -- Data Lengkap untuk Halaman Profil --
    ttl: 'Makassar, 15-05-1990',
    agama: 'KRISTEN',
    suku: 'Toraja',
    alamat: 'Jl. Bau Massepe No. 12, Parepare',
    pendidikan: 'S.2 - SPESIALIS ILMU KESEHATAN ANAK',
    instansi: 'UPT RUMAH SAKIT DR. HASRI AINUN HABIBIE',
    nomorHp: '081234567890',
    email: 'bunga.citra@example.com',
    noKtp: '7372011505900002',
    noNpwp: '22.333.444.5-012.000',
    noKarpeg: 'J 654321',
    noKaris: '-',
    noAskes: '0009876543210',
    noTaspen: '0123456789',
    noRekening: '987-654-3210 (Bank Mandiri)',
  },
  {
    id: 3,
    name: 'Andi Pratama, A.Md.Kom',
    nip: '010229727 / 199502202018011003',
    jabatan: 'Staf IT',
    golongan: 'PENGATUR (IIc)',
    profilePictureUrl: '/assets/profile-pic-3.jpg',
    // -- Data Lengkap untuk Halaman Profil --
    ttl: 'Barru, 20-02-1995',
    agama: 'ISLAM',
    suku: 'Bugis',
    alamat: 'Jl. Jenderal Sudirman No. 100, Parepare',
    pendidikan: 'D.III - TEKNIK KOMPUTER',
    instansi: 'UPT RUMAH SAKIT DR. HASRI AINUN HABIBIE',
    nomorHp: '085555000111',
    email: 'andi.pratama@example.com',
    noKtp: '7372012002950001',
    noNpwp: '55.666.777.8-012.000',
    noKarpeg: 'J 112233',
    noKaris: '-',
    noAskes: '0001122334455',
    noTaspen: '1122334455',
    noRekening: '112-233-4455 (Bank BRI)',
  },
];

// --- 2. DATA RIWAYAT (DETAIL) ---
// Setiap data riwayat memiliki 'employeeId' untuk menautkannya ke data master pegawai.

export const allRiwayatJabatan = [
  { id: 1, employeeId: 1, namaJabatan: 'Kepala Bagian Ketatausahaan', noSk: '829 TAHUN 2023', tglSk: '30-10-2023', tmtJabatan: '30-10-2023', berkasUrl: '#'},
  { id: 2, employeeId: 1, namaJabatan: 'Kepala Sub Bagian Rumah Tangga', noSk: '140 TAHUN 2022', tglSk: '25-03-2022', tmtJabatan: '25-03-2022', berkasUrl: '#'},
  { id: 3, employeeId: 2, namaJabatan: 'Dokter Spesialis Anak', noSk: '123 TAHUN 2020', tglSk: '15-01-2020', tmtJabatan: '15-01-2020', berkasUrl: '#'},
  { id: 4, employeeId: 3, namaJabatan: 'Staf IT', noSk: '456 TAHUN 2019', tglSk: '01-02-2019', tmtJabatan: '01-02-2019', berkasUrl: '#'},
];

export const allRiwayatPendidikan = [
  { id: 1, employeeId: 1, namaSekolah: 'STIA LAN', jurusan: 'MANAJEMEN PEMBANGUNAN DAERAH', lokasi: 'MAKASSAR', noIjazah: '03.II.32.2.60', lulus: '21-01-2010', berkasUrl: '#'},
  { id: 2, employeeId: 1, namaSekolah: 'UNIVERSITAS HASANUDDIN', jurusan: 'ILMU HUKUM', lokasi: 'MAKASSAR', noIjazah: 'UH-12345678', lulus: '15-07-2005', berkasUrl: '#'},
  { id: 3, employeeId: 2, namaSekolah: 'SMAN 1 PAREPARE', jurusan: 'IPA', lokasi: 'PAREPARE', noIjazah: 'SMA-987654', lulus: '10-06-2001', berkasUrl: '#'},
];

export const allDataKGB = [
  { id: 1, employeeId: 1, noSk: '800.1.11.13/40/Umum&protokol', tglSk: '07-02-2023', tmtKgb: '01-03-2023', gajiPokok: 'Rp. 4.699.300', masaKerja: '28 Tahun', berkasUrl: '#'},
  { id: 2, employeeId: 1, noSk: 'PD.822.4/288/BKPSDMD', tglSk: '10-02-2021', tmtKgb: '01-03-2021', gajiPokok: 'Rp. 4.555.800', masaKerja: '26 Tahun', berkasUrl: '#'},
  { id: 3, employeeId: 2, noSk: 'XYZ/01/2022', tglSk: '15-03-2022', tmtKgb: '01-04-2022', gajiPokok: 'Rp. 3.500.000', masaKerja: '5 Tahun', berkasUrl: '#'},
];

export const allRiwayatCuti = [
  { id: 1, employeeId: 1, jenisCuti: 'Cuti Tahunan', nomorSurat: '800/139/BKPSDMD', tanggalSurat: '22-01-2025', tanggalAwal: '03-02-2025', tanggalSelesai: '18-02-2025', berkasUrl: '#'},
  { id: 2, employeeId: 2, jenisCuti: 'Cuti Sakit', nomorSurat: '800/145/RS-HAH', tanggalSurat: '10-03-2024', tanggalAwal: '11-03-2024', tanggalSelesai: '13-03-2024', berkasUrl: '#'},
];

export const allStatusKepegawaian = [
  { id: 1, employeeId: 1, status: 'PNS', noSk: 'PN.821.12-76', tglSk: '27-02-1993', tmtJabatan: '01-03-1993', gol: 'IIa', pangkat: 'PENGATUR MUDA', berkasUrl: '#'},
  { id: 2, employeeId: 1, status: 'CPNS', noSk: 'PD.813.2-49', tglSk: '12-07-1990', tmtJabatan: '01-03-1990', gol: 'IIa', pangkat: 'PENGATUR MUDA', berkasUrl: '#'},
  { id: 3, employeeId: 2, status: 'PNS', noSk: 'PN.ABC.123', tglSk: '01-12-2016', tmtJabatan: '01-01-2017', gol: 'IIIa', pangkat: 'PENATA MUDA', berkasUrl: '#'},
];

// Data lainnya bisa ditambahkan di sini...
export const allDataKeluarga = [
  // Kategori: 'pasangan'
  { id: 1, employeeId: 1, kategori: 'pasangan', nama: 'Siti Aminah, S.Pd.', ttl: 'Makassar, 12-05-1990', tglKawin: '15-06-2015', berkasUrl: '#' },
  
  // Kategori: 'orangtua'
  { id: 2, employeeId: 1, kategori: 'orangtua', nama: 'Budi Santoso', status: 'Bapak Kandung', ttl: 'Parepare, 01-01-1960', alamat: 'Jl. Merdeka No. 10, Parepare', berkasUrl: '#' },
  { id: 3, employeeId: 1, kategori: 'orangtua', nama: 'Rani Wulandari', status: 'Ibu Kandung', ttl: 'Barru, 05-08-1962', alamat: 'Jl. Merdeka No. 10, Parepare', berkasUrl: '#' },

  // Kategori: 'anak'
  { id: 4, employeeId: 1, kategori: 'anak', nama: 'Ahmad Zhoker', ttl: 'Parepare, 20-03-2016', pendidikan: 'SD', berkasUrl: '#' },
  { id: 5, employeeId: 1, kategori: 'anak', nama: 'Aisyah Zhoker', ttl: 'Parepare, 10-11-2018', pendidikan: 'TK', berkasUrl: '#' },
];

export const allRiwayatDiklat = [
  { id: 1, employeeId: 1, jenis: 'struktural', namaDiklat: 'Diklat PIM IV', tempat: 'Makassar', pelaksana: 'BPSDM Prov. Sulsel', angkatan: 'X', tanggal: '10-05-2022', berkasUrl: '#'},
  { id: 2, employeeId: 1, jenis: 'teknis', namaDiklat: 'Pelatihan Sistem Informasi Kepegawaian', tempat: 'Parepare', pelaksana: 'BKPSDMD Kota Parepare', angkatan: 'II', tanggal: '15-09-2023', berkasUrl: '#'},
  { id: 3, employeeId: 2, jenis: 'fungsional', namaDiklat: 'Pelatihan Dokter Spesialis Anak', tempat: 'Jakarta', pelaksana: 'Kementerian Kesehatan', angkatan: 'V', tanggal: '20-02-2021', berkasUrl: '#'},
];

export const allRiwayatPenghargaan = [
  { id: 1, employeeId: 1, nama: 'Satyalancana Karya Satya XX Tahun', oleh: 'Presiden Republik Indonesia', noSk: '123/KEP/2023', tglSk: '10-08-2023', tahun: '2023', berkasUrl: '#' },
];

export const allRiwayatOrganisasi = [
  { id: 1, employeeId: 1, nama: 'Persatuan Perawat Nasional Indonesia (PPNI)', jenis: 'Profesi', jabatan: 'Anggota', tempat: 'Parepare', berkasUrl: '#' },
  { id: 2, employeeId: 2, nama: 'Ikatan Dokter Indonesia (IDI)', jenis: 'Profesi', jabatan: 'Anggota', tempat: 'Makassar', berkasUrl: '#' },
];

export const allRiwayatSKP = [
  { id: 1, employeeId: 1, tahun: 2021, nilaiSKP: 123, nilaiPerilaku: 91.9, nilaiPrestasi: 87.2, berkasUrl: '#' },
  { id: 2, employeeId: 1, tahun: 2022, nilaiSKP: 125, nilaiPerilaku: 93.5, nilaiPrestasi: 88.0, berkasUrl: '#' },
];

export const allRiwayatHukuman = [
  { id: 1, employeeId: 3, nama: 'Teguran Lisan', noSk: '862/01/PEG', tglSk: '15-01-2024', tmt: '15-01-2024' },
];


// --- 3. EXPORT DEFAULT ---
// Ekspor data pegawai sebagai default agar mudah diimpor di halaman utama daftar pegawai.
export default allEmployees;