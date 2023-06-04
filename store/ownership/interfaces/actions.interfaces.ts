import { Action } from "redux"

import Ownership from "@/models/ownership.model"
import { GetOwnershipListPayload, UpdateOwnershipPayload } from "@/repositories/ownership.repository"
import { AppState } from '@/utils/state'

enum OwnershipActionTypes {
  // SAGA
  GET_MY_OWNERSHIP_LIST = 'OWNERSHIP/GET_MY_OWNERSHIP_LIST/SAGA',
  GET_OWNERSHIP_LIST = 'OWNERSHIP/GET_OWNERSHIP_LIST/SAGA',
  GET_FRACTION_OWNERSHIP_LIST = 'OWNERSHIP/GET_FRACTION_OWNERSHIP_LIST/SAGA',
  UPDATE_OWNERSHIP = 'OWNERSHIP/UPDATE_OWNERSHIP/SAGA',

  // REDUCER
  SET_STATE = 'OWNERSHIP/SET_STATE/REDUCER',
  SET_GET_MY_OWNERSHIP_LIST_STATE = 'OWNERSHIP/SET_GET_MY_OWNERSHIP_LIST_STATE/REDUCER',
  SET_GET_OWNERSHIP_LIST_STATE = 'OWNERSHIP/SET_GET_OWNERSHIP_LIST_STATE/REDUCER',
  SET_GET_FRACTION_OWNERSHIP_LIST_STATE = 'OWNERSHIP/SET_GET_FRACTION_OWNERSHIP_LIST_STATE/REDUCER',
  SET_UPDATE_OWNERSHIP_STATE = 'OWNERSHIP/SET_UPDATE_OWNERSHIP_STATE/REDUCER',
  SET_MY_OWNERSHIP_LIST = 'OWNERSHIP/SET_MY_OWNERSHIP_LIST/REDUCER',
  SET_OWNERSHIP_LIST = 'OWNERSHIP/SET_OWNERSHIP_LIST/REDUCER',
  SET_FRACTION_OWNERSHIP_LIST = 'OWNERSHIP/SET_FRACTION_OWNERSHIP_LIST/REDUCER',
}

export default OwnershipActionTypes

export type OwnershipAction =
  | SetState
  | GetMyOwnershipList
  | GetOwnershipList
  | GetFractionOwnershipList
  | UpdateOwnership
  | SetMyOwnershipList
  | SetOwnershipList
  | SetFractionOwnershipList
  | SetMyOwnershipListState
  | SetOwnershipListState
  | SetFractionOwnershipListState
  | SetOwnershipUpdateState

export interface SetState {
  type: OwnershipActionTypes.SET_STATE,
  payload: AppState
}

export interface GetMyOwnershipList {
  type: OwnershipActionTypes.GET_MY_OWNERSHIP_LIST
  payload: GetOwnershipListPayload
}

export interface GetOwnershipList {
  type: OwnershipActionTypes.GET_OWNERSHIP_LIST
  payload: GetOwnershipListPayload
}

export interface GetFractionOwnershipList {
  type: OwnershipActionTypes.GET_FRACTION_OWNERSHIP_LIST
  payload: GetOwnershipListPayload
}

export interface UpdateOwnership {
  type: OwnershipActionTypes.UPDATE_OWNERSHIP
  payload: UpdateOwnershipPayload
}

export interface SetMyOwnershipListState {
  type: OwnershipActionTypes.SET_GET_MY_OWNERSHIP_LIST_STATE
  payload: AppState
}

export interface SetOwnershipListState {
  type: OwnershipActionTypes.SET_GET_OWNERSHIP_LIST_STATE
  payload: AppState
}

export interface SetFractionOwnershipListState {
  type: OwnershipActionTypes.SET_GET_FRACTION_OWNERSHIP_LIST_STATE
  payload: AppState
}

export interface SetOwnershipUpdateState {
  type: OwnershipActionTypes.SET_UPDATE_OWNERSHIP_STATE
  payload: AppState
}

export interface SetMyOwnershipList {
  type: OwnershipActionTypes.SET_MY_OWNERSHIP_LIST
  payload: Array<Ownership>
}

export interface SetOwnershipList {
  type: OwnershipActionTypes.SET_OWNERSHIP_LIST
  payload: Array<Ownership>
}

export interface SetFractionOwnershipList {
  type: OwnershipActionTypes.SET_FRACTION_OWNERSHIP_LIST
  payload: Array<Ownership>
}

export interface GetMyOwnershipListParams extends Action, GetMyOwnershipList { type: OwnershipActionTypes.GET_MY_OWNERSHIP_LIST }
export interface GetOwnershipListParams extends Action, GetOwnershipList { type: OwnershipActionTypes.GET_OWNERSHIP_LIST }
export interface GetFractionOwnershipListParams extends Action, GetFractionOwnershipList { type: OwnershipActionTypes.GET_FRACTION_OWNERSHIP_LIST }
export interface UpdateOwnershipParams extends Action, UpdateOwnership { type: OwnershipActionTypes.UPDATE_OWNERSHIP }