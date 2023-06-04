
import Transaction from "@/models/transaction.model"
import { AppState } from "@/utils/state"

export interface TransactionState {
  state: AppState
  transactionListState: AppState
  myTransactionListState: AppState
  transactionDetailState: AppState
  transactionSubmitState: AppState
  transactions: Array<Transaction> | null | undefined
  myTransactions: Array<Transaction> | null | undefined
  transaction: Transaction | null | undefined
  transactionSubmittedId: string | null | undefined
}