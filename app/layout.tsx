import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tld_watch: know within minutes when a whole TLD is down",
  description:
    "Canary domains on .shop, .space, .club and .store resolved from multiple vantage points around the clock. Get an alert naming the TLD when the registry zone fails, not a ticket saying one site is down.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
