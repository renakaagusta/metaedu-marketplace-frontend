import { AxiosInstance, AxiosResponse } from "axios";
import { ethers } from "ethers";

import { api } from "@/api/api";
import { ApiResponse } from "@/api/response";

export interface SignInPayload {
  address: string
  nonce: string
  sig: string
  signer: ethers.Signer | undefined
}

export interface SignInResponse {
  accessToken: string
}

export interface SignUpPayload {
  address: string
  nonce: string
}

export interface SignUpResponse {
  userId: string
}

export interface GetNonceResponse {
  nonce: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default class AuthRepository {
  api: AxiosInstance

  constructor(api: AxiosInstance) {
    this.api = api
  }

  public async signIn(payload: SignInPayload): Promise<ApiResponse<SignInResponse> | Error | undefined> {
    try {
      const response = await api.post<SignInPayload, AxiosResponse<ApiResponse<SignInResponse>>>(`${API_URL}/v1/auth/sign-in`, payload)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async signUp(payload: SignUpPayload): Promise<ApiResponse<SignUpResponse> | Error | undefined> {
    try {
      const response = await api.post<SignUpPayload, AxiosResponse<ApiResponse<SignUpResponse>>>(`${API_URL}/v1/auth/sign-up`, payload)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async getUserNonce(address: string): Promise<ApiResponse<GetNonceResponse> | Error | undefined> {
    try {
      const response = await api.get<GetNonceResponse, AxiosResponse<ApiResponse<GetNonceResponse>>>(`${API_URL}/v1/auth/users/${address}/nonce`)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async getMyUserData(token: string): Promise<ApiResponse<GetNonceResponse> | Error | undefined> {
    try {
      const response = await api.get<GetNonceResponse, AxiosResponse<ApiResponse<GetNonceResponse>>>(`${API_URL}/v1/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
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