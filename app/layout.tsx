import type { Metadata } from "next";
import "./globals.css";
import { getCookie } from "cookies-next";

export  const metadata: Metadata = {
  title: "Quaran-Home",
  description: "Quaran Home page ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  const thems=getCookie('thems')
  return (
    <html lang="fa" dir="rtl" data-theme='theme'>
      <body className={`bg-primary text-typography px-1`}>{children}</body>
    </html>
  ); 
}