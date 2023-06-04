
import Ownership from "@/models/ownership.model"
import { AppState } from "@/utils/state"

export interface OwnershipState {
  state: AppState
  ownershipListState: AppState
  ownershipList: Array<Ownership> | null | undefined
  fractionOwnershipListState: AppState
  fractionOwnershipList: Array<Ownership> | null | undefined
  myOwnershipListState: AppState
  myOwnershipList: Array<Ownership> | null | undefined
  ownershipUpdateState: AppState
}