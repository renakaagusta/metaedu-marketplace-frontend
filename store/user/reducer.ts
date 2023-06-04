import { HYDRATE } from 'next-redux-wrapper';
import { UserAction, UserState } from 'store/user/interfaces';
import UserActionTypes from 'store/user/interfaces/actions.interfaces';

import { AppState } from '@/utils/state';

export const initialState: UserState = {
  state: AppState.Initial,
  myUserDataState: AppState.Initial,
  userDetailState: AppState.Initial,
  updateMyUserDataState: AppState.Initial,
  user: undefined,
  myUserData: undefined,
};

const userReducer = (
  state = initialState,
  action: UserAction | { type: typeof HYDRATE; payload: UserState },
): UserState => {

  switch (action.type) {
    case UserActionTypes.SET_GET_MY_USER_DATA_STATE:
      return {
        ...state,
        myUserDataState: action.payload
      };
    case UserActionTypes.SET_MY_USER_DATA:
      return {
        ...state,
        myUserData: action.payload
      };
    case UserActionTypes.SET_GET_USER_DETAIL_STATE:
      return {
        ...state,
        userDetailState: action.payload
      };
    case UserActionTypes.SET_USER_DETAIL:
      return {
        ...state,
        user: action.payload
      };
    case UserActionTypes.SET_UPDATE_MY_USER_DATA_STATE:
      return {
        ...state,
        updateMyUserDataState: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
