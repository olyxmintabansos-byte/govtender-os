export type ProcurementType =
  | "PEKERJAAN_KONSTRUKSI"
  | "PENGADAAN_BARANG"
  | "JASA_KONSULTANSI"
  | "JASA_LAINNYA";

export type TenderStatus =
  | "PENGUMUMAN_PASCAKUALIFIKASI"
  | "DOWNLOAD_DOKUMEN"
  | "PEMBUKAAN_PENAWARAN"
  | "EVALUASI_ADMINISTRASI_TEKNIS"
  | "MASA_SANGGAH"
  | "PENETAPAN_PEMENANG"
  | "SELESAI";

export interface TenderPackage {
  id: string;
  codeLpse: string;
  title: string;
  agency: string;
  procurementType: ProcurementType;
  fiscalYear: number;
  hpsBudgetNominalIdr: number;
  ceilingBudgetPaguIdr: number;
  status: TenderStatus;
  closingDate: string;
  biddersCount: number;
  location: string;
  qualification: "KECIL" | "NON_KECIL";
  sanggahDeadlineHours: number;
}

export interface BidderParticipant {
  id: string;
  tenderId: string;
  companyName: string;
  npwp: string;
  bidPriceIdr: number;
  hpsDiscountPct: number;
  adminDocPass: boolean;
  technicalScore: number;
  priceScore: number;
  totalCompositeScore: number;
  ranking: number;
  status: "LULUS_EVALUASI" | "GUGUR_ADMINISTRASI" | "GUGUR_TEKNIS" | "CALON_PEMENANG";
  disqualificationReason?: string;
}

export type ObjectionCategory =
  | "PENYIMPANGAN_KETENTUAN_LELANG"
  | "REKAYASA_SPESIFIKASI_TEKNIS"
  | "PERSEKONGKOLAN_TENDER"
  | "PENILAIAN_EVALUASI_TIDAK_SAH";

export type ObjectionStatus = "DALAM_TELAAH" | "DITERIMA" | "DITOLAK";

export interface ObjectionRecord {
  id: string;
  tenderId: string;
  bidderCompanyName: string;
  letterNumber: string;
  submissionDate: string;
  category: ObjectionCategory;
  description: string;
  evidenceAttachmentName: string;
  guaranteeBondAmountIdr: number;
  status: ObjectionStatus;
  pokjaVerdictNotes?: string;
}

export interface LpseKpi {
  totalPackagesActive: number;
  totalHpsValueIdr: number;
  avgEfficiencyPct: number;
  totalVerifiedVendors: number;
  auditIntegrityScore: number;
}
