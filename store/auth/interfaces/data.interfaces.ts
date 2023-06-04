import { AppState } from "@/utils/state"

export interface AuthState {
  signUpState: AppState | null | undefined
  signInState: AppState | null | undefined
  getUserNonceState: AppState | null | undefined
  nonce: string | null | undefined
  accessToken: string | null | undefined
  isRegistered: boolean | null | undefined
}
