"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  TenderPackage,
  BidderParticipant,
  LpseKpi,
} from "@/types/tender";

interface TenderContextType {
  packages: TenderPackage[];
  bidders: BidderParticipant[];
  kpis: LpseKpi;
  selectedPackage: TenderPackage;
  setSelectedPackage: (pkg: TenderPackage) => void;
  updateBidderScore: (bidderId: string, technicalScore: number) => void;
  disqualifyBidder: (bidderId: string, reason: string) => void;
  restoreBidder: (bidderId: string) => void;
  resetAllTenders: () => void;
}

const INITIAL_PACKAGES: TenderPackage[] = [
  {
    id: "TND-01",
    codeLpse: "LPSE-DKI-2026-90412",
    title: "Pembangunan Jembatan Penyeberangan Orang (JPO) Terintegrasi Dukuh Atas",
    agency: "Dinas Bina Marga Provinsi DKI Jakarta",
    procurementType: "PEKERJAAN_KONSTRUKSI",
    fiscalYear: 2026,
    hpsBudgetNominalIdr: 18450000000,
    ceilingBudgetPaguIdr: 19800000000,
    status: "EVALUASI_ADMINISTRASI_TEKNIS",
    closingDate: "28 September 2026",
    biddersCount: 5,
    location: "Jakarta Pusat",
    qualification: "NON_KECIL",
  },
  {
    id: "TND-02",
    codeLpse: "LPSE-KMN-2026-88120",
    title: "Pengadaan Perangkat Server High-Performance Computing (HPC) AI Nasional",
    agency: "Pusat Data dan Informasi Kemenkomdigi",
    procurementType: "PENGADAAN_BARANG",
    fiscalYear: 2026,
    hpsBudgetNominalIdr: 42600000000,
    ceilingBudgetPaguIdr: 45000000000,
    status: "PEMBUKAAN_PENAWARAN",
    closingDate: "30 September 2026",
    biddersCount: 4,
    location: "Nasional",
    qualification: "NON_KECIL",
  },
  {
    id: "TND-03",
    codeLpse: "LPSE-KEM-2026-77341",
    title: "Pengadaan Reagen & Media Uji Polymerase Chain Reaction (PCR) Laboratorium",
    agency: "Direktorat Laboratorium Kesehatan Kemenkes",
    procurementType: "PENGADAAN_BARANG",
    fiscalYear: 2026,
    hpsBudgetNominalIdr: 8900000000,
    ceilingBudgetPaguIdr: 9500000000,
    status: "PENETAPAN_PEMENANG",
    closingDate: "25 September 2026",
    biddersCount: 3,
    location: "Jakarta Selatan",
    qualification: "NON_KECIL",
  },
  {
    id: "TND-04",
    codeLpse: "LPSE-PUPR-2026-61029",
    title: "Supervisi Konstruksi Bendungan Pengendali Banjir Kali Ciliwung Hulu",
    agency: "Balai Besar Wilayah Sungai Ciliwung Cisadane",
    procurementType: "JASA_KONSULTANSI",
    fiscalYear: 2026,
    hpsBudgetNominalIdr: 4200000000,
    ceilingBudgetPaguIdr: 4500000000,
    status: "PENGUMUMAN_PASCAKUALIFIKASI",
    closingDate: "05 Oktober 2026",
    biddersCount: 6,
    location: "Bogor, Jawa Barat",
    qualification: "KECIL",
  },
];

const INITIAL_BIDDERS: BidderParticipant[] = [
  {
    id: "BID-01",
    tenderId: "TND-01",
    companyName: "PT Wijaya Bangun Persada",
    npwp: "01.442.891.4-012.000",
    bidPriceIdr: 16820000000,
    hpsDiscountPct: 8.8,
    adminDocPass: true,
    technicalScore: 88.5,
    priceScore: 98.2,
    totalCompositeScore: 92.4,
    ranking: 1,
    status: "CALON_PEMENANG",
  },
  {
    id: "BID-02",
    tenderId: "TND-01",
    companyName: "PT Hutama Karya Mandiri Sejahtera",
    npwp: "02.189.702.1-034.000",
    bidPriceIdr: 17150000000,
    hpsDiscountPct: 7.0,
    adminDocPass: true,
    technicalScore: 84.0,
    priceScore: 95.0,
    totalCompositeScore: 88.4,
    ranking: 2,
    status: "LULUS_EVALUASI",
  },
  {
    id: "BID-03",
    tenderId: "TND-01",
    companyName: "PT Jaya Konstruksi Metropolitan",
    npwp: "01.309.814.5-015.000",
    bidPriceIdr: 17650000000,
    hpsDiscountPct: 4.3,
    adminDocPass: true,
    technicalScore: 86.5,
    priceScore: 91.2,
    totalCompositeScore: 88.3,
    ranking: 3,
    status: "LULUS_EVALUASI",
  },
  {
    id: "BID-04",
    tenderId: "TND-01",
    companyName: "PT Cipta Sarana Infrastruktur",
    npwp: "03.541.229.8-042.000",
    bidPriceIdr: 15400000000,
    hpsDiscountPct: 16.5,
    adminDocPass: false,
    technicalScore: 54.0,
    priceScore: 100.0,
    totalCompositeScore: 72.4,
    ranking: 4,
    status: "GUGUR_ADMINISTRASI",
    disqualificationReason: "Jaminan Penawaran tidak memenuhi masa berlaku 90 hari kalender.",
  },
  {
    id: "BID-05",
    tenderId: "TND-01",
    companyName: "PT Bintang Timur Perkasa",
    npwp: "02.771.604.2-021.000",
    bidPriceIdr: 18100000000,
    hpsDiscountPct: 1.9,
    adminDocPass: true,
    technicalScore: 62.0,
    priceScore: 88.0,
    totalCompositeScore: 72.4,
    ranking: 5,
    status: "GUGUR_TEKNIS",
    disqualificationReason: "Skor teknis (62.0) di bawah batas ambang kelulusan minimum (70.0).",
  },
];

