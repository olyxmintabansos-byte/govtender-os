"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  TenderPackage,
  BidderParticipant,
  ObjectionRecord,
  LpseKpi,
} from "@/types/tender";

interface TenderContextType {
  packages: TenderPackage[];
  bidders: BidderParticipant[];
  objections: ObjectionRecord[];
  kpis: LpseKpi;
  selectedPackage: TenderPackage;
  setSelectedPackage: (pkg: TenderPackage) => void;
  updateBidderScore: (bidderId: string, technicalScore: number) => void;
  disqualifyBidder: (bidderId: string, reason: string) => void;
  restoreBidder: (bidderId: string) => void;
  addObjection: (objection: Omit<ObjectionRecord, "id" | "submissionDate" | "status">) => void;
  reviewObjection: (objectionId: string, status: "DITERIMA" | "DITOLAK", notes: string) => void;
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
    status: "MASA_SANGGAH",
    closingDate: "28 September 2026",
    biddersCount: 5,
    location: "Jakarta Pusat",
    qualification: "NON_KECIL",
    sanggahDeadlineHours: 36,
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
    sanggahDeadlineHours: 72,
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
    sanggahDeadlineHours: 0,
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
    sanggahDeadlineHours: 120,
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
    companyName: "PT Nusantara Citra Infrastruktur",
    npwp: "02.881.332.1-015.000",
    bidPriceIdr: 17200000000,
    hpsDiscountPct: 6.8,
    adminDocPass: true,
    technicalScore: 85.0,
    priceScore: 94.1,
    totalCompositeScore: 88.6,
    ranking: 2,
    status: "LULUS_EVALUASI",
  },
  {
    id: "BID-03",
    tenderId: "TND-01",
    companyName: "PT Graha Mega Sarana",
    npwp: "03.112.990.2-021.000",
    bidPriceIdr: 17900000000,
    hpsDiscountPct: 3.0,
    adminDocPass: true,
    technicalScore: 81.0,
    priceScore: 89.4,
    totalCompositeScore: 84.4,
    ranking: 3,
    status: "LULUS_EVALUASI",
  },
  {
    id: "BID-04",
    tenderId: "TND-01",
    companyName: "CV Surya Cipta Mandiri",
    npwp: "04.551.789.0-033.000",
    bidPriceIdr: 13900000000,
    hpsDiscountPct: 24.7,
    adminDocPass: false,
    technicalScore: 45.0,
    priceScore: 100.0,
    totalCompositeScore: 67.0,
    ranking: 4,
    status: "GUGUR_ADMINISTRASI",
    disqualificationReason: "Jaminan Penawaran tidak mencantumkan klausul klaim tanpa syarat (Unconditional)",
  },
  {
    id: "BID-05",
    tenderId: "TND-03",
    companyName: "PT Biotek Sains Diagnostics",
    npwp: "01.772.339.8-062.000",
    bidPriceIdr: 7950000000,
    hpsDiscountPct: 10.7,
    adminDocPass: true,
    technicalScore: 94.0,
    priceScore: 98.0,
    totalCompositeScore: 95.6,
    ranking: 1,
    status: "CALON_PEMENANG",
  },
  {
    id: "BID-06",
    tenderId: "TND-03",
    companyName: "PT Farma Indo Distribusi",
    npwp: "02.551.992.4-051.000",
    bidPriceIdr: 8400000000,
    hpsDiscountPct: 5.6,
    adminDocPass: true,
    technicalScore: 89.0,
    priceScore: 92.5,
    totalCompositeScore: 90.4,
    ranking: 2,
    status: "LULUS_EVALUASI",
  },
];

const INITIAL_OBJECTIONS: ObjectionRecord[] = [
  {
    id: "OBJ-2026-001",
    tenderId: "TND-01",
    bidderCompanyName: "PT Nusantara Citra Infrastruktur",
    letterNumber: "NCI/DIR-LGL/IX/2026-041",
    submissionDate: "25 Sep 2026, 14:30 WIB",
    category: "REKAYASA_SPESIFIKASI_TEKNIS",
    description: "Indikasi persyaratan sertifikasi baja WF lengkung pada dokumen pemilihan diarahkan kepada satu pabrikan distributor eksklusif rekanan calon pemenang.",
    evidenceAttachmentName: "BUKTI_SURAT_DISTRIBUTOR_RESMI_BAJA.pdf",
    guaranteeBondAmountIdr: 184500000,
    status: "DALAM_TELAAH",
    pokjaVerdictNotes: "Pokja sedang menguji kesesuaian dokumen SNI bersama tim ahli struktural.",
  },
  {
    id: "OBJ-2026-002",
    tenderId: "TND-01",
    bidderCompanyName: "CV Surya Cipta Mandiri",
    letterNumber: "SCM/TND/IX/2026-118",
    submissionDate: "24 Sep 2026, 10:15 WIB",
    category: "PENILAIAN_EVALUASI_TIDAK_SAH",
    description: "Keberatan atas status gugur administrasi jaminan bank, bank penerbit telah menyatakan garansi resmi berlaku penuh sesuai format IKP LKPP.",
    evidenceAttachmentName: "SURAT_KONFIRMASI_BANK_PENERBIT.pdf",
    guaranteeBondAmountIdr: 184500000,
    status: "DITOLAK",
    pokjaVerdictNotes: "Format jaminan bank yang diunggah terbukti tidak memenuhi klausul Perpres 12/2021 pasal 30 ayat 2.",
  },
];

