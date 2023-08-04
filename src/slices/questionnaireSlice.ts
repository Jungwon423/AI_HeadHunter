import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'
import axios, { AxiosResponse } from 'axios'

export interface QuestionnaireState {
  thought?: string
  question?: string
  options?: string[]
  travelId?: string
  finished?: boolean
  // loading 상태 저장
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  // error 상태 저장
  error: string | null
}

export interface InitialQueryInput {
  user: string
  destination: string
  duration: number
  budget: number
  companion: string
}

export interface QueryInput {
  travelId: string
  user: string
  anwser: string[]
}

export const fetchInitialQuery = async (
  initialQueryInput: InitialQueryInput,
): Promise<QuestionnaireState> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = 'http://52.78.50.226:80/travel/initialQuery'

  const response: AxiosResponse<QuestionnaireState> = await axios.post(
    API_URL,
    initialQueryInput,
    config,
  )
  return response.data
}

export const fetchQuery = async (
  queryInput: QueryInput,
): Promise<QuestionnaireState> => {
  let API_URL: string = 'http://52.78.50.226:80/travel/query'

  const response: AxiosResponse<QuestionnaireState> = await axios.post(
    API_URL,
    /* Include any POST data you need to send */
    queryInput,
  )
  return response.data
}

export const initialState: QuestionnaireState = {
  thought: '',
  question: '',
  options: [],
  travelId: '',
  finished: false,
  loading: 'idle',
  error: null,
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
    setTravelId: (state, action: PayloadAction<string>) => {
      state.travelId = action.payload
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
  },
})

export const { setQuestionnaire, setTravelId, setLoading, setError } =
  questionnaireSlice.actions

export const fetchInitialQueryAsync =
  (initialQueryInput: InitialQueryInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: string | QuestionnaireState | null
      type:
        | 'questionnaire/setQuestionnaire'
        | 'questionnaire/setTravelId'
        | 'questionnaire/setLoading'
        | 'questionnaire/setError'
    }) => void,
  ) => {
    try {
      dispatch(setLoading('pending'))
      const questionnaire = await fetchInitialQuery(initialQueryInput)
      dispatch(setQuestionnaire(questionnaire))
      if (questionnaire && questionnaire.travelId) {
        dispatch(setTravelId(questionnaire.travelId))
      }
      dispatch(setLoading('succeeded'))
    } catch (error: any) {
      dispatch(setError(JSON.stringify(error)))
      dispatch(setLoading('failed'))
    }
  }

export const fetchQueryAsync =
  (queryInput: QueryInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: string | QuestionnaireState | null
      type:
        | 'questionnaire/setQuestionnaire'
        | 'questionnaire/setTravelId'
        | 'questionnaire/setLoading'
        | 'questionnaire/setError'
    }) => void,
  ) => {
    try {
      dispatch(setLoading('pending'))
      const questionnaire = await fetchQuery(queryInput)
      dispatch(setQuestionnaire(questionnaire))
      console.log('travelId : ' + questionnaire.travelId)
      if (questionnaire && questionnaire.travelId) {
        dispatch(setTravelId(questionnaire.travelId))
      }
      dispatch(setLoading('succeeded'))
    } catch (error: any) {
      dispatch(setError(JSON.stringify(error)))
      dispatch(setLoading('failed'))
    }
  }

export const selectQuestionnaire = (state: RootState) => state.questionnaire

export default questionnaireSlice.reducer
