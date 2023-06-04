
import TokenCategory from "@/models/token_category.model"
import { AppState } from "@/utils/state"

export interface TokenCategoryState {
  state: AppState
  tokenCategoryListState: AppState
  tokenCategoryDetailState: AppState
  tokenCategoryList: Array<TokenCategory> | null | undefined
  tokenCategory: TokenCategory | null | undefined
}