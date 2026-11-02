# Operasional, observabilitas, dan pemulihan

Operasi pilot dilakukan Mahdun sebagai operator tunggal. Sistem tidak dijanjikan selalu aktif: runner berada di komputer pengguna. Hasil yang sudah tersimpan dapat dibaca saat runner offline.

## 1. Pemeriksaan sebelum sesi kerja

Periksa sisa budget lifetime, attempt uncertain, saldo akun buy, env mainnet flag, kapasitas Storage, status Supabase dan deployment. Katalog/quote baru hanya diambil ketika akan menggunakan layanan. Jangan menjalankan paid health check rutin.

Pastikan runner yang aktif adalah milik pengguna, versi scanner cocok, dan tidak ada proses kedua dengan account yang sama. Catat heartbeat dan journal; kunci file lokal mencegah dua proses menandatangani attempt yang sama.

## 2. Log dan metrik minimum

Setiap event memiliki request ID, run ID, actor, fase, status aman dan waktu. Tidak ada private key, token, signed URLs, poll URL atau raw input situs pada log. Detail teknis provider disimpan lokal aman bila diperlukan untuk recovery, bukan dalam public report.

Metrik operasional: run queued/running/partial/failed, umur heartbeat, durasi per fase, artefak gagal upload, paid amount settled, outstanding reserve, jumlah uncertain, error source/rate limit dan export size. Metrik manfaat dan demand disimpan terpisah agar health check tidak dihitung pengguna nyata.

Jika menggunakan log plan gratis, verifikasi retensi dan batas aktual. Tidak memasang observability SaaS berbayar untuk pilot.

## 3. Runbook runner offline

UI menampilkan offline setelah heartbeat/lease koordinasi habis. Jangan menjual VM baru. Pemilik membuka runner yang sama dan journal yang sama. Periksa account dan latest attempt; jika dispatch pernah terjadi, cari receipt sebelum melanjutkan. Claim/fence baru tidak mengizinkan pembelian ulang attempt lama.

Jika runner tidak dapat dipulihkan, operator membekukan belanja proyek dan meminta pemilik memeriksa receipt secara lokal. Data di web tidak cukup untuk mengambil alih wallet. Ekspor parsial tetap mungkin dari bukti yang sudah ada.

## 4. Runbook payment uncertain

Matikan langkah paid baru untuk runner tersebut, pertahankan reserve, catat provider/request correlation aman. Gunakan perintah receipts/resolve resmi sesuai versi CLI, lalu periksa tx mainnet dan poll provider. Jangan mengulang POST pembelian.

Jika settled dan VM tersedia, lanjutkan pengambilan hasil tanpa membeli ulang. Jika settled tetapi provisioning gagal, catat biaya dan hasil gagal; tidak mengasumsikan refund. Jika confirmed_not_paid, lepaskan reserve dalam transaksi database dan buat attempt baru hanya dengan approval baru. Jika masih tidak pasti, tetap terkunci; batas waktu job bukan bukti pembayaran tidak terjadi.

## 5. Runbook artefak gagal

Periksa hasil poll aman dan daftar objek run. Jika upload gagal tetapi VM masih aktif, coba ulang upload non-pembayaran dalam slot yang sah; jangan overwrite artefak hash berbeda. Bila slot expired, backend dapat menerbitkan slot baru hanya untuk run/path yang masih sah dan sesuai retensi. Jika lease berakhir dan data tidak ada, hasil partial/failed; jangan membuat bukti pengganti dari fixture.

Download objek yang sudah ada tidak perlu membeli compute. Untuk metadata/paket yang salah format, perbaiki exporter lokal dan ekspor ulang snapshot; tidak otomatis scan ulang situs.

## 6. Runbook source atau target berubah

Jika deployment berubah selama pemeriksaan, catat waktu dan hasil yang sempat diambil. Jangan mengklaim konsistensi versi deployment. Pemilik memilih recheck baru dengan biaya terpisah jika masih muat. Source commit lama tetap immutable.

Jika dokumentasi MiniPay berubah, requirement catalog baru memakai source_checked_at baru. Hasil historis tetap menyebut referensi lama dan tidak diam-diam berubah menjadi lulus/gagal. Owner instruction dari reviewer hanya berlaku pada proyek tersebut.

## 7. Kebocoran atau akses tidak sah

Matikan mainnet flag, revoke runner/share token yang terdampak, batasi akses Storage dan rotasi server secret jika bocor. Secret provider capability yang terlanjur keluar mungkin tetap valid sampai expiry; blokir finalisasi terkait dan hapus artefak sensitif. Rotasi service secret bukan pengganti penilaian data mana yang telah diakses.

Wallet bocor harus ditangani pemilik melalui wallet/keychain; DocketRail tidak dapat menarik kembali settlement. Tidak mengirim private key ke dukungan. Catat incident, cakupan data, langkah pemulihan dan pemberitahuan kepada pemilik yang terdampak.

## 8. Cleanup dan retensi

Operator menjalankan cleanup terjadwal yang terautentikasi, dry-run dahulu, kemudian hanya path yang terdaftar expired/deleted. Revoke share lebih dahulu. Jangan wildcard seluruh bucket. Preview hasil deletion dan simpan audit aman. Cleanup tidak mengubah ledger unsettled/uncertain.

Supabase free project dapat pause setelah tidak aktif sesuai ketentuan saat diperiksa [S21](sumber-dan-verifikasi.md#s21). Periksa akses sebelum penjurian; jangan menganggap uptime selalu terjamin. Backup lokal yang disanitasi atas paket hasil nyata membantu demo tanpa membocorkan seluruh database.

## 9. Kontrol biaya di luar onchain

Tidak membeli domain, meningkatkan plan, mengaktifkan paid API atau menambah provider tanpa keputusan pengguna. Batasi Storage dan polling. Ketika quota gratis habis, hentikan pekerjaan baru dan sediakan hasil yang sudah diunduh; jangan mengaktifkan penagihan otomatis.

## 10. Sebelum sesi demo

Periksa URL publik dari sesi tanpa login, hasil nyata yang telah diizinkan, screenshot dan ZIP yang dapat dibuka, hubungan receipt/artefak, video cadangan dan status saldo. Tutup terminal/log yang berisi capability secrets. Jangan menampilkan keychain atau halaman akun berisi private key.
