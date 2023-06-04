import { Action } from "redux"

import Transaction from "@/models/transaction.model"
import { GetTransactionListPayload, SubmitTransactionPayload } from "@/repositories/transaction.repository"
import { AppState } from '@/utils/state'

enum TransactionActionTypes {
  // SAGA
  GET_TRANSACTION_LIST = 'TRANSACTION/GET_TRANSACTION_LIST/SAGA',
  GET_MY_TRANSACTION_LIST = 'TRANSACTION/GET_MY_TRANSACTION_LIST/SAGA',
  GET_TRANSACTION_DETAIL = 'TRANSACTION/GET_TRANSACTION_DETAIL/SAGA',
  SUBMIT_TRANSACTION = 'TRANSACTION/SUBMIT_TRANSACTION/SAGA',

  // REDUCER
  SET_STATE = 'TRANSACTION/SET_STATE/REDUCER',
  SET_GET_TRANSACTION_LIST_STATE = 'TRANSACTION/SET_GET_TRANSACTION_LIST_STATE/REDUCER',
  SET_GET_MY_TRANSACTION_LIST_STATE = 'TRANSACTION/SET_GET_MY_TRANSACTION_LIST_STATE/REDUCER',
  SET_GET_TRANSACTION_DETAIL_STATE = 'TRANSACTION/SET_GET_TRANSACTION_DETAIL_STATE/REDUCER',
  SET_SUBMIT_TRANSACTION_STATE = 'TRANSACTION/SUBMIT_TRANSACTION/REDUCER',
  SET_TRANSACTION_LIST = 'TRANSACTION/SET_TRANSACTION_LIST/REDUCER',
  SET_MY_TRANSACTION_LIST = 'TRANSACTION/SET_MY_TRANSACTION_LIST/REDUCER',
  SET_TRANSACTION_DETAIL = 'TRANSACTION/SET_TRANSACTION_DETAIL/REDUCER',
  SET_TRANSACTION_SUBMIT = 'TRANSACTION/SET_TRANSACTION_SUBMIT/REDUCER',
}

export default TransactionActionTypes

export type TransactionAction =
  | SetState
  | GetTransactionList
  | SetTransactionList
  | GetMyTransactionList
  | SetMyTransactionList
  | GetTransactionDetail
  | SetTransactionDetail
  | SubmitTransaction
  | SetSubmitTransaction
  | SetTransactionListState
  | SetMyTransactionListState
  | SetTransactionDetailState
  | SetSubmitTransactionState

export interface SetState {
  type: TransactionActionTypes.SET_STATE,
  payload: AppState
}

export interface GetTransactionList {
  type: TransactionActionTypes.GET_TRANSACTION_LIST
  payload: GetTransactionListPayload
}

export interface GetMyTransactionList {
  type: TransactionActionTypes.GET_MY_TRANSACTION_LIST
  payload: GetTransactionListPayload
}

export interface GetTransactionDetail {
  type: TransactionActionTypes.GET_TRANSACTION_DETAIL
  payload: string
}

export interface SubmitTransaction {
  type: TransactionActionTypes.SUBMIT_TRANSACTION
  payload: SubmitTransactionPayload
}

export interface SetTransactionListState {
  type: TransactionActionTypes.SET_GET_TRANSACTION_LIST_STATE
  payload: AppState
}

export interface SetMyTransactionListState {
  type: TransactionActionTypes.SET_GET_MY_TRANSACTION_LIST_STATE
  payload: AppState
}

export interface SetTransactionList {
  type: TransactionActionTypes.SET_TRANSACTION_LIST
  payload: Array<Transaction>
}

export interface SetMyTransactionList {
  type: TransactionActionTypes.SET_MY_TRANSACTION_LIST
  payload: Array<Transaction>
}

export interface SetTransactionDetailState {
  type: TransactionActionTypes.SET_GET_TRANSACTION_DETAIL_STATE
  payload: AppState
}

export interface SetTransactionDetail {
  type: TransactionActionTypes.SET_TRANSACTION_DETAIL
  payload: Transaction
}

export interface SetSubmitTransactionState {
  type: TransactionActionTypes.SET_SUBMIT_TRANSACTION_STATE
  payload: AppState
}

export interface SetSubmitTransaction {
  type: TransactionActionTypes.SET_TRANSACTION_SUBMIT
  payload: string
}

export interface GetTransactionParams extends Action, GetTransactionDetail { type: TransactionActionTypes.GET_TRANSACTION_DETAIL }
export interface GetTransactionListParams extends Action, GetTransactionList { type: TransactionActionTypes.GET_TRANSACTION_LIST }
export interface GetMyTransactionListParams extends Action, GetMyTransactionList { type: TransactionActionTypes.GET_MY_TRANSACTION_LIST }
export interface SubmitTransactionParams extends Action, SubmitTransaction { type: TransactionActionTypes.SUBMIT_TRANSACTION }
