import type { Metadata } from "next";
import { DemoProvider } from "@/components/DemoProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Evermark — Products designed to last", template: "%s · Evermark" },
  description: "Compare product longevity, repairability, warranties, and verified durability evidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#f7f9f6] text-slate-900">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
