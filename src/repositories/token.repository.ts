import { RcFile } from "antd/lib/upload";
import { AxiosInstance, AxiosResponse } from "axios";
import { Contract } from "ethers";

import { api } from "@/api/api";
import { ApiResponse } from "@/api/response";
import Token from "@/models/token.model";

export interface GetTokenListResponse {
  tokens: Token[]
}

export interface GetTokenListPayload {
  keyword: string,
  limit: number,
  offset: number,
  orderBy: string,
  orderOption: string,
  minPrice: number,
  maxPrice: number,
  categoryId: string,
  collectionId: string
  creatorId: string
}

export interface SubmitTokenPayload {
  accessToken: string,
  title: string,
  description: string,
  categoryId: string,
  collectionId: string | undefined,
  image: RcFile | string,
  imageName: string,
  supply: number,
  price: number,
  attributes: string,
  contract: Contract
}

export interface UpdateTokenPayload {
  accessToken: string,
  tokenId: string,
  transactionHash: string
}

export interface GetTokenDetailResponse {
  token: Token
}

export interface SubmitTokenResponse {
  token: Token,
  ownershipId: string
}

export interface UpdateTokenResponse {
  token: Token
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default class TokenRepository {
  api: AxiosInstance

  constructor(api: AxiosInstance) {
    this.api = api
  }

  public async getTokenList(data: GetTokenListPayload): Promise<ApiResponse<GetTokenListResponse> | Error | undefined> {
    try {
      const response = await api.get<GetTokenListResponse, AxiosResponse<ApiResponse<GetTokenListResponse>>>(`${API_URL}/v1/token?offset=${data.offset}&limit=${data.limit}&keyword=${data.keyword ?? ''}&order_by=${data.orderBy}&order_option=${data.orderOption}&min_price=${data.minPrice}&max_price=${data.maxPrice}${data.categoryId != 'all' ? `&category_id=${data.categoryId}` : ``}${data.collectionId != 'all' ? `&collection_id=${data.collectionId}` : ``}${data.creatorId != 'all' ? `&creator_id=${data.creatorId}` : ``}`)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async getTokenData(id: string): Promise<ApiResponse<GetTokenDetailResponse> | Error | undefined> {
    try {
      const response = await api.get<GetTokenDetailResponse, AxiosResponse<ApiResponse<GetTokenDetailResponse>>>(`${API_URL}/v1/token/${id}`)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async getTokenTransactionList(id: string): Promise<ApiResponse<GetTokenDetailResponse> | Error | undefined> {
    try {
      const response = await api.get<GetTokenDetailResponse, AxiosResponse<ApiResponse<GetTokenDetailResponse>>>(`${API_URL}/v1/token/${id}`)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async submitToken(data: SubmitTokenPayload): Promise<ApiResponse<SubmitTokenResponse> | Error | undefined> {
    try {
      const { accessToken, title, description, image, imageName, categoryId, supply, price, attributes } = data

      const form = new FormData();

      form.append('title', title)
      form.append('description', description)
      form.append('image', image)
      form.append('image_name', imageName)
      form.append('category_id', categoryId)
      form.append('supply', String(supply))
      form.append('price', String(price))
      form.append('attributes', attributes)

      if (data.collectionId) {
        form.append('collection_id', data.collectionId)
      }

      const response = await api.post<undefined, AxiosResponse<ApiResponse<SubmitTokenResponse>>>(`${API_URL}/v1/token`, form, {
        headers: {
          'Content-Type': `multipart/form-data`,
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async updateToken(data: UpdateTokenPayload): Promise<ApiResponse<UpdateTokenResponse> | Error | undefined> {
    try {
      const { accessToken, tokenId, transactionHash } = data

      const form = new FormData();

      form.append('transaction_hash', transactionHash)

      const response = await api.put<undefined, AxiosResponse<ApiResponse<UpdateTokenResponse>>>(`${API_URL}/v1/token/${tokenId}`, form, {
        headers: {
          'Content-Type': `multipart/form-data`,
          'Authorization': `Bearer ${accessToken}`
        }
      })

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