'use client'

import { useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract'
import { Button } from '@/components/ui/button'

interface WithdrawButtonProps {
  onSuccess: () => void
}

export function WithdrawButton({ onSuccess }: WithdrawButtonProps) {
  const { address } = useAccount()

  const { data: owner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'owner',
  })

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
      reset()
    }
  }, [isSuccess, onSuccess, reset])

  // Only render if the connected address is the contract owner
  if (
    !address ||
    !owner ||
    address.toLowerCase() !== (owner as string).toLowerCase()
  ) {
    return null
  }

  const isBusy = isPending || isConfirming

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="destructive"
        className="w-full font-semibold"
        disabled={isBusy}
        onClick={() =>
          writeContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'withdraw',
          })
        }
      >
        {isPending
          ? 'Confirm in wallet…'
          : isConfirming
            ? 'Withdrawing…'
            : 'Withdraw Funds'}
      </Button>
      {writeError && (
        <p className="text-destructive text-xs break-all">
          {(writeError as { shortMessage?: string }).shortMessage ?? writeError.message}
        </p>
      )}
    </div>
  )
}
