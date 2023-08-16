import { MajorCategoriesWithMinorCategories } from './category'
import { PlaceInfo } from './placeInfo'
import { ZeroOrOne } from './zeroOrOne'

export interface ImageQueryState {
  query_list: PlaceInfo[][]
  // loading 상태 저장
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  // error 상태 저장
  error: string | null
  resultList: ZeroOrOne[]
}

export interface ImageQueryInput {
  user: string
  travel_id: string
  majorCategoriesWithMinorCategories: MajorCategoriesWithMinorCategories
  companion: string
  duration: number
  date: string
}
