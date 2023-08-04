import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { QueryInput } from './questionnaireSlice'
import { RootState } from '../store'

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

export const { setQueryInput } = queryInputSlice.actions

export const selectQueryInput = (state: RootState) => state.queryInput

export default queryInputSlice.reducer
