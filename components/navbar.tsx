"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Database } from "lucide-react";
import { ConnectButton, useWalletKit } from "@mysten/wallet-kit";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentAccount } = useWalletKit();

  const displayAddress = currentAccount
    ? `${currentAccount.address.slice(0, 6)}...${currentAccount.address.slice(
        -4
      )}`
    : null;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary"
          >
            <Database size={28} />
            DataForge
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/explore">Explore</Link>
            <Link href="/dashboard">Dashboard</Link>

            <ConnectButton
              connectText="Connect Wallet"
              connectedText={displayAddress ?? "Connected"}
            />
          </div>

          {/* Mobile Menu */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
