# DocketRail

**Your app. Your evidence. Ready for review.**

Track: **Build with buy, Agents on Open Rails** • Hackathon Submission Baseline

DocketRail is an autonomous workspace that turns functional MiniPay applications into verifiable, audit-ready submission dossiers with traceable evidence, deterministic origin inventories, and actionable missing-item lists.

---

## Try as a Judge

1. **Open the Web Application**: Visit [http://localhost:3000](http://localhost:3000) in your browser.
2. **Explore the 3D Interactive Pipeline**: Toggle between **3D Isometric View** and **Flat View** to trace how DocketRail consumes x402 services from ingestion to final ZIP assembly.
3. **Inspect the Sample Dossier**: Review the live **Readiness Evaluation Matrix (8 canonical MiniPay standards)**, the **$1.00 Budget Ledger Meter**, and the **Network Origins Inventory**.
4. **Test Deterministic Export Assembly**: Navigate to `/projects/sample-proj-101/runs/sample-run-202`, click **Export Dossier**, acknowledge the bounds, and assemble the tamper-evident ZIP package containing Markdown, formula-injection-defended CSVs, and SHA-256 indices.
5. **No Payment Required for Judges**: Exploring sample dossiers and reading audit findings is completely free and requires zero login or gas expenditure.

---

## Run Locally

Five tested commands from a fresh repository checkout:

```bash
# 1. Install workspace dependencies
pnpm install

# 2. Build contracts, scanner, reporting packages, and web app
pnpm run build

# 3. Start the Next.js web control plane (opens at http://localhost:3000)
pnpm --filter @docketrail/web run dev

# 4. Pair your local runner with the web control plane (in a new terminal)
pnpm --filter @docketrail/runner run start pair

# 5. Start the local runner execution coordinator
pnpm --filter @docketrail/runner run start start
```

To run a standalone local inspection without x402 payments:
```bash
pnpm --filter @docketrail/runner run start scan-local https://celo.org
```

To execute the automated unit and acceptance test suite (12 tests):
```bash
pnpm test
```

---

## The Problem Solved

Developers who build functional mini-apps on Celo still face a grueling manual intake and readiness submission process for the official MiniPay Directory:
- **Network Origins Hunting**: Manually inspecting browser network tabs to identify and declare every external API, WebSocket, and font domain.
- **Responsive Screen Auditing**: Capturing screenshots at exact mobile dimensions (360×640) and verifying horizontal scroll overflow.
- **On-Chain Evidence Gathering**: Locating verified contracts and sample transaction receipts on Celo Mainnet.
- **High Rejection Risk**: Rejections from unhandled console errors or broken support/terms links that delay public listing by weeks.

This manual process costs solo builders and small teams **10 to 20 hours** of tedious, error-prone work.

---

## The Solution & What Changed

DocketRail replaces manual auditing with an automated, non-custodial pipeline:

- **Automated Mobile Scan**: Headless Playwright runs in an isolated ephemeral VM, capturing 360×640 viewports and intercepting all outbound network traffic behind an SSRF firewall.
- **8 Canonical Evaluations**: Deterministic checks evaluate HTTPS enforcement, responsive viewport widths, legal/support links, console exceptions, and Celo Mainnet (Chain ID 42220) alignment.
- **Tamper-Evident Dossier**: Compiles a deterministic ZIP (≤ 10 MB) containing `submission.md`, `requirements.csv` (with spreadsheet formula injection defense), `network-inventory.csv`, `contracts.csv`, and `evidence-index.json`.
- **Zero Web3 Friction for Builders**: Developers do not need to manage gas tokens, x402 protocols, or RPC connections. They simply enter their HTTPS URL and review the generated dossier.

---

## Hackathon Judging Criteria Alignment

| Criteria & Weight | How DocketRail Directly Satisfies the Rubric |
| :--- | :--- |
| **Use Case Quality (40%)** | Solves a concrete, painful task that MiniPay developers perform today. Replaces days of manual compliance checking with an automated, deterministic pipeline. Non-custodial: private keys stay in local keychain. |
| **Integration Depth (35%)** | Directly consumes **three distinct x402 services** on Celo Mainnet via `@celo/buy`: (1) Ephemeral Debian compute (`usebuy.ai/google/vm`), (2) Batch RPC (`chainstack.celo`), and (3) LLM synthesis (`cencori.v1.chat.completions`). Operates under an enforced **$1.00 hard budget ceiling**. |
| **Demand Created (25%)** | Every MiniPay submission audit creates recurring paid counterparties and on-chain transactions on Celo Mainnet for the compute, RPC, and AI services consumed ($0.08–$0.12 per full audit run). |

---

## Architecture & Monorepo Structure

```
DocketRail Monorepo (pnpm + Node.js 22)
├── apps/
│   ├── web/           # Next.js 16 App Router (Control Plane UI & Route Handlers)
│   └── runner/        # Node.js 22 CLI Coordinator (Pairing, Local Journal, @celo/buy Wrapper)
├── packages/
│   ├── contracts/     # Single Source of Truth (Enums, Constants, Zod Schemas, Types)
│   ├── scanner/       # Playwright 360×640 Mobile Collector & SSRF Firewall
│   └── reporting/     # Deterministic Export Package Generator (Markdown, CSV, ZIP)
├── supabase/
│   └── migrations/    # PostgreSQL DDL, RLS Policies, Atomic Budget Functions, Catalog Seed
└── docs/              # 14 Technical Specifications + 7 Architectural Diagrams
```

![System Architecture](docs/diagrams/arsitektur.svg)

---

## Strict Security & Non-Custodial Boundaries

1. **Non-Custodial Architecture**: The web server never stores, receives, or proxies private keys. All blockchain payments execute through the local runner CLI with explicit interactive terminal approval (`[y/N]`).
2. **Hard Spend Ceiling ($1.00 USD)**: Atomic PostgreSQL ledger functions (`reserve_budget` and `settle_budget`) enforce a strict 1,000,000 micro-USD cap. Ambiguous settlements fail-closed without automated retries.
3. **SSRF & Network Firewall**: The scanner actively blocks private IPv4/IPv6 ranges (RFC 1918), loopback, link-local metadata endpoints (`169.254.169.254`), and intranet domains.
4. **Spreadsheet Formula Injection Defense**: All exported CSV cells starting with `=`, `+`, `-`, `@`, or tabs are sanitized with a leading quote `'` to prevent remote code execution in spreadsheet viewers.

---

## Technical Specifications & Diagrams

Detailed design documents are located in `docs/`:

- [PRD & Product Scope](docs/prd.md)
- [Architecture & Boundaries](docs/arsitektur.md)
- [Data Contracts & API](docs/kontrak-data-dan-api.md)
- [Agent & Evidence Quality](docs/agent-dan-bukti.md)
- [Integrations & Agent Skills](docs/integrasi-dan-skills.md)
- [Budget & Payment Contracts](docs/anggaran-dan-pembayaran.md)
- [Security & Privacy](docs/keamanan-dan-privasi.md)
- [Operations & Recovery](docs/operasional-dan-pemulihan.md)
- [Testing & Acceptance](docs/pengujian-dan-penerimaan.md)
- [Build & Deploy Sequence](docs/build-dan-deploy.md)
- [Pitch & Submission Guide](docs/pitch-dan-submission.md)
- [Sources & Verification Index](docs/sumber-dan-verifikasi.md)
- [Package Verification Audit](docs/pemeriksaan-paket.md)

### Architectural Diagrams
- [System Context](docs/diagrams/konteks.svg) · [Mermaid Source](docs/diagrams/konteks.mmd)
- [Architecture](docs/diagrams/arsitektur.svg) · [Mermaid Source](docs/diagrams/arsitektur.mmd)
- [Execution Run Sequence](docs/diagrams/urutan-run.svg) · [Mermaid Source](docs/diagrams/urutan-run.mmd)
- [Run State Machine](docs/diagrams/state-run.svg) · [Mermaid Source](docs/diagrams/state-run.mmd)
- [Payment State Machine](docs/diagrams/pembayaran.svg) · [Mermaid Source](docs/diagrams/pembayaran.mmd)
- [Data Relations ERD](docs/diagrams/data.svg) · [Mermaid Source](docs/diagrams/data.mmd)
- [Release Gates](docs/diagrams/release.svg) · [Mermaid Source](docs/diagrams/release.mmd)

---

## License & Attribution

Built for the **Celo Build with buy • Agents on Open Rails** Hackathon.
License: MIT
