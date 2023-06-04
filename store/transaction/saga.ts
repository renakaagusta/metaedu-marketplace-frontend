import { message } from 'antd';
import { ethers } from 'ethers';
import { all, delay, put, takeEvery } from 'redux-saga/effects';
import TransactionActionTypes, { GetTransactionListParams, GetTransactionParams, SubmitTransactionParams } from 'store/transaction/interfaces/actions.interfaces';

import { getRpcErrorMessage } from '@/lib/helper';

import { api } from '@/api/api';
import { ApiResponse, isApiResponse } from '@/api/response';
import Ownership from '@/models/ownership.model';
import { Web3TransactionInterface } from '@/models/web3/transaction';
import TransactionRepository, { GetTransactionDetailResponse, GetTransactionListResponse, SubmitTransactionResponse } from '@/repositories/transaction.repository';
import { AppState } from '@/utils/state';

const transactionRepository = new TransactionRepository(api)

function* fetchTransactionList(data: GetTransactionListParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: TransactionActionTypes.SET_GET_TRANSACTION_LIST_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetTransactionListResponse> | Error = yield transactionRepository.getTransactionList(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: TransactionActionTypes.SET_GET_TRANSACTION_LIST_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: TransactionActionTypes.SET_TRANSACTION_LIST,
      payload: (response.data as GetTransactionListResponse).transactions
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* fetchMyTransactionList(data: GetTransactionListParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: TransactionActionTypes.SET_GET_MY_TRANSACTION_LIST_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetTransactionListResponse> | Error = yield transactionRepository.getTransactionList(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: TransactionActionTypes.SET_GET_MY_TRANSACTION_LIST_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: TransactionActionTypes.SET_MY_TRANSACTION_LIST,
      payload: (response.data as GetTransactionListResponse).transactions
    })
  } catch (err) {
    yield put({
      type: TransactionActionTypes.SET_GET_MY_TRANSACTION_LIST_STATE,
      payload: AppState.Error
    })

    message.error((err as Error).message)
  }
}

function* fetchTransactionData(data: GetTransactionParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: TransactionActionTypes.SET_SUBMIT_TRANSACTION_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetTransactionDetailResponse> | Error = yield transactionRepository.getTransactionData(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: TransactionActionTypes.SET_GET_TRANSACTION_DETAIL_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: TransactionActionTypes.SET_TRANSACTION_DETAIL,
      payload: (response.data as GetTransactionDetailResponse).transaction
    })
  } catch (err) {
    yield put({
      type: TransactionActionTypes.SET_GET_MY_TRANSACTION_LIST_STATE,
      payload: AppState.Error
    })

    message.error((err as Error).message)
  }
}

function* submitTransaction(data: SubmitTransactionParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: TransactionActionTypes.SET_SUBMIT_TRANSACTION_STATE,
      payload: AppState.Loading
    })

    const { ownership, fractionOwnershipList, contract, amount, type, quantity, days } = data.payload

    let transaction: Web3TransactionInterface | undefined

    try {
      if (type === 'purchase') {
        transaction = yield contract.buy(ownership.token.tokenIndex, quantity, ownership.user.address, new Date().getTime(), { value: ethers.utils.parseUnits((amount / 1000000).toString(), 'ether') })
      } else {
        if (ownership.token.fractionId && ownership.token.fractionId !== '00000000-0000-0000-0000-000000000000') {
          const ownerList: Array<string> = []
          const shareList: Array<number> = []

          fractionOwnershipList.forEach((ownership: Ownership) => {
            if (ownership.status === 'active') {
              ownerList.push(ownership.user.address)
              shareList.push(ownership.quantity)
            }
          })

          transaction = yield contract.rentFraction(ownership.token.tokenIndex, days, ownerList, shareList, new Date().getTime(), { value: ethers.utils.parseUnits((amount / 1000000).toString(), 'ether') })
        } else {
          transaction = yield contract.rent(ownership.token.tokenIndex, days, ownership.user.address, new Date().getTime(), { value: ethers.utils.parseUnits((amount / 1000000).toString(), 'ether') })
        }
      }

      if (!transaction || !transaction.hash) {
        throw 'Transaction canceled'
      }

      data.payload.transactionHash = transaction.hash

      const response: ApiResponse<SubmitTransactionResponse> | Error = yield transactionRepository.submitTransaction({
        ...data.payload,
        gasFee: Number(transaction?.gasPrice.toString()),
      })

      if (!isApiResponse(response)) {
        throw response
      }

      yield put({
        type: TransactionActionTypes.SET_SUBMIT_TRANSACTION_STATE,
        payload: AppState.LoadComplete
      })

      yield put({
        type: TransactionActionTypes.SET_TRANSACTION_SUBMIT,
        payload: (response.data as SubmitTransactionResponse).transactionId
      })

      message.success('Transaction has been created successfully')

      yield delay(2000)

      yield put({
        type: TransactionActionTypes.SET_SUBMIT_TRANSACTION_STATE,
        payload: AppState.Initial
      })

      yield put({
        type: TransactionActionTypes.SET_TRANSACTION_SUBMIT,
        payload: undefined
      })
    } catch (e) {
      console.error(e)
      throw Error(getRpcErrorMessage(e as Error))
    }
  } catch (e) {
    console.error(e)
    yield put({
      type: TransactionActionTypes.SET_SUBMIT_TRANSACTION_STATE,
      payload: AppState.LoadComplete
    })

    message.error((e as Error).message)
  }
}

function* rootSaga(): Generator {
  yield all([
    takeEvery(TransactionActionTypes.GET_TRANSACTION_LIST, fetchTransactionList),
    takeEvery(TransactionActionTypes.GET_MY_TRANSACTION_LIST, fetchMyTransactionList),
    takeEvery(TransactionActionTypes.GET_TRANSACTION_DETAIL, fetchTransactionData),
    takeEvery(TransactionActionTypes.SUBMIT_TRANSACTION, submitTransaction),
  ]);
}

export default rootSaga;
