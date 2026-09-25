"use client";

import React, { useState } from "react";
import { useTender } from "@/context/TenderContext";
import { formatRupiah } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sliders,
  ShieldCheck,
  Scale,
} from "lucide-react";

export default function BidderEvaluationPage() {
  const { bidders, updateBidderScore, disqualifyBidder, restoreBidder } = useTender();
  const [selectedBidderId, setSelectedBidderId] = useState<string>(bidders[0].id);

  const selectedBidder = bidders.find((b) => b.id === selectedBidderId) || bidders[0];

  const handleScoreChange = (score: number) => {
    updateBidderScore(selectedBidder.id, score);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6">
      <div className="border-2 border-black p-6 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono">
        <div>
          <div className="inline-block bg-[#FF0000] text-white px-2 py-0.5 text-[10px] font-bold uppercase mb-2">
            POKJA PEMILIHAN // EVALUASI KUALIFIKASI PENAWARAN
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-black">
            BIDDER EVALUATION SCOREBOARD
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Pemeriksaan dokumen kualifikasi teknis, verifikasi jaminan penawaran, dan penyesuaian skor komposit (60% Teknis + 40% Harga).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
        {bidders.map((b) => {
          const isSelected = selectedBidderId === b.id;
          return (
            <div
              key={b.id}
              onClick={() => setSelectedBidderId(b.id)}
              className={`p-5 border cursor-pointer transition-all ${
                isSelected
                  ? "border-2 border-black bg-white shadow-[4px_4px_0px_#000]"
                  : "border-slate-300 bg-slate-50/40 hover:border-black"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-black text-sm">#{b.ranking}</span>
                <span
                  className={`px-2 py-0.5 text-[9px] font-bold uppercase ${
                    b.status === "CALON_PEMENANG"
                      ? "bg-[#FF0000] text-white"
                      : b.status === "LULUS_EVALUASI"
                      ? "bg-black text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {b.status.replace(/_/g, " ")}
                </span>
              </div>

              <h4 className="font-bold text-sm text-black leading-snug">{b.companyName}</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">{b.npwp}</p>

              <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Harga Penawaran:</span>
                  <span className="font-bold text-black">{formatRupiah(b.bidPriceIdr)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Nilai Teknis (Min 70):</span>
                  <span className={`font-bold ${b.technicalScore >= 70 ? "text-black" : "text-[#FF0000]"}`}>
                    {b.technicalScore}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Skor Komposit Akhir:</span>
                  <span className="font-bold text-black text-sm">{b.totalCompositeScore}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex gap-2">
                {b.adminDocPass ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const reason = prompt("Masukkan alasan diskualifikasi/gugur administrasi:");
                      if (reason) disqualifyBidder(b.id, reason);
                    }}
                    className="w-full py-1.5 border border-slate-400 hover:border-[#FF0000] hover:text-[#FF0000] font-bold text-[10px] uppercase"
                  >
                    GUGURKAN
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      restoreBidder(b.id);
                      confetti({ particleCount: 25, spread: 50 });
                    }}
                    className="w-full py-1.5 bg-black text-white font-bold text-[10px] uppercase"
                  >
                    PULIHKAN
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-2 border-black p-6 bg-white font-mono space-y-4">
        <div className="flex items-center justify-between border-b border-black pb-3">
          <div>
            <h3 className="font-bold text-sm uppercase text-black">
              PANEL PENILAIAN SKOR TEKNIS: {selectedBidder.companyName}
            </h3>
            <p className="text-xs text-slate-500">
              Ubah skor evaluasi metodologi kerja, peralatan, dan personil manajerial.
            </p>
          </div>
          <Sliders className="w-5 h-5 text-black" />
        </div>

        <div className="space-y-2 max-w-xl">
          <div className="flex justify-between text-xs font-bold">
            <span>NILAI EVALUASI TEKNIS:</span>
            <span className="text-[#FF0000] font-bold">{selectedBidder.technicalScore} / 100</span>
          </div>
          <input
            type="range"
            min="40"
            max="100"
            step="0.5"
            value={selectedBidder.technicalScore}
            onChange={(e) => handleScoreChange(parseFloat(e.target.value))}
            className="w-full accent-[#FF0000] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>40.0 (Tidak Layak)</span>
            <span>70.0 (Passing Grade Min)</span>
            <span>100.0 (Sempurna)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
