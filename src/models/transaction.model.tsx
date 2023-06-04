import Collection from "@/models/collection.model"
import Ownership from "@/models/ownership.model"
import Rental from "@/models/rental.model"
import SqlTime from "@/models/sql/time"
import Token from "@/models/token.model"
import User from "@/models/user.model"

export default interface Transaction {
  id: string
  userFromId?: string
  userFrom?: User
  userToId: string
  userTo: User
  ownershipId?: string
  ownership?: Ownership
  rentalId?: string
  rental?: Rental
  collectionId?: string
  collection?: Collection
  tokenId: string
  token: Token
  type: string
  quantity: number
  amount: number
  gasFee: number
  status: string
  createdAt: SqlTime
  updatedAt: SqlTime
}

export enum TransactionType {
  Purchase = 'purchase',
  Rental = 'rental'
}