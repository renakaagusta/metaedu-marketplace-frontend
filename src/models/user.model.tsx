import SqlTime from "@/models/sql/time"

export default interface User {
  id: string
  name: string
  email: string
  photo: string
  cover: string
  verified: boolean
  role: string
  address: string
  nonce: string
  createdAt: SqlTime
  updatedAt: SqlTime
}
