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
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary"
          >
            <Database size={28} />
            DataForge
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/explore"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Explore
            </Link>
            <Link
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground transition"
            >
              Dashboard
            </Link>

            {/* ConnectButton handles modal automatically */}
            <ConnectButton
              connectText="Connect Wallet"
              connectedText={displayAddress ?? "Connected"}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-muted transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="md:hidden bg-card shadow-md rounded-b-lg py-4 px-6 space-y-4 animate-slide-down">
            <Link
              href="/explore"
              className="block text-muted-foreground hover:text-foreground transition"
              onClick={() => setIsOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/dashboard"
              className="block text-muted-foreground hover:text-foreground transition"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>

            {/* Mobile ConnectButton */}
            <ConnectButton
              connectText="Connect Wallet"
              connectedText={displayAddress ?? "Connected"}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
