import { message } from 'antd';
import { all, delay, put, takeEvery } from 'redux-saga/effects';
import OwnershipActionTypes, { GetOwnershipListParams, UpdateOwnershipParams } from 'store/ownership/interfaces/actions.interfaces';

import { getRpcErrorMessage } from '@/lib/helper';

import { UpdateType } from '@/components/moleculs/m_ownership_card/m_ownership_card';

import { api } from '@/api/api';
import { ApiResponse, isApiResponse } from '@/api/response';
import { Web3TransactionInterface } from '@/models/web3/transaction';
import OwnershipRepository, { GetOwnershipListResponse } from '@/repositories/ownership.repository';
import { AppState } from '@/utils/state';

const ownershipRepository = new OwnershipRepository(api)

function* fetchOwnershipList(data: GetOwnershipListParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: OwnershipActionTypes.SET_GET_OWNERSHIP_LIST_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetOwnershipListResponse> | Error = yield ownershipRepository.getOwnershipList(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: OwnershipActionTypes.SET_GET_OWNERSHIP_LIST_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: OwnershipActionTypes.SET_OWNERSHIP_LIST,
      payload: (response.data as GetOwnershipListResponse).ownerships
    })
  } catch (err) {
    yield put({
      type: OwnershipActionTypes.SET_GET_OWNERSHIP_LIST_STATE,
      payload: AppState.Error
    })

    message.error((err as Error).message)
  }
}

function* fetchFractionOwnershipList(data: GetOwnershipListParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: OwnershipActionTypes.SET_GET_FRACTION_OWNERSHIP_LIST_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetOwnershipListResponse> | Error = yield ownershipRepository.getOwnershipList(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: OwnershipActionTypes.SET_GET_FRACTION_OWNERSHIP_LIST_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: OwnershipActionTypes.SET_FRACTION_OWNERSHIP_LIST,
      payload: (response.data as GetOwnershipListResponse).ownerships
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* fetchMyOwnershipList(data: GetOwnershipListParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: OwnershipActionTypes.SET_GET_MY_OWNERSHIP_LIST_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetOwnershipListResponse> | Error = yield ownershipRepository.getOwnershipList(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: OwnershipActionTypes.SET_GET_MY_OWNERSHIP_LIST_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: OwnershipActionTypes.SET_MY_OWNERSHIP_LIST,
      payload: (response.data as GetOwnershipListResponse).ownerships
    })
  } catch (err) {
    yield put({
      type: OwnershipActionTypes.SET_GET_MY_OWNERSHIP_LIST_STATE,
      payload: AppState.Error
    })

    message.error((err as Error).message)
  }
}

function* updateOwnership(data: UpdateOwnershipParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: OwnershipActionTypes.SET_UPDATE_OWNERSHIP_STATE,
      payload: AppState.Loading
    })

    const { contract, ownership, type } = data.payload

    if (ownership.availableForSale && (type === UpdateType.SaleOpenedStatus || type === UpdateType.SalePrice)) {
      try {
        const transaction: Web3TransactionInterface = yield contract?.putItemForSale(ownership.token.tokenIndex, ownership.salePrice, ownership.quantity, new Date().getTime())
        data.payload.transactionHash = transaction.hash
      } catch (e) {
        throw Error(getRpcErrorMessage(e as Error))
      }
    }

    if (ownership.availableForRent && (type === UpdateType.RentOpenedStatus || type === UpdateType.RentCost)) {
      try {
        const transaction: Web3TransactionInterface = yield contract?.putItemForRent(ownership.token.tokenIndex, ownership.rentCost, ownership.quantity, new Date().getTime())

        data.payload.transactionHash = transaction.hash
      } catch (e) {
        throw Error(getRpcErrorMessage(e as Error))
      }
    }

    if (!data.payload.transactionHash) {
      throw 'Updating failed'
    }

    const response: ApiResponse<undefined> | Error = yield ownershipRepository.updateOwnership(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: OwnershipActionTypes.SET_UPDATE_OWNERSHIP_STATE,
      payload: AppState.LoadComplete
    })

    message.success('Token has been updated')

    yield delay(2000)

    yield put({
      type: OwnershipActionTypes.SET_UPDATE_OWNERSHIP_STATE,
      payload: AppState.Initial
    })
  } catch (err) {
    yield put({
      type: OwnershipActionTypes.SET_UPDATE_OWNERSHIP_STATE,
      payload: AppState.Error
    })

    message.error((err as Error).message)
  }
}

function* rootSaga(): Generator {
  yield all([
    takeEvery(OwnershipActionTypes.GET_OWNERSHIP_LIST, fetchOwnershipList),
    takeEvery(OwnershipActionTypes.GET_FRACTION_OWNERSHIP_LIST, fetchFractionOwnershipList),
    takeEvery(OwnershipActionTypes.GET_MY_OWNERSHIP_LIST, fetchMyOwnershipList),
    takeEvery(OwnershipActionTypes.UPDATE_OWNERSHIP, updateOwnership),
  ]);
}

export default rootSaga;
