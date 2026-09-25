"use client";

import React from "react";
import { useTender } from "@/context/TenderContext";
import { formatRupiah } from "@/lib/utils";
import {
  Printer,
  ShieldCheck,
  CheckCircle,
  FileCheck2,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function PemenangPage() {
  const { selectedPackage, bidders } = useTender();

  const qualifiedBidders = bidders
    .filter((b) => b.tenderId === selectedPackage.id && b.adminDocPass)
    .sort((a, b) => b.totalCompositeScore - a.totalCompositeScore);

  const winner = qualifiedBidders[0] || bidders[0];
  const runnerUp = qualifiedBidders[1];
  const thirdPlace = qualifiedBidders[2];

  const handlePrint = () => {
    confetti({ particleCount: 50, spread: 70 });
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="border-2 border-black p-4 bg-white font-mono flex items-center justify-between print:hidden">
        <div>
          <h2 className="text-xl font-bold uppercase text-black">
            DOKUMEN RESMI PENETAPAN PEMENANG (SPPBJ & BAHP)
          </h2>
          <p className="text-xs text-slate-500">
            Format Standar Perpres No. 12 Tahun 2021 // Siap Cetak Lembar Arsip A4
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-6 py-2.5 bg-black text-white hover:bg-[#FF0000] font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-2 transition-all"
        >
          <Printer className="w-4 h-4" />
          CETAK DOKUMEN RESMI A4 / PDF
        </button>
      </div>

      {/* A4 Document Canvas */}
      <div className="max-w-[850px] mx-auto bg-white border-2 border-black p-10 font-serif shadow-xl text-black space-y-6 print:border-none print:shadow-none print:p-0 print:m-0">
        {/* Kop Surat LKPP */}
        <div className="border-b-4 border-double border-black pb-4 text-center font-sans">
          <div className="text-xs font-bold tracking-widest uppercase text-slate-700">
            PEMERINTAH REPUBLIK INDONESIA
          </div>
          <div className="text-lg font-black tracking-tight uppercase text-black">
            {selectedPackage.agency.toUpperCase()}
          </div>
          <div className="text-xs font-semibold tracking-normal uppercase text-slate-800">
            POKJA PEMILIHAN PENGADAAN BARANG / JASA PEMERINTAH (UKPBJ)
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Gedung LPSE Lt. 3 // Sistem Pengadaan Secara Elektronik (SPSE v4.5) // Verifikasi Hash: 0x9AF24B77C
          </div>
        </div>

        {/* Judul Surat */}
        <div className="text-center space-y-1">
          <div className="text-sm font-bold underline uppercase tracking-wider">
            BERITA ACARA HASIL PEMILIHAN (BAHP) & PENETAPAN PEMENANG
          </div>
          <div className="text-xs font-mono text-slate-600">
            NOMOR: BAHP-LPSE/{selectedPackage.codeLpse}/IX/2026
          </div>
        </div>

        {/* Isi Surat */}
        <div className="text-xs leading-relaxed space-y-4">
          <p>
            Pada hari ini, <strong>Jumat</strong> tanggal <strong>Dua Puluh Lima</strong> bulan <strong>September</strong> tahun <strong>Dua Ribu Dua Puluh Enam</strong>, bertempat di Kantor Pokja Pemilihan UKPBJ, telah dilaksanakan Rapat Pleno Evaluasi Akhir dan Penetapan Pemenang Penyedia Barang/Jasa untuk paket pengadaan:
          </p>

          <table className="w-full text-xs border border-black font-sans my-2">
            <tbody>
              <tr className="border-b border-black">
                <td className="p-2 font-bold w-1/3 bg-zinc-100">Kode Tender / RUP</td>
                <td className="p-2 font-mono font-bold">{selectedPackage.codeLpse}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-2 font-bold bg-zinc-100">Nama Paket Pengadaan</td>
                <td className="p-2 font-bold">{selectedPackage.title}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-2 font-bold bg-zinc-100">Instansi / Satuan Kerja</td>
                <td className="p-2">{selectedPackage.agency}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="p-2 font-bold bg-zinc-100">Nilai HPS (Harga Perkiraan Sendiri)</td>
                <td className="p-2 font-mono font-bold">{formatRupiah(selectedPackage.hpsBudgetNominalIdr)}</td>
              </tr>
              <tr>
                <td className="p-2 font-bold bg-zinc-100">Metode Pemilihan</td>
                <td className="p-2">Tender Pascakualifikasi Satu File - Sistem Nilai</td>
              </tr>
            </tbody>
          </table>

          <p>
            Berdasarkan hasil pembukaan penawaran, evaluasi administrasi, kualifikasi teknis, harga, dan pembuktian kualifikasi lapangan, dengan ini Pokja Pemilihan menetapkan urutan pemenang sebagai berikut:
          </p>

          {/* Tabel Pemenang */}
          <table className="w-full text-xs border border-black font-sans text-center">
            <thead className="bg-black text-white font-mono text-[11px]">
              <tr>
                <th className="p-2 border border-black">STATUS</th>
                <th className="p-2 border border-black text-left">NAMA PENYEDIA & NPWP</th>
                <th className="p-2 border border-black">HARGA PENAWARAN (IDR)</th>
                <th className="p-2 border border-black">SKOR TEKNIS</th>
                <th className="p-2 border border-black">SKOR AKHIR</th>
              </tr>
            </thead>
            <tbody>
              {winner && (
                <tr className="border-b border-black bg-zinc-50 font-bold">
                  <td className="p-2 border border-black text-[#FF0000]">PEMENANG UTAMA</td>
                  <td className="p-2 border border-black text-left">
                    <div>{winner.companyName}</div>
                    <div className="text-[10px] text-slate-500 font-mono font-normal">NPWP: {winner.npwp}</div>
                  </td>
                  <td className="p-2 border border-black font-mono">{formatRupiah(winner.bidPriceIdr)}</td>
                  <td className="p-2 border border-black font-mono">{winner.technicalScore}</td>
                  <td className="p-2 border border-black font-mono text-base">{winner.totalCompositeScore}</td>
                </tr>
              )}
              {runnerUp && (
                <tr className="border-b border-black">
                  <td className="p-2 border border-black font-bold">CADANGAN 1</td>
                  <td className="p-2 border border-black text-left">
                    <div>{runnerUp.companyName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">NPWP: {runnerUp.npwp}</div>
                  </td>
                  <td className="p-2 border border-black font-mono">{formatRupiah(runnerUp.bidPriceIdr)}</td>
                  <td className="p-2 border border-black font-mono">{runnerUp.technicalScore}</td>
                  <td className="p-2 border border-black font-mono">{runnerUp.totalCompositeScore}</td>
                </tr>
              )}
              {thirdPlace && (
                <tr className="border-b border-black">
                  <td className="p-2 border border-black font-bold">CADANGAN 2</td>
                  <td className="p-2 border border-black text-left">
                    <div>{thirdPlace.companyName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">NPWP: {thirdPlace.npwp}</div>
                  </td>
                  <td className="p-2 border border-black font-mono">{formatRupiah(thirdPlace.bidPriceIdr)}</td>
                  <td className="p-2 border border-black font-mono">{thirdPlace.technicalScore}</td>
                  <td className="p-2 border border-black font-mono">{thirdPlace.totalCompositeScore}</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="p-3 bg-zinc-50 border border-black font-mono text-[11px] space-y-1">
            <div className="font-bold text-black flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              EFISIENSI ANGGARAN NEGARA TERWUJUD:
            </div>
            <p className="text-slate-700">
              Penetapan pemenang ini menghemat anggaran belanja daerah sebesar{" "}
              <strong>{formatRupiah(selectedPackage.hpsBudgetNominalIdr - (winner?.bidPriceIdr || 0))}</strong>{" "}
              ({winner?.hpsDiscountPct}% di bawah HPS yang ditetapkan).
            </p>
          </div>
        </div>

        {/* Tanda Tangan & Stempel Resmi LKPP */}
        <div className="pt-8 flex justify-between items-end font-sans">
          {/* QR Code Verifikasi */}
          <div className="border border-black p-3 text-center space-y-1 bg-white">
            <div className="w-20 h-20 bg-black text-white flex flex-col items-center justify-center text-[9px] font-mono mx-auto p-1 leading-tight">
              <span>[QR CODE]</span>
              <span className="text-[7px]">VERIFIKASI</span>
              <span className="text-[7px]">LKPP-RI</span>
            </div>
            <div className="text-[8px] font-mono text-slate-500">
              KODE RESMI VALIDASI
            </div>
          </div>

          {/* Stempel Pokja & Tanda Tangan */}
          <div className="text-center space-y-1 relative pr-6">
            {/* Digital Stamp Simulation */}
            <div className="absolute -top-6 left-2 w-28 h-28 border-4 border-dashed border-[#FF0000]/60 rounded-full flex flex-col items-center justify-center text-[8px] font-bold text-[#FF0000]/70 uppercase rotate-12 pointer-events-none">
              <span>POKJA PEMILIHAN</span>
              <span className="text-[10px]">TERVERIFIKASI</span>
              <span>LKPP RI 2026</span>
            </div>

            <div className="text-xs">Ditetapkan oleh:</div>
            <div className="text-xs font-bold uppercase">
              KETUA POKJA PEMILIHAN PENGADAAN
            </div>
            <div className="h-16"></div>
            <div className="text-xs font-bold underline uppercase">
              IR. BAMBANG SUTRISNO, M.T.
            </div>
            <div className="text-[10px] text-slate-600 font-mono">
              NIP: 19780412 200212 1 003
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
