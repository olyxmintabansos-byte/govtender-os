export type ProcurementType =
  | "PEKERJAAN_KONSTRUKSI"
  | "PENGADAAN_BARANG"
  | "JASA_KONSULTANSI"
  | "JASA_LAINNYA";

export type TenderStatus =
  | "PENGUMUMAN_PASCAKUALIFIKASI"
  | "DOWNLOAD_DOKUMEN"
  | "PENDAFTARAN_PESERTA"
  | "PENAWARAN_TERBUKA"
  | "EVALUASI_ADMINISTRASI"
  | "EVALUASI_TEKNIS"
  | "EVALUASI_HARGA"
  | "MASA_SANGGAH"
  | "PENETAPAN_PEMENANG"
  | "SELESAI";

export type ObjectionCategory =
  | "PENYIMPANGAN_KETENTUAN_LELANG"
  | "REKAYASA_SPESIFIKASI_TEKNIS"
  | "PERSEKONGKOLAN_TENDER"
  | "PENILAIAN_EVALUASI_TIDAK_SAH";

export interface ObjectionRecord {
  id: string;
  tenderId: string;
  bidderCompanyName: string;
  letterNumber: string;
  category: ObjectionCategory;
  description: string;
  evidenceAttachmentName: string;
  guaranteeBondAmountIdr: number;
  submissionDate: string;
  status: "DALAM_TELAAH" | "DITERIMA" | "DITOLAK";
  pokjaVerdictNotes?: string;
}

export interface TenderPackage {
  id: string;
  title: string;
  codeLpse: string;
  agency: string;
  procurementType: ProcurementType;
  status: TenderStatus;
  hpsBudgetNominalIdr: number;
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
}

export interface LpseKpi {
  efisiensiAnggaran: number;
  rata2Penawaran: number;
  kesehatanPersaingan: "SEHAT" | "MODERAT" | "KURANG_SEHAT";
}