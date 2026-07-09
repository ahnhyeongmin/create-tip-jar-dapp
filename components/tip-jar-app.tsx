'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { WalletButton } from '@/components/wallet-button'
import { TipForm } from '@/components/tip-form'
import { TipBoard } from '@/components/tip-board'
import { WithdrawButton } from '@/components/withdraw-button'
import { Badge } from '@/components/ui/badge'

export function TipJarApp() {
  const [refreshKey, setRefreshKey] = useState(0)
  const { isConnected } = useAccount()

  function handleRefresh() {
    setRefreshKey((k) => k + 1)
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* ── Header ── */}
      <header className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Jar icon – inline SVG so no extra deps */}
            <svg
              aria-hidden="true"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary shrink-0"
            >
              <path d="M8 2h8" />
              <path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
              <path d="M12 10v4" />
              <path d="M10 12h4" />
            </svg>
            <span className="text-lg font-bold text-foreground tracking-tight">
              Tip Jar
            </span>
            <Badge
              variant="outline"
              className="hidden sm:inline-flex border-primary/40 text-primary text-[11px] font-semibold px-2 py-0.5"
            >
              Sepolia
            </Badge>
          </div>
          <WalletButton />
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="border-b border-border/30 bg-card/30 py-10 px-4 text-center sm:py-14">
        <h1 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
          Support This Project
        </h1>
        <p className="mt-2 text-balance text-muted-foreground sm:text-lg">
          Send ETH tips directly on-chain. Every satoshi counts.
        </p>
        <Badge
          variant="outline"
          className="mt-4 inline-flex sm:hidden border-primary/40 text-primary text-xs font-semibold"
        >
          Sepolia Testnet
        </Badge>
      </div>

      {/* ── Main content ── */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left column: form + withdraw */}
          <div className="flex flex-col gap-4">
            {isConnected ? (
              <>
                <TipForm onSuccess={handleRefresh} />
                <WithdrawButton onSuccess={handleRefresh} />
              </>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-card/40 px-6 text-center">
                <svg
                  aria-hidden="true"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <div>
                  <p className="font-medium text-foreground">Wallet not connected</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Connect your wallet above to send a tip
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right column: board */}
          <TipBoard refreshKey={refreshKey} />
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border/30 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          On-chain tips · Sepolia Testnet · Powered by wagmi + viem
        </p>
      </footer>
    </div>
  )
}
