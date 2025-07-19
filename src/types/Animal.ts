export interface Animal {
  id: number;
  terakhir_diperbarui: string;
  nama_pemilik: string;
  lokasi: string;
  jenis_hewan: string;
  jenis_kelamin: 'Jantan' | 'Betina';
  rentang_usia: 'Anakan' | 'Dewasa non laktasi' | 'Dewasa laktasi';
  riwayat_penyakit: 'Pernah' | 'Tidak pernah';
  riwayat_vaksin: 'Pernah' | 'Tidak pernah';
}