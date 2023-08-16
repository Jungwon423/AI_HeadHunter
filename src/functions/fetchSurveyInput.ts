import axios from 'axios'
import { MajorCategoriesWithMinorCategories } from '../interfaces/category'
import { SurveyInput } from '../interfaces/input'
import { SERVER_API_URL } from '../slices/api_url'
import { AppThunk } from '../store'
import { setCategory } from '../slices/travelInfoSlice'

export const fecthSurveyInput = async (
  SurveyInput: SurveyInput,
): Promise<MajorCategoriesWithMinorCategories> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/preference/attractionQuery'

  const response = await axios.post(API_URL, SurveyInput, config)

  return response.data
}

export const fecthSurveyInputAsync =
  (SurveyInput: SurveyInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: MajorCategoriesWithMinorCategories
      type: 'travelInfo/setCategory'
    }) => void,
  ) => {
    try {
      const category = await fecthSurveyInput(SurveyInput)
      dispatch(setCategory(category))
    } catch (error: any) {}
  }
