import axios, { AxiosResponse } from 'axios'
import { PlaceInfo } from '../interfaces/placeInfo'
import { RecommendInput } from '../interfaces/recommendInput'
import { SERVER_API_URL } from '../slices/api_url'
import { ResponseData, fetchRecommendAttractions } from './fetchRecommend'
import { AppThunk } from '../store'
import { ItineraryInput } from '../interfaces/preference'
import { TravelInfoState } from '../slices/travelInfoSlice'
import { Cluster } from '../interfaces/Cluster'
import { convertToPlaceInfo } from './jsonToPlaceInfo'

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

export const fetchItinerary = async (
  itineraryInput: ItineraryInput,
): Promise<any> => {
  //ItineraryState
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/itinerary/create'

  console.log('API_URL', API_URL)

  const response: AxiosResponse<ResponseData> = await axios.post(
    API_URL,
    itineraryInput,
    config,
  )

  console.log(response.data)
  const placeInfos: PlaceInfo[][] = processClusterTest(
    response.data.clustered_recommended_attractions,
  )
  return placeInfos
}
interface ItineraryState {
  overview: string
  day: number
  itinerary: string[]
}

export const fetchItineraryAsync =
  (itineraryInput: ItineraryInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: ItineraryState | string | PlaceInfo[][] | null
      type:
        | 'travelInfo/setTravelSchedule'
        | 'travelInfo/setLoading'
        | 'travelInfo/setError'
        | 'travelInfo/deleteDuplicatePlace'
    }) => void,
  ) => {
    try {
      const travelSchedule = await fetchItinerary(itineraryInput) // TODO : fetchTravelSchedule API 구현
      console.log('Itinerary', travelSchedule)
    } catch (error: any) {
      console.log(error)
    }
  }
