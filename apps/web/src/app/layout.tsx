import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "DocketRail: MiniPay Review Dossier & Audit Console",
  description:
    "Autonomous compliance auditing for MiniPay directory submissions. Generates verifiable evidence dossiers, origin inventories, and missing-item lists.",
  icons: {
    icon: "/logo-icon-dark.png",
    shortcut: "/logo-icon-dark.png",
    apple: "/logo-icon-dark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-canvas text-content-primary flex flex-col min-h-screen selection:bg-lime selection:text-canvas-deep">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
