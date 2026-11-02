# Keamanan, privasi, dan batas kepercayaan

Prioritas keamanan berhubungan langsung dengan fungsi produk: wallet, kunjungan situs tidak tepercaya, input repo, bukti dan pembagian hasil. Dokumen ini tidak menyatakan aplikasi telah diaudit.

## 1. Wallet dan izin

Private key buy tetap dikelola CLI/keychain. Web, database, VM dan model tidak menerima seed/private key. Tidak ada formulir upload wallet. Runner tidak mengekspor keychain untuk membuat deployment lebih mudah. Token pairing DocketRail dan akun buy merupakan kredensial berbeda.

Hanya pengguna lokal yang dapat menyetujui pembayaran. Token runner yang bocor tidak boleh menjadi izin membayar tanpa persetujuan terminal. Runner hanya boleh memanggil route provider yang diketahui, bukan URL yang dibaca dari konten situs. Peningkatan budget tidak tersedia bagi model atau runner token.

## 2. Auth dan tenancy

GitHub OAuth melalui Supabase; konfirmasi sesi pada server, jangan mempercayai user_id dari body. Semua child records memverifikasi parent owner. RLS dan kebijakan Storage default deny. Service key hanya backend, tidak dipakai client atau scanner. Scope GitHub tidak meminta private repo atau write permissions untuk MVP.

Mutasi web memeriksa origin/CSRF dan request size. Runner memakai bearer token khusus, endpoint terbatas dan redaksi header. Pairing kode pendek bukan secret tunggal: memerlukan verifier kuat, login pemilik, expiry, rate limit, dan konfirmasi fingerprint di terminal/browser. Batasi kegagalan pairing lima kali per request dan lima request baru per IP per menit; angka ini kebijakan awal yang diuji, bukan proteksi anti-abuse menyeluruh.

## 3. SSRF dan browser

Validasi URL server maupun runner: hanya HTTPS, tanpa userinfo, host publik, port 443 default, IDN dinormalisasi, literal IP ditolak untuk target pengguna. Resolve semua A/AAAA; tolak loopback, private, link-local, multicast, reserved dan metadata endpoints. Ulangi pada redirect. Pemeriksaan string URL saja tidak cukup karena DNS rebinding.

Pada VM, jalankan Chromium sebagai user non-root dengan sandbox aktif. Terapkan firewall untuk UID/proses scanner agar semua koneksi aplikasi ke jaringan privat/metadata diblokir termasuk subresource, IPv6 dan redirect. DNS hanya ke resolver yang dikonfigurasi pada port DNS; izin DNS tidak membuka HTTP metadata pada alamat yang sama. Pengumpulan artefak menuju host Storage DocketRail yang ditentukan, tidak menuju URL keluaran model.

Jika firewall/sandbox tidak dapat diterapkan dalam VM, G-04/G-05 gagal dan paid scanner nonaktif. Jangan memakai --no-sandbox atau sekadar route interception sebagai pengganti isolasi. Uji DNS rebinding dan request subresource, bukan hanya top-level navigation. Di mode lokal, pengujian privat hanya fixture development yang eksplisit; tidak mengiklankan scanner lokal sebagai layanan sandbox untuk target arbitrer.

## 4. Repo dan supply chain

Repo target tidak dieksekusi. File path dinormalisasi; path traversal, symlink dan binary ditolak. Ukuran, jumlah, timeout dan MIME dipastikan sebelum parsing. Tidak memakai npm install milik target, eval atau dynamic import sumber target. String dari repo tidak disisipkan ke shell.

Scanner DocketRail dipin pada commit dan checksum, dependensi exact versions dan lockfile. Bootstrap di VM harus memverifikasi bundle tepercaya sebelum menjalankannya. URL dari README target tidak dapat mengganti bundle. Node/Chromium diunduh melalui sumber resmi yang dipin saat release implementasi.

## 5. Prompt injection dan keluaran AI

Situs, repo, catatan reviewer, katalog dan output provider adalah data. Tidak satu pun boleh menaikkan budget, meminta key, memilih command shell, mengganti registry, atau membayar URL baru. Model hanya mengeluarkan schema usulan; backend/runner menolak action di luar enum dan evidence IDs rekaan. HTML/Markdown model tidak dirender sebagai raw HTML aktif.

Untuk konteks model, kirim fakta minimal dan excerpt yang telah dibersihkan. Jangan mengirim seluruh screenshot atau mengasumsikan inference teks memahami isinya. Masalah visual dibuktikan melalui ukuran/hasil pengukuran atau review manusia.

## 6. Data sensitif dan redaksi

Tidak mengumpulkan cookie, auth headers, payload transaksi, private messages, user balances atau body request. Query value dihapus; path berisi ID pengguna/token dianonimkan bila terlihat. Origin dan nama parameter cukup untuk inventaris. Raw HAR tidak diunggah.

Screenshot dapat menangkap informasi pribadi. Hanya flow publik untuk scanner otomatis, preview dan konfirmasi pemilik sebelum share, serta mekanisme hapus/redaksi. Artefak yang sudah dibagikan di luar DocketRail tidak bisa ditarik kembali dari penerima.

## 7. Capability dan Storage

Bucket privat; signed upload hanya untuk path artefak tertentu, upsert nonaktif. Token upload mempunyai masa berlaku provider, bukan janji revocation sekali pakai. Endpoint finalisasi memeriksa ownership, status run, fence, ukuran, MIME, file signature dan hash. File HTML/SVG pengguna tidak diterima sebagai lampiran untuk mencegah script aktif; hanya PNG/JPEG. File PNG palsu yang sebenarnya HTML ditolak.

Signed download dibuat setelah otorisasi dengan TTL pendek lima menit. Share menggunakan snapshot tersanitasi dan token berbeda; tidak membagikan signed upload atau poll URL. Log tidak mencatat query signed URL.

## 8. Retensi dan penghapusan

Artefak pilot 30 hari; pengguna dapat menghapus lebih awal. Project deletion menghentikan job baru, mencabut share, menandai konten untuk cleanup maksimal 24 jam, dan mempertahankan status finansial minimum selama rekonsiliasi. Backup penyedia dapat mempunyai retensi sendiri; jangan menjanjikan penghapusan byte seketika dari seluruh backup.

Untuk bukti lomba, minta izin terpisah atas nama, testimonial, wallet dan materi yang akan dipublikasikan. Catat izin dan masa berlaku. Tanpa izin, tampilkan agregat atau contoh berlabel; jangan menciptakan pengguna palsu.

## 9. Penerimaan keamanan minimum

Sebelum pilot: uji akses lintas user pada seluruh endpoint, storage dan export; pairing reuse/expiry; runner token revocation; target metadata/private networks; file oversize/MIME palsu; prompt injection; CSV formula injection; share revocation; race pada budget; serta crash setelah dispatch pembayaran.

Setiap kegagalan kritis menghalangi live run. Memperbaiki masalah lokal tidak membuktikan deployment sudah diperbaiki; ulangi uji yang terdampak pada deployment dengan input aman.
