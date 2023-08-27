import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { ImageQueryState } from '../interfaces/imageQuery'
import { ZeroOrOne } from '../interfaces/zeroOrOne'

const initialState: ImageQueryState = {
  query_list: [],
  loading: 'idle',
  error: null,
  resultList: [],
}

export const imageQuerySlice = createSlice({
  name: 'imageQuery',
  initialState,
  reducers: {
    setImageQuery: (state, action: PayloadAction<ImageQueryState>) => {
      state.query_list = action.payload.query_list
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
    setResultList: (state, action: PayloadAction<ZeroOrOne>) => {
      state.resultList = [...state.resultList, action.payload]
    },
    setNextLoading: (
      state,
      action: PayloadAction<'idle' | 'pending' | 'succeeded' | 'failed'>,
    ) => {
      state.loading = action.payload
    },
    initialize: (state) => {
      state.resultList = []
      state.loading = 'idle'
    },
  },
})

const persistConfig = {
  key: 'image_query',
  storage,
}

const persistedImageQueryReducer = persistReducer(
  persistConfig,
  imageQuerySlice.reducer,
)

export const selectImageQueryList = (state: RootState) =>
  state.imageQuery.query_list
export const selectImageQueryLoading = (state: RootState) =>
  state.imageQuery.loading
export const selectImageQueryError = (state: RootState) =>
  state.imageQuery.error
export const selectImageQueryResultList = (state: RootState) =>
  state.imageQuery.resultList

export const {
  setImageQuery,
  setLoading,
  setError,
  setResultList,
  initialize,
} = imageQuerySlice.actions

export const selectImageQuery = (state: RootState) => state.imageQuery

export default persistedImageQueryReducer
