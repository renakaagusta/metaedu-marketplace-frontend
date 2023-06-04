import { message } from 'antd';
import { all, put, takeEvery } from 'redux-saga/effects';
import TokenCategoryActionTypes, { GetTokenCategoryParams, GetTokenCategoryListParams } from 'store/token_category/interfaces/actions.interfaces';

import { api } from '@/api/api';
import { ApiResponse, isApiResponse } from '@/api/response';
import TokenCategoryRepository, { GetTokenCategoryDetailResponse, GetTokenCategoryListResponse } from '@/repositories/token_category.repository';
import { AppState } from '@/utils/state';

const tokenCategoryRepository = new TokenCategoryRepository(api)

function* fetchTokenCategoryList(data: GetTokenCategoryListParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: TokenCategoryActionTypes.SET_GET_TOKEN_CATEGORY_LIST_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetTokenCategoryListResponse> | Error = yield tokenCategoryRepository.getTokenCategoryList(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: TokenCategoryActionTypes.SET_GET_TOKEN_CATEGORY_LIST_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: TokenCategoryActionTypes.SET_TOKEN_CATEGORY_LIST,
      payload: (response.data as GetTokenCategoryListResponse).tokenCategories
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* fetchTokenCategoryData(data: GetTokenCategoryParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: TokenCategoryActionTypes.SET_GET_TOKEN_CATEGORY_DETAIL_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetTokenCategoryDetailResponse> | Error = yield tokenCategoryRepository.getTokenCategoryData(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: TokenCategoryActionTypes.SET_GET_TOKEN_CATEGORY_DETAIL_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: TokenCategoryActionTypes.SET_TOKEN_CATEGORY_DETAIL,
      payload: (response.data as GetTokenCategoryDetailResponse).tokenCategory
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* rootSaga(): Generator {
  yield all([
    takeEvery(TokenCategoryActionTypes.GET_TOKEN_CATEGORY_LIST, fetchTokenCategoryList),
    takeEvery(TokenCategoryActionTypes.GET_TOKEN_CATEGORY_DETAIL, fetchTokenCategoryData),
  ]);
}

export default rootSaga;