const TenderContext = createContext<TenderContextType | undefined>(undefined);

export function TenderProvider({ children }: { children: React.ReactNode }) {
  const [packages, setPackages] = useState<TenderPackage[]>(INITIAL_PACKAGES);
  const [bidders, setBidders] = useState<BidderParticipant[]>(INITIAL_BIDDERS);
  const [objections, setObjections] = useState<ObjectionRecord[]>(INITIAL_OBJECTIONS);
  const [selectedPackage, setSelectedPackage] = useState<TenderPackage>(INITIAL_PACKAGES[0]);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedPkg = localStorage.getItem("govtender_packages");
      const savedBidders = localStorage.getItem("govtender_bidders");
      const savedObj = localStorage.getItem("govtender_objections");
      if (savedPkg) setPackages(JSON.parse(savedPkg));
      if (savedBidders) setBidders(JSON.parse(savedBidders));
      if (savedObj) setObjections(JSON.parse(savedObj));
    } catch {
      // fallback
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem("govtender_packages", JSON.stringify(packages));
      localStorage.setItem("govtender_bidders", JSON.stringify(bidders));
      localStorage.setItem("govtender_objections", JSON.stringify(objections));
    } catch {
      // ignore
    }
  }, [packages, bidders, objections]);

  const updateBidderScore = (bidderId: string, technicalScore: number) => {
    setBidders((prev) =>
      prev.map((b) => {
        if (b.id !== bidderId) return b;
        const totalComposite = Math.round((technicalScore * 0.7 + b.priceScore * 0.3) * 10) / 10;
        return {
          ...b,
          technicalScore,
          totalCompositeScore: totalComposite,
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
              adminDocPass: false,
              status: "GUGUR_ADMINISTRASI",
              disqualificationReason: reason,
              ranking: 99,
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
              adminDocPass: true,
              status: "LULUS_EVALUASI",
              disqualificationReason: undefined,
              ranking: 2,
            }
          : b
      )
    );
  };

  const addObjection = (
    objectionData: Omit<ObjectionRecord, "id" | "submissionDate" | "status">
  ) => {
    const newRecord: ObjectionRecord = {
      ...objectionData,
      id: `OBJ-2026-${String(objections.length + 1).padStart(3, "0")}`,
      submissionDate: "Baru saja diajukan",
      status: "DALAM_TELAAH",
    };
    setObjections((prev) => [newRecord, ...prev]);
  };

  const reviewObjection = (objectionId: string, status: "DITERIMA" | "DITOLAK", notes: string) => {
    setObjections((prev) =>
      prev.map((o) =>
        o.id === objectionId
          ? {
              ...o,
              status,
              pokjaVerdictNotes: notes,
            }
          : o
      )
    );
  };

  const resetAllTenders = () => {
    setPackages(INITIAL_PACKAGES);
    setBidders(INITIAL_BIDDERS);
    setObjections(INITIAL_OBJECTIONS);
    setSelectedPackage(INITIAL_PACKAGES[0]);
    localStorage.removeItem("govtender_packages");
    localStorage.removeItem("govtender_bidders");
    localStorage.removeItem("govtender_objections");
  };

  const totalHps = packages.reduce((acc, p) => acc + p.hpsBudgetNominalIdr, 0);

  const kpis: LpseKpi = {
    totalPackagesActive: packages.length,
    totalHpsValueIdr: totalHps,
    avgEfficiencyPct: 9.4,
    totalVerifiedVendors: bidders.length,
    auditIntegrityScore: 99.8,
  };

  return (
    <TenderContext.Provider
      value={{
        packages,
        bidders,
        objections,
        kpis,
        selectedPackage,
        setSelectedPackage,
        updateBidderScore,
        disqualifyBidder,
        restoreBidder,
        addObjection,
        reviewObjection,
        resetAllTenders,
      }}
    >
      {children}
    </TenderContext.Provider>
  );
}

export function useTender() {
  const context = useContext(TenderContext);
  if (!context) {
    throw new Error("useTender must be used within a TenderProvider");
  }
  return context;
}
