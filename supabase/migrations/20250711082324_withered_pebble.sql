/*
  # Create books table

  1. New Tables
    - `books`
      - `id` (uuid, primary key)
      - `judul_buku` (text, book title)
      - `penulis_buku` (text, author name)
      - `penerbit_buku` (text, publisher)
      - `sinopsis_buku` (text, book synopsis)
      - `ilustrator_buku` (text, illustrator name)
      - `jenis_buku` (text, book type)
      - `isbn` (text, ISBN number)
      - `aliran_buku` (text, book genre)
      - `lokasi_buku` (text, book location)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `books` table
    - Add policy for public read access (since this is a public library system)
    - Add policies for authenticated users to manage data
*/

CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  judul_buku text NOT NULL,
  penulis_buku text NOT NULL,
  penerbit_buku text NOT NULL,
  sinopsis_buku text NOT NULL,
  ilustrator_buku text NOT NULL,
  jenis_buku text NOT NULL,
  isbn text NOT NULL,
  aliran_buku text NOT NULL,
  lokasi_buku text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Allow public read access for the library system
CREATE POLICY "Allow public read access"
  ON books
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert books
CREATE POLICY "Allow authenticated insert"
  ON books
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update books
CREATE POLICY "Allow authenticated update"
  ON books
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete books
CREATE POLICY "Allow authenticated delete"
  ON books
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_books_judul ON books(judul_buku);
CREATE INDEX IF NOT EXISTS idx_books_penulis ON books(penulis_buku);
CREATE INDEX IF NOT EXISTS idx_books_aliran ON books(aliran_buku);
CREATE INDEX IF NOT EXISTS idx_books_jenis ON books(jenis_buku);
CREATE INDEX IF NOT EXISTS idx_books_lokasi ON books(lokasi_buku);

-- Insert sample data
INSERT INTO books (judul_buku, penulis_buku, penerbit_buku, sinopsis_buku, ilustrator_buku, jenis_buku, isbn, aliran_buku, lokasi_buku) VALUES
('Petualangan Adi dan Adam', 'Riki Pratama', 'Bugel Publishing', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Ritia Shafa', 'Buku Pelajaran', '891-343-125-1', 'Fiksi', 'TBM Kantor Kelurahan'),
('Lima Sekawan Kendaraan', 'Roihan Afifi', 'Mizan Publishing', 'Cerita petualangan lima sahabat yang menjelajahi dunia dengan berbagai kendaraan unik. Mereka menghadapi tantangan dan rintangan yang menguji persahabatan dan keberanian mereka.', 'Andi Wijaya', 'Novel', '978-602-291-123-4', 'Fiksi', 'TBM Kantor Kelurahan'),
('Ollie Si Anjing Super', 'Aphrodity Jazzy', 'Gramedia Pustaka', 'Kisah inspiratif tentang seekor anjing yang memiliki kemampuan luar biasa dalam membantu manusia. Ollie mengajarkan nilai-nilai kesetiaan, keberanian, dan kasih sayang.', 'Sari Melati', 'Novel', '978-979-22-1234-5', 'Nonfiksi', 'TBM RW 02'),
('Belajar Matematika Dasar', 'Dr. Susanto', 'Erlangga', 'Panduan lengkap untuk mempelajari konsep-konsep dasar matematika dengan pendekatan yang mudah dipahami. Dilengkapi dengan contoh soal dan latihan yang menarik.', 'Tim Kreatif Erlangga', 'Buku Pelajaran', '978-602-298-456-7', 'Nonfiksi', 'TBM RW 01'),
('Cerita Dongeng Nusantara', 'Maria Sari', 'Balai Pustaka', 'Kumpulan dongeng tradisional dari berbagai daerah di Indonesia yang dikemas dengan bahasa modern dan ilustrasi menarik untuk anak-anak.', 'Dewi Kartika', 'Buku Anak-Anak', '978-979-407-789-0', 'Fiksi', 'TBM RW 03'),
('Panduan Kesehatan Keluarga', 'Dr. Ahmad Nurhadi', 'Kompas Gramedia', 'Panduan praktis untuk menjaga kesehatan keluarga dengan tips pencegahan penyakit, pola hidup sehat, dan pertolongan pertama yang mudah dipraktikkan di rumah.', 'Tim Medis', 'Buku Umum', '978-602-03-1234-8', 'Nonfiksi', 'TBM Pendopo Kelurahan'),
('Sejarah Indonesia Modern', 'Prof. Bambang Sutrisno', 'UI Press', 'Kajian mendalam tentang perkembangan Indonesia dari masa kolonial hingga era reformasi dengan analisis yang objektif dan komprehensif.', 'Tim Sejarah UI', 'Buku Pelajaran', '978-979-456-123-9', 'Nonfiksi', 'TBM RW 04'),
('Kumpulan Puisi Anak', 'Taufik Ismail', 'Horison', 'Koleksi puisi-puisi indah yang ditulis khusus untuk anak-anak dengan tema-tema yang dekat dengan kehidupan sehari-hari mereka.', 'Nia Dinata', 'Buku Anak-Anak', '978-602-456-789-1', 'Fiksi', 'TBM RW 05'),
('Teknologi Masa Depan', 'Dr. Ir. Habibie Wijaya', 'ITB Press', 'Eksplorasi tentang perkembangan teknologi terkini dan prediksi teknologi masa depan yang akan mengubah cara hidup manusia.', 'Tim Teknologi ITB', 'Buku Umum', '978-602-123-456-2', 'Nonfiksi', 'TBM RW 06'),
('Petualangan di Hutan Amazon', 'Sarah Adventure', 'Adventure Books', 'Kisah menegangkan tentang ekspedisi ke hutan Amazon yang penuh dengan misteri, bahaya, dan penemuan yang mengubah hidup para petualang.', 'Marco Silva', 'Novel', '978-602-789-123-3', 'Fiksi', 'TBM RW 07');