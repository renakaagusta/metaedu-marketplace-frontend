import { AxiosInstance, AxiosResponse } from "axios";

import { api } from "@/api/api";
import { ApiResponse } from "@/api/response";
import TokenCategory from "@/models/token_category.model";

export interface GetTokenCategoryListResponse {
  tokenCategories: TokenCategory[]
}

export interface GetTokenCategoryListPayload {
  keyword: string,
  limit: number,
  offset: number,
  orderBy: string,
  orderOption: string
}

export interface GetTokenCategoryDetailResponse {
  tokenCategory: TokenCategory
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api'

export default class TokenCategoryRepository {
  api: AxiosInstance

  constructor(api: AxiosInstance) {
    this.api = api
  }

  public async getTokenCategoryList(data: GetTokenCategoryListPayload): Promise<ApiResponse<GetTokenCategoryListResponse> | Error | undefined> {
    try {
      const response = await api.get<GetTokenCategoryListResponse, AxiosResponse<ApiResponse<GetTokenCategoryListResponse>>>(`${API_URL}/v1/token-category?offset=${data.offset}&limit=${data.limit}&keyword=${data.keyword}&order_by=${data.orderBy}&order_option=${data.orderOption}`)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async getTokenCategoryData(id: string): Promise<ApiResponse<GetTokenCategoryDetailResponse> | Error | undefined> {
    try {
      const response = await api.get<GetTokenCategoryDetailResponse, AxiosResponse<ApiResponse<GetTokenCategoryDetailResponse>>>(`${API_URL}/v1/token-category/${id}`)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }
}