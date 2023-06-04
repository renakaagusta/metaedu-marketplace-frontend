import SqlTime from "@/models/sql/time"
import Token from "@/models/token.model"
import User from "@/models/user.model"

export default interface Ownership {
  id: string
  tokenId: string
  token: Token
  userId: string
  user: User
  quantity: number
  salePrice: number
  rentCost: number
  availableForSale: boolean
  availableForRent: boolean
  status: string
  createdAt: SqlTime
  updatedAt: SqlTime
}