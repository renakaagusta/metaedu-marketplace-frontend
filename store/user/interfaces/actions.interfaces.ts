import { Action } from "redux"

import User from "@/models/user.model"
import { GetMyUserDataPayload, UpdateMyUserDataPayload } from "@/repositories/user.repository"
import { AppState } from '@/utils/state'

enum UserActionTypes {
  // SAGA
  GET_MY_USER_DATA = 'USER/GET_MY_USER_DATA/SAGA',
  GET_USER_DETAIL = 'USER/GET_USER_DETAIL/SAGA',
  UPDATE_MY_USER_DATA = 'USER/UPDATE_MY_USER_DATA/SAGA',

  // REDUCER
  SET_STATE = 'USER/SET_STATE/REDUCER',
  SET_GET_MY_USER_DATA_STATE = 'USER/SET_GET_MY_USER_DATA_STATE/REDUCER',
  SET_GET_USER_DETAIL_STATE = 'USER/SET_GET_USER_DETAIL_STATE/REDUCER',
  SET_UPDATE_MY_USER_DATA_STATE = 'USER/UPDATE_MY_USER_DATA/REDUCER',
  SET_MY_USER_DATA = 'USER/SET_MY_USER_DATA/REDUCER',
  SET_USER_DETAIL = 'USER/SET_USER_DETAIL/REDUCER',
}

export default UserActionTypes

export type UserAction =
  | SetState
  | GetMyUserData
  | SetMyUserData
  | SetMyUserDataState
  | GetUserDetail
  | SetUserDetail
  | SetUserDetailState
  | UpdateMyUserData
  | SetUpdateMyUserDataState

export interface SetState {
  type: UserActionTypes.SET_STATE,
  payload: AppState
}

export interface GetMyUserData {
  type: UserActionTypes.GET_MY_USER_DATA
  payload: GetMyUserDataPayload
}

export interface SetMyUserData {
  type: UserActionTypes.SET_MY_USER_DATA
  payload: User
}

export interface SetMyUserDataState {
  type: UserActionTypes.SET_GET_MY_USER_DATA_STATE
  payload: AppState
}

export interface GetUserDetail {
  type: UserActionTypes.GET_USER_DETAIL
  payload: string
}

export interface SetUserDetail {
  type: UserActionTypes.SET_USER_DETAIL
  payload: User
}

export interface SetUserDetailState {
  type: UserActionTypes.SET_GET_USER_DETAIL_STATE
  payload: AppState
}

export interface UpdateMyUserData {
  type: UserActionTypes.UPDATE_MY_USER_DATA
  payload: UpdateMyUserDataPayload
}

export interface SetUpdateMyUserDataState {
  type: UserActionTypes.SET_UPDATE_MY_USER_DATA_STATE
  payload: AppState
}

export interface GetUserParams extends Action, GetUserDetail { type: UserActionTypes.GET_USER_DETAIL }
export interface GetMyUserDataParams extends Action, GetMyUserData { type: UserActionTypes.GET_MY_USER_DATA }
export interface UpdateMyUserDataParams extends Action, UpdateMyUserData { type: UserActionTypes.UPDATE_MY_USER_DATA }
