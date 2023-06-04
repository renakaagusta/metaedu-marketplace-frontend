import { message } from 'antd';
import { all, delay, put, takeEvery } from 'redux-saga/effects';
import CollectionActionTypes, { GetCollectionListParams, GetCollectionParams, SubmitCollectionParams, UpdateCollectionParams } from 'store/collection/interfaces/actions.interfaces';

import { api } from '@/api/api';
import { ApiResponse, isApiResponse } from '@/api/response';
import CollectionRepository, { GetCollectionDetailResponse, GetCollectionListResponse, SubmitCollectionResponse } from '@/repositories/collection.repository';
import { AppState } from '@/utils/state';

const collectionRepository = new CollectionRepository(api)

function* fetchCollectionList(data: GetCollectionListParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: CollectionActionTypes.SET_SUBMIT_COLLECTION_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetCollectionListResponse> | Error = yield collectionRepository.getCollectionList(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: CollectionActionTypes.SET_GET_COLLECTION_LIST_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: CollectionActionTypes.SET_COLLECTION_LIST,
      payload: (response.data as GetCollectionListResponse).collections
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* fetchCollectionData(data: GetCollectionParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: CollectionActionTypes.SET_SUBMIT_COLLECTION_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<GetCollectionDetailResponse> | Error = yield collectionRepository.getCollectionData(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: CollectionActionTypes.SET_GET_COLLECTION_DETAIL_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: CollectionActionTypes.SET_COLLECTION_DETAIL,
      payload: (response.data as GetCollectionDetailResponse).collection
    })
  } catch (err) {
    message.error((err as Error).message)
  }
}

function* submitCollection(data: SubmitCollectionParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: CollectionActionTypes.SET_SUBMIT_COLLECTION_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<SubmitCollectionResponse> | Error = yield collectionRepository.submitCollection(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: CollectionActionTypes.SET_SUBMIT_COLLECTION_STATE,
      payload: AppState.LoadComplete
    })

    yield put({
      type: CollectionActionTypes.SET_COLLECTION_SUBMIT,
      payload: (response.data as SubmitCollectionResponse).collectionId
    })

    message.success('Collection has been created successfully')

    yield delay(2000)

    yield put({
      type: CollectionActionTypes.SET_SUBMIT_COLLECTION_STATE,
      payload: AppState.Initial
    })

    yield put({
      type: CollectionActionTypes.SET_COLLECTION_SUBMIT,
      payload: undefined
    })

  } catch (err) {
    message.error('Creation failed')
  }
}

function* updateCollection(data: UpdateCollectionParams) {
  try {
    if (!data.payload) {
      message.error('Payload is not valid')
      return
    }

    yield put({
      type: CollectionActionTypes.SET_SUBMIT_COLLECTION_STATE,
      payload: AppState.Loading
    })

    const response: ApiResponse<undefined> | Error = yield collectionRepository.updateCollection(data.payload)

    if (!isApiResponse(response)) {
      throw response
    }

    yield put({
      type: CollectionActionTypes.SET_SUBMIT_COLLECTION_STATE,
      payload: AppState.LoadComplete
    })

    message.success('Collection has been updated successfully')

    yield delay(2000)

    yield put({
      type: CollectionActionTypes.SET_SUBMIT_COLLECTION_STATE,
      payload: AppState.Initial
    })

    yield put({
      type: CollectionActionTypes.SET_COLLECTION_SUBMIT,
      payload: undefined
    })

  } catch (err) {
    message.error('Creation failed')
  }
}

function* rootSaga(): Generator {
  yield all([
    takeEvery(CollectionActionTypes.GET_COLLECTION_LIST, fetchCollectionList),
    takeEvery(CollectionActionTypes.GET_COLLECTION_DETAIL, fetchCollectionData),
    takeEvery(CollectionActionTypes.SUBMIT_COLLECTION, submitCollection),
    takeEvery(CollectionActionTypes.UPDATE_COLLECTION, updateCollection),
  ]);
}

export default rootSaga;
