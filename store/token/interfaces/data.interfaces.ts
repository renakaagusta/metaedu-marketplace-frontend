
import Token from "@/models/token.model"
import { AppState } from "@/utils/state"

export interface TokenState {
  state: AppState
  tokenListState: AppState
  tokenDetailState: AppState
  tokenSubmitState: AppState
  tokens: Array<Token> | null | undefined
  token: Token | null | undefined
  tokenSubmittedId: string | null | undefined
}