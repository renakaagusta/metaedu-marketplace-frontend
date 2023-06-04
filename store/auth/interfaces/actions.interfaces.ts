import { Action } from "redux"
import { AuthState } from "store/auth/interfaces/data.interfaces"

import { SignInPayload, SignUpPayload } from '@/repositories/auth.repository'
import { AppState } from "@/utils/state"

enum AuthActionTypes {
  // SAGA
  SIGN_IN = 'AUTH/SIGN_IN',
  SIGN_UP = 'AUTH/SIGN_UP',
  GET_USER_NONCE = 'AUTH/GET_USER_NONCE',
  LOAD_STORAGE_DATA = 'AUTH/LOAD_STORAGE_DATA',

  // REDUCER
  SET_STORAGE_DATA_STATE = 'AUTH/SET_STORAGE_DATA_STATE',
  SET_SIGN_IN_STATE = 'AUTH/SET_SIGN_IN_STATE',
  SET_SIGN_UP_STATE = 'AUTH/SET_SIGN_UP_STATE',
  SET_GET_USER_NONCE_STATE = 'AUTH/SET_GET_USER_NONCE_STATE',
  SET_ACCESS_TOKEN_STATE = 'AUTH/SET_ACCESS_TOKEN_STATE',
  SET_NONCE_STATE = 'AUTH/SET_ACCESS_TOKEN_NONCE',
  SET_IS_REGISTERED_STATE = 'AUTH/SET_IS_REGISTERED_STATE'
}
export default AuthActionTypes

export type AuthAction =
  | SignIn
  | SignUp
  | GetUserNonce
  | LoadStorageData
  | SetStorageDataState
  | SetSignInState
  | SetSignUpState
  | SetGetUserNonceState
  | SetAccessToken
  | SetNonce
  | SetIsRegistered

export interface SignIn {
  type: AuthActionTypes.SIGN_IN
  payload: SignInPayload | null | undefined
}

export interface SignUp {
  type: AuthActionTypes.SIGN_UP
  payload: SignUpPayload | null | undefined
}

export interface GetUserNonce {
  type: AuthActionTypes.GET_USER_NONCE
  payload: string | null | undefined
}

export interface LoadStorageData {
  type: AuthActionTypes.LOAD_STORAGE_DATA
  payload: AuthState | null | undefined
}

export interface SetStorageDataState {
  type: AuthActionTypes.SET_STORAGE_DATA_STATE
  payload: AuthState | null | undefined
}

export interface SetSignInState {
  type: AuthActionTypes.SET_SIGN_IN_STATE
  payload: AppState | null | undefined
}

export interface SetSignUpState {
  type: AuthActionTypes.SET_SIGN_UP_STATE
  payload: AppState | null | undefined
}

export interface SetGetUserNonceState {
  type: AuthActionTypes.SET_GET_USER_NONCE_STATE
  payload: AppState | null | undefined
}

export interface SetAccessToken {
  type: AuthActionTypes.SET_ACCESS_TOKEN_STATE
  payload: string | null | undefined
}

export interface SetNonce {
  type: AuthActionTypes.SET_NONCE_STATE
  payload: string | null | undefined
}

export interface SetIsRegistered {
  type: AuthActionTypes.SET_IS_REGISTERED_STATE
  payload: boolean | null | undefined
}

// export interface StorageData extends Action, LoadStorageData { type: AuthActionTypes.LOAD_STORAGE_DATA }
export interface SignInParams extends Action, SignIn { type: AuthActionTypes.SIGN_IN }
export interface SignUpParams extends Action, SignUp { type: AuthActionTypes.SIGN_UP }
export interface GetUserNonceParams extends Action, GetUserNonce { type: AuthActionTypes.GET_USER_NONCE }