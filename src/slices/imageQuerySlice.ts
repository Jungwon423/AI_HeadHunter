import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { InitialQueryInput } from './questionnaireSlice'
import { RootState, AppThunk } from '../store'
import { convertToPlaceInfo } from './travelInfoSlice'
import { SERVER_API_URL } from './api_url'
import axios from 'axios'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PlaceInfo } from '../interfaces/placeInfo'

export type ZeroOrOne = 0 | 1

export interface AttractionQueryState {
  travel_id: string
  query_list: PlaceInfo[][]
  // loading 상태 저장
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  // error 상태 저장
  error: string | null
  resultList: ZeroOrOne[]
}

const initialState: AttractionQueryState = {
  travel_id: '',
  query_list: [],
  loading: 'idle',
  error: null,
  resultList: [],
}

export function processAttractionList(atttractionList: any): PlaceInfo[][] {
  return atttractionList.map((cluster: any) => {
    const attractions = cluster.map(convertToPlaceInfo)
    return [...attractions]
  })
}

export const fetchAttractionQuery = async (
  initialQuery: InitialQueryInput,
): Promise<AttractionQueryState> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/travel/attractionQuery'

  const response = await axios.post(API_URL, initialQuery, config)

  const placeInfos: PlaceInfo[][] = processAttractionList(
    response.data.query_list,
  )

  const attractionQuery: AttractionQueryState = {
    travel_id: response.data.travel_id,
    query_list: placeInfos,
    loading: 'pending',
    error: null,
    resultList: [],
  }
  return attractionQuery
}

export const attractionQuerySlice = createSlice({
  name: 'attractionQuery',
  initialState,
  reducers: {
    setAttractionQuery: (
      state,
      action: PayloadAction<AttractionQueryState>,
    ) => {
      state.travel_id = action.payload.travel_id
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
    initialize: (state) => {
      state.resultList = []
      state.loading = 'idle'
    },
  },
})

export const fetchAttractionQueryAsync =
  (initialQuery: InitialQueryInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: string | AttractionQueryState | null
      type:
        | 'attractionQuery/setAttractionQuery'
        | 'attractionQuery/setLoading'
        | 'attractionQuery/setError'
    }) => void,
  ) => {
    try {
      dispatch(setLoading('pending'))
      const attractionQuery = await fetchAttractionQuery(initialQuery)
      dispatch(setAttractionQuery(attractionQuery))
      dispatch(setLoading('succeeded'))
    } catch (error) {
      dispatch(setError(JSON.stringify(error)))
      dispatch(setLoading('failed'))
    }
  }

const persistConfig = {
  key: 'root',
  storage,
}

const persistedAttractionQueryReducer = persistReducer(
  persistConfig,
  attractionQuerySlice.reducer,
)

export const selectAttractionQueryList = (state: RootState) =>
  state.attractionQuery.query_list

export const selectAttractionQueryLoading = (state: RootState) =>
  state.attractionQuery.loading

export const selectAttractionQueryError = (state: RootState) =>
  state.attractionQuery.error

export const selectAttractionQueryResultList = (state: RootState) =>
  state.attractionQuery.resultList

export const selectAttractionQueryTravelId = (state: RootState) =>
  state.attractionQuery.travel_id

export const {
  setAttractionQuery,
  setLoading,
  setError,
  setResultList,
  initialize,
} = attractionQuerySlice.actions

export const selectAttractionQuery = (state: RootState) => state.attractionQuery

export default persistedAttractionQueryReducer
