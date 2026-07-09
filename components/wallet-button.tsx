'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function WalletButton() {
  const { address, isConnected, isConnecting } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className="font-mono border-border bg-card text-muted-foreground px-3 py-1.5 text-xs"
        >
          {shortenAddress(address)}
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={() => disconnect()}
          className="border-border text-muted-foreground hover:text-foreground"
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={() => connect({ connector: injected() })}
      disabled={isConnecting}
      className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
    >
      {isConnecting ? 'Connecting…' : 'Connect Wallet'}
    </Button>
  )
}
