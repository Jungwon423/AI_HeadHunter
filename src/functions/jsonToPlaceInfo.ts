import { PlaceInfo } from '../interfaces/placeInfo'

// placeInfo 객체와 JSON 객체 간의 변환을 수행하는 함수를 작성합니다.
export function convertToPlaceInfo(attraction: any): PlaceInfo {
  // console.log('attraction', attraction)
  // console.log('attraction.nameKo', attraction.nameKo)
  // console.log('attraction.nameEn', attraction.nameEn)
  // console.log('attraction.location.lat', attraction.location?.lat)
  // console.log('attraction.location.lon', attraction.location?.lon)
  // console.log('attraction.image.photoURL', attraction.image?.photoURL)
  // console.log(
  //   'attraction.descriptionInfo.publisher',
  //   attraction.descriptionInfo.publisher,
  // )
  // console.log(
  //   'attraction.quality.averageRating',
  //   attraction.quality.averageRating,
  // )
  // console.log('attraction.quality.ranking', attraction.quality?.ranking)
  // console.log('attraction.datalab.keywordObj', attraction.datalab?.keywordObj)
  // console.log('attraction.datalab.keywordPop', attraction.datalab?.keywordPop)
  // console.log('attraction.phoneNumber', attraction?.phoneNumber)
  // console.log('attraction.addressKo', attraction?.addressKo)
  // console.log('attraction.addressEn', attraction?.addressEn)
  // console.log('attraction.homepage', attraction?.homepage)
  // console.log('attraction.evaluation', attraction?.evaluation)
  const originalUrl = attraction.image?.photoURL
  const encodedUrl = encodeURIComponent(originalUrl)
  const prefix = 'https://search.pstatic.net/common?src='
  const suffix = '&type=m1500_travelsearch'
  const apiUrl = prefix + encodedUrl + suffix

  const placeInfo: PlaceInfo = {
    name: attraction.nameKo === '' ? attraction.nameEn : attraction.nameKo,
    coordinate: [attraction.location?.lat, attraction.location?.lon],
    image: attraction.image?.photoURL,
    naverImage: apiUrl,
    description: attraction.descriptionInfo?.publisher, // 이건 뭐냐?
    time: 15, // TODO
    summary: attraction.descriptionInfo?.publisher,
    rating: attraction.quality?.averageRating,
    ratingCount: attraction.quality?.rankingDenominator,
    hashtags: attraction.datalab?.keywordObj, // or attraction.datalab.keywordPop
    phoneNumber: attraction.phoneNumber,
    location:
      attraction.addressKo === null
        ? attraction.addressEn
        : attraction.addressKo,
    // googleUrl: attraction.google_url,
    website: attraction.homepage,
    // openingHours: attraction.current_opening_hours,
    thought: attraction.evaluation,
    // wheelchair: attraction.wheelchair_accessible_entrance,
    // reviews: attraction.reviews,
    attractionStartTime: attraction.attractionStartTime,
  } as PlaceInfo
  return placeInfo
}
