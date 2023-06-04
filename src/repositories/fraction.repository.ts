import { AxiosInstance, AxiosResponse } from "axios";
import { Contract } from "ethers";

import { api } from "@/api/api";
import { ApiResponse } from "@/api/response";
import Fraction from "@/models/fraction.model";
import Ownership from "@/models/ownership.model";

export interface GetFractionListResponse {
  fractions: Fraction[]
}

export interface GetFractionListPayload {
  keyword: string,
  limit: number,
  offset: number,
  orderBy: string,
  orderOption: string
}

export interface SubmitFractionPayload {
  accessToken: string,
  ownership: Ownership,
  supply: number,
  price: number,
  transactionHash: string,
  contract: Contract
}

export interface GetFractionDetailResponse {
  fraction: Fraction
}

export interface SubmitFractionResponse {
  fractionId: string,
  ownershipId: string,
  tokenId: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api'

export default class FractionRepository {
  api: AxiosInstance

  constructor(api: AxiosInstance) {
    this.api = api
  }

  public async getFractionList(data: GetFractionListPayload): Promise<ApiResponse<GetFractionListResponse> | Error | undefined> {
    try {
      const response = await api.get<GetFractionListResponse, AxiosResponse<ApiResponse<GetFractionListResponse>>>(`${API_URL}/v1/fraction?offset=${data.offset}&limit=${data.limit}&keyword=${data.keyword}&order_by=${data.orderBy}&order_option=${data.orderOption}`)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async getFractionData(id: string): Promise<ApiResponse<GetFractionDetailResponse> | Error | undefined> {
    try {
      const response = await api.get<GetFractionDetailResponse, AxiosResponse<ApiResponse<GetFractionDetailResponse>>>(`${API_URL}/v1/fraction/${id}`)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async submitFraction(data: SubmitFractionPayload): Promise<ApiResponse<SubmitFractionResponse> | Error | undefined> {
    try {
      const { accessToken, ownership, supply, price, transactionHash } = data

      const form = new FormData();

      form.append('token_source_id', ownership.tokenId)
      form.append('supply', supply.toString())
      form.append('price', price.toString())
      form.append('ownership_id', ownership.id)
      form.append('transaction_hash', transactionHash)

      const response = await api.post<SubmitFractionResponse, AxiosResponse<ApiResponse<SubmitFractionResponse>>>(`${API_URL}/v1/fraction`, form, {
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