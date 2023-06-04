import { Action } from "redux"

import Token from "@/models/token.model"
import { GetTokenListPayload, SubmitTokenPayload } from "@/repositories/token.repository"
import { AppState } from '@/utils/state'

enum TokenActionTypes {
  // SAGA
  GET_TOKEN_LIST = 'TOKEN/GET_TOKEN_LIST/SAGA',
  GET_TOKEN_DETAIL = 'TOKEN/GET_TOKEN_DETAIL/SAGA',
  SUBMIT_TOKEN = 'TOKEN/SUBMIT_TOKEN/SAGA',

  // REDUCER
  SET_STATE = 'TOKEN/SET_STATE/REDUCER',
  SET_GET_TOKEN_LIST_STATE = 'TOKEN/SET_GET_TOKEN_LIST_STATE/REDUCER',
  SET_GET_TOKEN_DETAIL_STATE = 'TOKEN/SET_GET_TOKEN_DETAIL_STATE/REDUCER',
  SET_SUBMIT_TOKEN_STATE = 'TOKEN/SUBMIT_TOKEN/REDUCER',
  SET_TOKEN_LIST = 'TOKEN/SET_TOKEN_LIST/REDUCER',
  SET_TOKEN_DETAIL = 'TOKEN/SET_TOKEN_DETAIL/REDUCER',
  SET_TOKEN_SUBMIT = 'TOKEN/SET_TOKEN_SUBMIT/REDUCER',
}

export default TokenActionTypes

export type TokenAction =
  | SetState
  | GetTokenList
  | SetTokenList
  | GetTokenDetail
  | SetTokenDetail
  | SubmitToken
  | SetSubmitToken
  | SetTokenListState
  | SetTokenDetailState
  | SetSubmitTokenState

export interface SetState {
  type: TokenActionTypes.SET_STATE,
  payload: AppState
}

export interface GetTokenList {
  type: TokenActionTypes.GET_TOKEN_LIST
  payload: GetTokenListPayload
}

export interface GetTokenDetail {
  type: TokenActionTypes.GET_TOKEN_DETAIL
  payload: string
}

export interface SubmitToken {
  type: TokenActionTypes.SUBMIT_TOKEN
  payload: SubmitTokenPayload
}

export interface SetTokenListState {
  type: TokenActionTypes.SET_GET_TOKEN_LIST_STATE
  payload: AppState
}

export interface SetTokenList {
  type: TokenActionTypes.SET_TOKEN_LIST
  payload: Array<Token>
}

export interface SetTokenDetailState {
  type: TokenActionTypes.SET_GET_TOKEN_DETAIL_STATE
  payload: AppState
}

export interface SetTokenDetail {
  type: TokenActionTypes.SET_TOKEN_DETAIL
  payload: Token
}

export interface SetSubmitTokenState {
  type: TokenActionTypes.SET_SUBMIT_TOKEN_STATE
  payload: AppState
}

export interface SetSubmitToken {
  type: TokenActionTypes.SET_TOKEN_SUBMIT
  payload: string
}

export interface GetTokenParams extends Action, GetTokenDetail { type: TokenActionTypes.GET_TOKEN_DETAIL }
export interface GetTokenListParams extends Action, GetTokenList { type: TokenActionTypes.GET_TOKEN_LIST }
export interface SubmitTokenParams extends Action, SubmitToken { type: TokenActionTypes.SUBMIT_TOKEN }
