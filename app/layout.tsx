import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script
        type="text/javascript"
        src="https://scripts.noq.com.hk/v2.0.7/noq-vwr.min.js?c=client-dev&cookie_key=be_roomq_t_client-dev"
      />
    </html>
  );
}
