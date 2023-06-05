import { AxiosInstance, AxiosResponse } from "axios";
import { Contract } from "ethers";

import { api } from "@/api/api";
import { ApiResponse } from "@/api/response";
import Ownership from "@/models/ownership.model";
import Transaction from "@/models/transaction.model";
import User from "@/models/user.model";

export interface GetTransactionListResponse {
  transactions: Transaction[]
}

export interface GetTransactionListPayload {
  accessToken: string,
  keyword: string,
  limit: number,
  offset: number,
  orderBy: string,
  orderOption: string
  tokenId?: string
  collectionId?: string
  userId?: string
}

export interface SubmitTransactionPayload {
  accessToken: string,
  type: string,
  user: User,
  ownership: Ownership,
  fractionOwnershipList: Array<Ownership>,
  amount: number,
  quantity: number,
  gasFee: number,
  days?: number,
  token: string,
  transactionHash: string,
  contract: Contract
}

export interface GetTransactionDetailResponse {
  transaction: Transaction
}

export interface SubmitTransactionResponse {
  transactionId: string,
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default class TransactionRepository {
  api: AxiosInstance

  constructor(api: AxiosInstance) {
    this.api = api
  }

  public async getTransactionList(data: GetTransactionListPayload): Promise<ApiResponse<GetTransactionListResponse> | Error | undefined> {
    try {
      const { accessToken, offset, limit, keyword, orderBy, orderOption, tokenId, collectionId, userId } = data

      const response = await api.get<GetTransactionListResponse, AxiosResponse<ApiResponse<GetTransactionListResponse>>>(`${API_URL}/v1/transaction?offset=${offset}&limit=${limit}&keyword=${keyword}&order_by=${orderBy}&order_option=${orderOption}${collectionId ? `&collection_id=${collectionId}` : ``}${tokenId ? `&token_id=${tokenId}` : ``}${tokenId ? `&token_id=${tokenId}` : ``}${userId ? `&user_id=${userId}` : ``}`, {
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

  public async getTransactionData(id: string): Promise<ApiResponse<GetTransactionDetailResponse> | Error | undefined> {
    try {
      const response = await api.get<GetTransactionDetailResponse, AxiosResponse<ApiResponse<GetTransactionDetailResponse>>>(`${API_URL}/v1/transaction/${id}`)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async submitTransaction(data: SubmitTransactionPayload): Promise<ApiResponse<SubmitTransactionResponse> | Error | undefined> {
    try {
      const { accessToken, type, user, ownership, amount, quantity, gasFee, days, transactionHash } = data

      const form = new FormData();

      form.append('type', type)
      form.append('user_to_id', ownership.user.id)
      form.append('user_from_id', user.id)
      form.append('ownership_id', ownership.id)
      form.append('token_id', ownership.token.id)
      form.append('amount', amount.toString())
      form.append('quantity', quantity.toString())
      form.append('gas_fee', gasFee.toString())
      form.append('transaction_hash', transactionHash)

      if (days) {
        form.append('days', days.toString())
      }

      const response = await api.post<SubmitTransactionResponse, AxiosResponse<ApiResponse<SubmitTransactionResponse>>>(`${API_URL}/v1/transaction`, form, {
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