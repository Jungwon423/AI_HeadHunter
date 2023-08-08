import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'
import axios, { AxiosResponse } from 'axios'
import { SERVER_API_URL } from './api_url'
import { ZeroOrOne } from './imageQuerySlice'

interface OpeningHours {
  open_now: boolean
  periods: {
    open: { day: number; time: string }
    close: { day: number; time: string }
  }[]
  weekday_text: string[]
}
interface Summary {
  overview: string
}
interface Review {
  author_name: string
  author_url: string
  profile_photo_url: string
  rating: number
  text: string
}

export interface preference {
  inferring: string
  conclusion: string
}

export interface recommendInput {
  travel_id: string
  user: string
}

export interface recommendInputV2 {
  user: string
  travel_id: string
  answers: ZeroOrOne[]
}

export interface placeInfo {
  name: string
  coordinate: number[]
  image: string
  description: string
  time: number
  summary?: Summary //editorial_summary, 짧은 설명
  rating?: number //rating,  구글 별점
  ratingCount?: number //user_ratings_total, 구글 별점 갯수
  hashtags: string[] //types, 를 해쉬태그로
  phoneNumber?: number //international_phone_number, 전화번호
  location?: string //formatted address
  googleUrl?: string //url, 구글 url
  website?: string //website, 관광지 website
  openingHours?: OpeningHours //current_opening_hours -> weekday_text, 운영 시간
  thought?: string //thought, ai의 추천 이유
  wheelchair?: boolean //wheelchair_accessible_entrance, 휠체어 이용 가능 여부
  reviews?: Review[]
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
  travelSchedule: placeInfo[][]
  currentPlace: placeInfo | null
  currentDay: number
  // loading 상태 저장
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  // error 상태 저장
  error: string | null
  preference: preference
  // loading 상태 저장
  preferenceLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
  // error 상태 저장
  preferenceError: string | null
}

interface Cluster {
  attractions: Map<string, any>[]
  restaurants: Map<string, any>[]
}

interface ResponseData {
  cluster_attractions: Cluster[]
  not_recommended_attractions: Cluster[]
}

export function processCluster(clusterArray: Cluster[]): placeInfo[][] {
  return clusterArray.map((cluster) => {
    const attractions = cluster.attractions.map(convertToPlaceInfo)
    // const restaurants = cluster.restaurants.map(convertToPlaceInfo)
    // return [...attractions, ...restaurants]
    return [...attractions]
  })
}

