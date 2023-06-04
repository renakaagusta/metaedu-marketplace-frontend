import { Action } from "redux"

import Collection from "@/models/collection.model"
import { GetCollectionListPayload, SubmitCollectionPayload, UpdateCollectionPayload } from "@/repositories/collection.repository"
import { AppState } from '@/utils/state'

enum CollectionActionTypes {
  // SAGA
  GET_COLLECTION_LIST = 'COLLECTION/GET_COLLECTION_LIST/SAGA',
  GET_COLLECTION_DETAIL = 'COLLECTION/GET_COLLECTION_DETAIL/SAGA',
  SUBMIT_COLLECTION = 'COLLECTION/SUBMIT_COLLECTION/SAGA',
  UPDATE_COLLECTION = 'COLLECTION/UPDATE_COLLECTION/SAGA',

  // REDUCER
  SET_STATE = 'COLLECTION/SET_STATE/REDUCER',
  SET_GET_COLLECTION_LIST_STATE = 'COLLECTION/SET_GET_COLLECTION_LIST_STATE/REDUCER',
  SET_GET_COLLECTION_DETAIL_STATE = 'COLLECTION/SET_GET_COLLECTION_DETAIL_STATE/REDUCER',
  SET_SUBMIT_COLLECTION_STATE = 'COLLECTION/SUBMIT_COLLECTION/REDUCER',
  SET_UPDATE_COLLECTION_STATE = 'COLLECTION/SET_UPDATE_COLLECTION_STATE/REDUCER',
  SET_COLLECTION_LIST = 'COLLECTION/SET_COLLECTION_LIST/REDUCER',
  SET_COLLECTION_DETAIL = 'COLLECTION/SET_COLLECTION_DETAIL/REDUCER',
  SET_COLLECTION_SUBMIT = 'COLLECTION/SET_COLLECTION_SUBMIT/REDUCER',
}

export default CollectionActionTypes

export type CollectionAction =
  | SetState
  | GetCollectionList
  | SetCollectionList
  | GetCollectionDetail
  | SetCollectionDetail
  | SubmitCollection
  | SetSubmitCollection
  | UpdateCollection
  | SetCollectionListState
  | SetCollectionDetailState
  | SetSubmitCollectionState
  | SetUpdateCollectionState

export interface SetState {
  type: CollectionActionTypes.SET_STATE,
  payload: AppState
}

export interface GetCollectionList {
  type: CollectionActionTypes.GET_COLLECTION_LIST
  payload: GetCollectionListPayload
}

export interface GetCollectionDetail {
  type: CollectionActionTypes.GET_COLLECTION_DETAIL
  payload: string
}

export interface SubmitCollection {
  type: CollectionActionTypes.SUBMIT_COLLECTION
  payload: SubmitCollectionPayload
}

export interface SetCollectionListState {
  type: CollectionActionTypes.SET_GET_COLLECTION_LIST_STATE
  payload: AppState
}

export interface UpdateCollection {
  type: CollectionActionTypes.UPDATE_COLLECTION
  payload: UpdateCollectionPayload
}

export interface SetCollectionListState {
  type: CollectionActionTypes.SET_GET_COLLECTION_LIST_STATE
  payload: AppState
}

export interface SetCollectionList {
  type: CollectionActionTypes.SET_COLLECTION_LIST
  payload: Array<Collection>
}

export interface SetCollectionDetailState {
  type: CollectionActionTypes.SET_GET_COLLECTION_DETAIL_STATE
  payload: AppState
}

export interface SetCollectionDetail {
  type: CollectionActionTypes.SET_COLLECTION_DETAIL
  payload: Collection
}

export interface SetSubmitCollectionState {
  type: CollectionActionTypes.SET_SUBMIT_COLLECTION_STATE
  payload: AppState
}

export interface SetSubmitCollection {
  type: CollectionActionTypes.SET_COLLECTION_SUBMIT
  payload: string
}

export interface SetUpdateCollectionState {
  type: CollectionActionTypes.SET_UPDATE_COLLECTION_STATE
  payload: AppState
}

export interface GetCollectionParams extends Action, GetCollectionDetail { type: CollectionActionTypes.GET_COLLECTION_DETAIL }
export interface GetCollectionListParams extends Action, GetCollectionList { type: CollectionActionTypes.GET_COLLECTION_LIST }
export interface SubmitCollectionParams extends Action, SubmitCollection { type: CollectionActionTypes.SUBMIT_COLLECTION }
export interface UpdateCollectionParams extends Action, UpdateCollection { type: CollectionActionTypes.UPDATE_COLLECTION }
