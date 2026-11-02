import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "DocketRail — Your app. Your evidence. Ready for review.",
  description:
    "Turn your MiniPay app into a submission pack with traceable evidence and a clear list of what is missing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-forest-950 text-forest-100 flex flex-col min-h-screen selection:bg-lime-500 selection:text-forest-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
