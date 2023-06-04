import { Action } from "redux"

import Fraction from "@/models/fraction.model"
import { GetFractionListPayload, SubmitFractionPayload } from "@/repositories/fraction.repository"
import { AppState } from '@/utils/state'

enum FractionActionTypes {
  // SAGA
  GET_FRACTION_LIST = 'FRACTION/GET_FRACTION_LIST/SAGA',
  GET_FRACTION_DETAIL = 'FRACTION/GET_FRACTION_DETAIL/SAGA',
  SUBMIT_FRACTION = 'FRACTION/SUBMIT_FRACTION/SAGA',

  // REDUCER
  SET_STATE = 'FRACTION/SET_STATE/REDUCER',
  SET_GET_FRACTION_LIST_STATE = 'FRACTION/SET_GET_FRACTION_LIST_STATE/REDUCER',
  SET_GET_FRACTION_DETAIL_STATE = 'FRACTION/SET_GET_FRACTION_DETAIL_STATE/REDUCER',
  SET_SUBMIT_FRACTION_STATE = 'FRACTION/SUBMIT_FRACTION/REDUCER',
  SET_FRACTION_LIST = 'FRACTION/SET_FRACTION_LIST/REDUCER',
  SET_FRACTION_DETAIL = 'FRACTION/SET_FRACTION_DETAIL/REDUCER',
  SET_FRACTION_SUBMIT = 'FRACTION/SET_FRACTION_SUBMIT/REDUCER',
}

export default FractionActionTypes

export type FractionAction =
  | SetState
  | GetFractionList
  | SetFractionList
  | GetFractionDetail
  | SetFractionDetail
  | SubmitFraction
  | SetSubmitFraction
  | SetFractionListState
  | SetFractionDetailState
  | SetSubmitFractionState

export interface SetState {
  type: FractionActionTypes.SET_STATE,
  payload: AppState
}

export interface GetFractionList {
  type: FractionActionTypes.GET_FRACTION_LIST
  payload: GetFractionListPayload
}

export interface GetFractionDetail {
  type: FractionActionTypes.GET_FRACTION_DETAIL
  payload: string
}

export interface SubmitFraction {
  type: FractionActionTypes.SUBMIT_FRACTION
  payload: SubmitFractionPayload
}

export interface SetFractionListState {
  type: FractionActionTypes.SET_GET_FRACTION_LIST_STATE
  payload: AppState
}

export interface SetFractionList {
  type: FractionActionTypes.SET_FRACTION_LIST
  payload: Array<Fraction>
}

export interface SetFractionDetailState {
  type: FractionActionTypes.SET_GET_FRACTION_DETAIL_STATE
  payload: AppState
}

export interface SetFractionDetail {
  type: FractionActionTypes.SET_FRACTION_DETAIL
  payload: Fraction
}

export interface SetSubmitFractionState {
  type: FractionActionTypes.SET_SUBMIT_FRACTION_STATE
  payload: AppState
}

export interface SetSubmitFraction {
  type: FractionActionTypes.SET_FRACTION_SUBMIT
  payload: string
}

export interface GetFractionParams extends Action, GetFractionDetail { type: FractionActionTypes.GET_FRACTION_DETAIL }
export interface GetFractionListParams extends Action, GetFractionList { type: FractionActionTypes.GET_FRACTION_LIST }
export interface SubmitFractionParams extends Action, SubmitFraction { type: FractionActionTypes.SUBMIT_FRACTION }
