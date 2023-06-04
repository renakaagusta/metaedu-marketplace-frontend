import { message } from 'antd';
import { all, delay, put, takeEvery } from 'redux-saga/effects';
import RentalActionTypes, { GetRentalListParams, UpdateRentalParams } from 'store/rental/interfaces/actions.interfaces';

import { api } from '@/api/api';
import { ApiResponse, isApiResponse } from '@/api/response';
import RentalRepository, { GetRentalListResponse } from '@/repositories/rental.repository';
import { AppState } from '@/utils/state';

const rentalRepository = new RentalRepository(api)

function* fetchRentalList(data: GetRentalListParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: RentalActionTypes.SET_GET_RENTAL_LIST_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetRentalListResponse> | Error = yield rentalRepository.getRentalList(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: RentalActionTypes.SET_GET_RENTAL_LIST_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: RentalActionTypes.SET_RENTAL_LIST,
      payload: (response.data as GetRentalListResponse).rentals
    })
  } catch (err) {
    yield put({
      type: RentalActionTypes.SET_GET_RENTAL_LIST_STATE,
      payload: AppState.Error
    })

    message.error((err as Error).message)
  }
}

function* fetchMyRentalList(data: GetRentalListParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: RentalActionTypes.SET_GET_MY_RENTAL_LIST_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetRentalListResponse> | Error = yield rentalRepository.getRentalList(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: RentalActionTypes.SET_GET_MY_RENTAL_LIST_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: RentalActionTypes.SET_MY_RENTAL_LIST,
      payload: (response.data as GetRentalListResponse).rentals
    })
  } catch (err) {
    yield put({
      type: RentalActionTypes.SET_GET_MY_RENTAL_LIST_STATE,
      payload: AppState.Error
    })

    message.error((err as Error).message)
  }
}

function* updateRental(data: UpdateRentalParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: RentalActionTypes.SET_UPDATE_RENTAL_STATE,
      payload: AppState.Loading
    })

    const { contract, rental, type } = data.payload

    // if (rental.availableForSale && type === UpdateType.SaleOpenedStatus) {
    //   const transaction: Web3TransactionInterface = yield contract?.putItemForSale(rental.token.tokenIndex, rental.token.lastPrice * Math.pow(10, 18), rental.quantity)
    //   const transactionReceipt: Web3TransactionReceiptInterface = yield transaction.wait();

    //   if (!transactionReceipt.confirmations) {
    //     throw Error('Action canceled')
    //   }
    // }

    // if (rental.availableForRent && type === UpdateType.RentOpenedStatus) {
    //   const transaction: Web3TransactionInterface = yield contract?.putItemForRent(rental.token.tokenIndex, rental.token.lastPrice, rental.quantity)
    //   const transactionReceipt: Web3TransactionReceiptInterface = yield transaction.wait();

    //   if (!transactionReceipt.confirmations) {
    //     throw Error('Action canceled')
    //   }
    // }

    const response: ApiResponse<undefined> | Error = yield rentalRepository.updateRental(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: RentalActionTypes.SET_UPDATE_RENTAL_STATE,
      payload: AppState.LoadComplete
    })

    message.success('Token has been updated')

    yield delay(2000)

    yield put({
      type: RentalActionTypes.SET_UPDATE_RENTAL_STATE,
      payload: AppState.Initial
    })
  } catch (err) {
    yield put({
      type: RentalActionTypes.SET_UPDATE_RENTAL_STATE,
      payload: AppState.Error
    })

    message.error((err as Error).message)
  }
}

function* rootSaga(): Generator {
  yield all([
    takeEvery(RentalActionTypes.GET_RENTAL_LIST, fetchRentalList),
    takeEvery(RentalActionTypes.GET_MY_RENTAL_LIST, fetchMyRentalList),
    takeEvery(RentalActionTypes.UPDATE_RENTAL, updateRental),
  ]);
}

export default rootSaga;
