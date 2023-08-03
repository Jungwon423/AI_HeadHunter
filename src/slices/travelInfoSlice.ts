import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface placeInfo {
  name: string
  coordinate: number[]
  image: string
  description: string
  time: number
}

export interface TravelInfoState {
  city: string
  duration: number
  coordinate: number[]
  location: string
  companion: string
  travelStyle: string[]
  travelSchedule: placeInfo[][]
  currentPlace: placeInfo | null
  currentDay: number
}

const initialState: TravelInfoState = {
  city: '서울',
  duration: 3,
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
        time: 15,
        description: '자유의 여신상은 유명해요',
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
  currentPlace: null,
  currentDay: 0,
}

export const travelInfoSlice = createSlice({
  name: 'travelInfo',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload
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
  },
})

export const {
  setCity,
  setDuration,
  setLocation,
  setCoordinate,
  setCompanion,
  setTravelStyle,
  setTravelSchedule,
  handleCurrentPlace,
  setCurrentDay,
} = travelInfoSlice.actions

export const selectCity = (state: RootState) => state.travelInfo.city
export const selectDuration = (state: RootState) => state.travelInfo.duration
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

export default travelInfoSlice.reducer
