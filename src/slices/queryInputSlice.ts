import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { QueryInput } from './not_used/questionnaireSlice'
import { RootState } from '../store'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const queryInputInitialState: QueryInput = {
  travel_id: '',
  user: '',
  answer: [],
}

export const queryInputSlice = createSlice({
  name: 'queryInput',
  initialState: queryInputInitialState,
  reducers: {
    setQueryInput: (state, action: PayloadAction<QueryInput>) => {
      state.travel_id = action.payload.travel_id
      state.answer = action.payload.answer
      state.user = action.payload.user
    },
  },
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedQueryInputReducer = persistReducer(
  persistConfig,
  queryInputSlice.reducer,
)

export const { setQueryInput } = queryInputSlice.actions

export const selectQueryInput = (state: RootState) => state.queryInput

export default persistedQueryInputReducer
