import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'
import axios, { AxiosResponse } from 'axios'
import { SERVER_API_URL } from './api_url'
import { ZeroOrOne } from './imageQuerySlice'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { OpeningHours } from '../interfaces/openingHours'
import { Review } from '../interfaces/review'
import { Preference } from '../interfaces/preference'
import { PlaceInfo } from '../interfaces/placeInfo'
import { RecommendInput } from '../interfaces/recommendInput'
import { Cluster } from '../interfaces/Cluster'

export interface recommendInputV2 {
  user: string
  travel_id: string
  answers: ZeroOrOne[]
}

export interface TravelInfoState {
  userId: string
  city: string
  duration: number
  budget: number
  coordinate: number[]
  location: string
  companion: string
  travelStyle: string[]
  travelSchedule: PlaceInfo[][]
  currentPlace: PlaceInfo | null
  currentDay: number
  // loading 상태 저장
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  // error 상태 저장
  error: string | null
  preference: Preference
  // loading 상태 저장
  preferenceLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
  // error 상태 저장
  preferenceError: string | null
}

interface ResponseData {
  cluster_attractions: Cluster[]
  not_recommended_attractions: Cluster[]
}

export function processCluster(clusterArray: Cluster[]): PlaceInfo[][] {
  return clusterArray.map((cluster) => {
    const attractions = cluster.attractions.map(convertToPlaceInfo)
    // const restaurants = cluster.restaurants.map(convertToPlaceInfo)
    // return [...attractions, ...restaurants]
    return [...attractions]
  })
}

// placeInfo 객체와 JSON 객체 간의 변환을 수행하는 함수를 작성합니다.
export function convertToPlaceInfo(attraction: any): PlaceInfo {
  return {
    name: attraction.name,
    coordinate: [
      attraction.geometry.location.lat,
      attraction.geometry.location.lng,
    ],
    image: attraction.img,
    description: attraction.description,
    time: 15,
    summary: attraction.editorial_summary,
    rating: attraction.rating,
    ratingCount: attraction.user_ratings_total,
    hashtags: attraction.types,
    phoneNumber: attraction.international_phone_number,
    location: attraction.formatted_address,
    googleUrl: attraction.url,
    website: attraction.website,
    openingHours: attraction.current_opening_hours,
    thought: attraction.thought,
    wheelchair: attraction.wheelchair_accessible_entrance,
    reviews: attraction.reviews,
  } as PlaceInfo
}
const initialState: TravelInfoState = {
  userId: '',
  city: '서울',
  duration: 3,
  budget: 1000000,
  location: '서울 강남구 언주로110 경남아파트',
  coordinate: [135.5023, 34.6937],
  companion: '혼자',
  travelStyle: ['문화', '쇼핑', '음식'],
  travelSchedule: [],
  loading: 'idle',
  error: null,
  currentPlace: null,
  currentDay: 0,
  preference: {
    inferring: '',
    conclusion: '',
  } as Preference,
  preferenceLoading: 'idle',
  preferenceError: null,
}

export const fetchPreference = async (
  recommendInput: RecommendInput,
): Promise<Preference> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/travel/attractionQueryAnswer'

  console.log('API_URL', API_URL)

  const response: AxiosResponse<Preference> = await axios.post(
    API_URL,
    recommendInput,
    config,
  )

  return response.data
}

export const fetchTravelSchedule = async (
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

  // 이중 for문을 사용하여 JSON 데이터를 placeInfo[][]로 변환합니다.
  const placeInfos: PlaceInfo[][] = processCluster(
    response.data.cluster_attractions,
  )
  return placeInfos
}

