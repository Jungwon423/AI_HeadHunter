import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PlaceInfo } from '../interfaces/placeInfo'
import { MajorCategoriesWithMinorCategories } from '../interfaces/category'
import { NaverBlog, Review, Youtube } from '../interfaces/review'

export interface TravelInfoState {
  user: string
  city: string
  travelId: string
  companion: string | null
  companion_adult?: string
  companion_child?: string
  companion_number?: number
  // travel_start_date: string
  // travel_end_date: string
  duration: number // 실제 일차
  category: MajorCategoriesWithMinorCategories
  // @@@@@ 이상 /survey @@@@@
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
  // @@@@@ 이상 /recommend -> RecommendNav.tsx
  openRecommend: boolean
  isCurrentPlaceInCourse: boolean
  coordinate: number[]
  location: string
  travelStyle: string[]
  travelSchedule: PlaceInfo[][]
  travelOverview: string[]

  recommendSchedule: PlaceInfo[][]
  currentPlace: PlaceInfo | null
  currentDay: number
}

const initialState: TravelInfoState = {
  user: '',
  city: '서울',
  travelId: '',
  companion: null,
  // travel_start_date: '',
  // travel_end_date: '',
  duration: 3,
  category: {},
  // @@@@@ 이상 /survey @@@@@
  openRecommend: false,
  isCurrentPlaceInCourse: false,
  location: '서울 강남구 언주로110 경남아파트',
  coordinate: [135.5023, 34.6937],
  travelStyle: ['famous', 'busy'],
  travelSchedule: [],
  recommendSchedule: [],
  loading: 'idle',
  error: null,
  currentPlace: null,
  currentDay: 1,
  travelOverview: [],
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
    setRecommendSchedule: (state, action: PayloadAction<PlaceInfo[][]>) => {
      state.recommendSchedule = action.payload
    },
    deleteDuplicatePlace: (state, action: PayloadAction<PlaceInfo[][]>) => {
      const travelSchedule = action.payload

      const recommendSchedule = [...state.recommendSchedule]

      for (let i = 0; i < travelSchedule.length; i++) {
        recommendSchedule[i] = recommendSchedule[i].filter((place) => {
          return !travelSchedule[i].some((place2) => {
            return place.name === place2.name
          })
        })
      }

      state.recommendSchedule = recommendSchedule
    },
    handleCurrentPlace: (state, action: PayloadAction<PlaceInfo | null>) => {
      // if (state.currentPlace?.name === action.payload.name) {
      //   state.currentPlace = {} as PlaceInfo
      // } else {
      //   state.currentPlace = action.payload
      // }
      state.currentPlace = action.payload
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

    setCompanion: (state, action: PayloadAction<string | null>) => {
      state.companion = action.payload
    },

    setCompanionAdult: (state, action: PayloadAction<string>) => {
      state.companion_adult = action.payload
    },

    setCompanionChild: (state, action: PayloadAction<string>) => {
      state.companion_child = action.payload
    },
    // setTravelStartDate: (state, action: PayloadAction<string>) => {
    //   state.travel_start_date = action.payload
    // },
    // setTravelEndDate: (state, action: PayloadAction<string>) => {
    //   state.travel_end_date = action.payload
    // },
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

    toggleOpenRecommend: (state) => {
      state.openRecommend = !state.openRecommend
    },
    setOpenRecommend: (state, action: PayloadAction<boolean>) => {
      state.openRecommend = action.payload
    },
    setIsCurrentPlaceInCourse: (state, action: PayloadAction<boolean>) => {
      state.isCurrentPlaceInCourse = action.payload
    },

    changeTravelScheduleOrder: (
      state,
      action: PayloadAction<{ prevIndex: number; newIndex: any }>,
    ) => {
      const prevIndex = action.payload.prevIndex
      const newIndex = action.payload.newIndex

      const currentDay = state.currentDay - 1

      let newTravelSchedule = [...state.travelSchedule]

      let tmp = newTravelSchedule[currentDay].splice(prevIndex, 1)[0]
      newTravelSchedule[currentDay].splice(newIndex, 0, tmp)

      state.travelSchedule = newTravelSchedule
    },

    moveRecommendToTravel: (
      state,
      action: PayloadAction<{ prevIndex: number; newIndex: any }>,
    ) => {
      const prevIndex = action.payload.prevIndex
      const newIndex = action.payload.newIndex

      const currentDay = state.currentDay - 1

      let newTravelSchedule = [...state.travelSchedule]
      let newRecommendSchedule = [...state.recommendSchedule]

      let tmp = newRecommendSchedule[currentDay].splice(prevIndex, 1)[0]

      newTravelSchedule[currentDay].splice(newIndex, 0, tmp)

      state.travelSchedule = newTravelSchedule
      state.recommendSchedule = newRecommendSchedule
    },
    moveTravelToRecommend: (
      state,
      action: PayloadAction<{ prevIndex: number; newIndex: any }>,
    ) => {
      const prevIndex = action.payload.prevIndex
      const newIndex = action.payload.newIndex

      const currentDay = state.currentDay - 1

      let newTravelSchedule = [...state.travelSchedule]
      let newRecommendSchedule = [...state.recommendSchedule]

      let tmp = newTravelSchedule[currentDay].splice(prevIndex, 1)[0]

      newRecommendSchedule[currentDay].splice(newIndex, 0, tmp)

      state.travelSchedule = newTravelSchedule
      state.recommendSchedule = newRecommendSchedule
    },
    changeRecommendScheduleOrder: (
      state,
      action: PayloadAction<{ prevIndex: number; newIndex: any }>,
    ) => {
      const prevIndex = action.payload.prevIndex
      const newIndex = action.payload.newIndex

      const currentDay = state.currentDay - 1

      let newRecommendSchedule = [...state.recommendSchedule]

      let tmp = newRecommendSchedule[currentDay].splice(prevIndex, 1)[0]
      newRecommendSchedule[currentDay].splice(newIndex, 0, tmp)

      state.recommendSchedule = newRecommendSchedule
    },
    setTravelOverview: (state, action: PayloadAction<string[]>) => {
      state.travelOverview = action.payload
    },
  },
})

