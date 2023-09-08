import axios, { AxiosResponse } from 'axios'
import { PlaceInfo } from '../interfaces/placeInfo'
import { RecommendInput } from '../interfaces/recommendInput'
import { SERVER_API_URL } from '../slices/api_url'
import { ResponseData, fetchRecommendAttractions } from './fetchRecommend'
import { AppThunk } from '../store'
import {
  TravelInfoState,
  deleteDuplicatePlace,
  setError,
  setLoading,
  setTravelOverview,
  setTravelSchedule,
} from '../slices/travelInfoSlice'
import { convertToPlaceInfo } from './jsonToPlaceInfo'

export const convertToItinerary = (response: any) => {
  let convertedMap = new Map()
  let overviews: string[] = []
  let placeInfos: PlaceInfo[][] = []

  response.itinerary.map((day: any) => {
    overviews.push(day.overview)
    placeInfos.push(day.itinerary.map(convertToPlaceInfo))
  })

  convertedMap.set('overviews', overviews)
  convertedMap.set('placeInfos', placeInfos)

  return convertedMap
}

export const fetchTravelSchedule = async (
  recommendInput: RecommendInput,
): Promise<any> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/itinerary/create'

  console.log('API_URL', API_URL)

  const response: AxiosResponse<ResponseData> = await axios.post(
    API_URL,
    recommendInput,
    config,
  )

  console.log('response', response)

  // 이중 for문을 사용하여 JSON 데이터를 placeInfo[][]로 변환합니다.
  const itineraryInfo: any = convertToItinerary(response.data)

  return itineraryInfo
}

export const fetchTravelScheduleAsync =
  (recommendInput: RecommendInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: TravelInfoState | string | PlaceInfo[][] | null | string[]
      type:
        | 'travelInfo/setTravelSchedule'
        | 'travelInfo/setLoading'
        | 'travelInfo/setError'
        | 'travelInfo/deleteDuplicatePlace'
        | 'travelInfo/setTravelOverview'
    }) => void,
  ) => {
    try {
      dispatch(setLoading('pending'))
      const itineraryInfo = await fetchTravelSchedule(recommendInput)
      dispatch(setTravelSchedule(itineraryInfo.get('placeInfos')))
      // overviews 추가
      dispatch(setTravelOverview(itineraryInfo.get('overviews')))

      // filter로 정제
      dispatch(deleteDuplicatePlace(itineraryInfo.get('placeInfos')))
      dispatch(setLoading('succeeded'))
    } catch (error: any) {
      console.log(error)
      dispatch(setError(JSON.stringify(error)))
      dispatch(setLoading('failed'))
    }
  }
