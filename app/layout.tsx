import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Quaran",
  description: "Quaran Home page ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa"  dir="rtl">
      <body className="bg-slate-100">{children}</body>
    </html>
  );
}