'use client'

import { useEffect } from 'react'
import { useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI, type TipEntry } from '@/lib/contract'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface TipBoardProps {
  /** Increment to force a refetch of all contract reads */
  refreshKey: number
}

function shortenAddress(address: string | undefined): string {
  if (!address) return '0x???...????'
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function formatTimestamp(ts: bigint): string {
  return new Date(Number(ts) * 1000).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function TipBoard({ refreshKey }: TipBoardProps) {
  const {
    data: totalRaised,
    isLoading: isTotalLoading,
    refetch: refetchTotal,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'totalRaised',
  })

  const {
    data: tips,
    isLoading: isTipsLoading,
    refetch: refetchTips,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getTips',
  })

  // Refetch whenever a transaction is confirmed (refreshKey increments)
  useEffect(() => {
    if (refreshKey > 0) {
      refetchTotal()
      refetchTips()
    }
  }, [refreshKey, refetchTotal, refetchTips])

  const tipCount = tips ? tips.length : 0
  const reversedTips: TipEntry[] = tips ? [...(tips as TipEntry[])].reverse() : []

  return (
    <section className="flex flex-col gap-4" aria-label="Donation board">
      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-border bg-card">
          <CardContent className="pt-4 pb-4">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">
              Total Raised
            </p>
            {isTotalLoading ? (
              <Skeleton className="h-7 w-28" />
            ) : (
              <p className="text-2xl font-bold text-primary font-mono">
                {totalRaised !== undefined ? Number(formatEther(totalRaised)).toFixed(4) : '0.0000'}
                <span className="text-sm font-semibold text-muted-foreground ml-1">ETH</span>
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="pt-4 pb-4">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">
              Supporters
            </p>
            {isTipsLoading ? (
              <Skeleton className="h-7 w-12" />
            ) : (
              <p className="text-2xl font-bold text-foreground font-mono">
                {tipCount}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Tips feed ── */}
      <Card className="border-border bg-card shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground">
            Recent Tips
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Latest first
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isTipsLoading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          ) : reversedTips.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <p className="text-muted-foreground text-sm">No tips yet.</p>
              <p className="text-muted-foreground text-xs">Be the first to support!</p>
            </div>
          ) : (
            <ol className="flex flex-col gap-2" aria-label="Tip history">
              {reversedTips.map((tip, i) => (
                <li
                  key={i}
                  className="flex items-start justify-between gap-3 rounded-lg border border-border bg-background px-4 py-3"
                >
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-mono text-xs text-muted-foreground">
                      {shortenAddress(tip.from)}
                    </span>
                    {tip.note ? (
                      <p className="text-sm text-foreground leading-relaxed break-words">
                        {tip.note}
                      </p>
                    ) : (
                      <p className="text-xs italic text-muted-foreground">No message</p>
                    )}
                    <time
                      className="text-xs text-muted-foreground mt-0.5"
                      dateTime={new Date(Number(tip.timestamp) * 1000).toISOString()}
                    >
                      {formatTimestamp(tip.timestamp)}
                    </time>
                  </div>
                  <span className="shrink-0 font-mono font-bold text-sm text-primary">
                    +{Number(formatEther(tip.amount)).toFixed(4)}
                    <span className="text-xs font-medium text-muted-foreground ml-0.5">ETH</span>
                  </span>
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
