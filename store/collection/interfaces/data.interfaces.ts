
import Collection from "@/models/collection.model"
import { AppState } from "@/utils/state"

export interface CollectionState {
  state: AppState
  collectionListState: AppState
  collectionDetailState: AppState
  collectionSubmitState: AppState
  collections: Array<Collection> | null | undefined
  collection: Collection | null | undefined
  collectionSubmittedId: string | null | undefined
}