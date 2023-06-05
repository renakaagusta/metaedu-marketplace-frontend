import { RcFile } from "antd/lib/upload";
import { AxiosInstance, AxiosResponse } from "axios";

import { api } from "@/api/api";
import { ApiResponse } from "@/api/response";
import User from "@/models/user.model";

export interface GetMyUserDataPayload {
  accessToken: string
}

export interface GetMyUserDataResponse {
  user: User
}

export interface UpdateMyUserDataPayload {
  id: string,
  name: string | undefined,
  email: string | undefined,
  photo: RcFile | undefined,
  cover: RcFile | undefined,
  accessToken: string
}

export interface GetUserDetailResponse {
  user: User
}

export interface UpdateMyUserResponse {
  user: User
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default class UserRepository {
  api: AxiosInstance

  constructor(api: AxiosInstance) {
    this.api = api
  }

  public async getMyUserData(data: GetMyUserDataPayload): Promise<ApiResponse<GetMyUserDataResponse> | Error | undefined> {
    try {
      const { accessToken } = data

      const response = await api.get<GetMyUserDataResponse, AxiosResponse<ApiResponse<GetMyUserDataResponse>>>(`${API_URL}/v1/user/me`, {
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

  public async getUserData(id: string): Promise<ApiResponse<GetUserDetailResponse> | Error | undefined> {
    try {
      const response = await api.get<GetUserDetailResponse, AxiosResponse<ApiResponse<GetUserDetailResponse>>>(`${API_URL}/v1/user/${id}`)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async updateMyUserData(data: UpdateMyUserDataPayload): Promise<ApiResponse<GetUserDetailResponse> | Error | undefined> {
    try {
      const { accessToken } = data

      const form = new FormData();

      if (data.name) {
        form.append('name', data.name)
      }

      if (data.email) {
        form.append('email', data.email)
      }

      if (data.photo) {
        form.append('photo', data.photo)
      }

      if (data.cover) {
        form.append('cover', data.cover)
      }

      const response = await api.put<GetUserDetailResponse, AxiosResponse<ApiResponse<GetUserDetailResponse>>>(`${API_URL}/v1/user/${data.id}`, form, {
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