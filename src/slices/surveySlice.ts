import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SERVER_API_URL } from './api_url'
import axios from 'axios'
import { AppThunk } from '../store'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

export interface MinorCategory {
  map(
    arg0: (minorCategory: MinorCategory) => import('react').JSX.Element,
  ): import('react').ReactNode
  name: string
  checked: boolean
}

export interface MajorCategoriesWithMinorCategories {
  [majorCategory: string]: MinorCategory[]
}

export interface SurveyState {
  companion: string
  companion_adult?: string
  companion_child?: string
  companion_number: number

  travel_start_date: string
  travel_end_date: string

  // category 데이터
  category: MajorCategoriesWithMinorCategories

  // category 응답
  category_response: MajorCategoriesWithMinorCategories
}

const initialState: SurveyState = {
  companion: '',
  companion_adult: '',
  companion_child: '',
  companion_number: 0,

  travel_start_date: '',
  travel_end_date: '',
  category: {},
  category_response: {},
}

export const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setCompanion: (state, action: PayloadAction<string>) => {
      state.companion = action.payload
    },
    setCompanionAdult: (state, action: PayloadAction<string>) => {
      state.companion_adult = action.payload
    },
    setCompanionChild: (state, action: PayloadAction<string>) => {
      state.companion_child = action.payload
    },
    setCompanionNumber: (state, action: PayloadAction<number>) => {
      state.companion_number = action.payload
    },
    setTravelStartDate: (state, action: PayloadAction<string>) => {
      state.travel_start_date = action.payload
    },
    setTravelEndDate: (state, action: PayloadAction<string>) => {
      state.travel_end_date = action.payload
    },

    setCategory: (
      state,
      action: PayloadAction<MajorCategoriesWithMinorCategories>,
    ) => {
      state.category = action.payload
    },
    setCategoryResponse: (
      state,
      action: PayloadAction<MajorCategoriesWithMinorCategories>,
    ) => {
      state.category_response = action.payload
    },
    checkMinorCategory: (
      state,
      action: PayloadAction<{ majorCategory: string; minorCategory: string }>,
    ) => {
      const { majorCategory, minorCategory } = action.payload

      const major = (
        state.category
          .majorCategoriesWithMinorCategories as unknown as MajorCategoriesWithMinorCategories
      )[majorCategory]
      if (major) {
        const minorIndex = major.findIndex((mc) => mc.name === minorCategory)
        if (minorIndex !== -1) {
          major[minorIndex].checked = !major[minorIndex].checked
        } else {
          console.error('해당 minorCategory를 찾을 수 없습니다.')
        }
      } else {
        console.error('해당 majorCategory를 찾을 수 없습니다.')
      }
    },
  },
})

export interface FirstInput {
  user: string
  destination: string
}

export const fecthSurveyInput = async (
  FirstInput: FirstInput,
): Promise<MajorCategoriesWithMinorCategories> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/preference/attractionQuery'

  const response = await axios.post(API_URL, FirstInput, config)

  return response.data
}

export const fecthSurveyInputAsync =
  (FirstInput: FirstInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: MajorCategoriesWithMinorCategories
      type: 'survey/setCategory'
    }) => void,
  ) => {
    try {
      const category = await fecthSurveyInput(FirstInput)
      dispatch(setCategory(category))
    } catch (error: any) {}
  }

const persistConfig = {
  key: 'survey',
  storage,
}

const persistedSurveyReducer = persistReducer(
  persistConfig,
  surveySlice.reducer,
)

export const {
  setCompanion,
  setCompanionAdult,
  setCompanionChild,
  setCompanionNumber,
  setTravelStartDate,
  setTravelEndDate,
  setCategory,
  setCategoryResponse,
  checkMinorCategory,
} = surveySlice.actions

export const selectCompanion = (state: any) => state.survey.companion
export const selectCompanionAdult = (state: any) => state.survey.companion_adult
export const selectCompanionChild = (state: any) => state.survey.companion_child
export const selectCompanionNumber = (state: any) =>
  state.survey.companion_number
export const selectTravelStartDate = (state: any) =>
  state.survey.travel_start_date
export const selectTravelEndDate = (state: any) => state.survey.travel_end_date
export const selectCategory = (state: any) => state.survey.category
export const selectCategoryResponse = (state: any) =>
  state.survey.category_response

export default persistedSurveyReducer
