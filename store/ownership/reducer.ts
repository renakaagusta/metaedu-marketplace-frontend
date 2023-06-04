import { HYDRATE } from 'next-redux-wrapper';
import { OwnershipAction, OwnershipState } from 'store/ownership/interfaces';
import OwnershipActionTypes from 'store/ownership/interfaces/actions.interfaces';

import { AppState } from '@/utils/state';

export const initialState: OwnershipState = {
  state: AppState.Initial,
  myOwnershipListState: AppState.Initial,
  myOwnershipList: undefined,
  ownershipListState: AppState.Initial,
  ownershipList: undefined,
  fractionOwnershipListState: AppState.Initial,
  fractionOwnershipList: undefined,
  ownershipUpdateState: AppState.Initial
};

const ownershipReducer = (
  state = initialState,
  action: OwnershipAction | { type: typeof HYDRATE; payload: OwnershipState },
): OwnershipState => {

  switch (action.type) {
    case OwnershipActionTypes.SET_GET_MY_OWNERSHIP_LIST_STATE:
      return {
        ...state,
        myOwnershipListState: action.payload
      };
    case OwnershipActionTypes.SET_MY_OWNERSHIP_LIST:
      return {
        ...state,
        myOwnershipList: action.payload
      };
    case OwnershipActionTypes.SET_GET_OWNERSHIP_LIST_STATE:
      return {
        ...state,
        ownershipListState: action.payload
      };
    case OwnershipActionTypes.SET_OWNERSHIP_LIST:
      return {
        ...state,
        ownershipList: action.payload
      };
    case OwnershipActionTypes.SET_GET_FRACTION_OWNERSHIP_LIST_STATE:
      return {
        ...state,
        fractionOwnershipListState: action.payload
      };
    case OwnershipActionTypes.SET_FRACTION_OWNERSHIP_LIST:
      return {
        ...state,
        fractionOwnershipList: action.payload
      };
    case OwnershipActionTypes.SET_UPDATE_OWNERSHIP_STATE:
      return {
        ...state,
        ownershipUpdateState: action.payload
      };
    default:
      return state;
  }
};

export default ownershipReducer;
