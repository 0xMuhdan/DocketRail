# Sumber, dokumentasi, dan status verifikasi

Tanggal pemeriksaan: **1 November 2026, Asia/Jakarta**. Sumber resmi diutamakan. Nomor Sxx dipakai seluruh dokumen agar builder tidak mencari ulang. Isi dokumen adalah parafrasa ringkas dan rancangan DocketRail; paket tidak menyalin keseluruhan dokumen sponsor.

## Cara membaca status

Terbaca: halaman/dokumen sumber dapat diperiksa. Katalog: endpoint JSON dibaca tanpa pembayaran. Referensi resmi: catatan dari repo organisasi, yang dapat lebih tua daripada dokumentasi primer. Belum diuji runtime: kapabilitas tersedia di dokumen tetapi belum dibuktikan oleh implementasi DocketRail. Aturan/pricing dapat berubah; cek ulang bagian yang dipakai tepat sebelum transaksi atau submit.

## S01

[Agents on Open Rails — Loops House](https://www.loops.house/agents-on-open-rails)

Primer; halaman dan data tab sponsor diperiksa. Dipakai untuk rubric 40/35/25, deadline, mainnet, identitas dan FAQ. Konflik diketahui: tab/teks menyebut tagged wallet, FAQ Buy mengatakan tidak perlu tag dan x402 belum mendukungnya. Perlakukan sebagai hal yang harus dikonfirmasi untuk kredit proyek. Total peserta dan eligibility solo/AI spesifik belum terverifikasi dari halaman publik.

## S02

[buy-skill README](https://github.com/celo-org/buy-skill)

Repo resmi Celo. Rujukan skill, CLI/MCP, keychain dan instalasi. Skill tidak membayar sendiri. Versi yang dirujuk saat dibaca: @celo/buy 0.8.4. Belum dipasang atau diuji di komputer pengguna.

## S03

[Use API Gateway skill](https://github.com/celo-org/buy-skill/blob/main/skills/use-api-gateway/SKILL.md)

Resmi; katalog, quote dan batas retry. Browser rental tidak mendokumentasikan network capture, viewport custom atau arbitrary evaluation; jangan mengasumsikan CDP endpoint tersedia. Gateway Cencori teks dan Chainstack batch mempunyai schema/batas khusus. Live paid requests belum diuji.

## S04

[Order Compute skill](https://github.com/celo-org/buy-skill/blob/main/skills/order-compute/SKILL.md)

Resmi; VM Debian sementara, script 4 KiB, polling, lease, mainnet dan kegagalan setelah pembayaran. Tidak menjamin Chromium sudah terpasang atau bundle DocketRail berhasil. Tidak ada pembelian dibuat dalam riset paket ini.

## S05

[Katalog VM live](https://usebuy.ai/google/catalog)

JSON gratis, dibaca melalui HTTP langsung. Snapshot riset: network celo, leaseSeconds 3600; e2-medium 4 GiB, harga indikatif 0,067011 USD, tanpa attestation pada entry tersebut. Harga/schema dapat berubah, quote tepat tetap penentu.

## S06

[Katalog gateway live](https://gateway.usebuy.ai/v1/catalog)

JSON gratis, dibaca melalui HTTP langsung. browser.sessions.create, chainstack.celo dan cencori.v1.chat.completions terlihat tersedia saat riset. Cencori berlabel closed beta. Tidak mengasumsikan availability masa depan, semua service berbayar, atau semua kemampuan listing sudah diuji.

## S07

[Submit your MiniApp — MiniPay](https://docs.minipay.xyz/getting-started/submit-your-miniapp.html)

Primer; listing fields dan kebutuhan bahan pengajuan. Dokumen menyatakan tidak ada config/manifest repo untuk mendaftarkan listing. Network manifest merupakan inventaris bahan; jangan menciptakan standar .well-known sendiri. Halaman tidak memberi jaminan approval dari hasil DocketRail.

## S08

[MiniPay requirements — Celopedia](https://github.com/celo-org/celopedia-skills/blob/main/skills/celopedia-skill/references/minipay-requirements.md)

Referensi resmi organisasi Celo; menjelaskan intake dan readiness serta checklist tambahan. Catatan sumber bertanggal 10 September 2026. Rincian form dan ketentuan tambahan perlu verifikasi primer ketika dipakai; jangan menyatakan seluruh detail form terkini telah diekstrak langsung.

[Form publik MiniPay](https://developer.minipay.to/mini-app-listing)

Halaman terbaca, tetapi seluruh field interaktif belum dapat diperiksa melalui ekstraksi teks. Gunakan form sebagai rujukan pengajuan, bukan bukti bahwa format internal DocketRail adalah format resminya.

## S09

[Test in MiniPay](https://docs.minipay.xyz/getting-started/test-in-minipay.html)

Primer; Developer Mode dan pengujian pada aplikasi MiniPay di perangkat. Testnet dan mainnet target berbeda. Browser viewport emulation tidak membuktikan perilaku wallet asli.

## S10

[UI and container](https://docs.minipay.xyz/getting-started/ui-and-container.html)

Primer; viewport minimum 360×640 dan perilaku container. Digunakan untuk ukuran pemeriksaan web, bukan mengklaim emulasi penuh MiniPay.

## S11

[MiniPay best practices](https://docs.minipay.xyz/getting-started/best-practices.html)

Primer; provider, koneksi otomatis dan penanganan keadaan wallet. Source-code hint tidak sama dengan hasil tes perangkat. Klaim compliance perlu pemeriksaan sesuai konteks.

## S12

[Playwright Network](https://playwright.dev/docs/network)

Primer; browser network events dan batas pengamatan. Tidak membuktikan semua endpoint backend atau cabang yang belum dijalankan.

## S13

[Playwright Emulation](https://playwright.dev/docs/emulation)

Primer; viewport/device-parameter emulation. Bukan pengganti instalasi MiniPay fisik.

## S14

[Playwright Screenshots](https://playwright.dev/docs/screenshots)

Primer; screenshot halaman/elemen dan opsi capture. Pengolahan dan batas ukuran paket DocketRail adalah keputusan produk, bukan syarat global Playwright.

## S15

[Supabase createSignedUploadUrl](https://supabase.com/docs/reference/javascript/storage-from-createsigneduploadurl)

Primer; upload capability dan masa berlaku dua jam menurut dokumentasi saat diperiksa. Jangan mengklaim sekali pakai atau expiry kustom lebih pendek tanpa dukungan yang dibuktikan.

[Storage access control](https://supabase.com/docs/guides/storage/security/access-control)

Primer; kebijakan akses Storage. Finalisasi artefak dan otorisasi run masih harus dibangun di DocketRail.

## S16

[Postgres Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)

Primer; dasar isolasi data pengguna. RLS harus ditulis dan diuji, tidak otomatis aman karena Supabase digunakan.

## S17

[Supabase SSR client for Next.js](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs)

Primer; auth client server/browser dan validasi sesi. Dokumentasi redirect dari URL lama /nextjs telah diikuti saat riset.

## S18

[Supabase GitHub sign-in](https://supabase.com/docs/guides/auth/social-sign-in/auth-github)

Primer; OAuth provider setup. Callback dan credentials nyata berasal dari akun pemilik. Login GitHub bukan izin repo privat.

## S19

[Next.js deployment](https://nextjs.org/docs/app/getting-started/deploying)

Primer; pilihan deployment. Path lama /docs/app/guides/deploying mengembalikan 404 saat riset, sehingga tidak dipakai sebagai rujukan. Paket memilih deployment server karena membutuhkan auth/API.

## S20

[Vercel Functions limits](https://vercel.com/docs/functions/limitations)

Primer; batas fungsi bergantung plan/runtime. Digunakan untuk keputusan tidak menunggu VM dalam request dan membatasi ekspor; tidak mengunci angka quota yang belum dipastikan untuk akun pengguna.

## S21

[Supabase pricing](https://supabase.com/pricing)

Primer; free plan ada dan mencantumkan kemungkinan pause setelah inactivity. Kelayakan akun, kapasitas, retensi dan backup harus diperiksa saat membuat project. Tidak menganggap PITR tersedia gratis.

## S22

[Vercel pricing](https://vercel.com/pricing)

Primer; plan dan batas penggunaan. Tidak ada hosting berbayar yang diotorisasi dalam anggaran US$1. Periksa ketentuan penggunaan Hobby sebelum menerapkan produk komersial.

## S23

[GitHub REST API rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)

Primer; batas read API dan header retry. Tidak membuat token/IP tambahan untuk menghindari batas.

## S24

[Celopedia Skills](https://github.com/celo-org/celopedia-skills)

Resmi; referensi Celo/MiniPay dan cara pemasangan. Isinya panduan, bukan bukti aplikasi pengguna telah diperiksa. Tidak seluruh referensinya selalu lebih mutakhir daripada dokumen primer.

## S25

[Vercel Agent Skills](https://github.com/vercel-labs/agent-skills)

Resmi; React best practices dan web design guidelines. Nama skill React diperiksa pada frontmatter: vercel-react-best-practices. Pemasangan pada coding client pengguna belum dilakukan.

## S26

[Supabase Agent Skills](https://github.com/supabase/agent-skills)

Resmi; skill supabase untuk auth/database/storage. Tidak otomatis memasang project Supabase atau memberi izin secret.

## S27

[ERC-8004 standard](https://eips.ethereum.org/EIPS/eip-8004)

Primer; status Draft saat diperiksa. Registry deployment aktual, ownership dan gas harus diverifikasi pada Celo sebelum registrasi. Tidak deploy registry sendiri untuk memenuhi entry.

[8004scan](https://8004scan.io)

Explorer yang dirujuk halaman hackathon; prosedur registrasi/biaya DocketRail belum diuji. Jangan menganggap klik registrasi sudah dilakukan oleh paket dokumen.

## S28

[Pengumuman peluncuran buy — Celo Devs](https://celo-devs.beehiiv.com/p/buy-is-live-on-celo-the-service-marketplace-for-ai-agents)

Pengumuman resmi 13 Oktober 2026: tugas nyata, layanan yang dipakai dan proof of payment. Informasi peluncuran tidak mengalahkan katalog hari ini; khususnya jangan mengasumsikan semua data SQD selalu berbayar.

## S29

[Livestream Build with buy](https://www.youtube.com/live/w1A_mP3r8aQ)

Identitas link dikonfirmasi melalui referensi resmi Celo sebagai acara 13 Oktober bersama Cencori, Chainstack dan SQD. Halaman video/transkrip tidak berhasil diakses pada riset ini. Paket tidak mengutip pembicara, timestamp atau detail demo dari video.

## S30

[Google PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)

Primer; pengukuran performa dan API/report. Ketersediaan field, quota dan API key perlu mengikuti dokumentasi saat integrasi. Tidak menciptakan ambang kelulusan MiniPay sendiri.

## S31

[Contoh bahan pengajuan Celo Games Portal](https://github.com/PhilV2dot1/celo-games-portal/blob/master/MINIPAY_SUBMISSION.md)

Sumber proyek publik; bukti bahwa bahan pengajuan disusun developer. Bukan pengguna DocketRail, bukan endorsement, bukan bukti listing diterima dan bukan acuan compliance terkini. Tidak menyalin rincian teknis/branding dari proyek tersebut.

## Hal yang masih memerlukan bukti implementasi

- CLI/keychain pada OS pengguna, format output quote/receipt, dan proses pairing.
- Scanner sandbox/firewall di Debian VM buy, instalasi Chromium, waktu bootstrap dan upload hasil.
- Gas identitas dan biaya pendanaan nyata; apakah semua kebutuhan muat US$1.
- Cara sponsor mengatribusikan pembelian dari beberapa payer independen ke satu entry.
- Eligibility solo dan aturan penggunaan coding AI spesifik event.
- Rincian readiness/form yang diterima developer dan setiap perubahan aturan setelah tanggal pemeriksaan.
- Manfaat waktu, kemauan memakai/membayar, dan hasil pilot independen.

Tidak ada bagian tersebut diisi dengan klaim “sudah beres” dalam dokumen final ini. Status belum diuji adalah informasi build yang diperlukan, bukan instruksi membeli layanan tanpa batas.
