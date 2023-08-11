import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'
import axios, { AxiosResponse } from 'axios'
import { SERVER_API_URL } from './api_url'
import { processCluster } from './travelInfoSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { PlaceInfo } from '../interfaces/placeInfo'
import { RecommendInput } from '../interfaces/recommendInput'
import { Cluster } from '../interfaces/Cluster'
import { Preference } from '../interfaces/preference'

export interface RecommendAttractions {
  attractions: PlaceInfo[][]
  // loading 상태 저장
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  // error 상태 저장
  error: string | null
  userId: string
  city: string
  duration: number
  budget: number
  coordinate: number[]
  location: string
  companion: string
  travelStyle: string[]
  currentPlace: PlaceInfo | null
  currentDay: number
  preference: Preference
  // loading 상태 저장
  preferenceLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
  // error 상태 저장
  preferenceError: string | null
}

const initialState: RecommendAttractions = {
  attractions: [],
  loading: 'idle',
  error: null,
  userId: '',
  city: '서울',
  duration: 3,
  budget: 1000000,
  location: '서울 강남구 언주로110 경남아파트',
  coordinate: [135.5023, 34.6937],
  companion: '혼자',
  travelStyle: ['문화', '쇼핑', '음식'],
  currentPlace: null,
  currentDay: 1,
  preference: {
    inferring: '',
    conclusion: '',
  } as Preference,
  preferenceLoading: 'idle',
  preferenceError: null,
}

interface ResponseData {
  cluster_attractions: Cluster[]
  not_recommended_attractions: Cluster[]
}

export const fetchRecommendAttractions = async (
  recommendInput: RecommendInput,
): Promise<PlaceInfo[][]> => {
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
  const placeInfos: PlaceInfo[][] = processCluster(
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
    setCoordinate: (state, action: PayloadAction<number[]>) => {
      state.coordinate = action.payload
    },
    handleCurrentPlace: (state, action: PayloadAction<PlaceInfo>) => {
      if (state.currentPlace?.name === action.payload.name) {
        state.currentPlace = {} as PlaceInfo
      } else {
        state.currentPlace = action.payload
      }
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload
    },
    setBudget: (state, action: PayloadAction<number>) => {
      state.budget = action.payload
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload
    },
    setCompanion: (state, action: PayloadAction<string>) => {
      state.companion = action.payload
    },
    setTravelStyle: (state, action: PayloadAction<string[]>) => {
      state.travelStyle = action.payload
    },
    setCurrentDay: (state, action: PayloadAction<number>) => {
      state.currentDay = action.payload
    },
    setPreference: (state, action: PayloadAction<Preference>) => {
      state.preference = action.payload
    },
    setPreferenceLoading: (
      state,
      action: PayloadAction<'idle' | 'pending' | 'succeeded' | 'failed'>,
    ) => {
      state.preferenceLoading = action.payload
    },
    setPreferenceError: (state, action: PayloadAction<string | null>) => {
      state.preferenceError = action.payload
    },
    initialize: (state) => {
      // setPreferenceLoading('idle')
      // setPreferenceError(null)
      // state.loading = 'idle'
      // state.error = null
      setLoading('idle')
      setError(null)
    },
  },
})

export const fetchRecommendAttractionsAsync =
  (recommendInput: RecommendInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: RecommendAttractions | string | PlaceInfo[][] | null
      type:
        | 'recommendAttractions/setAttractions'
        | 'recommendAttractions/setLoading'
        | 'recommendAttractions/setError'
        | 'recommendAttractions/setUserId'
        | 'recommendAttractions/setCity'
        | 'recommendAttractions/setDuration'
        | 'recommendAttractions/setBudget'
        | 'recommendAttractions/setLocation'
        | 'recommendAttractions/setCoordinate'
        | 'recommendAttractions/setCompanion'
        | 'recommendAttractions/setTravelStyle'
    }) => void,
  ) => {
    try {
      dispatch(setLoading('pending'))
      const attractions = await fetchRecommendAttractions(recommendInput)
      dispatch(setAttractions(attractions))
      console.log(attractions)
      dispatch(setLoading('succeeded'))
    } catch (error: any) {
      dispatch(setError(JSON.stringify(error)))
    }
  }

export const {
  setAttractions,
  setError,
  setLoading,
  setUserId,
  setCity,
  setDuration,
  setLocation,
  setBudget,
  setCoordinate,
  setCompanion,
  setTravelStyle,
  handleCurrentPlace,
  setCurrentDay,
  initialize,
  setPreference,
  setPreferenceLoading,
  setPreferenceError,
} = recommendAttractionsSlice.actions

export const selectRecommendAttractions = (state: RootState) =>
  state.recommendAttractions

export const selectAttractions = (state: RootState) =>
  state.recommendAttractions.attractions

export const selectLoading = (state: RootState) =>
  state.recommendAttractions.loading

export const selectError = (state: RootState) =>
  state.recommendAttractions.error
export const selectUserId = (state: RootState) =>
  state.recommendAttractions.userId
export const selectCity = (state: RootState) => state.recommendAttractions.city
export const selectDuration = (state: RootState) =>
  state.recommendAttractions.duration
export const selectBudget = (state: RootState) =>
  state.recommendAttractions.budget
export const selectLocation = (state: RootState) =>
  state.recommendAttractions.location
export const selectCoordinate = (state: RootState) =>
  state.recommendAttractions.coordinate
export const selectCompanion = (state: RootState) =>
  state.recommendAttractions.companion
export const selectTravelStyle = (state: RootState) =>
  state.recommendAttractions.travelStyle
export const selectCurrentPlace = (state: RootState) =>
  state.recommendAttractions.currentPlace
export const selectCurrentDay = (state: RootState) =>
  state.recommendAttractions.currentDay
export const selectPreference = (state: RootState) =>
  state.travelInfo.preference

export const selectPreferenceLoading = (state: RootState) =>
  state.travelInfo.preferenceLoading
export const selectPreferenceError = (state: RootState) =>
  state.travelInfo.preferenceError

const persistConfig = {
  key: 'recommend',
  storage,
}

const persistedRecommendAttractionsReducer = persistReducer(
  persistConfig,
  recommendAttractionsSlice.reducer,
)

export default persistedRecommendAttractionsReducer
