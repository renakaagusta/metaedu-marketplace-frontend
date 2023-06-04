export interface Web3TransactionReceiptInterface {
  to: string
  from: string
  contractAddress: any
  transactionIndex: number
  gasUsed: GasUsed
  logsBloom: string
  blockHash: string
  transactionHash: string
  logs: Log[]
  blockNumber: number
  confirmations: number
  cumulativeGasUsed: CumulativeGasUsed
  status: number
  type: number
  byzantium: boolean
  events: Event[]
}

export interface GasUsed {
  type: string
  hex: string
}

export interface Log {
  transactionIndex: number
  blockNumber: number
  transactionHash: string
  address: string
  topics: string[]
  data: string
  logIndex: number
  blockHash: string
}

export interface CumulativeGasUsed {
  type: string
  hex: string
}

export interface Event {
  transactionIndex: number
  blockNumber: number
  transactionHash: string
  address: string
  topics: string[]
  data: string
  logIndex: number
  blockHash: string
  args: [any, string, string, any, Args]
  event: string
  eventSignature: string
}

export interface Args {
  type: string
  hex: string
}
