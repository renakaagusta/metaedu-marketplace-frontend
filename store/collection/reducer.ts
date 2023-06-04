import { HYDRATE } from 'next-redux-wrapper';
import { CollectionAction, CollectionState } from 'store/collection/interfaces';
import CollectionActionTypes from 'store/collection/interfaces/actions.interfaces';

import { AppState } from '@/utils/state';

export const initialState: CollectionState = {
  state: AppState.Initial,
  collectionSubmitState: AppState.Initial,
  collectionListState: AppState.Initial,
  collectionDetailState: AppState.Initial,
  collections: undefined,
  collection: undefined,
  collectionSubmittedId: undefined,
};

const collectionReducer = (
  state = initialState,
  action: CollectionAction | { type: typeof HYDRATE; payload: CollectionState },
): CollectionState => {

  switch (action.type) {
    case CollectionActionTypes.SET_GET_COLLECTION_LIST_STATE:
      return {
        ...state,
        collectionListState: action.payload
      };
    case CollectionActionTypes.SET_COLLECTION_LIST:
      return {
        ...state,
        collections: action.payload
      };
    case CollectionActionTypes.SET_GET_COLLECTION_DETAIL_STATE:
      return {
        ...state,
        collectionDetailState: action.payload
      };
    case CollectionActionTypes.SET_COLLECTION_DETAIL:
      return {
        ...state,
        collection: action.payload
      };
    case CollectionActionTypes.SET_SUBMIT_COLLECTION_STATE:
      return {
        ...state,
        collectionSubmitState: action.payload
      };
    case CollectionActionTypes.SET_COLLECTION_SUBMIT:
      return {
        ...state,
        collectionSubmittedId: action.payload
      };
    default:
      return state;
  }
};

export default collectionReducer;
