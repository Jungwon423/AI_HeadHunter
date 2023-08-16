import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PlaceInfo } from '../interfaces/placeInfo'
import { MajorCategoriesWithMinorCategories } from '../interfaces/category'

export interface TravelInfoState {
  user: string
  city: string

  travelId: string

  companion: string
  companion_adult?: string
  companion_child?: string
  companion_number?: number

  travel_start_date: string
  travel_end_date: string
  duration: number

  category: MajorCategoriesWithMinorCategories

  // @@@@@ 이상 /survey @@@@@

  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null

  // @@@@@ 이상 /recommend -> RecommendNav.tsx

  coordinate: number[]
  location: string
  travelStyle: string[]
  travelSchedule: PlaceInfo[][]
  currentPlace: PlaceInfo | null
  currentDay: number
}

const initialState: TravelInfoState = {
  user: '',
  city: '서울',

  travelId: '',

  companion: '혼자',

  travel_start_date: '',
  travel_end_date: '',
  duration: 3,

  category: {},
  // @@@@@ 이상 /survey @@@@@
  location: '서울 강남구 언주로110 경남아파트',
  coordinate: [135.5023, 34.6937],
  travelStyle: ['문화', '쇼핑', '음식'],
  travelSchedule: [],
  loading: 'idle',
  error: null,
  currentPlace: null,
  currentDay: 0,
}

export const travelInfoSlice = createSlice({
  name: 'travelInfo',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload
    },
    setCoordinate: (state, action: PayloadAction<number[]>) => {
      state.coordinate = action.payload
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

    // @@@@@ 이하 /survey @@@@@

    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload
    },

    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload
    },

    setTravelId: (state, action: PayloadAction<string>) => {
      state.travelId = action.payload
    },

    setCompanion: (state, action: PayloadAction<string>) => {
      state.companion = action.payload
    },

    setCompanionAdult: (state, action: PayloadAction<string>) => {
      state.companion_adult = action.payload
    },

    setCompanionChild: (state, action: PayloadAction<string>) => {
      state.companion_child = action.payload
    },
    setTravelStartDate: (state, action: PayloadAction<string>) => {
      state.travel_start_date = action.payload
    },
    setTravelEndDate: (state, action: PayloadAction<string>) => {
      state.travel_end_date = action.payload
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload
    },

    setCategory: (
      state,
      action: PayloadAction<MajorCategoriesWithMinorCategories>,
    ) => {
      state.category = action.payload
    },

    checkMinorCategory: (
      state,
      action: PayloadAction<{ majorCategory: string; minorCategory: string }>,
    ) => {
      const { majorCategory, minorCategory } = action.payload
      const major =
        state.category! as unknown as MajorCategoriesWithMinorCategories

      if (major[majorCategory]) {
        const minorIndex = major[majorCategory].findIndex(
          (mc) => mc.name === minorCategory,
        )
        if (minorIndex !== -1) {
          major[majorCategory][minorIndex].checked =
            !major[majorCategory][minorIndex].checked
        } else {
          console.error('해당 minorCategory를 찾을 수 없습니다.')
        }
      } else {
        console.error('해당 majorCategory를 찾을 수 없습니다.')
      }
    },
  },
})

export const {
  setLocation,
  setCoordinate,
  setTravelStyle,
  setTravelSchedule,
  handleCurrentPlace,
  setCurrentDay,
  setError,
  setLoading,

  // @@@@@ 이하 /survey @@@@@

  setUser,
  setCity,

  setTravelId,

  setCompanion,
  setCompanionAdult,
  setCompanionChild,

  setTravelStartDate,
  setTravelEndDate,
  setDuration,

  setCategory,
  checkMinorCategory,
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

export const selectLocation = (state: RootState) => state.travelInfo.location
export const selectCoordinate = (state: RootState) =>
  state.travelInfo.coordinate
export const selectTravelStyle = (state: RootState) =>
  state.travelInfo.travelStyle
export const selectTravelSchedule = (state: RootState) =>
  state.travelInfo.travelSchedule
export const selectCurrentPlace = (state: RootState) =>
  state.travelInfo.currentPlace
export const selectCurrentDay = (state: RootState) =>
  state.travelInfo.currentDay

// @@@@@ 이하 /survey @@@@@
export const selectUser = (state: RootState) => state.travelInfo.user
export const selectCity = (state: RootState) => state.travelInfo.city

export const selectTravelId = (state: RootState) => state.travelInfo.travelId

export const selectCompanion = (state: RootState) => state.travelInfo.companion
export const selectCompanionAdult = (state: RootState) =>
  state.travelInfo.companion_adult
export const selectCompanionChild = (state: RootState) =>
  state.travelInfo.companion_child

export const selectTravelStartDate = (state: RootState) =>
  state.travelInfo.travel_start_date
export const selectTravelEndDate = (state: RootState) =>
  state.travelInfo.travel_end_date
export const selectDuration = (state: RootState) => state.travelInfo.duration

export const selectCategory = (state: RootState) => state.travelInfo.category

export default persistedTravelInfoReducer
