import { Web3TransactionReceiptInterface } from "@/models/web3/transaction_receipt"

export interface Web3TransactionInterface {
  hash: string
  type: number
  accessList: any
  blockHash: any
  blockNumber: any
  transactionIndex: any
  confirmations: number
  from: string
  gasPrice: GasPrice
  gasLimit: GasLimit
  to: string
  value: Value
  nonce: number
  data: string
  r: string
  s: string
  v: number
  creates: any
  chainId: number
  wait: () => Web3TransactionReceiptInterface
}

export interface GasPrice {
  type: string
  hex: string
}

export interface GasLimit {
  type: string
  hex: string
}

export interface Value {
  type: string
  hex: string
}
