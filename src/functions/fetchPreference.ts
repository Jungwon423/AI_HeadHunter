import axios, { AxiosResponse } from 'axios'
import { ZeroOrOne } from '../interfaces/zeroOrOne'
import { SERVER_API_URL } from '../slices/api_url'
import { Preference } from '../interfaces/preference'
import { AppThunk } from '../store'
import { PlaceInfo } from '../interfaces/placeInfo'
import {
  RecommendInfoState,
  setPreference,
  setPreferenceError,
  setPreferenceLoading,
} from '../slices/recommendSlice'

export interface PreferenceInput {
  user: string
  travel_id: string
  answers: ZeroOrOne[]
}

export const fetchPreference = async (
  PreferenceInput: PreferenceInput,
): Promise<Preference> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/travel/attractionQueryAnswer'

  console.log('API_URL', API_URL)

  const response: AxiosResponse<Preference> = await axios.post(
    API_URL,
    PreferenceInput,
    config,
  )

  return response.data
}

export const fetchPreferenceAsync =
  (PreferenceInput: PreferenceInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: RecommendInfoState | string | PlaceInfo[][] | null | Preference
      type:
        | 'recommendInfo/setUserId'
        | 'recommendInfo/setPreference'
        | 'recommendInfo/setPreferenceError'
        | 'recommendInfo/setPreferenceLoading'
    }) => void,
  ) => {
    try {
      dispatch(setPreferenceLoading('pending'))
      const preference = await fetchPreference(PreferenceInput)
      dispatch(setPreference(preference))
      dispatch(setPreferenceLoading('succeeded'))
    } catch (error: any) {
      dispatch(setPreferenceError(JSON.stringify(error)))
      dispatch(setPreferenceLoading('failed'))
    }
  }
