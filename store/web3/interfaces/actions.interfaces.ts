import { ethers, Signer } from 'ethers'
import { Action } from "redux"

import { AppState } from '@/utils/state'

enum Web3ActionTypes {
  // SAGA
  SET_PROVIDER = 'WEB3/SET_PROVIDER',
  SET_CONNECT_COUNTER = 'WEB3/SET_CONNECT_COUNTER',
  SET_WEB3_PROVIDER = 'WEB3/SET_WEB3_PROVIDER',
  SET_NETWORK = 'WEB3/SET_NETWORK',
  SET_SIGNER = 'WEB3/SET_SIGNER',
  SET_ADDRESS = 'WEB3/SET_ADDRESS',
  SET_CONTRACT = 'WEB3/SET_CONTRACT',

  // REDUCER
  SET_STATE = 'WEB3/SET_STATE',
  SET_CONNECT_COUNTER_STATE = 'WEB3/SET_CONNECT_COUNTER_STATE',
  SET_PROVIDER_STATE = 'WEB3/SET_PROVIDER_STATE',
  SET_WEB3_PROVIDER_STATE = 'WEB3/SET_WEB3_PROVIDER_STATE',
  SET_NETWORK_STATE = 'WEB3/SET_NETWORK_STATE',
  SET_SIGNER_STATE = 'WEB3/SET_SIGNER_STATE',
  SET_ADDRESS_STATE = 'WEB3/SET_ADDRESS_STATE',
  SET_CONTRACT_STATE = 'WEB3/SET_CONTRACT_STATE',
}

export default Web3ActionTypes

export type Web3Action =
  | SetConnectCounter
  | SetProvider
  | SetWeb3Provider
  | SetNetwork
  | SetSigner
  | SetAddress
  | SetContract
  | SetConnectCounterState
  | SetProviderState
  | SetWeb3ProviderState
  | SetNetworkState
  | SetSignerState
  | SetAddressState
  | SetContractState

export interface SetState {
  type: Web3ActionTypes.SET_STATE,
  payload: AppState | null | undefined
}

export interface SetConnectCounter {
  type: Web3ActionTypes.SET_CONNECT_COUNTER
  payload: number | null | undefined
}

export interface SetProvider {
  type: Web3ActionTypes.SET_PROVIDER
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any | null | undefined
}

export interface SetWeb3Provider {
  type: Web3ActionTypes.SET_WEB3_PROVIDER
  payload: ethers.providers.Web3Provider | null | undefined
}

export interface SetNetwork {
  type: Web3ActionTypes.SET_NETWORK
  payload: ethers.providers.Network | null | undefined
}

export interface SetSigner {
  type: Web3ActionTypes.SET_SIGNER
  payload: Signer | null | undefined
}

export interface SetAddress {
  type: Web3ActionTypes.SET_ADDRESS
  payload: string | null | undefined
}

export interface SetContract {
  type: Web3ActionTypes.SET_CONTRACT
  payload: ethers.Contract | null | undefined
}

export interface SetConnectCounterState {
  type: Web3ActionTypes.SET_CONNECT_COUNTER_STATE
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: number | null | undefined
}

export interface SetProviderState {
  type: Web3ActionTypes.SET_PROVIDER_STATE
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any | null | undefined
}

export interface SetWeb3ProviderState {
  type: Web3ActionTypes.SET_WEB3_PROVIDER_STATE
  payload: ethers.providers.Web3Provider | null | undefined
}

export interface SetNetworkState {
  type: Web3ActionTypes.SET_NETWORK_STATE
  payload: ethers.providers.Network | null | undefined
}

export interface SetSignerState {
  type: Web3ActionTypes.SET_SIGNER_STATE
  payload: Signer | null | undefined
}

export interface SetAddressState {
  type: Web3ActionTypes.SET_ADDRESS_STATE
  payload: string | null | undefined
}

export interface SetContractState {
  type: Web3ActionTypes.SET_CONTRACT_STATE
  payload: ethers.Contract | null | undefined
}

export interface UpdateStateParams extends Action, SetState { type: Web3ActionTypes.SET_STATE }
export interface UpdateConnectCounterParams extends Action, SetConnectCounter { type: Web3ActionTypes.SET_CONNECT_COUNTER }
export interface UpdateProviderParams extends Action, SetProvider { type: Web3ActionTypes.SET_PROVIDER }
export interface UpdateWeb3ProviderParams extends Action, SetWeb3Provider { type: Web3ActionTypes.SET_WEB3_PROVIDER }
export interface UpdateNetworkParams extends Action, SetNetwork { type: Web3ActionTypes.SET_NETWORK }
export interface UpdateSignerParams extends Action, SetSigner { type: Web3ActionTypes.SET_SIGNER }
export interface UpdateAddressParams extends Action, SetAddress { type: Web3ActionTypes.SET_ADDRESS }
export interface UpdateContractParams extends Action, SetContract { type: Web3ActionTypes.SET_CONTRACT }