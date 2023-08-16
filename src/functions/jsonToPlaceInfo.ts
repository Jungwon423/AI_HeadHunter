import { PlaceInfo } from '../interfaces/placeInfo'

// placeInfo 객체와 JSON 객체 간의 변환을 수행하는 함수를 작성합니다.
export function convertToPlaceInfo(attraction: any): PlaceInfo {
  return {
    name: attraction.name,
    coordinate: [
      attraction.geometry.location.lat,
      attraction.geometry.location.lng,
    ],
    image: attraction.img,
    description: attraction.description,
    time: 15,
    summary: attraction.editorial_summary,
    rating: attraction.rating,
    ratingCount: attraction.user_ratings_total,
    hashtags: attraction.types,
    phoneNumber: attraction.international_phone_number,
    location: attraction.formatted_address,
    googleUrl: attraction.url,
    website: attraction.website,
    openingHours: attraction.current_opening_hours,
    thought: attraction.thought,
    wheelchair: attraction.wheelchair_accessible_entrance,
    reviews: attraction.reviews,
  } as PlaceInfo
}
