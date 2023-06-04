import Ownership from "@/models/ownership.model"
import SqlTime from "@/models/sql/time"
import Token from "@/models/token.model"
import User from "@/models/user.model"

export default interface Rental {
  id: string
  userId: string
  user: User
  ownerId: string
  owner: User
  tokenId: string
  token: Token
  ownershipId: string
  ownership: Ownership
  timestamp: SqlTime
  status: string
  createdAt: SqlTime
  updatedAt: SqlTime
}