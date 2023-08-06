import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../store'
import axios, { AxiosResponse } from 'axios'
import { SERVER_API_URL } from './api_url'

export interface QuestionnaireState {
  thought?: string
  question?: string
  options?: string[]
  travel_id?: string
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
  travel_id: string
  user: string
  answer: string[]
}

export const fetchInitialQuery = async (
  initialQueryInput: InitialQueryInput,
): Promise<QuestionnaireState> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/travel/initialQuery'

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
  const config = {
    withCredentials: true,
  }
  let API_URL: string = SERVER_API_URL + '/travel/query'

  console.log('queryInput : ' + JSON.stringify(queryInput))

  const response: AxiosResponse<QuestionnaireState> = await axios.post(
    API_URL,
    /* Include any POST data you need to send */
    queryInput,
    config,
  )
  console.log('response : ' + JSON.stringify(response.data))
  return response.data
}

export const initialState: QuestionnaireState = {
  thought: '',
  question: '',
  options: [],
  travel_id: '',
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
      state.travel_id = action.payload.travel_id
      state.finished = action.payload.finished
    },
    setTravelId: (state, action: PayloadAction<string>) => {
      state.travel_id = action.payload
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
      if (questionnaire && questionnaire.travel_id) {
        dispatch(setTravelId(questionnaire.travel_id))
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
      if (questionnaire && questionnaire.travel_id) {
        console.log('questionnaire.travel_id : ' + questionnaire.travel_id)
        dispatch(setTravelId(questionnaire.travel_id))
      }
      dispatch(setLoading('succeeded'))
    } catch (error: any) {
      dispatch(setError(JSON.stringify(error)))
      dispatch(setLoading('failed'))
    }
  }

export const selectQuestionnaire = (state: RootState) => state.questionnaire
export const selectTravelId = (state: RootState) =>
  state.questionnaire.travel_id

export default questionnaireSlice.reducer
