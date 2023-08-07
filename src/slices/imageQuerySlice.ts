import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { InitialQueryInput } from './questionnaireSlice'
import { RootState, AppThunk } from '../store'
import {
  convertToPlaceInfo,
  placeInfo,
  processCluster,
} from './travelInfoSlice'
import { SERVER_API_URL } from './api_url'
import axios from 'axios'
import { init } from 'next/dist/compiled/@vercel/og/satori'
import App from 'next/app'

export type ZeroOrOne = 0 | 1

export interface AttractionQueryState {
  travel_id: string
  query_list: placeInfo[][]
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

export function processAttractionList(atttractionList: any): placeInfo[][] {
  console.log('atttractionList : ' + JSON.stringify(atttractionList))
  return atttractionList.map((cluster: any) => {
    console.log('cluster : ' + JSON.stringify(cluster))
    const attractions = cluster.map(convertToPlaceInfo)
    console.log('success')
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

  // console.log('response.data : ' + JSON.stringify(response.data.query_list))
  // 이중 for문을 사용하여 JSON 데이터를 placeInfo[][]로 변환합니다.

  const placeInfos: placeInfo[][] = processAttractionList(
    response.data.query_list,
  )

  const attractionQuery: AttractionQueryState = {
    travel_id: response.data.travel_id,
    query_list: placeInfos,
    loading: 'pending',
    error: null,
    resultList: [],
  }
  console.log(attractionQuery.query_list)
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

export const selectAttractionQueryList = (state: RootState) =>
  state.attractionQuery.query_list

export const selectAttractionQueryLoading = (state: RootState) =>
  state.attractionQuery.loading

export const selectAttractionQueryError = (state: RootState) =>
  state.attractionQuery.error

export const selectAttractionQueryResultList = (state: RootState) =>
  state.attractionQuery.resultList

export const { setAttractionQuery, setLoading, setError, setResultList } =
  attractionQuerySlice.actions

export const selectAttractionQuery = (state: RootState) => state.attractionQuery

export default attractionQuerySlice.reducer
