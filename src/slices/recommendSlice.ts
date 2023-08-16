import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { PlaceInfo } from '../interfaces/placeInfo'
import { Preference } from '../interfaces/preference'

export interface RecommendInfoState {
  preference: Preference
  preferenceLoading: 'idle' | 'pending' | 'succeeded' | 'failed'
  preferenceError: string | null

  attractions: PlaceInfo[][]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null

  // @@@@@ 이상 /preference @@@@@
  coordinate: number[]
  location: string
  currentPlace: PlaceInfo | null
  currentDay: number
}

const initialState: RecommendInfoState = {
  preference: {
    inferring: '',
    conclusion: '',
  } as Preference,
  preferenceLoading: 'idle',
  preferenceError: null,

  attractions: [],
  loading: 'idle',
  error: null,

  // @@@@@ 이상 /preference @@@@@

  location: '서울 강남구 언주로110 경남아파트',
  coordinate: [135.5023, 34.6937],
  currentPlace: null,
  currentDay: 0,
}

const recommendInfoSlice = createSlice({
  name: 'recommendInfo',
  initialState,
  reducers: {
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

    // @@@@@ 이상 /preference @@@@@
    setCoordinate: (state, action: PayloadAction<number[]>) => {
      state.coordinate = action.payload
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload
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

export const {
  setPreference,
  setPreferenceLoading,
  setPreferenceError,

  setAttractions,
  setError,
  setLoading,

  // @@@@@ 이상 /preference @@@@@

  setCoordinate,
  setLocation,
  handleCurrentPlace,
  setCurrentDay,
  initialize,
} = recommendInfoSlice.actions
export const selectRecommendInfo = (state: RootState) => state.recommendInfo

export const selectPreference = (state: RootState) =>
  state.recommendInfo.preference

export const selectAttractions = (state: RootState) =>
  state.recommendInfo.attractions

// @@@@@ 이상 /preference @@@@@

export const selectCoordinate = (state: RootState) =>
  state.recommendInfo.coordinate
export const selectLocation = (state: RootState) => state.recommendInfo.location
export const selectCurrentPlace = (state: RootState) =>
  state.recommendInfo.currentPlace
export const selectCurrentDay = (state: RootState) =>
  state.recommendInfo.currentDay

const persistConfig = {
  key: 'recommendInfo',
  storage,
}

const persistedRecommendInfoReducer = persistReducer(
  persistConfig,
  recommendInfoSlice.reducer,
)

export default persistedRecommendInfoReducer
