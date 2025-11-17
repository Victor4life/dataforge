"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletKitProvider } from "@mysten/wallet-kit";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.className}`}>
        <WalletKitProvider>{children}</WalletKitProvider>
      </body>
    </html>
  );
}
