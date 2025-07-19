/*
  # Create Flofa Database Tables

  1. New Tables
    - `hewan` (animals)
      - `id` (uuid, primary key)
      - `terakhir_diperbarui` (date, last updated)
      - `nama_pemilik` (text, owner name)
      - `lokasi` (text, location)
      - `jenis_hewan` (text, animal type)
      - `jenis_kelamin` (text, gender - Jantan/Betina)
      - `rentang_usia` (text, age range)
      - `riwayat_penyakit` (text, disease history - Pernah/Tidak pernah)
      - `riwayat_vaksin` (text, vaccination history - Pernah/Tidak pernah)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `tanaman` (plants)
      - `id` (uuid, primary key)
      - `terakhir_diperbarui` (date, last updated)
      - `nama_tanaman` (text, plant name)
      - `jenis_tanaman` (text, plant type - Pangan/Hortikultura)
      - `potensi_hama` (text, potential pests)
      - `gejala_hama` (text, pest symptoms)
      - `pengendalian_hama` (text, pest control)
      - `potensi_penyakit` (text, potential diseases)
      - `gejala_penyakit` (text, disease symptoms)
      - `pengendalian_penyakit` (text, disease control)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to manage data
*/

-- Create hewan (animals) table
CREATE TABLE IF NOT EXISTS hewan (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  terakhir_diperbarui date NOT NULL DEFAULT CURRENT_DATE,
  nama_pemilik text NOT NULL,
  lokasi text NOT NULL,
  jenis_hewan text NOT NULL,
  jenis_kelamin text NOT NULL CHECK (jenis_kelamin IN ('Jantan', 'Betina')),
  rentang_usia text NOT NULL CHECK (rentang_usia IN ('Anakan', 'Dewasa non laktasi', 'Dewasa laktasi')),
  riwayat_penyakit text NOT NULL CHECK (riwayat_penyakit IN ('Pernah', 'Tidak pernah')),
  riwayat_vaksin text NOT NULL CHECK (riwayat_vaksin IN ('Pernah', 'Tidak pernah')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tanaman (plants) table
CREATE TABLE IF NOT EXISTS tanaman (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  terakhir_diperbarui date NOT NULL DEFAULT CURRENT_DATE,
  nama_tanaman text NOT NULL,
  jenis_tanaman text NOT NULL CHECK (jenis_tanaman IN ('Pangan', 'Hortikultura')),
  potensi_hama text NOT NULL,
  gejala_hama text NOT NULL,
  pengendalian_hama text NOT NULL,
  potensi_penyakit text NOT NULL,
  gejala_penyakit text NOT NULL,
  pengendalian_penyakit text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE hewan ENABLE ROW LEVEL SECURITY;
ALTER TABLE tanaman ENABLE ROW LEVEL SECURITY;

-- Policies for hewan table
CREATE POLICY "Allow public read access to hewan"
  ON hewan
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated insert to hewan"
  ON hewan
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update to hewan"
  ON hewan
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete to hewan"
  ON hewan
  FOR DELETE
  TO authenticated
  USING (true);

-- Policies for tanaman table
CREATE POLICY "Allow public read access to tanaman"
  ON tanaman
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated insert to tanaman"
  ON tanaman
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update to tanaman"
  ON tanaman
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete to tanaman"
  ON tanaman
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hewan_lokasi ON hewan(lokasi);
CREATE INDEX IF NOT EXISTS idx_hewan_jenis_kelamin ON hewan(jenis_kelamin);
CREATE INDEX IF NOT EXISTS idx_hewan_rentang_usia ON hewan(rentang_usia);
CREATE INDEX IF NOT EXISTS idx_hewan_terakhir_diperbarui ON hewan(terakhir_diperbarui);

CREATE INDEX IF NOT EXISTS idx_tanaman_jenis ON tanaman(jenis_tanaman);
CREATE INDEX IF NOT EXISTS idx_tanaman_nama ON tanaman(nama_tanaman);
CREATE INDEX IF NOT EXISTS idx_tanaman_terakhir_diperbarui ON tanaman(terakhir_diperbarui);

-- Insert sample data for hewan
INSERT INTO hewan (nama_pemilik, lokasi, jenis_hewan, jenis_kelamin, rentang_usia, riwayat_penyakit, riwayat_vaksin, terakhir_diperbarui) VALUES
('Budi Santoso', 'RW 1', 'Sapi', 'Betina', 'Dewasa laktasi', 'Pernah', 'Pernah', '2024-01-15'),
('Siti Aminah', 'RW 2', 'Kambing', 'Jantan', 'Dewasa non laktasi', 'Tidak pernah', 'Pernah', '2024-01-14'),
('Ahmad Wijaya', 'RW 3', 'Ayam', 'Betina', 'Anakan', 'Tidak pernah', 'Tidak pernah', '2024-01-13'),
('Maria Sari', 'RW 4', 'Bebek', 'Jantan', 'Dewasa non laktasi', 'Pernah', 'Pernah', '2024-01-12'),
('Joko Susilo', 'RW 5', 'Kerbau', 'Betina', 'Dewasa laktasi', 'Tidak pernah', 'Pernah', '2024-01-11'),
('Rina Sari', 'RW 6', 'Domba', 'Betina', 'Dewasa non laktasi', 'Pernah', 'Pernah', '2024-01-10'),
('Agus Pratama', 'RW 7', 'Ayam', 'Jantan', 'Dewasa non laktasi', 'Tidak pernah', 'Pernah', '2024-01-09'),
('Dewi Lestari', 'RW 1', 'Kambing', 'Betina', 'Anakan', 'Tidak pernah', 'Tidak pernah', '2024-01-08'),
('Bambang Sutrisno', 'RW 2', 'Sapi', 'Jantan', 'Dewasa non laktasi', 'Pernah', 'Pernah', '2024-01-07'),
('Sari Indah', 'RW 3', 'Bebek', 'Betina', 'Dewasa laktasi', 'Tidak pernah', 'Pernah', '2024-01-06');

-- Insert sample data for tanaman
INSERT INTO tanaman (nama_tanaman, jenis_tanaman, potensi_hama, gejala_hama, pengendalian_hama, potensi_penyakit, gejala_penyakit, pengendalian_penyakit, terakhir_diperbarui) VALUES
('Padi Varietas IR64', 'Pangan', 'Wereng Batang Coklat, Penggerek Batang', 'Daun menguning, batang berlubang', 'Aplikasi insektisida sistemik, penanaman varietas tahan', 'Blast, Bercak Daun', 'Bercak coklat pada daun, malai tidak berisi', 'Fungisida berbahan aktif tricyclazole, sanitasi lahan', '2024-01-15'),
('Tomat Cherry', 'Hortikultura', 'Kutu Daun, Thrips', 'Daun keriting, bercak perak pada daun', 'Insektisida nabati, pemasangan perangkap kuning', 'Layu Bakteri, Busuk Daun', 'Tanaman layu mendadak, daun berbercak coklat', 'Bakterisida tembaga, rotasi tanaman', '2024-01-14'),
('Jagung Hibrida', 'Pangan', 'Penggerek Tongkol, Ulat Grayak', 'Tongkol berlubang, daun terpotong-potong', 'Insektisida kontak, pelepasan musuh alami', 'Bulai, Karat Daun', 'Daun berbulu putih, bercak kuning pada daun', 'Fungisida sistemik, benih bebas penyakit', '2024-01-13'),
('Cabai Rawit', 'Hortikultura', 'Aphid, Mites', 'Daun menggulung, bercak kuning kecil', 'Akarisida, predator alami', 'Antraknosa, Virus Keriting', 'Buah berbercak hitam, daun keriting', 'Fungisida preventif, pengendalian vektor', '2024-01-12'),
('Kedelai Varietas Grobogan', 'Pangan', 'Penggerek Polong, Kepik Hijau', 'Polong berlubang, biji rusak', 'Insektisida selektif, panen tepat waktu', 'Karat Kedelai, Bercak Ungu', 'Pustula coklat pada daun, bercak ungu pada biji', 'Fungisida sistemik, varietas tahan', '2024-01-11'),
('Bayam Hijau', 'Hortikultura', 'Ulat Daun, Kutu Daun', 'Daun berlubang, daun menggulung', 'Insektisida organik, hand picking', 'Downy Mildew, Cercospora', 'Bercak kuning pada daun, daun layu', 'Fungisida preventif, drainase baik', '2024-01-10'),
('Singkong Varietas Adira', 'Pangan', 'Kutu Putih, Tungau Merah', 'Daun menguning, bercak putih', 'Akarisida, sanitasi kebun', 'Mosaic Virus, Bacterial Blight', 'Daun bermosaik, bercak coklat', 'Pemusnahan tanaman sakit, varietas tahan', '2024-01-09'),
('Kangkung Darat', 'Hortikultura', 'Ulat Grayak, Belalang', 'Daun terpotong, lubang pada daun', 'Insektisida nabati, perangkap cahaya', 'Busuk Batang, Layu Fusarium', 'Batang membusuk, tanaman layu', 'Fungisida sistemik, rotasi tanaman', '2024-01-08');