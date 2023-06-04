import SqlTime from "@/models/sql/time"

export default interface TokenCategory {
  id: string
  title: string
  icon: string
  description: string
  status: string
  createdAt: SqlTime
  updatedAt: SqlTime
}
