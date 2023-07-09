
import Rental from "@/models/rental.model"
import { AppState } from "@/utils/state"

export interface RentalState {
  state: AppState
  rentalListState: AppState
  rentals: Array<Rental> | null | undefined
  myRentalListState: AppState
  myRentals: Array<Rental> | null | undefined
  rentalByOtherListState: AppState,
  rentalsByOther: Array<Rental> | null | undefined
  rentalUpdateState: AppState
}