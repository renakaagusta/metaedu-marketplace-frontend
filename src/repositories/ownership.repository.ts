import { AxiosInstance, AxiosResponse } from 'axios';
import { Contract } from 'ethers';

import { UpdateType } from '@/components/moleculs/m_ownership_card/m_ownership_card';

import { api } from '@/api/api';
import { ApiResponse } from '@/api/response';
import Ownership from '@/models/ownership.model';

export interface GetOwnershipListResponse {
  ownershipList: Ownership[];
  ownerships: Ownership[];
}

export interface GetOwnershipListPayload {
  keyword: string;
  limit: number;
  offset: number;
  orderBy: string;
  orderOption: string;
  userId?: string;
  tokenId?: string;
}

export interface UpdateOwnershipPayload {
  contract: Contract;
  accessToken: string;
  type: UpdateType;
  ownership: Ownership;
  transactionHash: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default class OwnershipRepository {
  api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  public async getOwnershipList(
    data: GetOwnershipListPayload
  ): Promise<ApiResponse<GetOwnershipListResponse> | Error | undefined> {
    try {
      const response = await api.get<
        GetOwnershipListResponse,
        AxiosResponse<ApiResponse<GetOwnershipListResponse>>
      >(
        `${API_URL}/v1/ownership?offset=${data.offset}&limit=${data.limit}${
          data.keyword ? `&keyword=${data.keyword}` : ''
        }&order_by=${data.orderBy}&order_option=${data.orderOption}&${
          data.userId ? `user_id=${data.userId}` : `token_id=${data.tokenId}`
        }`
      );

      if (!response.data.error) {
        return response.data;
      } else {
        throw response.data.error;
      }
    } catch (e) {
      return e as Error;
    }
  }

  public async updateOwnership(
    data: UpdateOwnershipPayload
  ): Promise<ApiResponse<undefined> | Error | undefined> {
    try {
      const { accessToken, ownership, transactionHash } = data;

      const form = new URLSearchParams();

      form.append('token_id', ownership.tokenId);
      form.append('user_id', ownership.userId);
      form.append('sale_price', String(ownership.salePrice));
      form.append('rent_cost', String(ownership.rentCost));
      form.append('available_for_sale', String(ownership.availableForSale));
      form.append('available_for_rent', String(ownership.availableForRent));
      form.append('transaction_hash', transactionHash);

      const response = await api.put<
        undefined,
        AxiosResponse<ApiResponse<undefined>>
      >(`${API_URL}/v1/ownership/${data.ownership.id}`, form, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.data.error) {
        return response.data;
      } else {
        throw response.data.error;
      }
    } catch (e) {
      return e as Error;
    }
  }
}
