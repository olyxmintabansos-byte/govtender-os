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

export interface LpseKpi {
  totalPackagesActive: number;
  totalHpsValueIdr: number;
  avgEfficiencyPct: number;
  totalVerifiedVendors: number;
  auditIntegrityScore: number;
}
