import { PlaceInfo } from '../interfaces/placeInfo'
import { convertToPlaceInfo } from './jsonToPlaceInfo'

export function processAttractionList(atttractionList: any): PlaceInfo[][] {
  return atttractionList.map((cluster: any) => {
    const attractions = cluster.map(convertToPlaceInfo)
    return [...attractions]
  })
}
