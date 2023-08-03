import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface QuestionnaireState {
  thought?: string
  question?: string
  options?: string[]
  travelId?: string
  finished?: boolean
}

export const initialState: QuestionnaireState = {
  thought: '',
  question: '',
  options: [],
  travelId: '',
  finished: false,
}

export const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setQuestionnaire: (state, action: PayloadAction<QuestionnaireState>) => {
      state.thought = action.payload.thought
      state.question = action.payload.question
      state.options = action.payload.options
      state.travelId = action.payload.travelId
      state.finished = action.payload.finished
    },
  },
})

export const { setQuestionnaire } = questionnaireSlice.actions

export const selectQuestionnaire = (state: RootState) => state.questionnaire

export default questionnaireSlice.reducer
