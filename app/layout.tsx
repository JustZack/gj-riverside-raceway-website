import type { Metadata } from "next";
import SiteHeader from '@/components/site/site.header'
import SiteFooter from '@/components/site/site.footer'
import "./globals.css";

export const metadata: Metadata = {
  title: "GJ Riverside Raceway",
  description: "RC Racing Track",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" 
          crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="flex flex-col min-h-screen">
        <SiteHeader/>
        {children}
        <SiteFooter/>
      </body>
    </html>
  );
}
