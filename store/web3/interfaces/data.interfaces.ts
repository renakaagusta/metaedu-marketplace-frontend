import { ethers, Signer } from "ethers"

import { AppState } from "@/utils/state"

export interface Web3State {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: AppState
  connectCounter: number | null | undefined
  provider: any
  web3Provider: ethers.providers.Web3Provider | null | undefined
  network: ethers.providers.Network | null | undefined
  signer: Signer | null | undefined
  address: string | null | undefined
  contract: ethers.Contract | null | undefined
}
