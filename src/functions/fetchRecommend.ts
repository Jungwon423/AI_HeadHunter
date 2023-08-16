import axios, { AxiosResponse } from 'axios'
import { PlaceInfo } from '../interfaces/placeInfo'
import { RecommendInput } from '../interfaces/recommendInput'
import { SERVER_API_URL } from '../slices/api_url'
import { Cluster } from '../interfaces/Cluster'
import { convertToPlaceInfo } from './jsonToPlaceInfo'
import { AppThunk } from '../store'
import { setAttractions, setError, setLoading } from '../slices/recommendSlice'

export interface ResponseData {
  cluster_attractions: Cluster[]
  not_recommended_attractions: Cluster[]
}

export function processCluster(clusterArray: Cluster[]): PlaceInfo[][] {
  return clusterArray.map((cluster) => {
    const attractions = cluster.attractions.map(convertToPlaceInfo)
    // const restaurants = cluster.restaurants.map(convertToPlaceInfo)
    // return [...attractions, ...restaurants]
    return [...attractions]
  })
}

export const fetchRecommendAttractions = async (
  recommendInput: RecommendInput,
): Promise<PlaceInfo[][]> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/travel/recommendAttractions'

  console.log('API_URL', API_URL)

  const response: AxiosResponse<ResponseData> = await axios.post(
    API_URL,
    recommendInput,
    config,
  )

  console.log('response', response)

  // 이중 for문을 사용하여 JSON 데이터를 placeInfo[][]로 변환합니다.
  const placeInfos: PlaceInfo[][] = processCluster(
    response.data.cluster_attractions,
  )
  return placeInfos
}

export const fetchRecommendAttractionsAsync =
  (recommendInput: RecommendInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: string | PlaceInfo[][] | null
      type:
        | 'recommendInfo/setAttractions'
        | 'recommendInfo/setLoading'
        | 'recommendInfo/setError'
    }) => void,
  ) => {
    try {
      dispatch(setLoading('pending'))
      const attractions = await fetchRecommendAttractions(recommendInput)
      dispatch(setAttractions(attractions))
      console.log(attractions)
      dispatch(setLoading('succeeded'))
    } catch (error: any) {
      dispatch(setError(JSON.stringify(error)))
    }
  }
