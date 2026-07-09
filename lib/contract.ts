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
  '0xC17988D9b2DfE24F6C9d21A2F72517767c944323' as `0x${string}`

export const CONTRACT_ABI = [

  {
    "inputs": [
      {
        "internalType": "string",
        "name": "note",
        "type": "string"
      }
    ],
    "name": "tip",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "note",
        "type": "string"
      }
    ],
    "name": "Tipped",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTips",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "note",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct TipJar.Tip[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalRaised",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }

] as const

export type TipEntry = {
  from: `0x${string}`
  amount: bigint
  note: string
  timestamp: bigint
}
