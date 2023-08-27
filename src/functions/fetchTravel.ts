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
  setTravelSchedule,
} from '../slices/travelInfoSlice'
import { Cluster } from '../interfaces/Cluster'
import { convertToPlaceInfo } from './jsonToPlaceInfo'
import { de } from 'date-fns/locale'

export function processClusterTest(clusterArray: Cluster[]): PlaceInfo[][] {
  return clusterArray.map((cluster) => {
    const travelAttractions: Map<string, any>[] = cluster.attractions.slice(
      0,
      3,
    )
    const attractions = travelAttractions.map(convertToPlaceInfo)
    // const restaurants = cluster.restaurants.map(convertToPlaceInfo)
    // return [...attractions, ...restaurants]
    return [...attractions]
  })
}

export const fetchTravelSchedule = async (
  recommendInput: RecommendInput,
): Promise<PlaceInfo[][]> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/preference/attractionRecommendation'

  console.log('API_URL', API_URL)

  const response: AxiosResponse<ResponseData> = await axios.post(
    API_URL,
    recommendInput,
    config,
  )

  console.log(response.data)

  // 이중 for문을 사용하여 JSON 데이터를 placeInfo[][]로 변환합니다.
  const placeInfos: PlaceInfo[][] = processClusterTest(
    response.data.clustered_recommended_attractions,
  )
  return placeInfos
}

export const fetchTravelScheduleAsync =
  (recommendInput: RecommendInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: TravelInfoState | string | PlaceInfo[][] | null
      type:
        | 'travelInfo/setTravelSchedule'
        | 'travelInfo/setLoading'
        | 'travelInfo/setError'
        | 'travelInfo/deleteDuplicatePlace'
    }) => void,
  ) => {
    try {
      dispatch(setLoading('pending'))
      const travelSchedule = await fetchTravelSchedule(recommendInput) // TODO : fetchTravelSchedule API 구현
      dispatch(setTravelSchedule(travelSchedule))

      // filter로 정제
      dispatch(deleteDuplicatePlace(travelSchedule))
      console.log('제거 완료')
      dispatch(setLoading('succeeded'))
    } catch (error: any) {
      dispatch(setError(JSON.stringify(error)))
      dispatch(setLoading('failed'))
    }
  }
