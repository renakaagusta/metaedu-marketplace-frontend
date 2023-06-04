import { HYDRATE } from 'next-redux-wrapper';
import { TransactionAction, TransactionState } from 'store/transaction/interfaces';
import TransactionActionTypes from 'store/transaction/interfaces/actions.interfaces';

import { AppState } from '@/utils/state';

export const initialState: TransactionState = {
  state: AppState.Initial,
  transactionSubmitState: AppState.Initial,
  transactionListState: AppState.Initial,
  myTransactionListState: AppState.Initial,
  transactionDetailState: AppState.Initial,
  transactions: undefined,
  myTransactions: undefined,
  transaction: undefined,
  transactionSubmittedId: undefined,
};

const transactionReducer = (
  state = initialState,
  action: TransactionAction | { type: typeof HYDRATE; payload: TransactionState },
): TransactionState => {

  switch (action.type) {
    case TransactionActionTypes.SET_GET_TRANSACTION_LIST_STATE:
      return {
        ...state,
        transactionListState: action.payload
      };
    case TransactionActionTypes.SET_GET_MY_TRANSACTION_LIST_STATE:
      return {
        ...state,
        myTransactionListState: action.payload
      };
    case TransactionActionTypes.SET_TRANSACTION_LIST:
      return {
        ...state,
        transactions: action.payload
      };
    case TransactionActionTypes.SET_MY_TRANSACTION_LIST:
      return {
        ...state,
        myTransactions: action.payload
      };
    case TransactionActionTypes.SET_GET_TRANSACTION_DETAIL_STATE:
      return {
        ...state,
        transactionDetailState: action.payload
      };
    case TransactionActionTypes.SET_TRANSACTION_DETAIL:
      return {
        ...state,
        transaction: action.payload
      };
    case TransactionActionTypes.SET_SUBMIT_TRANSACTION_STATE:
      return {
        ...state,
        transactionSubmitState: action.payload
      };
    case TransactionActionTypes.SET_TRANSACTION_SUBMIT:
      return {
        ...state,
        transactionSubmittedId: action.payload
      };
    default:
      return state;
  }
};

export default transactionReducer;
