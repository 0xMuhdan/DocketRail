# Integrasi, skills, dan persiapan lingkungan

Skill adalah instruksi kerja untuk coding agent; CLI/MCP/SDK merupakan kemampuan eksekusi. Tidak ada instalasi atau otorisasi pembayaran yang terjadi karena membaca dokumen ini. Perintah di sini hanya instruksi pemasangan; paket tidak berisi source code aplikasi.

## 1. Stack yang dipilih

Next.js 16 App Router + TypeScript untuk web; Supabase untuk GitHub login, Postgres, dan Storage privat; Vercel untuk web/API pendek; Node.js 22 untuk runner; Playwright + Chromium untuk scanner; buy CLI untuk pembayaran. Satu package manager dan lockfile di repo.

Versi patch Next.js dan dependensi di-resolve dari release resmi yang tersedia ketika build, diperiksa advisories, lalu dikunci exact dalam lockfile. Ini lebih jujur daripada menuliskan nomor patch paket yang belum diperiksa. buy skill saat diperiksa mengacu pada **@celo/buy 0.8.4**; jangan meng-upgrade tanpa menguji ulang format quote/receipt dan unit amount.

Tidak memakai Stripe, email provider berbayar, wallet SDK baru, Redis, LangGraph atau framework multi-agent. GitHub login menghindari kewajiban SMTP untuk pilot. Supabase dan Vercel free plan hanya dipakai bila akun dan penggunaan memenuhi ketentuan yang berlaku; tidak ada jaminan selalu gratis [S21](sumber-dan-verifikasi.md#s21), [S22](sumber-dan-verifikasi.md#s22).

## 2. Skills domain utama

Celopedia Skill: konteks Celo, MiniPay, ERC-8004, dan referensi checklist. Sumber [S24](sumber-dan-verifikasi.md#s24). Instalasi yang didokumentasikan: `npx skills add celo-org/celopedia-skills`.

use-api-gateway: katalog hidup, quote tepat, batas pembayaran dan penanganan kegagalan. Sumber [S02](sumber-dan-verifikasi.md#s02), [S03](sumber-dan-verifikasi.md#s03). Instalasi: `npx skills add celo-org/buy-skill --skill use-api-gateway`.

order-compute: pembelian VM, lease, polling dan rekonsiliasi. Sumber [S04](sumber-dan-verifikasi.md#s04). Instalasi: `npx skills add celo-org/buy-skill --skill order-compute`.

Tidak perlu memasang semua skill buy. SQD data-availability tidak wajib bagi produk ini; layanan data gratis tidak diperlakukan sebagai paid integration. Jangan menganggap informasi peluncuran lama mengalahkan katalog saat ini.

## 3. Skills pendukung implementasi

Vercel React Best Practices: `npx skills add vercel-labs/agent-skills --skill vercel-react-best-practices`.

Web Design Guidelines: `npx skills add vercel-labs/agent-skills --skill web-design-guidelines`.

Supabase: `npx skills add supabase/agent-skills --skill supabase`.

Sumber [S25](sumber-dan-verifikasi.md#s25) dan [S26](sumber-dan-verifikasi.md#s26). Pasang hanya di proyek coding yang benar; periksa daftar skill terbaca pada coding agent. Lokasi discovery bergantung client; jangan mengasumsikan instalasi untuk Codex identik dengan Claude Code. Dokumentasikan client dan lokasi yang benar-benar diuji.

## 4. buy CLI dan wallet

Panduan resmi mencantumkan setup dengan `npx --yes @celo/buy@0.8.4 setup --name docketrail` dan pemasangan MCP `npx --yes @celo/buy@0.8.4 mcp install --client all` [S02](sumber-dan-verifikasi.md#s02). Setup membuat wallet baru di keychain; lakukan hanya dengan pengetahuan pemilik. Jika wallet entry hackathon sudah ada, jangan membuat yang berbeda; gunakan prosedur import resmi oleh manusia tanpa mengirim key ke chat, web atau argumen command.

Runner aplikasi menggunakan CLI; MCP hanya membantu coding agent/operasi manual. Memasang MCP tidak berarti aplikasi web otomatis memiliki akses pembayaran. Periksa CLI help dan output aktual sebelum membuat pembungkus parser. Jika output terstruktur belum dapat dipastikan, G-03 tetap gagal sampai parsing aman terbukti; jangan scraping string yang dapat berubah lalu menandai transaksi berhasil.

Sebelum pembelian: identitas akun, jaringan Celo mainnet, token yang ditawarkan, saldo, budget harian dan lifetime ledger diketahui. Gateway buy menanggung gas pembelian yang didokumentasikan, tetapi registrasi ERC-8004 dan transfer di luar buy mempunyai aturan biaya sendiri.

## 5. Compute provider

Katalog gratis: https://usebuy.ai/google/catalog. Route script VM: https://usebuy.ai/google/vm. Metode/body mengikuti dokumen resmi, bukan API internal DocketRail. `/google/vm` menjalankan script, `/google/ssh` route berbeda dan tidak dipakai dalam MVP.

Script provider maksimal 4 KiB; bootstrap scanner kecil diunduh dari release DocketRail yang immutable dan diverifikasi. VM Debian tidak menjamin Node, Docker atau Chromium tersedia. Akses keluar utamanya DNS/HTTP/HTTPS/NTP; outbound lain dapat macet, sehingga seluruh network command mempunyai timeout. Tidak membutuhkan inbound port untuk upload [S04](sumber-dan-verifikasi.md#s04).

Setelah membayar, simpan response lengkap secara lokal aman, karena poll URL adalah capability rahasia. Polling hasil yang didokumentasikan tidak dibeli ulang. Terputusnya terminal tidak membuat lease gratis atau baru.

## 6. Gateway inference dan RPC

Katalog gratis: https://gateway.usebuy.ai/v1/catalog. Kemampuan yang diamati: cencori.v1.chat.completions dan chainstack.celo. Keduanya tersedia pada pengecekan, tetapi status beta/katalog dapat berubah [S06](sumber-dan-verifikasi.md#s06).

Inference teks menggunakan route/model/schema dari katalog, payload maksimal 32 KiB dan pilihan output yang diizinkan. Input bytes dicek sebelum quote. Tidak memakai vision atau tool calling yang tidak didukung. Target penggunaan maksimal tiga request per run, bukan tiga request wajib.

RPC Chainstack mendukung batch yang didokumentasikan, dibatasi lagi oleh DocketRail pada sepuluh contoh tx. Satu pembayaran dapat membeli batch yang sah; jangan memecahnya menjadi banyak panggilan semata untuk menambah transaksi. RPC membaca data chain, tidak memverifikasi source code explorer.

## 7. GitHub, PageSpeed, Supabase dan Vercel

GitHub: repo publik, commit dipin, baca tree/file terbatas, cache immutable commit. Tanggapi rate limit sesuai header; tidak memutar IP/token untuk menghindarinya [S23](sumber-dan-verifikasi.md#s23).

PageSpeed: API/laporan resmi jika tersedia; gunakan quota yang diizinkan dan catat hasil unavailable. Tidak menambah pembelian API key/subscription. Jangan memanggil PageSpeed dari browser dengan secret yang tidak perlu [S30](sumber-dan-verifikasi.md#s30).

Supabase: SSR client resmi, OAuth callback terdaftar, server secret dibedakan publishable key, RLS dan Storage privat. Signed upload per artefak; TTL dua jam sesuai dokumentasi saat diperiksa, bukan asumsi satu kali pakai [S15](sumber-dan-verifikasi.md#s15)–[S18](sumber-dan-verifikasi.md#s18).

Setup client server/browser mengikuti [panduan SSR Next.js, S17](sumber-dan-verifikasi.md#s17); kebijakan aplikasi tidak diganti dengan key service di client.

Vercel: deploy server Next.js, bukan static export; env preview/production terpisah, API pendek. Runner tidak dideploy ke Vercel. Detail limits/pricing dibaca sebelum deploy, tanpa mengunci angka quota yang bisa berubah [S19](sumber-dan-verifikasi.md#s19), [S20](sumber-dan-verifikasi.md#s20), [S22](sumber-dan-verifikasi.md#s22).

## 8. Identitas ERC-8004 dan atribusi

Identitas diperlukan oleh hackathon. Standar ERC-8004 masih berstatus Draft pada sumber EIP ketika diperiksa; implementasi registry dan jaringan harus diperiksa sebelum transaksi [S27](sumber-dan-verifikasi.md#s27). Gunakan sumber registry yang dirujuk Celo/8004scan, verifikasi chain/address, estimasi gas dan wallet owner. Dokumen ini sengaja tidak mengunci alamat registry yang belum diuji untuk operasi DocketRail.

Tidak deploy identity registry sendiri. Tidak membuat token. Agent ID proyek dicantumkan di halaman about/submission setelah benar-benar terdaftar. Catat pula payer runner yang berbeda jika pilot memakai wallet sendiri. Mekanisme agregasi kredit lintas payer perlu konfirmasi sponsor, bukan disimpulkan dari keberadaan Agent ID.

## 9. Daftar verifikasi integrasi sebelum coding lanjut

Katalog/schema hidup tersedia; CLI/keychain cocok OS; parser quote/receipt aman; unit token benar; scanner sandbox/firewall bekerja; artefak dapat diunggah tanpa service key di VM; biaya bootstrap masuk satu lease; estimasi registrasi/transfer muat envelope; source pengajuan dibaca ulang. Semua hasil dicatat sebagai lulus/gagal/belum diuji, tidak diisi asumsi sukses.
