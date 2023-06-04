
import Fraction from "@/models/fraction.model"
import { AppState } from "@/utils/state"

export interface FractionState {
  state: AppState
  fractionListState: AppState
  fractionDetailState: AppState
  fractionSubmitState: AppState
  fractions: Array<Fraction> | null | undefined
  fraction: Fraction | null | undefined
  fractionSubmittedId: string | null | undefined
}