import { RcFile } from "antd/lib/upload";
import { AxiosInstance, AxiosResponse } from "axios";

import { api } from "@/api/api";
import { ApiResponse } from "@/api/response";
import Collection from "@/models/collection.model";

export interface GetCollectionListResponse {
  collections: Collection[]
}

export interface GetCollectionListPayload {
  keyword: string,
  limit: number,
  offset: number,
  orderBy: string,
  orderOption: string,
  creatorId: string
}

export interface GetCollectionDetailResponse {
  collection: Collection
}

export interface SubmitCollectionPayload {
  thumbnail: RcFile,
  cover: RcFile,
  accessToken: string,
  title: string,
  description: string,
  categoryId: string,
}

export interface UpdateCollectionPayload {
  id: string,
  accessToken: string,
  title: string,
  description: string,
  icon: RcFile,
}

export interface SubmitCollectionResponse {
  collection: Collection,
  collectionId: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api'

export default class CollectionRepository {
  api: AxiosInstance

  constructor(api: AxiosInstance) {
    this.api = api
  }

  public async getCollectionList(data: GetCollectionListPayload): Promise<ApiResponse<GetCollectionListResponse> | Error | undefined> {
    try {
      const response = await api.get<GetCollectionListResponse, AxiosResponse<ApiResponse<GetCollectionListResponse>>>(`${API_URL}/v1/collection?offset=${data.offset}&limit=${data.limit}${data.keyword ? `&keyword=${data.keyword}` : ``}&order_by=${data.orderBy}&order_option=${data.orderOption}${data.creatorId != 'all' ? `&creator_id=${data.creatorId}` : ``}`)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async getCollectionData(id: string): Promise<ApiResponse<GetCollectionDetailResponse> | Error | undefined> {
    try {
      const response = await api.get<GetCollectionDetailResponse, AxiosResponse<ApiResponse<GetCollectionDetailResponse>>>(`${API_URL}/v1/collection/${id}`)

      if (!response.data.error) {
        return response.data
      } else {
        throw response.data.error
      }
    } catch (e) {
      return e as Error
    }
  }

  public async submitCollection(data: SubmitCollectionPayload): Promise<ApiResponse<undefined> | Error | undefined> {
    try {
      const { accessToken, title, description, thumbnail, cover, categoryId } = data

      const form = new FormData();

      form.append('title', title)
      form.append('description', description)
      form.append('thumbnail', thumbnail)
      form.append('cover', cover)
      form.append('category_id', categoryId)

      const response = await api.post<undefined, AxiosResponse<ApiResponse<undefined>>>(`${API_URL}/v1/collection`, form, {
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

  public async updateCollection(data: UpdateCollectionPayload): Promise<ApiResponse<SubmitCollectionResponse> | Error | undefined> {
    try {
      const { accessToken, title, description } = data

      const form = new FormData();

      form.append('title', data.title)
      form.append('description', data.description)

      const response = await api.put<SubmitCollectionResponse, AxiosResponse<ApiResponse<SubmitCollectionResponse>>>(`${API_URL}/v1/collection/${data.id}`, form, {
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