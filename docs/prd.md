# PRD DocketRail

Tanggal baseline: 1 November 2026, Asia/Jakarta. Pemilik produk dan implementasi: Mahdun, solo. Pembacaan utama bersama [arsitektur.md](arsitektur.md) dan [sumber-dan-verifikasi.md](sumber-dan-verifikasi.md).

## 1. Keputusan produk

DocketRail adalah workspace untuk developer yang menyusun bahan pengajuan MiniPay berdasarkan pemeriksaan aplikasi, analisis sumber terbatas, serta konfirmasi pemilik. Janji produk: **“Turn your MiniPay app into a submission pack with traceable evidence and a clear list of what is missing.”**

Tagline: **Your app. Your evidence. Ready for review.** Kata review berarti tinjauan manusia; tidak berarti lulus, disertifikasi, atau sudah disetujui MiniPay.

DocketRail digunakan melalui web desktop. Runner lokal dibutuhkan hanya untuk menjalankan pekerjaan pada wallet pengguna; melihat hasil dan mengedit bahan tidak membutuhkan runner aktif. Pilihan ini sengaja menghindari custody private key dan worker server berbayar permanen. Konsekuensinya, onboarding lebih berat daripada aplikasi URL-only. Friksi ini harus diukur dalam pilot, bukan disembunyikan dalam pitch.

## 2. Masalah dan bukti awal

Developer memiliki aplikasi yang berfungsi, tetapi informasi listing, daftar origin, screenshot, bukti performa, dan contoh transaksi berada di tempat berbeda. Pekerjaan menggabungkannya belum otomatis selesai hanya karena aplikasinya dapat dibuka.

