import axios, { AxiosResponse } from 'axios'
import { PlaceInfo } from '../interfaces/placeInfo'
import { SERVER_API_URL } from '../slices/api_url'
import { Cluster } from '../interfaces/Cluster'
import { convertToPlaceInfo } from './jsonToPlaceInfo'
import { AppThunk } from '../store'
import {
  setAttractions,
  setDepreactedAttractions,
  setDepreactedRestaurants,
  setError,
  setLoading,
  setRestaurants,
} from '../slices/recommendSlice'
import { ImageQueryInput } from '../interfaces/imageQuery'

export interface ResponseData {
  clustered_recommended_attractions: Cluster[]
  clustered_not_recommended_attractions: PlaceInfo[]
}

export function processCluster(clusterArray: Cluster[]): PlaceInfo[][] {
  return clusterArray.map((cluster) => {
    const attractions = cluster.attractions.map(convertToPlaceInfo)
    return [...attractions]
  })
}

export function processRestaurantCluster(
  clusterArray: Cluster[],
): PlaceInfo[][] {
  return clusterArray.map((cluster) => {
    const restaurants = cluster.restaurants.map(convertToPlaceInfo)
    return [...restaurants]
  })
}

function convertToRecommendInfos(response: any): any {
  let recommendInfo = new Map()
  let attractions: PlaceInfo[][] = processCluster(
    response.clustered_recommended_attractions,
  )
  let restaurants: PlaceInfo[][] = processRestaurantCluster(
    response.clustered_recommended_attractions,
  )
  let depreactedAttractions: PlaceInfo[][] = processCluster(
    response.clustered_not_recommended_attractions,
  )
  let depreactedRestaurants: PlaceInfo[][] = processRestaurantCluster(
    response.clustered_not_recommended_attractions,
  )

  recommendInfo.set('attractions', attractions)
  recommendInfo.set('restaurants', restaurants)
  recommendInfo.set('depreactedAttractions', depreactedAttractions)
  recommendInfo.set('depreactedRestaurants', depreactedRestaurants)

  return recommendInfo
}

export const fetchRecommendAttractions = async (
  recommendInput: ImageQueryInput,
): Promise<any> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/preference/attractionRecommendation'

  console.log('API_URL', API_URL)
  console.log('Input', recommendInput)

  const response: AxiosResponse<ResponseData> = await axios.post(
    API_URL,
    recommendInput,
    config,
  )

  console.log('response.data : ', response.data)

  // 이중 for문을 사용하여 JSON 데이터를 placeInfo[][]로 변환합니다.
  const recommendInfos: any = convertToRecommendInfos(response.data)
  return recommendInfos
}

export const fetchRecommendAttractionsAsync =
  (recommendInput: ImageQueryInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: string | PlaceInfo[][] | null | any
      type:
        | 'recommendInfo/setAttractions'
        | 'recommendInfo/setRestaurants'
        | 'recommendInfo/setDepreactedAttractions'
        | 'recommendInfo/setDepreactedRestaurants'
        | 'recommendInfo/setLoading'
        | 'recommendInfo/setError'
    }) => void,
  ) => {
    try {
      dispatch(setLoading('pending'))
      const recommendInfo = await fetchRecommendAttractions(recommendInput)

      dispatch(setAttractions(recommendInfo.get('attractions')))
      dispatch(setRestaurants(recommendInfo.get('restaurants')))
      dispatch(
        setDepreactedAttractions(recommendInfo.get('depreactedAttractions')),
      )
      dispatch(
        setDepreactedRestaurants(recommendInfo.get('depreactedRestaurants')),
      )

      dispatch(setLoading('succeeded'))
    } catch (error: any) {
      dispatch(setError(JSON.stringify(error)))
    }
  }
