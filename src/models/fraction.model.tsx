import SqlTime from "@/models/sql/time"

export default interface Fraction {
  id: string
  tokenParentId: string
  tokenFractionId: string
  createdAt: SqlTime
  updatedAt: SqlTime
}
