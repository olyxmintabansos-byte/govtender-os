"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTender } from "@/context/TenderContext";
import {
  Scale,
  FileSpreadsheet,
  RotateCcw,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { kpis, resetAllTenders } = useTender();

  const navLinks = [
    { href: "/", label: "LPSE TENDER MATRIX", icon: Scale },
    { href: "/evaluasi", label: "BIDDER QUALIFICATION", icon: FileSpreadsheet },
  ];

  return (
    <header className="border-b-2 border-black bg-white px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#FF0000] text-white flex items-center justify-center font-bold text-lg">
            +
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-black uppercase font-mono">
                GovTender OS
              </h1>
              <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                SPSE 4.5 LKPP
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono tracking-tight">
              PORTAL PENGADAAN NASIONAL // INTEGRITAS AUDIT {kpis.auditIntegrityScore}%
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 font-mono text-xs border-l-2 border-black pl-6">
          <div>
            <span className="text-slate-400 block text-[10px]">TOTAL PAKET:</span>
            <span className="font-bold text-black">{kpis.totalPackagesActive} LELANG AKTIF</span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px]">EFISIENSI HPS:</span>
            <span className="font-bold text-[#FF0000]">HEMAT {kpis.avgEfficiencyPct}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider transition-all border ${
                  isActive
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-slate-300 hover:border-black"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <button
            onClick={() => {
              if (confirm("Reset seluruh data simulasi pengadaan ke standar LKPP?")) {
                resetAllTenders();
              }
            }}
            title="Reset Data"
            className="p-2 border border-slate-300 text-slate-600 hover:text-black hover:border-black transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
