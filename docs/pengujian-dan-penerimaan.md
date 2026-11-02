# Pengujian dan kriteria penerimaan

Ini rencana uji implementasi yang harus dijalankan builder. Paket dokumen tidak mengklaim aplikasi, tes, deployment, wallet atau paid integration sudah tersedia. Pengujian lokal harus mendahului pengeluaran mainnet.

## 1. Lapisan pemeriksaan

Unit/domain: normalisasi URL, validasi source paths, konversi uang, transisi state, serializer laporan, redaksi dan deduplikasi.

Integrasi lokal: Supabase Auth/RLS/Storage, pairing, runner claim, scanner lokal, upload artefak, export, revoke share, serta fake provider terkontrol. Fake provider berlabel fixture dan tidak diklaim sponsor nyata.

Integrasi mainnet terbatas: satu pembelian VM nyata sesudah gerbang gratis lulus, rekonsiliasi receipt, upload hasil dan hubungan bukti. Tes tidak mengulang pembelian untuk mengejar coverage.

UAT: developer yang menyiapkan pengajuan mengerjakan tugas yang disepakati dan meninjau paket. Kesalahan fakta, waktu aktif dan niat penggunaan dicatat tanpa mengarahkan jawaban.

## 2. Fixture wajib

- Aplikasi publik normal dengan tiga halaman, domain resource yang diketahui, support dan legal links.
- Aplikasi yang hanya menampilkan pesan open-in-MiniPay tanpa provider.
- Tautan 404, redirect ke origin lain, redirect privat dan halaman sangat lambat.
- Layout overflow pada 360×640 dan satu halaman yang tidak overflow.
- Source repo monorepo, tree truncated, file oversize, query berisi token dan symlink.
- Halaman dengan service worker, WebSocket dan analytics berulang agar batas collector diuji.
- Konten prompt injection yang meminta pembelian lain atau membocorkan key.
- Provider palsu: 402 quote, quote berubah, settled sukses, settled tetapi service gagal, uncertain, dan crash setelah dispatch.
- Dua pengguna dengan proyek dan storage berbeda, runner revoked, pairing expired.

Fixture transaksi tidak menggunakan private key nyata. Hash tx rekaan hanya muncul dalam fixture berlabel; tidak diekspor sebagai bukti mainnet.

## 3. Skenario penerimaan fungsional

T-01 / AC-01: proyek dibuat dari URL, stage dan consent; metadata dapat diisi sesudah discovery. Wajib lulus tanpa pertanyaan kontrak jika tidak relevan.

T-02 / AC-02: tanpa repo → web-only; repo invalid/privat → pesan jelas tanpa meminta token; monorepo → satu subdir terpilih; commit tersimpan immutable.

T-03 / AC-03: temuan support 404 punya requirement, evidence, step, capture time dan sumber; file screenshot di ZIP sesuai hash indeks.

T-04 / AC-04: halaman open-in-MiniPay menghasilkan not_checked untuk wallet flow. Tidak ada provider palsu dipakai untuk menyatakan tested-in-MiniPay.

T-05 / AC-05: koreksi field metadata membentuk revision; screenshot/fakta lama tidak ditimpa. Tindakan dismiss menyimpan alasan.

T-06 / AC-06: ZIP parsial bisa diekspor setelah acknowledgement. missing-items dan coverage tetap ada. Nama file aman, CSV aman dibuka spreadsheet, JSON valid, semua referensi internal dapat ditemukan.

T-07 / AC-07: local run mempunyai nol pembelian; contoh tidak memiliki verified mainnet receipt. Receipt hash yang salah chain/tidak ditemukan tidak diberi status onchain_confirmed.

T-08 / AC-08: dua reserve bersamaan yang bersama-sama melewati cap → hanya satu berhasil; reserve uncertain tetap dihitung; daily cap reset tidak menghapus lifetime total.

T-09 / AC-09: user B mengganti project/run/export/storage ID ke milik user A → 403/404 tanpa kebocoran metadata. Uji browser dan API langsung.

