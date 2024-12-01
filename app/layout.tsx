import type { Metadata } from "next";
import "./globals.css";
import { getCookie } from "cookies-next";
import { changeTheme } from "@/app/components/Them/hederthems";

export  const metadata: Metadata = {
  title: "Quaran-Home",
  description: "Quaran Home page ",
  icons: {
    icon: '/image/quran-logo-light.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  
  const thems=getCookie('thems')
  return (
    <html lang="fa" dir="rtl" data-theme={thems}>
      <body className={`bg-primary text-typography `}>{children}</body>
    </html>
  ); 
}