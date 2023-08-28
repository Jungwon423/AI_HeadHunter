import axios from 'axios'
import { MajorCategoriesWithMinorCategories } from '../interfaces/category'
import { SurveyInput } from '../interfaces/input'
import { SERVER_API_URL } from '../slices/api_url'
import { AppThunk } from '../store'
import { setCategory, setTravelId } from '../slices/travelInfoSlice'

export type SurveyResponse = {
  majorCategoriesWithMinorCategories: MajorCategoriesWithMinorCategories
  travelId: string
}

export const fecthSurveyInput = async (
  SurveyInput: SurveyInput,
): Promise<SurveyResponse> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/preference/attractionQuery'

  const response = await axios.post(API_URL, SurveyInput, config)

  const surveyResponse: SurveyResponse = {
    majorCategoriesWithMinorCategories:
      response.data.majorCategoriesWithMinorCategories,
    travelId: response.data.travel_id,
  }

  return surveyResponse
}

export const fecthSurveyInputAsync =
  (SurveyInput: SurveyInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: MajorCategoriesWithMinorCategories | string
      type: 'travelInfo/setCategory' | 'travelInfo/setTravelId' | ''
    }) => void,
  ) => {
    try {
      const surveyResponse: SurveyResponse = await fecthSurveyInput(SurveyInput)
      dispatch(setCategory(surveyResponse.majorCategoriesWithMinorCategories))
      console.log(
        'majorCategoriesWithMinorCategories',
        surveyResponse.majorCategoriesWithMinorCategories,
      )
      dispatch(setTravelId(surveyResponse.travelId))
      console.log('travelId', surveyResponse.travelId)
    } catch (error: any) {}
  }
