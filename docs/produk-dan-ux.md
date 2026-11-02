# Produk, input, output, dan pengalaman pengguna

Mengimplementasikan [prd.md](prd.md). Semua contoh di dokumen ini adalah ilustrasi, bukan hasil pilot.

## 1. Navigasi dan layar

Landing: satu kalimat manfaat, contoh pack, cara kerja, batas pemeriksaan, tombol membuat proyek. Tidak perlu wallet connect di landing. Tidak meniru merek resmi MiniPay.

Projects: proyek milik pengguna, tahap pengajuan, run terakhir, jumlah kebutuhan yang belum ditangani, dan status runner. Menunjukkan waktu pengamatan terakhir; bukan badge “compliant”.

New project: URL aplikasi, repo publik opsional, tahap intake/readiness, persetujuan hak pemeriksaan. Normalisasi URL ditampilkan sebelum disimpan. URL internal, localhost, credential-in-URL, dan non-HTTPS ditolak untuk pekerjaan hosted/mainnet.

Source review: hasil ekstraksi metadata dengan sumber, commit yang dibaca, dukungan repo/monorepo, dan hubungan repo/deployment yang harus dikonfirmasi pemilik. Jika monorepo terdeteksi, minta satu subdirektori aplikasi. Tidak menebak subdirektori secara diam-diam.

Plan: maksimal tiga flow, daftar halaman, langkah aman, viewport, pengecualian, dan input yang belum tersedia. Pengguna dapat menghapus flow atau menambah path dalam origin yang diizinkan. Identitas pemilik tidak perlu diisi ulang pada recheck.

Run: fase berlangsung, heartbeat runner, biaya yang sudah settled, biaya yang direservasi, status konfirmasi biaya berikutnya. **Stop** menghentikan langkah baru; tidak menjanjikan refund lease.

Evidence workspace: daftar kebutuhan, detail temuan dengan bukti dan sumber, editor metadata, inventaris origin, kontrak/transaksi, lampiran perangkat, konfirmasi pemilik.

Export review: cakupan, sisa kekurangan, item supplied_by_owner, redaksi, izin berbagi, lalu unduhan. Pengguna boleh mengunduh paket parsial; keterangan parsial tetap ada.

## 2. Urutan penggunaan pertama

1. Pengguna melihat contoh tanpa login atau pengeluaran.
2. Login dengan GitHub. Scope untuk identitas; tidak meminta izin menulis repo.
3. Memasukkan URL, repo jika ada, dan tahap pengajuan.
4. Meninjau metadata dan flow yang diusulkan. Fallback deterministik tetap tersedia jika inference tidak dipakai/gagal.
5. Memilih mode lokal atau mainnet. Lokal menjelaskan bukti diambil dari runner lokal; mainnet membutuhkan pairing dan pembayaran.
6. Runner lokal membuka URL pairing pada web resmi, pengguna memeriksa nama perangkat dan fingerprint, lalu mengesahkan pairing. Terminal tidak membuka port HTTP untuk dikendalikan website.
7. Pengguna memeriksa quote dan memberi persetujuan pada runner sebelum setiap pembelian. Anggaran job bukan izin tak terbatas.
8. Memantau hasil di web, mengonfirmasi fakta pemilik, menambahkan bukti HP/tx jika dibutuhkan, dan mengekspor.

Runner yang offline tidak menahan request web. UI menyebut “Waiting for your runner”; tidak menampilkan spinner seolah scanner sedang berjalan.

## 3. Kontrak input

Application URL: satu origin awal HTTPS. Domain deployment bukan domain yang dijanjikan DocketRail; URL aktual berasal dari pengguna. Query rahasia tidak diterima. Fragment tidak dipakai sebagai identitas origin, tetapi hash-route boleh dicatat sebagai rute jika aplikasi membutuhkannya.

Repository: host github.com, owner/repo, branch untuk discovery; run menggunakan commit SHA yang sudah di-resolve. Source snapshot berisi path/hash, bukan salinan seluruh repo. Tidak membaca .env, private keys, direktori dependensi, binary, symlink, generated bundles, atau file di luar batas.

Stage: intake atau readiness. Pada readiness, instruksi reviewer dapat ditambahkan sebagai teks milik pemilik; diberi label bukan aturan universal. Tidak ada permintaan akun MiniPay atau password.

Flow: judul, entry URL, maksimal lima langkah; total paling banyak 15 langkah untuk tiga flow. Jenis langkah: navigate, click-safe-link, read-text, screenshot, check-link. Submit form, pembelian, transaksi, login, unggah file, connect wallet, dan aksi menghapus data di luar cakupan.

Metadata pemilik: publisher, kontak, deskripsi, kategori, support, legal URLs, ikon. Semua draft bertanda needs_owner_confirmation sampai disetujui. Satu field dapat punya beberapa source references.

Contract: chain ID, address, ABI jika publik, nama metode dan contoh tx. Kumpulan hanya relevan jika pemilik menyatakan aplikasi memakai kontrak. Batas lima kontrak dan sepuluh contoh tx per proyek untuk MVP.

Device evidence: maksimal delapan PNG/JPEG, masing-masing 500 KB, tanggal pengujian, platform/versi MiniPay jika diketahui, jaringan dan langkah yang diuji. Tidak menerima seed phrase, kredensial, atau screenshot yang menampilkan informasi sensitif tanpa redaksi.

## 4. Paket unduhan

Root paket hasil memakai nama proyek yang telah disanitasi dan run ID. Terdiri atas:

