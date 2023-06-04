import { HYDRATE } from 'next-redux-wrapper';
import { TokenCategoryAction, TokenCategoryState } from 'store/token_category/interfaces';
import TokenCategoryActionTypes from 'store/token_category/interfaces/actions.interfaces';

import { AppState } from '@/utils/state';

export const initialState: TokenCategoryState = {
  state: AppState.Initial,
  tokenCategoryListState: AppState.Initial,
  tokenCategoryDetailState: AppState.Initial,
  tokenCategoryList: undefined,
  tokenCategory: undefined
};

const tokenCategoryReducer = (
  state = initialState,
  action: TokenCategoryAction | { type: typeof HYDRATE; payload: TokenCategoryState },
): TokenCategoryState => {

  switch (action.type) {
    case TokenCategoryActionTypes.SET_GET_TOKEN_CATEGORY_LIST_STATE:
      return {
        ...state,
        tokenCategoryListState: action.payload
      };
    case TokenCategoryActionTypes.SET_TOKEN_CATEGORY_LIST:

      return {
        ...state,
        tokenCategoryList: action.payload
      };
    case TokenCategoryActionTypes.SET_GET_TOKEN_CATEGORY_DETAIL_STATE:
      return {
        ...state,
        tokenCategoryDetailState: action.payload
      };
    case TokenCategoryActionTypes.SET_TOKEN_CATEGORY_DETAIL:
      return {
        ...state,
        tokenCategory: action.payload
      };
    default:
      return state;
  }
};

export default tokenCategoryReducer;
