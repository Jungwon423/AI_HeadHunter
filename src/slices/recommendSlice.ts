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
  restaurants: PlaceInfo[][]

  depreactedAttractions: PlaceInfo[]
  depreactedRestaurants: PlaceInfo[]

  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null

  // @@@@@ 이상 /preference @@@@@
  coordinate: number[]
  location: string
  currentPlace: PlaceInfo | null
  recommendState: '전체' | '추천' | '비추천'
}

const initialState: RecommendInfoState = {
  preference: {
    inferring: '',
    conclusion: '',
  } as Preference,
  preferenceLoading: 'idle',
  preferenceError: null,

  attractions: [],
  restaurants: [],
  depreactedAttractions: [],
  depreactedRestaurants: [],

  loading: 'idle',
  error: null,

  // @@@@@ 이상 /preference @@@@@
  location: '서울 강남구 언주로110 경남아파트',
  coordinate: [135.5023, 34.6937],
  currentPlace: null,
  recommendState: '추천',
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

    setRestaurants: (state, action) => {
      state.restaurants = action.payload
    },

    setDepreactedAttractions: (state, action) => {
      state.depreactedAttractions = action.payload
    },

    setDepreactedRestaurants: (state, action) => {
      state.depreactedRestaurants = action.payload
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
    setRecommendState: (
      state,
      action: PayloadAction<'전체' | '추천' | '비추천'>,
    ) => {
      state.recommendState = action.payload
    },

    initializeRecommend: (state) => {
      // setPreferenceLoading('idle')
      // setPreferenceError(null)
      // state.loading = 'idle'
      // state.error = null
      console.log('initializeRecommenddd', state.loading)
      state.loading = 'idle'
      state.error = null
    },
  },
})

export const {
  setPreference,
  setPreferenceLoading,
  setPreferenceError,

  setAttractions,
  setRestaurants,
  setDepreactedAttractions,
  setDepreactedRestaurants,

  setError,
  setLoading,

  // @@@@@ 이상 /preference @@@@@

  setCoordinate,
  setLocation,
  handleCurrentPlace,
  setRecommendState,
  initializeRecommend,
} = recommendInfoSlice.actions
export const selectRecommendInfo = (state: RootState) => state.recommendInfo

export const selectPreference = (state: RootState) =>
  state.recommendInfo.preference

export const selectAttractions = (state: RootState) =>
  state.recommendInfo.attractions

export const selectRestaurants = (state: RootState) =>
  state.recommendInfo.restaurants

export const selectDepreactedAttractions = (state: RootState) =>
  state.recommendInfo.depreactedAttractions

export const selectDepreactedRestaurants = (state: RootState) =>
  state.recommendInfo.depreactedRestaurants

// @@@@@ 이상 /preference @@@@@

export const selectCoordinate = (state: RootState) =>
  state.recommendInfo.coordinate
export const selectLocation = (state: RootState) => state.recommendInfo.location
export const selectCurrentPlace = (state: RootState) =>
  state.recommendInfo.currentPlace
export const selectRecommendState = (state: RootState) =>
  state.recommendInfo.recommendState

const persistConfig = {
  key: 'recommendInfo',
  storage,
  blacklist: [
    'attractions',
    'restaurants',
    'depreactedAttractions',
    'depreactedRestaurants',
  ],
}

const persistedRecommendInfoReducer = persistReducer(
  persistConfig,
  recommendInfoSlice.reducer,
)

export default persistedRecommendInfoReducer
