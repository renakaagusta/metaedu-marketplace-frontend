import { message } from 'antd';
import { all, delay, put, takeEvery } from 'redux-saga/effects';
import UserActionTypes, { GetMyUserData, GetUserParams, UpdateMyUserDataParams } from 'store/user/interfaces/actions.interfaces';

import { api } from '@/api/api';
import { ApiResponse, isApiResponse } from '@/api/response';
import UserRepository, { GetMyUserDataResponse, GetUserDetailResponse, UpdateMyUserResponse } from '@/repositories/user.repository';
import { AppState } from '@/utils/state';

const userRepository = new UserRepository(api)

function* fetchMyUserData(data: GetMyUserData) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: UserActionTypes.SET_GET_MY_USER_DATA_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetMyUserDataResponse> | Error = yield userRepository.getMyUserData(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: UserActionTypes.SET_GET_MY_USER_DATA_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: UserActionTypes.SET_MY_USER_DATA,
      payload: (response.data as GetMyUserDataResponse).user
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* fetchUserData(data: GetUserParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: UserActionTypes.SET_GET_USER_DETAIL_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetUserDetailResponse> | Error = yield userRepository.getUserData(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: UserActionTypes.SET_GET_USER_DETAIL_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: UserActionTypes.SET_USER_DETAIL,
      payload: (response.data as GetUserDetailResponse).user
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* updateMyUserData(data: UpdateMyUserDataParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: UserActionTypes.SET_UPDATE_MY_USER_DATA_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<UpdateMyUserResponse> | Error = yield userRepository.updateMyUserData(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: UserActionTypes.SET_UPDATE_MY_USER_DATA_STATE,
      payload: AppState.LoadComplete
    })

    message.success('Profile has been updated successfully')

    yield delay(2000)

    yield put({
      type: UserActionTypes.SET_UPDATE_MY_USER_DATA_STATE,
      payload: AppState.Initial
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* rootSaga(): Generator {
  yield all([
    takeEvery(UserActionTypes.GET_MY_USER_DATA, fetchMyUserData),
    takeEvery(UserActionTypes.GET_USER_DETAIL, fetchUserData),
    takeEvery(UserActionTypes.UPDATE_MY_USER_DATA, updateMyUserData),
  ]);
}

export default rootSaga;
