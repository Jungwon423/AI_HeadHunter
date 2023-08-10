import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'
import axios, { AxiosResponse } from 'axios'
import { SERVER_API_URL } from './api_url'
import { placeInfo, processCluster, recommendInput } from './travelInfoSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

export interface recommendAttractions {
  attractions: placeInfo[][]
  // loading 상태 저장
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  // error 상태 저장
  error: string | null
}

const initialState: recommendAttractions = {
  attractions: [],
  loading: 'idle',
  error: null,
}

interface Cluster {
  attractions: Map<string, any>[]
  restaurants: Map<string, any>[]
}

interface ResponseData {
  cluster_attractions: Cluster[]
  not_recommended_attractions: Cluster[]
}

export const fetchRecommendAttractions = async (
  recommendInput: recommendInput,
): Promise<placeInfo[][]> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/travel/recommendAttractions'

  console.log('API_URL', API_URL)

  const response: AxiosResponse<ResponseData> = await axios.post(
    API_URL,
    recommendInput,
    config,
  )

  console.log('response', response)

  // 이중 for문을 사용하여 JSON 데이터를 placeInfo[][]로 변환합니다.
  const placeInfos: placeInfo[][] = processCluster(
    response.data.cluster_attractions,
  )
  return placeInfos
}

const recommendAttractionsSlice = createSlice({
  name: 'recommendAttractions',
  initialState,
  reducers: {
    setAttractions: (state, action) => {
      state.attractions = action.payload
    },
    setLoading: (
      state,
      action: PayloadAction<'idle' | 'pending' | 'succeeded' | 'failed'>,
    ) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    initialize: (state) => {
      state.attractions = []
      state.loading = 'idle'
      state.error = null
    },
  },
})

export const fetchRecommendAttractionsAsync =
  (recommendInput: recommendInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: placeInfo[][] | null | string
      type:
        | 'recommendAttractions/setAttractions'
        | 'recommendAttractions/setLoading'
        | 'recommendAttractions/setError'
    }) => void,
  ) => {
    try {
      dispatch(setLoading('pending'))
      const attractions = await fetchRecommendAttractions(recommendInput)
      dispatch(setAttractions(attractions))
      dispatch(setLoading('succeeded'))
    } catch (error: any) {
      dispatch(setError(JSON.stringify(error)))
    }
  }

export const { setAttractions, setLoading, setError } =
  recommendAttractionsSlice.actions

export const selectRecommendAttractions = (state: RootState) =>
  state.recommendAttractions

export const selectAttractions = (state: RootState) =>
  state.recommendAttractions.attractions

export const selectLoading = (state: RootState) =>
  state.recommendAttractions.loading

export const selectError = (state: RootState) =>
  state.recommendAttractions.error

const persistConfig = {
  key: 'root',
  storage,
}

const persistedRecommendAttractionsReducer = persistReducer(
  persistConfig,
  recommendAttractionsSlice.reducer,
)

export default persistedRecommendAttractionsReducer
