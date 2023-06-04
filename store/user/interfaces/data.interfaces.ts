
import User from "@/models/user.model"
import { AppState } from "@/utils/state"

export interface UserState {
  state: AppState
  myUserDataState: AppState
  userDetailState: AppState
  updateMyUserDataState: AppState
  user: User | null | undefined
  myUserData: User | null | undefined
}