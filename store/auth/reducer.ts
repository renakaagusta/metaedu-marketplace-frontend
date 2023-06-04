import { HYDRATE } from 'next-redux-wrapper';
import { AuthAction, AuthState } from 'store/auth/interfaces';
import AuthActionTypes from 'store/auth/interfaces/actions.interfaces';

import { AppState } from '@/utils/state';

export const initialState: AuthState = {
  signInState: AppState.Initial,
  signUpState: AppState.Initial,
  getUserNonceState: AppState.Initial,
  accessToken: undefined,
  nonce: undefined,
  isRegistered: undefined
};

const authReducer = (
  state = initialState,
  action: AuthAction | { type: typeof HYDRATE; payload: AuthState },
): AuthState => {

  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };

    case AuthActionTypes.SET_STORAGE_DATA_STATE:
      return { ...state, ...action.payload };

    case AuthActionTypes.SET_SIGN_IN_STATE:
      if (action.payload) {
        localStorage.setItem('sign_in_state', action.payload.toString())
      }

      return {
        ...state,
        signInState: action.payload
      };

    case AuthActionTypes.SET_SIGN_UP_STATE:
      if (action.payload) {
        localStorage.setItem('sign_up_state', action.payload.toString())
      }

      return {
        ...state,
        signUpState: action.payload
      };

    case AuthActionTypes.SET_GET_USER_NONCE_STATE:
      if (action.payload) {
        localStorage.setItem('get_user_nonce_state', action.payload.toString())
      }

      return {
        ...state,
        getUserNonceState: action.payload
      };

    case AuthActionTypes.SET_ACCESS_TOKEN_STATE:
      if (action.payload) {
        localStorage.setItem('access_token', action.payload.toString())
      }

      return {
        ...state,
        accessToken: action.payload
      };

    case AuthActionTypes.SET_NONCE_STATE:
      if (action.payload) {
        localStorage.setItem('nonce', action.payload.toString())
      }

      return {
        ...state,
        nonce: action.payload
      };

    case AuthActionTypes.SET_IS_REGISTERED_STATE:
      if (action.payload) {
        localStorage.setItem('is_registered', action.payload.toString())
      }

      return {
        ...state,
        isRegistered: action.payload
      };


    default:
      return state;
  }
};

export default authReducer;