const INITIAL_KPIS: LpseKpi = {
  totalPackagesActive: 4,
  totalHpsValueIdr: 74150000000,
  avgEfficiencyPct: 7.8,
  totalVerifiedVendors: 48,
  auditIntegrityScore: 99.8,
};

const TenderContext = createContext<TenderContextType | undefined>(undefined);

export function TenderProvider({ children }: { children: React.ReactNode }) {
  const [packages, setPackages] = useState<TenderPackage[]>(INITIAL_PACKAGES);
  const [bidders, setBidders] = useState<BidderParticipant[]>(INITIAL_BIDDERS);
  const [kpis, setKpis] = useState<LpseKpi>(INITIAL_KPIS);
  const [selectedPackage, setSelectedPackage] = useState<TenderPackage>(INITIAL_PACKAGES[0]);

  useEffect(() => {
    try {
      const savedPkg = localStorage.getItem("govtender_packages");
      if (savedPkg) setPackages(JSON.parse(savedPkg));
      const savedBid = localStorage.getItem("govtender_bidders");
      if (savedBid) setBidders(JSON.parse(savedBid));
      const savedKpi = localStorage.getItem("govtender_kpis");
      if (savedKpi) setKpis(JSON.parse(savedKpi));
    } catch (e) {
      console.error("Failed to load localstorage:", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("govtender_packages", JSON.stringify(packages));
      localStorage.setItem("govtender_bidders", JSON.stringify(bidders));
      localStorage.setItem("govtender_kpis", JSON.stringify(kpis));
    } catch (e) {
      console.error("Failed to save localstorage:", e);
    }
  }, [packages, bidders, kpis]);

  const updateBidderScore = (bidderId: string, technicalScore: number) => {
    setBidders((prev) =>
      prev.map((b) => {
        if (b.id !== bidderId) return b;
        const total = Number(((technicalScore * 0.6) + (b.priceScore * 0.4)).toFixed(1));
        const status = technicalScore < 70 ? "GUGUR_TEKNIS" : b.status;
        return {
          ...b,
          technicalScore,
          totalCompositeScore: total,
          status,
        };
      })
    );
  };

  const disqualifyBidder = (bidderId: string, reason: string) => {
    setBidders((prev) =>
      prev.map((b) =>
        b.id === bidderId
          ? {
              ...b,
              status: "GUGUR_ADMINISTRASI",
              adminDocPass: false,
              disqualificationReason: reason,
            }
          : b
      )
    );
  };

  const restoreBidder = (bidderId: string) => {
    setBidders((prev) =>
      prev.map((b) =>
        b.id === bidderId
          ? {
              ...b,
              status: "LULUS_EVALUASI",
              adminDocPass: true,
              disqualificationReason: undefined,
            }
          : b
      )
    );
  };

  const resetAllTenders = () => {
    setPackages(INITIAL_PACKAGES);
    setBidders(INITIAL_BIDDERS);
    setKpis(INITIAL_KPIS);
    setSelectedPackage(INITIAL_PACKAGES[0]);
    localStorage.removeItem("govtender_packages");
    localStorage.removeItem("govtender_bidders");
    localStorage.removeItem("govtender_kpis");
  };

  return (
    <TenderContext.Provider
      value={{
        packages,
        bidders,
        kpis,
        selectedPackage,
        setSelectedPackage,
        updateBidderScore,
        disqualifyBidder,
        restoreBidder,
        resetAllTenders,
      }}
    >
      {children}
    </TenderContext.Provider>
  );
}

export function useTender() {
  const context = useContext(TenderContext);
  if (!context) throw new Error("useTender must be used within a TenderProvider");
  return context;
}