- submission.md: bahan listing yang sudah disetujui, field belum lengkap tetap ditandai.
- requirements.csv: ID kebutuhan, status, applicability, evidence IDs, sumber kebutuhan, alasan dan tindak lanjut.
- network-inventory.csv: origin, jenis penggunaan, sumber browser/source/owner, first-seen step, dan status konfirmasi.
- contracts.csv: jaringan, kontrak, metode, sample tx, status receipt/source-verification, catatan keterbatasan.
- coverage.md: tanggal, URL, commit, flow/halaman, lingkungan, batas dan kegagalan.
- missing-items.md: daftar prioritas bahan yang perlu diperbaiki/dilengkapi, bukan daftar vonis hukum.
- owner-declarations.md: informasi yang dinyatakan pemilik, waktu konfirmasi dan perubahan; tidak berisi tanda tangan kriptografis palsu.
- payments.csv: mode, provider, payer/payTo jika tersedia, token, jumlah, tx hash, status verifikasi dan hubungan ke run. Tidak berisi poll URL atau access token.
- evidence-index.json: indeks artefak dan metadata terstruktur; format internal DocketRail, bukan standar resmi MiniPay.
- screenshots/: bukti web, diberi nama berdasarkan step dan viewport.
- device-evidence/: lampiran pemilik yang sudah disanitasi, dengan label owner-supplied.

Format CSV UTF-8 dengan header tetap; nilai yang diawali karakter formula spreadsheet diamankan ketika diekspor. JSON hanya metadata hasil, bukan source code aplikasi. ZIP maksimum 10 MB; path traversal, nama duplikat dan file di luar daftar ditolak.

Tidak ada file manifest yang dipasang ke repo pengguna sebagai syarat listing MiniPay. Network inventory adalah dokumen pendukung [S07](sumber-dan-verifikasi.md#s07).

## 5. Informasi bukti

Setiap bukti menyebut evidence ID, run ID, capture method, captured_at UTC, URL yang sudah disanitasi, langkah, viewport jika web, hash SHA-256, dan sumber. Hash hanya membantu mendeteksi perubahan byte; bukan bukti bahwa isi screenshot benar atau diterima reviewer.

Capture method: browser_observed, source_reference, owner_supplied, rpc_observed, external_report. Tidak menggabungkan jenis tersebut menjadi satu label verified.

Kebutuhan memiliki status evidence_available hanya jika jenis bukti sesuai kebutuhan. Keberadaan kata auto-connect dalam kode tidak membuktikan auto-connect di MiniPay. Keberadaan halaman legal tidak membuktikan legal compliance.

## 6. Output contoh

Judul temuan: “Support link could not be opened.” Bukti: step bantuan, URL tersanitasi, HTTP 404 pada waktu tertentu, screenshot. Tindakan: pemilik memperbaiki URL, lalu recheck halaman bantuan. Applicability tetap applicable; status needs_fix.

Judul lain: “MiniPay wallet flow was not checked.” Bukti: browser publik menampilkan pesan open-in-MiniPay. Tindakan: ikuti langkah perangkat dan lampirkan hasil. Status not_checked; tidak menyatakan aplikasi rusak.

Inventaris contoh: api.example.com ditemukan dari request pada step 2; analytics.example.net ditemukan dari kode namun belum teramati. Keduanya tidak digabung sebagai koneksi runtime yang pasti terjadi. Domain example digunakan hanya untuk ilustrasi.

## 7. Kegagalan dan empty states

Repo tidak ada/privat: tawarkan web-only; jangan meminta PAT. GitHub rate limit: simpan pekerjaan dan tampilkan waktu retry; tidak beralih ke scraping agresif. Deployment gagal dibuka: metadata masih bisa dikonfirmasi, pemeriksaan runtime not_checked. CAPTCHA: berhenti pada halaman itu. Tidak ada kontak/legal URL: minta pemilik, tidak membuat bisnis/entitas rekaan. LLM gagal: tampilkan draft deterministik dari fakta terverifikasi, beri label inference tidak selesai. Pembayaran tidak pasti: seluruh tindakan berbayar terkunci sampai rekonsiliasi.

## 8. Recheck dan berbagi

Recheck membuat run immutable baru dengan snapshot sumber, tanggal, plan dan persetujuan baru. Untuk dokumen yang hanya diedit pemilik, cukup ekspor ulang dari revision yang baru tanpa membeli VM. Perubahan deployment atau flow membutuhkan pengamatan baru; jangan menjual recheck yang sebenarnya tidak mengumpulkan bukti.

Berbagi adalah snapshot terpilih, read-only, dapat dicabut, default kedaluwarsa tujuh hari. Token acak disimpan sebagai hash; tidak memakai project ID sebagai secret. Share tidak menyertakan kontak pribadi atau alamat wallet secara default. Pemilik melihat preview sebelum menerbitkan tautan.

## 9. Bahasa, visual dan aksesibilitas

UI Inggris; dokumentasi kerja Indonesia. Simbol DocketRail berupa dossier/jalur, warna dasar forest green dan aksen lime. Warna harus lulus pengujian kontras; tidak memakai lime untuk teks kecil di putih tanpa verifikasi. Logo yang sudah disetujui dapat diambil dari aset pengguna saat implementasi; paket spesifikasi ini tidak menciptakan logo baru.

Gunakan label status plus ikon, fokus keyboard, heading semantik, error dekat field, dan konfirmasi yang menyebut biaya. Teks layar tidak menampilkan model internal, secret provider, atau istilah implementasi yang tidak membantu keputusan pengguna.

Ukuran dan perilaku container aplikasi target mengacu ke [UI MiniPay, S10](sumber-dan-verifikasi.md#s10), bukan ke tampilan desktop DocketRail.
