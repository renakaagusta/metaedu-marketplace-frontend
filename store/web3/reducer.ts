import { HYDRATE } from 'next-redux-wrapper';
import Web3ActionTypes from 'store/web3/interfaces/actions.interfaces';

import { AppState } from '@/utils/state';

import { Web3Action, Web3State } from './interfaces';

export const initialState: Web3State = {
  state: AppState.Initial,
  connectCounter: 0,
  provider: undefined,
  web3Provider: undefined,
  network: undefined,
  signer: undefined,
  address: undefined,
  contract: undefined
};

const web3Reducer = (
  state = initialState,
  action: Web3Action | { type: typeof HYDRATE; payload: Web3State },
): Web3State => {

  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };

    case Web3ActionTypes.SET_CONNECT_COUNTER_STATE:
      return {
        ...state,
        connectCounter: action.payload
      };

    case Web3ActionTypes.SET_PROVIDER_STATE:
      return {
        ...state,
        provider: action.payload
      };

    case Web3ActionTypes.SET_WEB3_PROVIDER_STATE:
      return {
        ...state,
        web3Provider: action.payload
      };

    case Web3ActionTypes.SET_NETWORK_STATE:
      return {
        ...state,
        network: action.payload
      };

    case Web3ActionTypes.SET_SIGNER_STATE:
      return {
        ...state,
        signer: action.payload
      };

    case Web3ActionTypes.SET_ADDRESS_STATE:
      return {
        ...state,
        address: action.payload
      };

    case Web3ActionTypes.SET_CONTRACT_STATE:
      return {
        ...state,
        contract: action.payload
      };

    default:
      return state;
  }
};

export default web3Reducer;
