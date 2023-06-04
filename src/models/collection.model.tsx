import SqlFloat64 from "@/models/sql/float64"
import SqlInt64 from "@/models/sql/int64"
import SqlString from "@/models/sql/string"
import SqlTime from "@/models/sql/time"
import TokenCategory from "@/models/token_category.model"
import User from "@/models/user.model"

export default interface Collection {
  id: string
  title: SqlString
  views: SqlInt64
  numberOfItems: SqlInt64
  numberOfTransactions: SqlInt64
  volumeTransactions: SqlFloat64
  description: SqlString
  thumbnail: SqlString
  cover: SqlString
  creatorId: string
  creator: User
  categoryId: string
  category: TokenCategory
  createdAt: SqlTime
  updatedAt: SqlTime
}