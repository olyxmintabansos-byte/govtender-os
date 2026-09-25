import type { Metadata } from "next";
import "./globals.css";
import { TenderProvider } from "@/context/TenderContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "GovTender OS // Swiss Minimalist LPSE Public Procurement Matrix",
  description:
    "National Public Procurement Tender Bidding Matrix, HPS Price Estimation, Reverse Auction & Bidder Qualification System.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-white text-black antialiased selection:bg-[#FF0000] selection:text-white">
        <TenderProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t-2 border-black bg-white py-6 px-6 font-mono text-xs">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-[#FF0000] inline-block"></span>
                <span className="font-bold text-black">GOVTENDER OS (TITAN #25)</span>
                <span className="text-slate-500">• STANDAR PERPRES NO. 12 TAHUN 2021 (LKPP)</span>
              </div>
              <div className="text-slate-400">
                SWISS MINIMALIST & SPLIT-SCREEN ARCHITECTURE // SOVEREIGN FLEET OLYXMINTABANSOS
              </div>
            </div>
          </footer>
        </TenderProvider>
      </body>
    </html>
  );
}
