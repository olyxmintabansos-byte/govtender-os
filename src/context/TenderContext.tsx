"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  TenderPackage,
  BidderParticipant,
  ObjectionRecord,
  LpseKpi,
} from "@/types/tender";

interface TenderContextType {
  selectedPackage: TenderPackage;
  bidders: BidderParticipant[];
  objections: ObjectionRecord[];
  kpi: LpseKpi;
  addObjection: (objection: Omit<ObjectionRecord, "id" | "submissionDate" | "status">) => void;
  reviewObjection: (id: string, status: "DITERIMA" | "DITOLAK", notes: string) => void;
}

const mockPackage: TenderPackage = {
  id: "TENDER-001",
  title: "PENGADAAN INFRASTRUKTUR JARINGAN SERAT OPTIK DINAS KOMINFO",
  codeLpse: "KMN-2026-X12",
  agency: "DINAS KOMUNIKASI & INFORMATIKA",
  procurementType: "PEKERJAAN_KONSTRUKSI",
  status: "MASA_SANGGAH",
  hpsBudgetNominalIdr: 12500000000,
  sanggahDeadlineHours: 42,
};

const mockBidders: BidderParticipant[] = [
  { id: "B1", tenderId: "TENDER-001", companyName: "PT BANGUN CIPTA PRATAMA", npwp: "01.234.567.8-901.000", bidPriceIdr: 11800000000, hpsDiscountPct: 5.6, adminDocPass: true, technicalScore: 92, priceScore: 88, totalCompositeScore: 90 },
  { id: "B2", tenderId: "TENDER-001", companyName: "PT JARINGAN NUSANTARA UTAMA", npwp: "02.345.678.9-012.000", bidPriceIdr: 12100000000, hpsDiscountPct: 3.2, adminDocPass: true, technicalScore: 85, priceScore: 82, totalCompositeScore: 83.5 },
];

const TenderContext = createContext<TenderContextType | undefined>(undefined);

export const TenderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [objections, setObjections] = useState<ObjectionRecord[]>([]);

  const addObjection = (newObj: Omit<ObjectionRecord, "id" | "submissionDate" | "status">) => {
    setObjections((prev) => [
      ...prev,
      {
        ...newObj,
        id: `SANGGAH-${Date.now()}`,
        submissionDate: new Date().toLocaleDateString("id-ID"),
        status: "DALAM_TELAAH",
      },
    ]);
  };

  const reviewObjection = (id: string, status: "DITERIMA" | "DITOLAK", notes: string) => {
    setObjections((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status, pokjaVerdictNotes: notes } : o))
    );
  };

  return (
    <TenderContext.Provider value={{ selectedPackage: mockPackage, bidders: mockBidders, objections, kpi: { efisiensiAnggaran: 700000000, rata2Penawaran: 11950000000, kesehatanPersaingan: "SEHAT" }, addObjection, reviewObjection }}>
      {children}
    </TenderContext.Provider>
  );
};

export const useTender = () => {
  const context = useContext(TenderContext);
  if (!context) throw new Error("useTender must be used within TenderProvider");
  return context;
};