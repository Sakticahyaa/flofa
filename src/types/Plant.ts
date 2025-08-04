export interface PestInfo {
  nama: string;
  penyebab: string;
  gejala: string;
  pengendalian: string;
}

export interface DiseaseInfo {
  nama: string;
  penyebab: string;
  gejala: string;
  pengendalian: string;
}

export interface Plant {
  id: string;
  terakhir_diperbarui: string;
  nama_tanaman: string;
  nama_latin?: string;
  jenis_tanaman: 'Pangan' | 'Hortikultura';
  hama: PestInfo[];
  penyakit: DiseaseInfo[];
  created_at?: string;
  updated_at?: string;
}