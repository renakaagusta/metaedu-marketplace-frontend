import { message } from 'antd';
import { all, delay, put, takeEvery } from 'redux-saga/effects';
import FractionActionTypes, { GetFractionListParams, GetFractionParams, SubmitFractionParams } from 'store/fraction/interfaces/actions.interfaces';

import { getRpcErrorMessage } from '@/lib/helper';

import { api } from '@/api/api';
import { ApiResponse, isApiResponse } from '@/api/response';
import { Web3TransactionInterface } from '@/models/web3/transaction';
import FractionRepository, { GetFractionDetailResponse, GetFractionListResponse, SubmitFractionResponse } from '@/repositories/fraction.repository';
import { AppState } from '@/utils/state';

const fractionRepository = new FractionRepository(api)

function* fetchFractionList(data: GetFractionListParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: FractionActionTypes.SET_SUBMIT_FRACTION_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetFractionListResponse> | Error = yield fractionRepository.getFractionList(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: FractionActionTypes.SET_GET_FRACTION_LIST_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: FractionActionTypes.SET_FRACTION_LIST,
      payload: (response.data as GetFractionListResponse).fractions
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* fetchFractionData(data: GetFractionParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: FractionActionTypes.SET_SUBMIT_FRACTION_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetFractionDetailResponse> | Error = yield fractionRepository.getFractionData(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: FractionActionTypes.SET_GET_FRACTION_DETAIL_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: FractionActionTypes.SET_FRACTION_DETAIL,
      payload: (response.data as GetFractionDetailResponse).fraction
    })
  } catch (err) {
    yield put({
      type: FractionActionTypes.SET_GET_FRACTION_DETAIL_STATE,
      payload: AppState.Error
    })

    message.error((err as Error).message)
  }
}

function* submitFraction(data: SubmitFractionParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: FractionActionTypes.SET_SUBMIT_FRACTION_STATE,
      payload: AppState.Loading
    })

    const { ownership, contract, supply } = data.payload

    try {
      const transaction: Web3TransactionInterface = yield contract.shareOwnership(ownership.token.tokenIndex, supply, new Date().getTime())

      data.payload.transactionHash = transaction.hash
    } catch (e) {
      throw Error(getRpcErrorMessage(e as Error))
    }

    if (!data.payload.transactionHash) {
      throw 'Fractioning canceled'
    }

    const response: ApiResponse<SubmitFractionResponse> | Error = yield fractionRepository.submitFraction({
      ...data.payload
    })

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: FractionActionTypes.SET_SUBMIT_FRACTION_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: FractionActionTypes.SET_FRACTION_SUBMIT,
      payload: (response.data as SubmitFractionResponse).tokenId
    })

    message.success('Fraction has been created successfully')

    yield delay(2000)

    yield put({
      type: FractionActionTypes.SET_SUBMIT_FRACTION_STATE,
      payload: AppState.Initial
    })

    yield put({
      type: FractionActionTypes.SET_FRACTION_SUBMIT,
      payload: undefined
    })

  } catch (err) {
    yield put({
      type: FractionActionTypes.SET_SUBMIT_FRACTION_STATE,
      payload: AppState.Error
    })

    message.error((err as Error).message)
  }
}

function* rootSaga(): Generator {
  yield all([
    takeEvery(FractionActionTypes.GET_FRACTION_LIST, fetchFractionList),
    takeEvery(FractionActionTypes.GET_FRACTION_DETAIL, fetchFractionData),
    takeEvery(FractionActionTypes.SUBMIT_FRACTION, submitFraction),
  ]);
}

export default rootSaga;
