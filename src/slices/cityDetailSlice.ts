// import { persistReducer } from "redux-persist"
// import { RootState } from "../store"
// import storage from "redux-persist/es/storage"
// import { PayloadAction, createSlice } from "@reduxjs/toolkit"
// import { SERVER_API_URL } from "./api_url"

// export interface AttractionQueryState {
//   travel_id: string
//   query_list: PlaceInfo[][]
//   // loading 상태 저장
//   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
//   // error 상태 저장
//   error: string | null
//   resultList: ZeroOrOne[]
// }

// const initialState: AttractionQueryState = {
//   travel_id: '',
//   query_list: [],
//   loading: 'idle',
//   error: null,
//   resultList: [],
// }

// export const attractionQuerySlice = createSlice({
//   name: 'attractionQuery',
//   initialState,
//   reducers: {
//     setCityDetail: (state : CityDetail, action: PayloadAction<AttractionQueryState>) => {
//         state.travel_id = action.payload.travel_id
//         state.query_list = action.payload.query_list
//         state.loading = action.payload.loading
//         state.error = action.payload.error
//         state.resultList = action.payload.resultList
//     }
//   },
// })

// export const fetchAttractionQueryAsync =
//   (initialQuery: InitialQueryInput): AppThunk =>
//   async (
//     dispatch: (arg0: {
//       payload: string | AttractionQueryState | null
//       type:
//         | 'attractionQuery/setAttractionQuery'
//         | 'attractionQuery/setLoading'
//         | 'attractionQuery/setError'
//     }) => void,
//   ) => {
//     try {
//       dispatch(setLoading('pending'))
//       const attractionQuery = await fetchAttractionQuery(initialQuery)
//       dispatch(setAttractionQuery(attractionQuery))
//       dispatch(setLoading('succeeded'))
//     } catch (error) {
//       dispatch(setError(JSON.stringify(error)))
//       dispatch(setLoading('failed'))
//     }
//   }

// const persistConfig = {
//   key: 'cityDetail',
//   storage,
// }

// const persistedCityDetailReducer = persistReducer(
//   persistConfig,
//   attractionQuerySlice.reducer,
// )

// export const {
//   setCityDetail,
// } = cityDetailSlice.actions

// export const selectCityDetail = (state: RootState) => state.cityDetail

// export default persistedCityDetailReducer