Dasar kebutuhan: dokumentasi pengajuan MiniPay [S07](sumber-dan-verifikasi.md#s07); referensi dua tahap dan checklist dari Celopedia [S08](sumber-dan-verifikasi.md#s08); prosedur pengujian perangkat [S09](sumber-dan-verifikasi.md#s09). Dokumen proyek publik membuktikan orang menyiapkan bahan pengajuan, tetapi tidak membuktikan kemauan membayar atau besarnya penghematan [S31](sumber-dan-verifikasi.md#s31).

Hipotesis yang harus diuji: developer menggunakan paket yang dihasilkan dengan lebih sedikit kerja aktif dibanding menyusun sendiri. Tidak menetapkan klaim “hemat 80%” atau “selesai 2 menit” sebelum pengukuran.

## 3. Pengguna, kebutuhan, dan kondisi awal

Pengguna utama: developer solo atau tim kecil dengan aplikasi publik yang menargetkan MiniPay. Mereka memiliki hak untuk memeriksa aplikasi/repo dan sedang mengajukan atau memperbaiki readiness.

Kebutuhan: mengetahui bahan yang kurang, memperoleh bahan siap ditinjau, melihat alasan setiap temuan, dan memperbarui hasil setelah perbaikan tanpa mengulang pengisian identitas.

Pengguna sekunder: reviewer yang menerima tautan paket dengan izin pemilik. Reviewer tidak boleh menjalankan pekerjaan berbayar atau melihat secret pembayaran.

Kondisi awal MVP: deployment HTTPS publik; repo GitHub publik React/Next.js opsional untuk hasil web-only, diperlukan untuk analisis sumber; alur publik tanpa akun, transaksi, CAPTCHA, atau bypass proteksi. Situs yang menolak browser luar MiniPay tetap dapat menghasilkan paket parsial.

## 4. Sasaran dan metrik

- Hasil kerja: paket yang benar-benar dipakai pengguna untuk menyiapkan pengajuan atau revisi; konfirmasi eksplisit pengguna, bukan unduhan otomatis saja.
- Waktu aktif: menit yang dihabiskan developer untuk mengumpulkan bahan secara manual dan saat dibantu DocketRail. Catat waktu mesin terpisah, tugas sama, cakupan sama, dan metode baseline.
- Kualitas: jumlah fakta yang dikoreksi pemilik, informasi yang belum terisi, temuan salah, serta kebutuhan yang masih belum diperiksa.
- Integrasi: paid receipt mainnet terhubung ke run, provider, biaya, dan artefak yang berhasil/ gagal dihasilkan.
- Demand: pengguna independen dan transaksi yang mereka sebabkan; kepemilikan akun aplikasi tidak dianggap bukti wallet independen.
- Onboarding: berhasil login/pairing, waktu pairing, alasan gagal, jumlah langkah manual sebelum hasil pertama.

Target internal pilot: tiga developer independen; satu baseline manual per developer jika memungkinkan. Target bukan janji akuisisi. Jangan meminta pengguna memberi penilaian positif sebagai syarat akses.

## 5. Cakupan yang harus selesai

- FR-01: login GitHub melalui Supabase; repo tetap dibaca sebagai repo publik, tanpa scope akses repo privat.
- FR-02: buat proyek dari URL HTTPS, tahap pengajuan, dan repo opsional; konfirmasi otorisasi pemeriksaan.
- FR-03: metadata awal diusulkan dari aplikasi/repo, setiap field memiliki sumber dan status konfirmasi.
- FR-04: rencana maksimal tiga alur dan sepuluh halaman unik; pengguna meninjau sebelum eksekusi.
- FR-05: mode lokal tanpa pembayaran dan mode mainnet dengan quote, batas biaya, serta persetujuan per pembelian. Kedua mode diberi label berbeda.
- FR-06: pairing runner ke satu pemilik; runner terautentikasi untuk mengambil hanya run yang disetujui pemiliknya.
- FR-07: pengumpulan bukti HTTP(S), screenshot viewport 360×640, tautan bantuan/legal, dan laporan keterjangkauan halaman.
- FR-08: inventaris origin dari browser, referensi sumber, dan deklarasi pemilik; tidak mengklaim lengkap hanya dari crawling.
- FR-09: pemeriksaan sumber terbatas tanpa menjalankan kode repo; temuan sumber berupa petunjuk, bukan bukti perilaku wallet.
- FR-10: lampiran bukti MiniPay fisik dan contoh transaksi; label supplied_by_owner sampai verifikasi yang benar dilakukan.
- FR-11: daftar kebutuhan dengan empat status kanonis, kebutuhan yang tidak relevan ditandai applicability terpisah.
- FR-12: editor konfirmasi, koreksi, alasan dismiss, dan persetujuan ekspor. Riwayat bukti lama tidak ditimpa.
- FR-13: unduhan ZIP berisi ringkasan Markdown, CSV, screenshot, metadata sumber, dan index bukti JSON; tidak berisi secret.
- FR-14: recheck membuat run baru; bukti dari run lama tetap menyebut asalnya dan tidak dianggap pengamatan terbaru.
- FR-15: halaman contoh dan hasil nyata yang bisa dibuka juri tanpa membayar; berbagi hanya setelah sanitasi dan izin pemilik.
- FR-16: batas US$1, reservasi biaya atomik, penghentian darurat, serta status pembayaran ambigu yang mengunci percobaan ulang.

## 6. Di luar cakupan

Tidak ada pengiriman formulir MiniPay otomatis, pembuatan kebijakan hukum otomatis, audit keamanan kontrak, klaim approved, pengiriman dana untuk menguji app pengguna, simulasi wallet sebagai bukti MiniPay, dukungan repo privat, aplikasi native, CI semua framework, monetisasi Stripe, token baru, marketplace jasa, atau worker publik 24 jam. PDF profesional dan screenshot aplikasi native bukan deliverable wajib. Jangan menambah fitur tersebut sebelum seluruh acceptance criteria inti terpenuhi.

## 7. Input dan output

Input wajib awal: URL aplikasi, tahap pengajuan, konfirmasi hak pemeriksaan. Repo publik dapat ditambahkan; commit harus dibekukan ketika snapshot dibuat. Setelah analisis: konfirmasi metadata, flow, informasi pemilik, kontrak/transaksi jika relevan, dan bukti perangkat yang masih diperlukan.

Output utama: paket terstruktur yang menyebut fakta, bukti, sumber kebutuhan, kekurangan, dan cakupan. Nama paket **DocketRail submission pack**; bukan sertifikat MiniPay. Detail struktur ada di [produk-dan-ux.md](produk-dan-ux.md).

## 8. Status dan bahasa produk

Kebutuhan memiliki tepat empat status: evidence_available, needs_fix, needs_owner_confirmation, not_checked. Applicability: applicable, not_applicable, unknown. Not applicable membutuhkan alasan dan konfirmasi pemilik; bukan hasil pass.

Status run dan status pembayaran terpisah dari status kebutuhan. Run selesai tidak berarti seluruh kebutuhan terpenuhi. Tulisan utama hasil: “Pack assembled — review remaining items.” Jika ada kegagalan pengumpulan: “Partial pack — some checks did not finish.” Tidak ada skor kelulusan atau prediksi penerimaan.

## 9. Persyaratan nonfungsional

- NFR-01: tidak ada private key, seed phrase, atau kredensial provider dalam web, database, VM scanner, atau ekspor.
- NFR-02: semua data pengguna privat secara default; otorisasi server dan RLS, bukan menyembunyikan tombol.
- NFR-03: tidak menunggu VM dalam request Vercel; pekerjaan berlanjut melalui runner dan endpoint pendek.
- NFR-04: waktu maksimal run 20 menit setelah dispatch VM, maksimal masa tunggu hasil 30 menit; lease provider tetap satu jam. Timeout lokal tidak menghapus biaya atau memicu pembelian baru.
- NFR-05: satu run aktif per runner, satu runner aktif per pengguna dalam MVP, satu pembelian yang statusnya belum pasti per runner. Run lain menunggu.
- NFR-06: delapan screenshot maksimum, 500 KB maksimum per file hasil untuk paket, 10 MB maksimum paket terkompresi; hasil asli yang lebih besar harus diolah/ditandai gagal, tidak hilang diam-diam.
- NFR-07: UI Inggris untuk juri internasional, dukungan keyboard, status tidak hanya warna, terbaca di desktop dan lebar 360 px. Aplikasi target tetap diperiksa di 360×640.
- NFR-08: sumber kebutuhan menyimpan URL dan tanggal akses. Perubahan referensi tidak otomatis mengubah hasil historis.
- NFR-09: pesan error menyebut langkah berikutnya dan dampak biaya; log teknis memiliki request ID yang tidak mengandung secret.

Target kecepatan UI diuji pada fixture dan deployment, bukan klaim SLA. Kecepatan VM/network belum diukur; jangan menjanjikan waktu proses tetap.

## 10. Kriteria penerimaan produk

AC-01: proyek dapat dibuat dari tiga keputusan awal tanpa mengisi semua data listing.

AC-02: tanpa repo, hasil jelas web-only; dengan repo, commit dan path analisis tercatat.

AC-03: satu temuan dapat ditelusuri dari kebutuhan → bukti → langkah/URL/waktu → run/provider receipt jika berbayar.

AC-04: aplikasi yang tertutup di luar MiniPay menghasilkan not_checked untuk flow tersebut, bukan klaim error aplikasi atau pass palsu.

AC-05: editing informasi pemilik tidak mengubah fakta observasi; koreksi dicatat terpisah.

AC-06: ZIP tetap dapat dibuat dengan bagian belum lengkap, setelah pengguna mengakui kekurangannya; tidak memakai label lengkap/approved.

AC-07: job lokal dan contoh tidak dihitung paid mainnet integration; receipt palsu tidak dapat ditandai verified.

AC-08: pengeluaran settled ditambah reservasi/ambigu ditambah biaya eksternal yang tercatat tidak melampaui US$1 pada pilot terkendali.

AC-09: pengguna lain tidak dapat membaca, menulis, mengekspor, atau menjalankan proyek pemilik berbeda.

AC-10: sesi terputus setelah pembayaran dapat dipulihkan melalui receipt/poll, tanpa pembelian otomatis kedua.

Daftar uji rinci dan bukti yang harus disimpan: [pengujian-dan-penerimaan.md](pengujian-dan-penerimaan.md).

## 11. Gerbang rilis

G-01: aturan track, identitas, wallet dan atribusi dikonfirmasi terhadap sumber terkini.

G-02: gas registrasi serta biaya pendanaan aktual diestimasi; rencana total muat dalam US$1.

G-03: buy CLI dan keychain bekerja pada komputer pilot; platform yang belum diuji tidak diklaim didukung.

G-04: scanner lokal dan upload artefak terisolasi lulus sebelum membeli VM.

G-05: satu VM buy menghasilkan artefak nyata, receipt dan hasil dapat direkonsiliasi.

G-06: satu developer independen mengonfirmasi hasilnya berguna; klaim dampak mengikuti pengukuran.

G-07: tes akses lintas pengguna, batas biaya, ekspor, deploy dan demo cadangan lulus.

Jika gerbang gagal, fitur terkait dinonaktifkan dan batasan dicantumkan. Paket ini tidak mengizinkan mengubah bukti lokal menjadi bukti mainnet untuk menutupi kegagalan.

## 12. Hubungan dengan judging

Use case 40%: pekerjaan dan pengguna bernama dengan izin, baseline yang dapat dijelaskan, hasil dipakai. Integration 35%: layanan tidak dimiliki tim menjalankan inti, pembayaran mainnet dan output terhubung. Demand 25%: penggunaan independen menimbulkan pembelian nyata. Sumber: tab Judging Build with buy [S01](sumber-dan-verifikasi.md#s01).

Tidak ada prediksi skor atau kemenangan. Lima hadiah bukan bukti hanya ada lima pesaing. Aturan framework bebas terverifikasi; ketentuan solo dan AI secara spesifik belum dinyatakan tegas pada halaman publik yang diperiksa, sehingga eligibility harus dikonfirmasi di proses registrasi tanpa mengarang izin.
