'use client'

import { useEffect, useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface TipFormProps {
  onSuccess: () => void
}

export function TipForm({ onSuccess }: TipFormProps) {
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [inputError, setInputError] = useState('')

  const {
    writeContract,
    data: hash,
    isPending,
    error: writeError,
    reset,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isSuccess) {
      onSuccess()
      setAmount('')
      setNote('')
      reset()
    }
  }, [isSuccess, onSuccess, reset])

  function validate(): boolean {
    if (!amount || Number(amount) <= 0 || isNaN(Number(amount))) {
      setInputError('Enter a valid ETH amount greater than 0.')
      return false
    }
    setInputError('')
    return true
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'tip',
      args: [note.trim()],
      value: parseEther(amount),
    })
  }

  const isBusy = isPending || isConfirming

  return (
    <Card className="border-border bg-card shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Send a Tip
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Support this project with ETH on Sepolia testnet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="amount" className="text-sm font-medium text-foreground">
              Amount (ETH)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.001"
              min="0"
              placeholder="0.01"
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setInputError('') }}
              className="bg-background border-border focus-visible:ring-primary font-mono"
              disabled={isBusy}
              aria-describedby={inputError ? 'amount-error' : undefined}
            />
            {inputError && (
              <p id="amount-error" className="text-destructive text-xs">
                {inputError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="note" className="text-sm font-medium text-foreground">
              Message <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Textarea
              id="note"
              placeholder="Leave a message for the creator…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-background border-border focus-visible:ring-primary resize-none"
              rows={3}
              disabled={isBusy}
            />
          </div>

          <Button
            type="submit"
            disabled={isBusy}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            {isPending
              ? 'Confirm in wallet…'
              : isConfirming
                ? 'Confirming on-chain…'
                : 'Send Tip'}
          </Button>

          {writeError && (
            <p className="text-destructive text-xs break-all">
              {(writeError as { shortMessage?: string }).shortMessage ?? writeError.message}
            </p>
          )}

          {isSuccess && (
            <p className="text-sm text-center font-medium" style={{ color: 'var(--color-primary)' }}>
              Tip sent successfully!
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
