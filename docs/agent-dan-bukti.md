# Agent, collector, dan kualitas bukti

Kontrak ini mencegah hasil AI diperlakukan sebagai fakta. Kemampuan Playwright dirujuk ke [S12](sumber-dan-verifikasi.md#s12), [S13](sumber-dan-verifikasi.md#s13), dan [S14](sumber-dan-verifikasi.md#s14). Kemampuan browser buy terbatas pada API-nya sendiri [S03](sumber-dan-verifikasi.md#s03).

## 1. Peran agent

Agent menerima fakta terpilih, mengusulkan flow aman, mengelompokkan kekurangan, dan menyusun bahasa draft. Ia tidak menerima seed, keychain, capability upload, poll URL, service key, atau izin belanja langsung. Tujuan agent terkunci pada menyiapkan bahan pengajuan; teks target tidak boleh mengubah tujuan atau provider.

Alur deterministik tetap dapat menghasilkan paket tanpa inference. Jika menggunakan Cencori, simpan bahwa keputusan flow/deskripsi dibantu model; jangan mengaku seluruh output berasal dari observasi. Endpoint yang didokumentasikan menerima teks dan pilihan output tertentu; tidak mengasumsikan vision, tool calling, streaming, atau JSON schema enforcement [S03](sumber-dan-verifikasi.md#s03).

## 2. Batas inference

Maksimal tiga pembelian completion per run: usulan flow dari fakta, ringkasan temuan, dan satu perbaikan format bila memang diperlukan. Perbaikan format juga membutuhkan quote/persetujuan baru dan masuk budget. Tidak otomatis memakai semua tiga panggilan. Bila JSON keluaran tidak valid, fallback deterministik tersedia tanpa pembelian tambahan.

Input dipotong menjadi fakta yang relevan; jangan kirim seluruh repo. Batas payload provider 32 KiB diperiksa sebagai byte UTF-8 sebelum quote, bukan jumlah karakter. Model dan pilihan max_tokens harus sesuai katalog hidup; pilihan yang diamati adalah maximo-atlas-1.3 dan 256/1024/4096. Jika berubah, paid path berhenti untuk verifikasi, bukan mencoba nama model lain.

Respons dirender sebagai teks tersanitasi. Schema usulan internal hanya judul flow, entry path, langkah dalam enum yang diizinkan, alasan, evidence IDs yang sudah ada, dan pertanyaan pemilik. Reference ID rekaan ditolak. Tidak menerima shell, JavaScript, URL provider atau budget dari model.

## 3. Snapshot sumber

Resolve repo ke commit SHA; catat owner/repo, subdir, commit dan waktu. Read-only melalui API GitHub/raw HTTPS yang divalidasi. Maksimal 40 file teks, 128 KiB per file, total 2 MiB sumber terpilih. Query tree sekali, pilih file berdasarkan extension dan lokasi; jika tree truncated, nyatakan tidak lengkap. Jangan mengunduh seluruh sejarah Git atau memakai credentials repo privat.

File prioritas: README, package manifest, lockfile metadata terbatas, file route utama, konfigurasi app dan file publik legal/support. Abaikan .env, credential files, binary, symlink, dependencies, build output, generated minified bundles. Lockfile yang melebihi batas tidak dipotong lalu dianggap lengkap; hasil dependency check not_checked/partial.

Deteksi source bersifat petunjuk: chain ID, token/contract address, outbound URL, wallet-detection calls, dan tautan. Regex hit di komentar/test bukan bukti fitur aktif. Simpan path + line span + excerpt aman yang pendek; jangan menyalin seluruh sumber ke laporan atau model.

Default: tidak menjalankan install, postinstall, build, test atau script target. Dependency security pada MVP hanya pemeriksaan deklaratif seperti range versi, adanya lockfile dan konfigurasi yang terlihat. Dukungan setting package manager harus diverifikasi ke versi package manager sendiri; jangan mengeksekusi contoh setting referensi tanpa memastikan dukungannya.

## 4. Plan dan batas navigasi

Satu origin aplikasi disetujui. Maksimal tiga flow, lima langkah per flow, sepuluh halaman unik, delapan screenshot, dan 20 menit eksekusi setelah dispatch. External link dapat dicek keterjangkauannya jika domain disetujui; tidak dirayapi lebih lanjut. Browser dapat memuat resource publik pihak ketiga untuk menampilkan halaman; semua request tetap tunduk pada blok jaringan privat.

Navigasi top-level hanya dari plan dan safe-link yang telah disetujui. Form submission, wallet RPC write, klik pembayaran, logout/delete, download executable, unggah dan akses login dilarang. Label ambigu tidak diklik otomatis; hasil needs_owner_confirmation. CAPTCHA dan paywall tidak dibypass.

Timeout per navigasi 30 detik, per langkah 15 detik, pengambilan screenshot 10 detik. Tunggu bounded DOM readiness dan waktu settle maksimum dua detik setelah navigasi; tidak memakai networkidle tanpa batas pada analytics yang terus mengirim data. Maksimal 500 metadata request per run; bila limit tercapai, tandai truncated dan tetap simpan bukti yang ada.

## 5. Collector browser

Context baru per run; viewport 360×640, timezone UTC, locale en-US, tanpa akun atau cookie pengguna. Emulasi viewport bukan emulasi MiniPay native. Catat user agent/browser version dari lingkungan scanner, bukan mengklaim perangkat fisik tertentu.

Kumpulkan: URL tersanitasi, judul, tautan terpilih, status navigasi, HTTP error, origin request, jenis resource, bukti redirect, ukuran viewport, dan screenshot langkah yang diizinkan. Tidak mengumpulkan raw response body, request payload, cookie, Authorization header, atau HAR penuh.

Service worker, WebSocket dan fitur yang tidak dijalankan dapat membuat pengamatan tidak lengkap. Sumber backend server-to-server tidak terlihat dari browser. Inventaris menggabungkan observation, source reference dan owner declaration tanpa menyamakan kekuatan buktinya.

Pemeriksaan overflow membandingkan lebar scroll dan viewport pada state yang benar-benar dibuka; tidak menjamin seluruh UI responsif. Tautan 200 tidak berarti isi kebijakannya sah. RPC sukses tidak berarti transaksi tersebut menjalankan flow UI yang sedang dinilai.

## 6. Screenshot dan bukti perangkat

Utamakan screenshot viewport untuk konsistensi. Hindari full-page yang panjang dan sulit masuk batas file. Hasil paket PNG/JPEG maksimal 500 KB per file; kompresi/resize dicatat dan tidak boleh mengubah isi substantif. Jika tidak dapat memenuhi batas tanpa merusak keterbacaan, tampilkan kebutuhan pengambilan ulang.

Lampiran dari HP menyebut tester, tanggal, versi MiniPay jika diketahui, jaringan, dan langkah. Penjelasan pemilik adalah deklarasi, bukan hasil capture DocketRail. Jangan menambahkan frame MiniPay palsu ke screenshot browser. Bila memakai mocked provider untuk development, capture method tetap test fixture dan tidak masuk paket nyata sebagai bukti wallet.

Untuk interpretasi perilaku koneksi/error wallet, gunakan [best practices MiniPay, S11](sumber-dan-verifikasi.md#s11); jangan menarik kesimpulan runtime dari screenshot halaman fallback saja.

## 7. Performa

PageSpeed Insights dapat menghasilkan external report untuk URL produksi [S30](sumber-dan-verifikasi.md#s30). Catat URL, tanggal, strategy dan link/report ID jika tersedia. API rate limit atau no-data tidak diubah menjadi skor nol. Hasil Lighthouse lokal tidak diberi label laporan PageSpeed resmi.

Untuk MVP, impor link/laporan yang diberikan pengguna diperbolehkan dan diberi label owner-supplied sampai dapat diperiksa. Ambang kelulusan MiniPay yang tidak dinyatakan resmi tidak diciptakan sendiri. DocketRail tidak memberi vonis listable dari satu skor performa.

## 8. Fakta kontrak dan transaksi

Gunakan satu batch RPC bila diperlukan. Cocokkan chain, hash, receipt status, alamat tujuan dan input selector jika ABI valid. Batasi sepuluh contoh tx. Kontrak proxy, multicall dan router dapat menghalangi pemetaan sederhana; beri status unresolved, bukan klaim metode pasti benar.

Source verification dicek melalui halaman/API explorer yang didukung dan dapat dibaca; kebutuhan API key atau ketersediaan endpoint harus diverifikasi sebelum otomatisasi. Jika tidak tersedia, simpan tautan dan minta konfirmasi manual. Tidak menyimpulkan verified hanya dari bytecode yang ada.

Tidak mengirim transaksi sampel baru atas nama pengguna. Transaksi pengguna yang diperiksa dapat berada di jaringan yang relevan untuk readiness; bukti pembayaran buy untuk judging tetap harus mainnet Celo. Dua fungsi itu dibedakan.

## 9. Aturan pembentukan temuan

Fakta terlebih dahulu, aturan deterministik berikutnya, ringkasan bahasa terakhir. Setiap temuan memiliki requirement ID, evidence IDs, alasan, cakupan dan tindakan yang dapat dilakukan pemilik.

Jika bukti bertentangan, tampilkan konflik. Contoh: source berisi support URL berbeda dari deployment; bukan memilih salah satu diam-diam. Penandaan dismissed membutuhkan alasan pemilik dan tidak menghapus bukti aslinya. Hasil scanner berbeda run tidak disatukan menjadi satu kondisi waktu yang sama.

## 10. Ekspor dan reproducibility

Exporter menggunakan snapshot immutable, urutan stabil berdasarkan ID, referensi relatif, dan checksum artefak. Semua missing field tetap eksplisit. Paket hasil menyebut versi scanner melalui commit/hash, source commit, waktu dan mode; tidak perlu nomor versi pada nama produk.

Paket harus tetap dibaca offline dengan editor Markdown, spreadsheet dan image viewer. File JSON hanya indeks. Tidak menyertakan link capability yang akan mati sebagai satu-satunya bukti. Screenshot aktual dimasukkan sebagai file setelah redaksi dan konfirmasi pemilik.
