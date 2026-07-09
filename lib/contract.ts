/**
 * TipJar smart contract — deployed on Sepolia.
 * Replace CONTRACT_ADDRESS with your actual deployed contract address.
 *
 * Solidity interface assumed:
 *   function tip(string calldata note) external payable;
 *   function withdraw() external;
 *   function totalRaised() external view returns (uint256);
 *   function getTips() external view returns (Tip[] memory);
 *   function owner() external view returns (address);
 *
 *   struct Tip {
 *     address tipper;
 *     uint256 amount;
 *     string  note;
 *     uint256 timestamp;
 *   }
 */

export const CONTRACT_ADDRESS =
  '0x0000000000000000000000000000000000000000' as `0x${string}`

export const CONTRACT_ABI = [
  // Write functions
  {
    name: 'tip',
    type: 'function',
    stateMutability: 'payable',
    inputs: [{ name: 'note', type: 'string' }],
    outputs: [],
  },
  {
    name: 'withdraw',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
  // Read functions
  {
    name: 'totalRaised',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    name: 'getTips',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        components: [
          { name: 'tipper', type: 'address' },
          { name: 'amount', type: 'uint256' },
          { name: 'note', type: 'string' },
          { name: 'timestamp', type: 'uint256' },
        ],
      },
    ],
  },
  {
    name: 'owner',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
  },
] as const

export type TipEntry = {
  tipper: `0x${string}`
  amount: bigint
  note: string
  timestamp: bigint
}
