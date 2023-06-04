import { HYDRATE } from 'next-redux-wrapper';
import { FractionAction, FractionState } from 'store/fraction/interfaces';
import FractionActionTypes from 'store/fraction/interfaces/actions.interfaces';

import { AppState } from '@/utils/state';

export const initialState: FractionState = {
  state: AppState.Initial,
  fractionSubmitState: AppState.Initial,
  fractionListState: AppState.Initial,
  fractionDetailState: AppState.Initial,
  fractions: undefined,
  fraction: undefined,
  fractionSubmittedId: undefined,
};

const fractionReducer = (
  state = initialState,
  action: FractionAction | { type: typeof HYDRATE; payload: FractionState },
): FractionState => {

  switch (action.type) {
    case FractionActionTypes.SET_GET_FRACTION_LIST_STATE:
      return {
        ...state,
        fractionListState: action.payload
      };
    case FractionActionTypes.SET_FRACTION_LIST:
      return {
        ...state,
        fractions: action.payload
      };
    case FractionActionTypes.SET_GET_FRACTION_DETAIL_STATE:
      return {
        ...state,
        fractionDetailState: action.payload
      };
    case FractionActionTypes.SET_FRACTION_DETAIL:
      return {
        ...state,
        fraction: action.payload
      };
    case FractionActionTypes.SET_SUBMIT_FRACTION_STATE:
      return {
        ...state,
        fractionSubmitState: action.payload
      };
    case FractionActionTypes.SET_FRACTION_SUBMIT:
      return {
        ...state,
        fractionSubmittedId: action.payload
      };
    default:
      return state;
  }
};

export default fractionReducer;
