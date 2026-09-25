"use client";

import React from "react";
import { useTender } from "@/context/TenderContext";
import { formatRupiah } from "@/lib/utils";
import {
  Scale,
  CheckCircle2,
  XCircle,
  ChevronRight,
  TrendingDown,
  Award,
} from "lucide-react";
import { TenderPackage } from "@/types/tender";

export default function LpseBiddingPage() {
  const { packages, selectedPackage, setSelectedPackage, bidders } = useTender();

  const currentBidders = bidders.filter((b) => b.tenderId === selectedPackage.id);

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-73px)] border-b-2 border-black">
      <div className="w-full lg:w-[45%] border-b-2 lg:border-b-0 lg:border-r-2 border-black p-6 space-y-6 bg-slate-50/50">
        <div>
          <div className="inline-block bg-[#FF0000] text-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
            DAFTAR PAKET TENDER ELEKTRONIK
          </div>
          <h2 className="text-2xl font-bold tracking-tight uppercase text-black font-mono">
            LELANG TENDER AKTIF
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Pilih paket untuk menelaah rincian HPS, batas kualifikasi, dan susunan penawaran vendor peserta.
          </p>
        </div>

        <div className="space-y-3">
          {packages.map((pkg) => {
            const isSelected = selectedPackage.id === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`p-5 border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-white border-2 border-black shadow-[4px_4px_0px_#000]"
                    : "bg-white border-slate-300 hover:border-black"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                  <span className="font-bold text-black bg-slate-100 px-2 py-0.5">
                    {pkg.codeLpse}
                  </span>
                  <span className="text-[#FF0000] font-bold uppercase">
                    {pkg.procurementType.replace(/_/g, " ")}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-black leading-snug">
                  {pkg.title}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-1">{pkg.agency}</p>

                <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-end font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">NILAI HPS:</span>
                    <span className="font-bold text-black text-sm">
                      {formatRupiah(pkg.hpsBudgetNominalIdr)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">PESERTA:</span>
                    <span className="font-bold text-black">{pkg.biddersCount} Vendor</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full lg:w-[55%] p-6 md:p-8 space-y-6 bg-white">
        <div className="border-b-2 border-black pb-4">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
            DOSIR PAKET PENGADAAN
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-black leading-tight">
            {selectedPackage.title}
          </h2>
          <p className="text-xs font-mono text-slate-600 mt-1">
            Satuan Kerja: {selectedPackage.agency} • Tahun Anggaran {selectedPackage.fiscalYear}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 font-mono">
          <div className="border border-black p-4 bg-slate-50">
            <span className="text-[10px] text-slate-500 block uppercase">
              PAGU ANGGARAN (DIPA):
            </span>
            <div className="text-lg font-bold text-black mt-1">
              {formatRupiah(selectedPackage.ceilingBudgetPaguIdr)}
            </div>
          </div>

          <div className="border border-black p-4 bg-slate-50">
            <span className="text-[10px] text-slate-500 block uppercase">
              HARGA PERKIRAAN SENDIRI (HPS):
            </span>
            <div className="text-lg font-bold text-[#FF0000] mt-1">
              {formatRupiah(selectedPackage.hpsBudgetNominalIdr)}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs border-b border-black pb-2">
            <span className="font-bold uppercase text-black">
              SUSUNAN PENAWARAN HARGA & KUALIFIKASI VENDOR
            </span>
            <span className="text-slate-500">{currentBidders.length} Penawaran Masuk</span>
          </div>

          <div className="overflow-x-auto border border-black">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-black text-white text-[11px] uppercase">
                  <th className="p-2.5 text-center w-8">RK</th>
                  <th className="p-2.5">NAMA PERUSAHAAN</th>
                  <th className="p-2.5 text-right">PENAWARAN (IDR)</th>
                  <th className="p-2.5 text-center">DISKON HPS</th>
                  <th className="p-2.5 text-center">TEKNIS</th>
                  <th className="p-2.5 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {currentBidders.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="p-2.5 text-center font-bold">#{b.ranking}</td>
                    <td className="p-2.5">
                      <div className="font-bold text-black">{b.companyName}</div>
                      <div className="text-[10px] text-slate-400">NPWP: {b.npwp}</div>
                    </td>
                    <td className="p-2.5 text-right font-bold text-black">
                      {formatRupiah(b.bidPriceIdr)}
                    </td>
                    <td className="p-2.5 text-center text-[#FF0000] font-bold">
                      -{b.hpsDiscountPct}%
                    </td>
                    <td className="p-2.5 text-center font-bold">
                      {b.technicalScore}
                    </td>
                    <td className="p-2.5 text-center">
                      <span
                        className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          b.status === "CALON_PEMENANG"
                            ? "bg-[#FF0000] text-white"
                            : b.status === "LULUS_EVALUASI"
                            ? "bg-black text-white"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {b.status.replace(/_/g, " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
