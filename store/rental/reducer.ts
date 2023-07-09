import { HYDRATE } from 'next-redux-wrapper';
import { RentalAction, RentalState } from 'store/rental/interfaces';
import RentalActionTypes from 'store/rental/interfaces/actions.interfaces';

import { AppState } from '@/utils/state';

export const initialState: RentalState = {
  state: AppState.Initial,
  myRentalListState: AppState.Initial,
  myRentals: undefined,
  rentalByOtherListState: AppState.Initial,
  rentalsByOther: undefined,
  rentalListState: AppState.Initial,
  rentals: undefined,
  rentalUpdateState: AppState.Initial
};

const rentalReducer = (
  state = initialState,
  action: RentalAction | { type: typeof HYDRATE; payload: RentalState },
): RentalState => {

  switch (action.type) {
    case RentalActionTypes.SET_GET_MY_RENTAL_LIST_STATE:
      return {
        ...state,
        myRentalListState: action.payload
      };
    case RentalActionTypes.SET_MY_RENTAL_LIST:
      return {
        ...state,
        myRentals: action.payload
      };
    case RentalActionTypes.SET_GET_RENTAL_BY_OTHER_LIST_STATE:
      return {
        ...state,
        rentalByOtherListState: action.payload
      };
    case RentalActionTypes.SET_RENTAL_BY_OTHER_LIST:
      return {
        ...state,
        rentalsByOther: action.payload
      };
    case RentalActionTypes.SET_GET_RENTAL_LIST_STATE:
      return {
        ...state,
        rentalListState: action.payload
      };
    case RentalActionTypes.SET_RENTAL_LIST:
      return {
        ...state,
        rentals: action.payload
      };
    case RentalActionTypes.SET_UPDATE_RENTAL_STATE:
      return {
        ...state,
        rentalUpdateState: action.payload
      };
    default:
      return state;
  }
};

export default rentalReducer;