export const travelInfoSlice = createSlice({
  name: 'travelInfo',
  initialState,
  reducers: {
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
    setCoordinate: (state, action: PayloadAction<number[]>) => {
      state.coordinate = action.payload
    },
    setCompanion: (state, action: PayloadAction<string>) => {
      state.companion = action.payload
    },
    setTravelStyle: (state, action: PayloadAction<string[]>) => {
      state.travelStyle = action.payload
    },
    setTravelSchedule: (state, action: PayloadAction<PlaceInfo[][]>) => {
      state.travelSchedule = action.payload
    },
    handleCurrentPlace: (state, action: PayloadAction<PlaceInfo>) => {
      if (state.currentPlace?.name === action.payload.name) {
        state.currentPlace = {} as PlaceInfo
      } else {
        state.currentPlace = action.payload
      }
    },
    setCurrentDay: (state, action: PayloadAction<number>) => {
      state.currentDay = action.payload
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
      setPreferenceLoading('idle')
      setPreferenceError(null)
      setLoading('idle')
      setError(null)
    },
  },
})

export const fetchTravelScheduleAsync =
  (recommendInput: RecommendInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: TravelInfoState | string | PlaceInfo[][] | null
      type:
        | 'travelInfo/setUserId'
        | 'travelInfo/setCity'
        | 'travelInfo/setDuration'
        | 'travelInfo/setBudget'
        | 'travelInfo/setLocation'
        | 'travelInfo/setCoordinate'
        | 'travelInfo/setCompanion'
        | 'travelInfo/setTravelStyle'
        | 'travelInfo/setTravelSchedule'
        | 'travelInfo/setLoading'
        | 'travelInfo/setError'
    }) => void,
  ) => {
    try {
      dispatch(setLoading('pending'))
      const travelSchedule = await fetchTravelSchedule(recommendInput)
      dispatch(setTravelSchedule(travelSchedule))
      dispatch(setLoading('succeeded'))
    } catch (error: any) {
      dispatch(setError(JSON.stringify(error)))
      dispatch(setLoading('failed'))
    }
  }

export const fetchPreferenceAsync =
  (recommendInput: RecommendInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: TravelInfoState | string | PlaceInfo[][] | null | Preference
      type:
        | 'travelInfo/setUserId'
        | 'travelInfo/setPreference'
        | 'travelInfo/setPreferenceError'
        | 'travelInfo/setPreferenceLoading'
    }) => void,
  ) => {
    try {
      dispatch(setPreferenceLoading('pending'))
      const preference = await fetchPreference(recommendInput)
      dispatch(setPreference(preference))
      dispatch(setPreferenceLoading('succeeded'))
    } catch (error: any) {
      dispatch(setPreferenceError(JSON.stringify(error)))
      dispatch(setPreferenceLoading('failed'))
    }
  }

export const {
  setUserId,
  setCity,
  setDuration,
  setLocation,
  setBudget,
  setCoordinate,
  setCompanion,
  setTravelStyle,
  setTravelSchedule,
  handleCurrentPlace,
  setCurrentDay,
  setError,
  setLoading,
  setPreference,
  setPreferenceLoading,
  setPreferenceError,
  initialize,
} = travelInfoSlice.actions

const persistConfig = {
  key: 'travel',
  storage,
}

const persistedTravelInfoReducer = persistReducer(
  persistConfig,
  travelInfoSlice.reducer,
)

export const selectTravelInfo = (state: RootState) => state.travelInfo

export const selectUserId = (state: RootState) => state.travelInfo.userId
export const selectCity = (state: RootState) => state.travelInfo.city
export const selectDuration = (state: RootState) => state.travelInfo.duration
export const selectBudget = (state: RootState) => state.travelInfo.budget
export const selectLocation = (state: RootState) => state.travelInfo.location
export const selectCoordinate = (state: RootState) =>
  state.travelInfo.coordinate
export const selectCompanion = (state: RootState) => state.travelInfo.companion
export const selectTravelStyle = (state: RootState) =>
  state.travelInfo.travelStyle
export const selectTravelSchedule = (state: RootState) =>
  state.travelInfo.travelSchedule
export const selectCurrentPlace = (state: RootState) =>
  state.travelInfo.currentPlace
export const selectCurrentDay = (state: RootState) =>
  state.travelInfo.currentDay
export const selectPreference = (state: RootState) =>
  state.travelInfo.preference

export const selectPreferenceLoading = (state: RootState) =>
  state.travelInfo.preferenceLoading
export const selectPreferenceError = (state: RootState) =>
  state.travelInfo.preferenceError

export default persistedTravelInfoReducer
