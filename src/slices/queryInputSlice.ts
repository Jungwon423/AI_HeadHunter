import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { QueryInput } from './questionnaireSlice'
import { RootState } from '../store'

export const queryInputInitialState: QueryInput = {
  travelId: '',
  user: '',
  anwser: [],
}

export const queryInputSlice = createSlice({
  name: 'queryInput',
  initialState: queryInputInitialState,
  reducers: {
    setQueryInput: (state, action: PayloadAction<QueryInput>) => {
      state.travelId = action.payload.travelId
      state.anwser = action.payload.anwser
    },
  },
})

export const { setQueryInput } = queryInputSlice.actions

export const selectQueryInput = (state: RootState) => state.queryInput

export default queryInputSlice.reducer
