import { AxiosInstance, AxiosResponse } from "axios";
import { Contract } from "ethers";
import snakecaseKeys from "snakecase-keys";

import { UpdateType } from "@/components/moleculs/m_rental_card/m_rental_card";

import { api } from "@/api/api";
import { ApiResponse } from "@/api/response";
import Rental from "@/models/rental.model";

export interface GetRentalListResponse {
  rentals: Rental[]
}

export interface GetRentalListPayload {
  keyword: string,
  limit: number,
  offset: number,
  orderBy: string,
  orderOption: string,
  userId?: string,
  tokenId?: string
}

export interface UpdateRentalPayload {
  contract: Contract,
  accessToken: string,
  type: UpdateType,
  rental: Rental
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default class RentalRepository {
  api: AxiosInstance

  constructor(api: AxiosInstance) {
    this.api = api
  }

  public async getRentalList(data: GetRentalListPayload): Promise<ApiResponse<GetRentalListResponse> | Error | undefined> {
    try {
      const response = await api.get<GetRentalListResponse, AxiosResponse<ApiResponse<GetRentalListResponse>>>(`${API_URL}/v1/rental?offset=${data.offset}&limit=${data.limit}&keyword=${data.keyword}&order_by=${data.orderBy}&order_option=${data.orderOption}&${data.userId ? `user_id=${data.userId}` : ``}`)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async updateRental(data: UpdateRentalPayload): Promise<ApiResponse<undefined> | Error | undefined> {
    try {
      const { accessToken } = data;

      const form = new URLSearchParams();

      for (const [key, value] of Object.entries(snakecaseKeys(data.rental))) {
        form.append(key, value.toString())
      }

      const response = await api.put<undefined, AxiosResponse<ApiResponse<undefined>>>(`${API_URL} / v1 / rental / ${data.rental.id}`, form, {
        headers: {
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