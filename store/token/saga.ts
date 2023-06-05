import { message } from 'antd';
import { all, delay, put, takeEvery } from 'redux-saga/effects';
import TokenActionTypes, { GetTokenListParams, GetTokenParams, SubmitTokenParams } from 'store/token/interfaces/actions.interfaces';

import { getRpcErrorMessage } from '@/lib/helper';

import { api } from '@/api/api';
import { ApiResponse, isApiResponse } from '@/api/response';
import { Web3TransactionInterface } from '@/models/web3/transaction';
import TokenRepository, { GetTokenDetailResponse, GetTokenListResponse, SubmitTokenResponse, UpdateTokenPayload } from '@/repositories/token.repository';
import { AppState } from '@/utils/state';

const tokenRepository = new TokenRepository(api)

function* fetchTokenList(data: GetTokenListParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: TokenActionTypes.SET_GET_TOKEN_LIST_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetTokenListResponse> | Error = yield tokenRepository.getTokenList(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: TokenActionTypes.SET_GET_TOKEN_LIST_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: TokenActionTypes.SET_TOKEN_LIST,
      payload: (response.data as GetTokenListResponse).tokens
    })
  } catch (err) {
    yield put({
      type: TokenActionTypes.SET_GET_TOKEN_LIST_STATE,
      payload: AppState.LoadComplete
    })

    message.error((err as Error).message)
  }
}

function* fetchTokenData(data: GetTokenParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: TokenActionTypes.SET_GET_TOKEN_LIST_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetTokenDetailResponse> | Error = yield tokenRepository.getTokenData(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: TokenActionTypes.SET_GET_TOKEN_DETAIL_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: TokenActionTypes.SET_TOKEN_DETAIL,
      payload: (response.data as GetTokenDetailResponse).token
    })
  } catch (err) {
    yield put({
      type: TokenActionTypes.SET_GET_TOKEN_DETAIL_STATE,
      payload: AppState.Error
    })

    message.error((err as Error).message)
  }
}

function* submitToken(data: SubmitTokenParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: TokenActionTypes.SET_SUBMIT_TOKEN_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<SubmitTokenResponse> | Error = yield tokenRepository.submitToken(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    const { accessToken, contract } = data.payload
    const { token } = response.data as SubmitTokenResponse

    try {
      const transaction: Web3TransactionInterface = yield contract?.mint(token.supply, token.uri)

      const updateTokenPayload: UpdateTokenPayload = {
        accessToken: accessToken,
        tokenId: token.id,
        transactionHash: transaction.hash
      }

      const response: ApiResponse<SubmitTokenResponse> | Error = yield tokenRepository.updateToken(updateTokenPayload)

      if (!isApiResponse(response)) {
        throw response
      }
    } catch (e) {
      throw Error(getRpcErrorMessage(e as Error))
    }

    yield put({
      type: TokenActionTypes.SET_SUBMIT_TOKEN_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: TokenActionTypes.SET_TOKEN_SUBMIT,
      payload: (response.data as SubmitTokenResponse).token.id
    })

    message.success('Token has been minted successfully')

    yield delay(2000)

    yield put({
      type: TokenActionTypes.SET_TOKEN_SUBMIT,
      payload: null
    })

    yield put({
      type: TokenActionTypes.SET_SUBMIT_TOKEN_STATE,
      payload: AppState.Initial
    })

  } catch (err) {
    yield put({
      type: TokenActionTypes.SET_SUBMIT_TOKEN_STATE,
      payload: AppState.Error
    })

    message.error('Minting failed')
  }
}

function* rootSaga(): Generator {
  yield all([
    takeEvery(TokenActionTypes.GET_TOKEN_LIST, fetchTokenList),
    takeEvery(TokenActionTypes.GET_TOKEN_DETAIL, fetchTokenData),
    takeEvery(TokenActionTypes.SUBMIT_TOKEN, submitToken),
  ]);
}

export default rootSaga;
