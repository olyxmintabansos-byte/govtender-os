# 🏛️ GovTender OS (Titan #25)
### LKPP LPSE Public Procurement Tender Bidding Matrix & Official SPPBJ Stamped A4 Studio

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/Status-100%25%20Production%20Live-brightgreen)](https://olyxmintabansos-byte.github.io/govtender-os/)
[![Milestone](https://img.shields.io/badge/Milestone-Titan%20%2325%20Silver%20Halfway%20(25%2F50)-red)]()

> **Live Deployment:** [https://olyxmintabansos-byte.github.io/govtender-os/](https://olyxmintabansos-byte.github.io/govtender-os/)  
> **Aesthetic Movement:** **#3 Minimalism + #29 Split-Screen Layout (Swiss Typographic Style with Stark Red `#FF0000` Accent)**  
> **Organization:** `olyxmintabansos-byte`

---

## 🎯 Architectural Overview

GovTender OS adalah sistem pengadaan barang/jasa pemerintah berbasis web client-side berstandar **SPSE v4.5 LKPP (Lembaga Kebijakan Pengadaan Barang/Jasa Pemerintah)** dan Perpres No. 12 Tahun 2021. Dirancang dengan disiplin Swiss Typographic Grid (Josef Müller-Brockmann) serta layout split-screen asimetris berdaya responsif tinggi.

### 4 Rute Produksi:
1. **`/` (LPSE Tender Bidding Split-Screen Matrix)**: Feed tender LPSE interaktif di sisi kiri (45%) dan drilldown HPS vs penawaran vendor di sisi kanan (55%).
2. **`/evaluasi/` (Bidder Qualification Scoring & Price Anomaly)**: Penilaian kualifikasi administrasi/teknis dan deteksi harga dumping (<80% HPS).
3. **`/sanggah/` (Masa Sanggah & Klarifikasi Dokumen Lelang)**: Countdown masa sanggah 48 jam, log sanggahan publik, dan formulir sanggah banding dengan jaminan 1% HPS.
4. **`/pemenang/` (Surat Penetapan Pemenang SPPBJ & BAHP A4)**: Dokumen formal negara berstempel digital dinamis, barcode verifikasi, dan format cetak A4 presisi (`window.print()`).

---

*Part of The 50 Enterprise Titans Sovereign Fleet • Engineered by Antigravity Chief Systems Architect*
