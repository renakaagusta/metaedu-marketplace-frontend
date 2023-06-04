import Collection from "@/models/collection.model"
import SqlTime from "@/models/sql/time"
import TokenCategory from "@/models/token_category.model"
import User from "@/models/user.model"

export default interface Token {
  id: string
  tokenIndex: number
  title: string
  description: string
  categoryId: string
  category: TokenCategory
  collectionId: string
  collection: Collection
  image: string
  uri: string
  fractionId: string
  sourceId: string
  supply: number
  lastPrice: number
  initialPrice: number
  views: number
  numberOfTransactions: number
  volumeTransactions: number
  creatorId: string
  creator: User
  attributes: Array<Attribute>
  createdAt: SqlTime
  updatedAt: SqlTime
}

export interface Attribute {
  traitType: string
  value: string
}