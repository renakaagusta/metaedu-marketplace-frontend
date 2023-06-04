import { message } from 'antd';
import { all, put, takeEvery } from 'redux-saga/effects';
import { AuthState, SignInParams } from 'store/auth/interfaces';
import AuthActionTypes, { GetUserNonceParams, SignUpParams } from 'store/auth/interfaces/actions.interfaces';

import { api } from '@/api/api';
import { ApiResponse, isApiResponse } from '@/api/response';
import AuthRepository, { GetNonceResponse, SignInResponse } from '@/repositories/auth.repository';
import { AppState } from '@/utils/state';

const authRepository = new AuthRepository(api)

function* loadStorageData() {
  try {
    const authState: AuthState = {
      signUpState: localStorage.getItem('sign_up_state') != null ? parseInt(localStorage.getItem('sign_up_state') ?? '0') as AppState : null,
      signInState: localStorage.getItem('sign_in_state') != null ? parseInt(localStorage.getItem('sign_in_state') ?? '0') as AppState : null,
      getUserNonceState: localStorage.getItem('get_user_nonce_state') != null ? parseInt(localStorage.getItem('get_user_nonce_state') ?? '0') as AppState : null,
      nonce: localStorage.getItem('nonce') != null ? localStorage.getItem('nonce') : null,
      accessToken: localStorage.getItem('access_token') != null ? localStorage.getItem('access_token') : null,
      isRegistered: localStorage.getItem('is_registered') != null ? localStorage.getItem('is_registered') == 'true' : null,
    }

    yield put({
      type: AuthActionTypes.SET_STORAGE_DATA_STATE,
      payload: authState
    })
  } catch (e) {
    message.error(e as string)
  }
}

function* doSignIn(data: SignInParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: AuthActionTypes.SET_SIGN_IN_STATE,
      payload: AppState.Loading
    })

    try {
      const signedMessage: string = yield data.payload.signer?.signMessage(data.payload.nonce)
      data.payload.sig = signedMessage
      data.payload.signer = undefined
    } catch (e) {
      message.error('Sign in canceled')
      return
    }

    const response: ApiResponse<SignInResponse> | Error = yield authRepository.signIn(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: AuthActionTypes.SET_SIGN_IN_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: AuthActionTypes.SET_ACCESS_TOKEN_STATE,
      payload: (response.data as SignInResponse).accessToken
    })
  } catch (err) {
    put({
      type: AuthActionTypes.SET_SIGN_IN_STATE,
      payload: AppState.Error
    })

    message.error(err as string)
  }
}

function* doSignUp(data: SignUpParams) {
  try {
    if (!data.payload) {
      return
    }

    yield put({
      type: AuthActionTypes.SET_SIGN_UP_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetNonceResponse> | Error = yield authRepository.signUp(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: AuthActionTypes.SET_IS_REGISTERED_STATE,
      payload: true
    })

    yield put({
      type: AuthActionTypes.SET_SIGN_UP_STATE,
      payload: AppState.LoadComplete
    })
  } catch (err) {
    put({
      type: AuthActionTypes.SET_SIGN_UP_STATE,
      payload: AppState.Error
    })

    message.error(err as string)
  }
}

function* getUserNonce(data: GetUserNonceParams) {
  try {
    if (!data.payload) {
      return
    }

    yield put({
      type: AuthActionTypes.SET_GET_USER_NONCE_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetNonceResponse> | Error = yield authRepository.getUserNonce(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: AuthActionTypes.SET_GET_USER_NONCE_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: AuthActionTypes.SET_NONCE_STATE,
      payload: (response.data as GetNonceResponse)?.nonce
    })

    yield put({
      type: AuthActionTypes.SET_IS_REGISTERED_STATE,
      payload: true
    })
  } catch (err) {
    yield put({
      type: AuthActionTypes.SET_GET_USER_NONCE_STATE,
      payload: AppState.Error
    })

    if (err == 'User doesn\'t exist') {
      yield put({
        type: AuthActionTypes.SET_IS_REGISTERED_STATE,
        payload: false
      })
    } else {
      message.error(err as string)
    }
  }
}

function* rootSaga(): Generator {
  yield all([
    takeEvery(AuthActionTypes.LOAD_STORAGE_DATA, loadStorageData),
    takeEvery(AuthActionTypes.SIGN_IN, doSignIn),
    takeEvery(AuthActionTypes.SIGN_UP, doSignUp),
    takeEvery(AuthActionTypes.GET_USER_NONCE, getUserNonce),
  ]);
}

export default rootSaga;
