import { Action } from "redux"

import TokenCategory from "@/models/token_category.model"
import { GetTokenCategoryListPayload } from "@/repositories/token_category.repository"
import { AppState } from '@/utils/state'

enum TokenCategoryActionTypes {
  // SAGA
  GET_TOKEN_CATEGORY_LIST = 'TOKEN_CATEGORY/GET_TOKEN_CATEGORY_LIST/SAGA',
  GET_TOKEN_CATEGORY_DETAIL = 'TOKEN_CATEGORY/GET_TOKEN_CATEGORY_DETAIL/SAGA',

  // REDUCER
  SET_STATE = 'TOKEN_CATEGORY/SET_STATE/REDUCER',
  SET_GET_TOKEN_CATEGORY_LIST_STATE = 'TOKEN_CATEGORY/SET_GET_TOKEN_CATEGORY_LIST_STATE/REDUCER',
  SET_GET_TOKEN_CATEGORY_DETAIL_STATE = 'TOKEN_CATEGORY/SET_GET_TOKEN_CATEGORY_DETAIL_STATE/REDUCER',
  SET_TOKEN_CATEGORY_LIST = 'TOKEN_CATEGORY/SET_TOKEN_CATEGORY_LIST/REDUCER',
  SET_TOKEN_CATEGORY_DETAIL = 'TOKEN_CATEGORY/SET_TOKEN_CATEGORY_DETAIL/REDUCER',
}

export default TokenCategoryActionTypes

export type TokenCategoryAction =
  | SetState
  | GetTokenCategoryList
  | SetTokenCategoryList
  | GetTokenCategoryDetail
  | SetTokenCategoryDetail
  | SetTokenCategoryListState
  | SetTokenCategoryDetailState

export interface SetState {
  type: TokenCategoryActionTypes.SET_STATE,
  payload: AppState
}

export interface GetTokenCategoryList {
  type: TokenCategoryActionTypes.GET_TOKEN_CATEGORY_LIST
  payload: GetTokenCategoryListPayload
}

export interface GetTokenCategoryDetail {
  type: TokenCategoryActionTypes.GET_TOKEN_CATEGORY_DETAIL
  payload: string
}

export interface SetTokenCategoryListState {
  type: TokenCategoryActionTypes.SET_GET_TOKEN_CATEGORY_LIST_STATE
  payload: AppState
}

export interface SetTokenCategoryList {
  type: TokenCategoryActionTypes.SET_TOKEN_CATEGORY_LIST
  payload: Array<TokenCategory>
}

export interface SetTokenCategoryDetailState {
  type: TokenCategoryActionTypes.SET_GET_TOKEN_CATEGORY_DETAIL_STATE
  payload: AppState
}

export interface SetTokenCategoryDetail {
  type: TokenCategoryActionTypes.SET_TOKEN_CATEGORY_DETAIL
  payload: TokenCategory
}

export interface GetTokenCategoryParams extends Action, GetTokenCategoryDetail { type: TokenCategoryActionTypes.GET_TOKEN_CATEGORY_DETAIL }
export interface GetTokenCategoryListParams extends Action, GetTokenCategoryList { type: TokenCategoryActionTypes.GET_TOKEN_CATEGORY_LIST }