// placeInfo 객체와 JSON 객체 간의 변환을 수행하는 함수를 작성합니다.
export function convertToPlaceInfo(attraction: any): placeInfo {
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
  } as placeInfo
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
  travelSchedule: [
    [
      {
        name: '오사카 성',
        coordinate: [34.6936, 135.502],
        image:
          'https://media.tacdn.com/media/attractions-splice-spp-400x400/0b/27/58/3d.jpg',
        location: '1-1 Ōsakajō, Chuo Ward, Osaka, 540-0002 일본',
        time: 15,
        description: '오사카 성은 정말 크고 우람합니다. 마치 그것처럼요.',
        thought:
          '오사카 성을 추천하는 이유는 재미있고 fun하며 interesting 하기 때문입니다 쏼라쏼라쏼라',
        hashtags: [
          'tourist attraction',
          'museum',
          'point of interest',
          'establishment',
        ],
        website: 'https://osakacastle.net/',
      } as placeInfo,
      {
        name: '도톤보리',
        coordinate: [34.6686, 135.5031],
        image:
          'https://media.tacdn.com/media/attractions-splice-spp-400x400/0b/27/58/3d.jpg',
        time: 15,
        description: '자유의 여신상은 유명해요',
      } as placeInfo,
      {
        name: '우메다 스카이 빌딩',
        coordinate: [34.705, 135.4904],
        image:
          'https://media.tacdn.com/media/attractions-splice-spp-400x400/0b/27/58/3d.jpg',
        time: 15,
        description: '자유의 여신상은 유명해요',
      } as placeInfo,
      {
        name: '오사카 수족관',
        coordinate: [34.6546, 135.428],
        image:
          'https://media.tacdn.com/media/attractions-splice-spp-400x400/0b/27/58/3d.jpg',
        time: 15,
        description: '자유의 여신상은 유명해요',
      } as placeInfo,
    ],
    [
      {
        name: '유니버설 스튜디오 재팬',
        coordinate: [34.667842183190174, 135.43209420160437],
        image:
          'https://media.tacdn.com/media/attractions-splice-spp-400x400/0b/27/58/3d.jpg',
        time: 15,
        description: '자유의 여신상은 유명해요',
      } as placeInfo,
      {
        name: '덴포잔 대관람차',
        coordinate: [34.658664636837464, 135.43123589467507],
        image:
          'https://media.tacdn.com/media/attractions-splice-spp-400x400/0b/27/58/3d.jpg',
        time: 15,
        description: '자유의 여신상은 유명해요',
      } as placeInfo,
      {
        name: '난바 야사카 신사',
        coordinate: [34.66346532633862, 135.496295559915],
        image:
          'https://media.tacdn.com/media/attractions-splice-spp-400x400/0b/27/58/3d.jpg',
        time: 15,
        description: '자유의 여신상은 유명해요',
      } as placeInfo,
      {
        name: '시텐노지',
        coordinate: [34.65617541900762, 135.51633874457755],
        image:
          'https://media.tacdn.com/media/attractions-splice-spp-400x400/0b/27/58/3d.jpg',
        time: 15,
        description: '자유의 여신상은 유명해요',
      } as placeInfo,
    ],
  ],
  loading: 'idle',
  error: null,
  currentPlace: null,
  currentDay: 0,
  preference: {
    inferring: '',
    conclusion: '',
  } as preference,
  preferenceLoading: 'idle',
  preferenceError: null,
}

export const fetchPreference = async (
  recommendInput: recommendInput,
): Promise<preference> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/travel/attractionQueryAnswer'

  const response: AxiosResponse<preference> = await axios.post(
    API_URL,
    recommendInput,
    config,
  )

  return response.data
}

export const fetchTravelScheduleV2 = async (
  recommendInput: recommendInputV2,
): Promise<placeInfo[][]> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/travel/recommendV2'

  const response: AxiosResponse<ResponseData> = await axios.post(
    API_URL,
    recommendInput,
    config,
  )

  // TODO
  console.log(response.data.cluster_attractions)
  return []
}

export const fetchTravelSchedule = async (
  recommendInput: recommendInput,
): Promise<placeInfo[][]> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/travel/recommendAttractions'

  const response: AxiosResponse<ResponseData> = await axios.post(
    API_URL,
    recommendInput,
    config,
  )

  console.log(response.data.cluster_attractions)

  // 이중 for문을 사용하여 JSON 데이터를 placeInfo[][]로 변환합니다.
  const placeInfos: placeInfo[][] = processCluster(
    response.data.cluster_attractions,
  )
  console.log(placeInfos)
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
    setTravelSchedule: (state, action: PayloadAction<placeInfo[][]>) => {
      state.travelSchedule = action.payload
    },
    handleCurrentPlace: (state, action: PayloadAction<placeInfo>) => {
      if (state.currentPlace?.name === action.payload.name) {
        state.currentPlace = {} as placeInfo
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
    setPreference: (state, action: PayloadAction<preference>) => {
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
  },
})

export const fetchTravelScheduleAsync =
  (recommendInput: recommendInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: TravelInfoState | string | placeInfo[][] | null
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
  (recommendInput: recommendInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: TravelInfoState | string | placeInfo[][] | null | preference
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
} = travelInfoSlice.actions

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

export default travelInfoSlice.reducer
