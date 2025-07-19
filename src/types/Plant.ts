export interface Plant {
  id: number;
  terakhir_diperbarui: string;
  nama_tanaman: string;
  jenis_tanaman: 'Pangan' | 'Hortikultura';
  potensi_hama: string;
  gejala_hama: string;
  pengendalian_hama: string;
  potensi_penyakit: string;
  gejala_penyakit: string;
  pengendalian_penyakit: string;
}