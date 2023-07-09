import { Action } from "redux"

import Rental from "@/models/rental.model"
import { GetRentalListPayload, UpdateRentalPayload } from "@/repositories/rental.repository"
import { AppState } from '@/utils/state'

enum RentalActionTypes {
  // SAGA
  GET_MY_RENTAL_LIST = 'RENTAL/GET_MY_RENTAL_LIST/SAGA',
  GET_RENTAL_BY_OTHER_LIST = 'RENTAL/GET_RENTAL_BY_OTHER_LIST/SAGA',
  GET_RENTAL_LIST = 'RENTAL/GET_RENTAL_LIST/SAGA',
  UPDATE_RENTAL = 'RENTAL/UPDATE_RENTAL/SAGA',

  // REDUCER
  SET_STATE = 'RENTAL/SET_STATE/REDUCER',
  SET_GET_MY_RENTAL_LIST_STATE = 'RENTAL/SET_GET_MY_RENTAL_LIST_STATE/REDUCER',
  SET_GET_RENTAL_BY_OTHER_LIST_STATE = 'RENTAL/SET_GET_RENTAL_BY_OTHER_LIST_STATE/REDUCER',
  SET_GET_RENTAL_LIST_STATE = 'RENTAL/SET_GET_RENTAL_LIST_STATE/REDUCER',
  SET_UPDATE_RENTAL_STATE = 'RENTAL/SET_UPDATE_RENTAL_STATE/REDUCER',
  SET_MY_RENTAL_LIST = 'RENTAL/SET_MY_RENTAL_LIST/REDUCER',
  SET_RENTAL_BY_OTHER_LIST = 'RENTAL/SET_RENTAL_BY_OTHER_LIST/REDUCER',
  SET_RENTAL_LIST = 'RENTAL/SET_RENTAL_LIST/REDUCER',
}

export default RentalActionTypes

export type RentalAction =
  | SetState
  | GetMyRentalList
  | GetRentalByOtherList
  | GetRentalList
  | UpdateRental
  | SetMyRentalList
  | SetRentalByOtherList
  | SetRentalList
  | SetMyRentalListState
  | SetRentalByOtherListState
  | SetRentalListState
  | SetRentalUpdateState

export interface SetState {
  type: RentalActionTypes.SET_STATE,
  payload: AppState
}

export interface GetMyRentalList {
  type: RentalActionTypes.GET_MY_RENTAL_LIST
  payload: GetRentalListPayload
}

export interface GetRentalByOtherList {
  type: RentalActionTypes.GET_RENTAL_BY_OTHER_LIST
  payload: GetRentalListPayload
}

export interface GetRentalList {
  type: RentalActionTypes.GET_RENTAL_LIST
  payload: GetRentalListPayload
}

export interface UpdateRental {
  type: RentalActionTypes.UPDATE_RENTAL
  payload: UpdateRentalPayload
}

export interface SetMyRentalListState {
  type: RentalActionTypes.SET_GET_MY_RENTAL_LIST_STATE
  payload: AppState
}

export interface SetRentalByOtherListState {
  type: RentalActionTypes.SET_GET_RENTAL_BY_OTHER_LIST_STATE
  payload: AppState
}

export interface SetRentalListState {
  type: RentalActionTypes.SET_GET_RENTAL_LIST_STATE
  payload: AppState
}

export interface SetRentalUpdateState {
  type: RentalActionTypes.SET_UPDATE_RENTAL_STATE
  payload: AppState
}

export interface SetMyRentalList {
  type: RentalActionTypes.SET_MY_RENTAL_LIST
  payload: Array<Rental>
}

export interface SetRentalByOtherList {
  type: RentalActionTypes.SET_RENTAL_BY_OTHER_LIST
  payload: Array<Rental>
}

export interface SetRentalList {
  type: RentalActionTypes.SET_RENTAL_LIST
  payload: Array<Rental>
}

export interface GetMyRentalListParams extends Action, GetMyRentalList { type: RentalActionTypes.GET_MY_RENTAL_LIST }
export interface GetRentalByOtherListParams extends Action, GetRentalByOtherList { type: RentalActionTypes.GET_RENTAL_BY_OTHER_LIST }
export interface GetRentalListParams extends Action, GetRentalList { type: RentalActionTypes.GET_RENTAL_LIST }
export interface UpdateRentalParams extends Action, UpdateRental { type: RentalActionTypes.UPDATE_RENTAL }