export const {
  setLocation,
  setCoordinate,
  setTravelStyle,
  setTravelSchedule,
  setRecommendSchedule,
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

  // setTravelStartDate,
  // setTravelEndDate,
  setDuration,

  setCategory,
  checkMinorCategory,

  toggleOpenRecommend,
  setOpenRecommend,
  setIsCurrentPlaceInCourse,

  changeTravelScheduleOrder,
  moveRecommendToTravel,
  deleteDuplicatePlace,
  moveTravelToRecommend,
  changeRecommendScheduleOrder,
  setTravelOverview,
} = travelInfoSlice.actions

const persistConfig = {
  key: 'travel',
  storage,
  blacklist: ['currentPlace', 'currentDay', 'openRecommend'],
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
export const selectRecommendSchedule = (state: RootState) =>
  state.travelInfo.recommendSchedule
export const selectCurrentPlace = (state: RootState) =>
  state.travelInfo.currentPlace
export const selectCurrentDay = (state: RootState) =>
  state.travelInfo.currentDay

// @@@@@ 이하 /survey @@@@@

export const selectOpenRecommend = (state: RootState) =>
  state.travelInfo.openRecommend

export const selectUser = (state: RootState) => state.travelInfo.user
export const selectCity = (state: RootState) => state.travelInfo.city

export const selectTravelId = (state: RootState) => state.travelInfo.travelId

export const selectCompanion = (state: RootState) => state.travelInfo.companion
export const selectCompanionAdult = (state: RootState) =>
  state.travelInfo.companion_adult
export const selectCompanionChild = (state: RootState) =>
  state.travelInfo.companion_child

// export const selectTravelStartDate = (state: RootState) =>
//   state.travelInfo.travel_start_date
// export const selectTravelEndDate = (state: RootState) =>
//   state.travelInfo.travel_end_date
export const selectDuration = (state: RootState) => state.travelInfo.duration

export const selectCategory = (state: RootState) => state.travelInfo.category

export const selectTravelOverview = (state: RootState) =>
  state.travelInfo.travelOverview

export default persistedTravelInfoReducer
