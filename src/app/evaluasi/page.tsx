"use client";

import React from "react";
import { useTender } from "@/context/TenderContext";
import { formatRupiah } from "@/lib/utils";

export default function BidderEvaluationPage() {
  const { bidders } = useTender();

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6 font-mono">
      <div className="border-2 border-black p-6 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-block bg-[#FF0000] text-white px-2 py-0.5 text-[10px] font-bold uppercase mb-2">
            POKJA PEMILIHAN // EVALUASI KUALIFIKASI PENAWARAN
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-black">
            BIDDER EVALUATION SCOREBOARD
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Pemeriksaan dokumen kualifikasi teknis dan penyesuaian skor komposit.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {bidders.map((b) => (
          <div key={b.id} className="p-5 border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
            <h4 className="font-bold text-sm text-black leading-snug">{b.companyName}</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">{b.npwp}</p>

            <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Harga Penawaran:</span>
                <span className="font-bold text-black">{formatRupiah(b.bidPriceIdr)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nilai Teknis:</span>
                <span className="font-bold text-black">{b.technicalScore}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Skor Komposit Akhir:</span>
                <span className="font-bold text-black text-sm">{b.totalCompositeScore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}