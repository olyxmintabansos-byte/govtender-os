"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTender } from "@/context/TenderContext";
import {
  Scale,
  FileSpreadsheet,
  BadgeAlert,
  Printer,
  Menu,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { selectedPackage } = useTender();

  const links = [
    { name: "TENDER MATRIX", path: "/" },
    { name: "EVALUASI", path: "/evaluasi/" },
    { name: "SANGGAH", path: "/sanggah/" },
    { name: "PEMENANG", path: "/pemenang/" },
  ];

  return (
    <nav className="border-b-2 border-black bg-zinc-50 font-mono">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="bg-black text-white p-2 text-[10px] font-bold tracking-tighter">
            GOV//TENDER
          </div>
          <div>
            <h1 className="text-sm font-bold text-black uppercase tracking-tight">
              {selectedPackage.title.substring(0, 40)}...
            </h1>
            <div className="text-[10px] text-slate-500 uppercase">
              {selectedPackage.agency} // TITAN #25
            </div>
          </div>
        </div>

        <div className="flex gap-1 items-center">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase ${
                pathname === link.path
                  ? "bg-black text-white"
                  : "bg-white text-black border border-slate-300 hover:border-black"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}