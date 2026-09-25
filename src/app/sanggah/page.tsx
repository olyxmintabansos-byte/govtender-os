"use client";

import React, { useState } from "react";
import { useTender } from "@/context/TenderContext";
import { formatRupiah } from "@/lib/utils";
import {
  AlertTriangle,
  Clock,
  ShieldAlert,
  Send,
  CheckCircle2,
  XCircle,
  FileText,
  BadgeAlert,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ObjectionCategory } from "@/types/tender";

export default function SanggahPage() {
  const { selectedPackage, objections, addObjection, reviewObjection } = useTender();

  const [companyName, setCompanyName] = useState("");
  const [letterNumber, setLetterNumber] = useState("");
  const [category, setCategory] = useState<ObjectionCategory>("PENYIMPANGAN_KETENTUAN_LELANG");
  const [description, setDescription] = useState("");
  const [evidenceName, setEvidenceName] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filteredObjections = objections.filter((o) => {
    if (statusFilter !== "ALL" && o.status !== statusFilter) return false;
    return true;
  });

  const guarantee1Pct = Math.round(selectedPackage.hpsBudgetNominalIdr * 0.01);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !letterNumber || !description) {
      alert("Mohon lengkapi seluruh formulir sanggahan resmi!");
      return;
    }

    addObjection({
      tenderId: selectedPackage.id,
      bidderCompanyName: companyName,
      letterNumber,
      category,
      description,
      evidenceAttachmentName: evidenceName || "BUKTI_DOKUMEN_SANGGAHAN.pdf",
      guaranteeBondAmountIdr: guarantee1Pct,
    });

    confetti({ particleCount: 30, spread: 60 });
    setCompanyName("");
    setLetterNumber("");
    setDescription("");
    setEvidenceName("");
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="border-2 border-black p-6 bg-white font-mono flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF0000] uppercase mb-1">
            <span className="w-2.5 h-2.5 bg-[#FF0000] inline-block animate-ping"></span>
            PORTAL SANGGAHAN RESMI PERPRES NO. 12 / 2021
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-black uppercase">
            MASA SANGGAH LELANG & KLARIFIKASI POKJA
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Paket Aktif: <strong className="text-black">{selectedPackage.title}</strong> ({selectedPackage.codeLpse})
          </p>
        </div>

        <div className="flex items-center gap-6 border-2 border-black p-4 bg-zinc-50">
          <div>
            <span className="text-[10px] text-slate-400 block font-bold">COUNTDOWN MASA SANGGAH:</span>
            <div className="flex items-center gap-2 text-xl font-bold text-[#FF0000]">
              <Clock className="w-5 h-5" />
              <span>{selectedPackage.sanggahDeadlineHours}:42:15 WIB</span>
            </div>
          </div>
          <div className="border-l border-black pl-4">
            <span className="text-[10px] text-slate-400 block font-bold">JAMINAN SANGGAH BANDING (1% HPS):</span>
            <span className="font-bold text-black text-sm">{formatRupiah(guarantee1Pct)}</span>
          </div>
        </div>
      </div>

      {/* Split-Screen: Sisi Kiri Log Sanggahan, Sisi Kanan Form Pengajuan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono">
        {/* Left Column: Sanggahan Records Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-black p-4 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-black" />
              <h3 className="font-bold text-sm uppercase text-black">
                DAFTAR SANGGAHAN TERDAFTAR ({filteredObjections.length})
              </h3>
            </div>

            <div className="flex gap-1 text-[10px]">
              {["ALL", "DALAM_TELAAH", "DITERIMA", "DITOLAK"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-1 border font-bold uppercase ${
                    statusFilter === st
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-slate-300 hover:border-black"
                  }`}
                >
                  {st.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredObjections.map((obj) => (
              <div
                key={obj.id}
                className="border-2 border-black p-5 bg-white space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-black pb-2 text-xs">
                  <div>
                    <span className="font-bold text-[#FF0000]">{obj.id}</span>
                    <span className="text-slate-400 mx-2">//</span>
                    <span className="font-bold text-black">{obj.bidderCompanyName}</span>
                  </div>

                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold uppercase border ${
                      obj.status === "DALAM_TELAAH"
                        ? "bg-amber-100 text-amber-900 border-amber-900"
                        : obj.status === "DITERIMA"
                        ? "bg-emerald-100 text-emerald-900 border-emerald-900"
                        : "bg-rose-100 text-rose-900 border-rose-900"
                    }`}
                  >
                    {obj.status.replace("_", " ")}
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <div className="text-slate-500 text-[11px]">
                    No. Surat: <span className="font-bold text-black">{obj.letterNumber}</span> | Waktu: {obj.submissionDate}
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 uppercase">
                    Kategori: {obj.category.replace(/_/g, " ")}
                  </div>
                  <p className="text-xs text-black border-l-2 border-[#FF0000] pl-3 py-1 bg-zinc-50 italic">
                    &ldquo;{obj.description}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-dashed border-zinc-300 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span className="underline cursor-pointer">{obj.evidenceAttachmentName}</span>
                  </div>

                  {obj.status === "DALAM_TELAAH" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const note = prompt("Catatan persetujuan sanggah Pokja:") || "Sanggah diterima dan lelang dievaluasi ulang.";
                          reviewObjection(obj.id, "DITERIMA", note);
                        }}
                        className="px-2.5 py-1 bg-black text-white hover:bg-[#FF0000] font-bold text-[10px] uppercase flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        TERIMA SANGGAH
                      </button>
                      <button
                        onClick={() => {
                          const note = prompt("Alasan penolakan sanggah Pokja:") || "Dalil sanggahan tidak berdasar fakta dokumen.";
                          reviewObjection(obj.id, "DITOLAK", note);
                        }}
                        className="px-2.5 py-1 border border-black hover:bg-black hover:text-white font-bold text-[10px] uppercase flex items-center gap-1"
                      >
                        <XCircle className="w-3 h-3" />
                        TOLAK
                      </button>
                    </div>
                  )}

                  {obj.pokjaVerdictNotes && (
                    <div className="text-[10px] text-slate-500 italic max-w-xs text-right">
                      Ket Pokja: {obj.pokjaVerdictNotes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Objection Submission Form */}
        <div className="lg:col-span-5 border-2 border-black p-6 bg-white space-y-4">
          <div className="border-b-2 border-black pb-3">
            <h3 className="font-bold text-sm uppercase text-black flex items-center gap-2">
              <BadgeAlert className="w-4 h-4 text-[#FF0000]" />
              FORMULIR PENGAJUAN SANGGAH FORMAL
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Hanya peserta tender terdaftar yang dapat mengajukan sanggahan resmi.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-black uppercase mb-1">
                NAMA BADAN USAHA / PT:
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Contoh: PT Bangun Cipta Pratama"
                className="w-full p-2 border-2 border-black focus:outline-none focus:border-[#FF0000]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-black uppercase mb-1">
                NOMOR SURAT RESMI VENDOR:
              </label>
              <input
                type="text"
                required
                value={letterNumber}
                onChange={(e) => setLetterNumber(e.target.value)}
                placeholder="Contoh: 045/DIR-BCP/IX/2026"
                className="w-full p-2 border-2 border-black focus:outline-none focus:border-[#FF0000]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-black uppercase mb-1">
                KATEGORI MATERI SANGGAHAN:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ObjectionCategory)}
                className="w-full p-2 border-2 border-black bg-white focus:outline-none focus:border-[#FF0000]"
              >
                <option value="PENYIMPANGAN_KETENTUAN_LELANG">Penyimpangan Ketentuan Lelang</option>
                <option value="REKAYASA_SPESIFIKASI_TEKNIS">Rekayasa Spesifikasi Teknis</option>
                <option value="PERSEKONGKOLAN_TENDER">Indikasi Persekongkolan Tender (Korupsi/Kolusi)</option>
                <option value="PENILAIAN_EVALUASI_TIDAK_SAH">Penilaian Evaluasi Tidak Sah</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-black uppercase mb-1">
                URAIAN DALIL SANGGAHAN & FAKTA DOKUMEN:
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan secara rinci nomor halaman dokumen pemilihan dan bukti pelanggaran..."
                className="w-full p-2 border-2 border-black focus:outline-none focus:border-[#FF0000]"
              ></textarea>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-black uppercase mb-1">
                LAMPIRAN ALAT BUKTI (PDF / ZIP):
              </label>
              <input
                type="text"
                value={evidenceName}
                onChange={(e) => setEvidenceName(e.target.value)}
                placeholder="Nama file bukti (misal: BUKTI_KOMPARASI_HARGA.pdf)"
                className="w-full p-2 border border-slate-300 focus:outline-none focus:border-black text-[11px]"
              />
            </div>

            <div className="p-3 bg-zinc-100 border border-black space-y-1 text-[11px]">
              <div className="font-bold text-black">PERINGATAN SANGGAH BANDING:</div>
              <p className="text-slate-600 text-[10px]">
                Bila sanggahan berlanjut ke Sanggah Banding KPA, penyedia wajib menyerahkan Jaminan Sanggah Banding sebesar 1% dari HPS ({formatRupiah(guarantee1Pct)}) yang akan dicairkan ke Kas Negara bila sanggahan terbukti tidak benar.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#FF0000] text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              KIRIM SANGGAHAN RESMI KE POKJA
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