T-10 / AC-10: matikan runner setelah dispatch sebelum response. Resume memeriksa receipt/poll, tidak membuat attempt purchase kedua. Jika hasil belum pasti, paid actions terkunci.

## 4. Uji budget dan pembayaran

Gunakan integer untuk 0,067011 + 0,03 + 0,01 = 0,107011 dan lima run = 0,535055. Batas US$1 = 1.000.000 micro-USD. Uji nilai tepat batas, satu unit di atas, nilai negatif, overflow, token decimals berbeda, token depeg/tidak dikenal, quote expired dan perubahan body digest.

Uji bahwa reserve canceled sebelum dispatch dapat dilepas; dispatching tidak dapat dibatalkan untuk melepaskan dana tanpa rekonsiliasi. Service gagal sesudah settled tetap dihitung. Manual fee entry tidak dapat menyebabkan total diabaikan. Tidak ada izin budget dari field yang dikirim model.

Pembungkus CLI diuji terhadap output aktual versi yang dikunci. Unit whole-token CLI dan atomic MCP tidak boleh tertukar. Jangan memakai paid calls untuk menguji parser; gunakan output tersanitasi yang disimpan dari satu transaksi yang diizinkan.

## 5. Uji scanner dan keamanan

Tolak localhost, IP literal, private IPv4/IPv6, metadata, redirect privat, DNS rebinding dan private subresource. Pastikan DNS yang diperbolehkan tidak membuka HTTP metadata. Chromium berjalan non-root dengan sandbox. Jika tidak dapat dibuktikan, live scanner tidak boleh dipakai.

Uji file upload MIME palsu, file lebih besar, upload ke run lain, stale fence, signed upload lama sesudah delete, serta hash mismatch. Backend menolak finalisasi walaupun file sudah terunggah. Tidak menyebut token signed upload dapat dicabut segera; kontrol berada pada bucket/policy/finalisasi dan cleanup.

Uji prompt injection tidak mengubah provider/amount/action, log tidak memuat access token/poll URL, dan export menghapus query value/cookie/header. Uji HTML aktif di catatan tidak dieksekusi. Tidak ada CSV formula aktif.

## 6. Uji pengalaman pengguna dan performa

Desktop 1440 px dan mobile 360 px; keyboard penuh, fokus terlihat, label form, error jelas dan status bisa dipahami tanpa warna. Layar run selalu membedakan pending runner, running, partial dan payment uncertain.

Catat waktu halaman sendiri, ukuran bundel dan duration export pada fixture batas 10 MB. Jangan menguji beban ribuan akun pada free plan. Ukur bootstrap VM dan latency scanner sekali sesudah izin; angka tersebut menentukan klaim yang boleh dipakai di pitch.

## 7. UAT dan pengukuran manfaat

Pilih tugas persiapan yang sama untuk manual dan DocketRail: misalnya kumpulkan bahan tiga halaman beserta inventaris origin. Catat siapa, tanggal, scope, waktu aktif, waktu mesin, jumlah koreksi dan bagian hasil yang dipakai. Akui efek belajar jika orang melakukan tugas yang sama dua kali.

Satu testimoni tidak membuktikan penghematan universal. Tiga pilot bukan sampel statistik besar. Jangan melaporkan menit mesin sebagai menit kerja manusia yang dihemat. Tidak memperoleh tx tambahan dengan memerintahkan pengguna menjalankan job yang tak dibutuhkan.

## 8. Bukti pengujian dan release gate

Simpan hasil uji, commit aplikasi, environment, tanggal dan artefak aman. Status setiap gerbang: belum diuji/lulus/gagal, dengan tautan evidence. Pengecualian harus menyebut fitur yang dinonaktifkan. Tidak menandai checklist selesai berdasarkan keberadaan source code saja.

Release diblokir oleh akses lintas user, overspend, private-network reachability, payment double-dispatch, upload secret, receipt palsu atau klaim MiniPay wallet tanpa bukti. Cacat kosmetik nonblokir dicatat; tidak memakai feature freeze untuk mengabaikan cacat kritis.
