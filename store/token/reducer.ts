import { HYDRATE } from 'next-redux-wrapper';
import { TokenAction, TokenState } from 'store/token/interfaces';
import TokenActionTypes from 'store/token/interfaces/actions.interfaces';

import { AppState } from '@/utils/state';

export const initialState: TokenState = {
  state: AppState.Initial,
  tokenSubmitState: AppState.Initial,
  tokenListState: AppState.Initial,
  tokenDetailState: AppState.Initial,
  tokens: undefined,
  token: undefined,
  tokenSubmittedId: undefined,
};

const tokenReducer = (
  state = initialState,
  action: TokenAction | { type: typeof HYDRATE; payload: TokenState },
): TokenState => {

  switch (action.type) {
    case TokenActionTypes.SET_GET_TOKEN_LIST_STATE:
      return {
        ...state,
        tokenListState: action.payload
      };
    case TokenActionTypes.SET_TOKEN_LIST:
      return {
        ...state,
        tokens: action.payload
      };
    case TokenActionTypes.SET_GET_TOKEN_DETAIL_STATE:
      return {
        ...state,
        tokenDetailState: action.payload
      };
    case TokenActionTypes.SET_TOKEN_DETAIL:
      return {
        ...state,
        token: action.payload
      };
    case TokenActionTypes.SET_SUBMIT_TOKEN_STATE:
      return {
        ...state,
        tokenSubmitState: action.payload
      };
    case TokenActionTypes.SET_TOKEN_SUBMIT:
      return {
        ...state,
        tokenSubmittedId: action.payload
      };
    default:
      return state;
  }
};

export default tokenReducer;
