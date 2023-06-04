export interface ApiResponse<T> {
  status: string
  message?: string
  error?: string
  data?: T | Error
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isApiResponse(object: any): object is ApiResponse<unknown> {
  if (typeof object !== 'object') return false
  if ('error' in object) return false
  return true
}