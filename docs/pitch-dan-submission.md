# Pitch, bukti dampak, dan submission

Dokumen ini mengarahkan penyajian hasil yang benar-benar dibangun. Semua angka contoh adalah target atau ilustrasi; ganti hanya dengan hasil ukur. Batas waktu: 9 November 2026 pukul 16:00 WIB [S01](sumber-dan-verifikasi.md#s01).

## 1. Posisi produk

Nama: DocketRail. Tagline: Your app. Your evidence. Ready for review.

Penjelasan singkat: DocketRail helps MiniPay builders prepare submission materials by collecting browser evidence, organizing technical references, and showing exactly what still needs the owner's attention.

Masalah yang dipresentasikan adalah pekerjaan persiapan yang dilakukan developer tertentu. Jangan membuka pitch dengan jumlah pengguna Celo yang tidak relevan atau klaim semua developer membuang waktu berjam-jam.

## 2. Demo 30 detik

Detik 0–5: tampilkan URL/repo dan pekerjaan nyata yang disetujui developer.

Detik 5–15: buka run yang telah selesai dan satu temuan dengan bukti, misalnya support URL yang gagal atau origin yang belum dikonfirmasi. Contoh harus berasal dari hasil sebenarnya; bila menggunakan fixture, label ilustrasi terlihat.

Detik 15–23: buka paket yang dihasilkan dan daftar kekurangan yang tersisa. Tunjukkan file yang benar-benar dapat diunduh.

Detik 23–30: tunjukkan provider, pembayaran mainnet dan kaitannya dengan bukti, kemudian satu hasil penggunaan dari developer dengan izin.

Demo ini menampilkan hasil tersimpan. Tidak mengklaim keseluruhan job selesai 30 detik. Durasi sebenarnya ditampilkan pada run. Tidak perlu memaksa mainnet run baru saat pitch.

## 3. Struktur video 1–3 menit

Hook: seorang developer sudah membuat app tetapi masih harus menyiapkan bahan pengajuan. Solusi: satu alur pengumpulan bukti dan penyusunan paket. Demo: dari proyek, plan, receipt, evidence, hingga export. Dampak: data pilot yang benar-benar diukur. Batas: browser web tidak menggantikan pengujian MiniPay di HP; source/network coverage tidak otomatis lengkap.

Video memakai data yang diizinkan, subtitle Inggris, audio jelas dan URL demo/repo. Jangan mempercepat footage tanpa menyebutnya. Backup offline terdiri dari video, screenshot, ZIP hasil nyata dan halaman ringkasan aman; semua tetap menyebut kapan pengamatan dilakukan.

Livestream sponsor tersedia pada [S29](sumber-dan-verifikasi.md#s29) sebagai referensi tambahan; paket ini tidak mengutip isi video yang belum berhasil diakses.

## 4. Bukti untuk tiap kriteria

Use case 40%: nama/identitas pengguna yang menyetujui publikasi, tugas, kondisi sebelumnya, metode baseline, waktu aktif dan bahan hasil yang digunakan. Jika pengguna tidak mengizinkan namanya dipublikasikan, jangan mengarang identitas; minta mekanisme bukti privat ke penyelenggara bila tersedia.

Integration 35%: service URL/capability, alasan dibeli, payer/provider, token/amount, tx mainnet dan keluaran artefak. Tampilkan jalur kode saat aplikasi sudah diimplementasikan agar reviewer dapat melihat integrasi inti; tidak cukup menempel logo sponsor.

Demand 25%: pengguna independen yang menyebabkan pekerjaan berguna dan pembelian, termasuk hubungan otorisasi/payer. Jangan menyamakan seluruh login dengan counterparties. Catat mana wallet operator, mana pengguna, dan kondisi pendanaan. Konfirmasi atribusi lintas wallet kepada penyelenggara sebelum mengklaim kredit agregat.

Rubrik tidak memberi jaminan nilai penuh untuk jumlah layanan tertentu. Lima hadiah masing-masing US$200 menurut pengumuman [S28](sumber-dan-verifikasi.md#s28); tidak digunakan sebagai alasan menjanjikan balik modal.

## 5. Jawaban pertanyaan juri

“Mengapa bukan Celopedia atau AskBots?” — Celopedia membantu pengetahuan/panduan, AskBots memberi review. Tunjukkan bahan pengajuan yang dikerjakan DocketRail dan asal buktinya. Jangan mengklaim pesaing tidak bisa berkembang ke fungsi tersebut.

“Mengapa memakai buy kalau Playwright bisa lokal?” — mode lokal dipakai untuk development/validasi. Mode berbayar membeli compute sementara untuk pekerjaan bukti yang terisolasi dan tidak membutuhkan akun provider terpisah. Keunggulan pengalaman ini tetap perlu dibuktikan; tidak mengklaim compute buy satu-satunya cara.

“Di mana otonominya?” — agent memilih pemeriksaan dari fakta dalam scope, menjalankan collector dan menyusun paket; pemilik tetap mengesahkan budget, flow dan deklarasi. Tidak menjanjikan belanja tanpa kontrol manusia.

“Apakah ini menjamin listing?” — tidak. Tunjukkan cakupan, status kebutuhan dan bukti yang masih harus diperiksa pemilik/tim MiniPay.

“Mengapa harus runner?” — wallet tetap di keychain pemilik dan tidak dibawa ke Vercel; konsekuensinya onboarding lebih berat, yang diukur pada pilot. Jangan menyamarkan tool ini sebagai web-only tanpa instalasi.

“Apa bukti orang mau membayar?” — hanya gunakan transaksi dan konfirmasi penggunaan nyata. Jika baru uji operator, katakan belum membuktikan demand independen.

“Apakah seluruh domain ditemukan?” — hanya cakupan yang diamati, source references dan deklarasi pemilik. Jangan menyatakan lengkap untuk semua kondisi runtime/backend.

## 6. README aplikasi — urutan wajib setelah build

1. Judul, tagline, URL demo dan video aktual.
2. Cara penggunaan sebelum penjelasan: “Coba sebagai juri” 3–5 langkah dan “Jalankan lokal” maksimal enam perintah yang diuji dari checkout kosong; screenshot/GIF aplikasi aktual. Jangan menaruh command DocketRail rekaan yang belum diimplementasikan.
3. Masalah dan pengguna dengan izin.
4. Solusi serta fitur yang benar-benar tersedia.
5. Pembeda dan batas kompetisi yang jujur.
6. Arsitektur, stack, provider, Agent ID, wallet attribution, paid receipts dan cara data diolah.
7. Dampak hasil ukur dan rencana yang diberi label rencana.

README paket dokumen ini bukan pengganti README aplikasi yang telah diuji.

## 7. Checklist submission

- Repo publik dapat diakses, commit build tercatat, code ditulis sesuai window dan tidak memuat secret.
- Eligibility solo/AI dan ketentuan registration telah dikonfirmasi pada event, bukan asumsi event lain.
- Track Build with buy dipilih; ERC-8004 identity valid dan entry wallet dicantumkan.
- Mekanisme atribusi x402/payer/provider dikonfirmasi; semua receipt dan network benar.
- Demo bisa dibuka dari luar tanpa kredensial operator; contoh dan data nyata dibedakan.
- Juri dapat melihat hasil dan ZIP tanpa membayar; alur live baru menjelaskan runner dan biaya.
- Video 1–3 menit dapat diakses, backup offline tersedia, tidak ada secret di footage.
- Bukti pengguna/dampak disertai izin; tidak ada tx spam atau wallet independen palsu.
- Form submission berisi URL aktual, layanan yang dipakai, bukti pembayaran, keterbatasan dan penggunaan dana yang benar.
- Konfirmasi submission diterima sebelum 16:00 WIB pada 9 November, simpan bukti penerimaan.

## 8. Keterbatasan yang harus diungkap

Hanya aplikasi/repo publik, tiga flow, pemeriksaan web terbatas, tidak mengaudit kontrak/legal, dan wallet MiniPay tetap perlu pengujian perangkat. Dukungan OS runner sesuai lingkungan yang telah diuji. Keterbatasan menjadi bagian penilaian hasil; tidak dihilangkan dari demo cadangan.
