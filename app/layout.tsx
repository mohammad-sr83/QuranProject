import type { Metadata } from "next";
import { getCookie } from 'cookies-next';
import Thems from '@/app/contaxt/Thems/Thems.json'
import "./globals.css";
export  const metadata: Metadata = {
  title: "Quaran",
  description: "Quaran Home page ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  const ColorCookie=getCookie('color')
  return (
    <html lang="fa" dir="rtl">
      <body className={`${ColorCookie=='night'&&"bg-black"}`}>{children}</body>
    </html>
  );
}