import { OpeningHours } from './openingHours'
import { HashTag, NaverBlog, Review, Youtube } from './review'

export interface GeoHierarchy {
  country?: string
  state?: string
  city?: string
}

export interface SubCategory {
  nameKo?: string
  nameEn?: string
}

export interface OperationTimeByDay {
  dayName?: any
  openTime?: any
  closeTime?: any
}

export interface PlaceInfo {
  name?: string | null | undefined
  coordinate?: number[] | null | undefined
  image?: string | null | undefined
  naverImage?: string | null | undefined
  time?: number | null | undefined
  summary?: Summary | null | undefined //editorial_summary, 짧은 설명
  hashtags?: HashTag[] | null | undefined //types, 를 해쉬태그로
  googleUrl?: string | null | undefined //url, 구글 url
  wheelchair?: boolean | null | undefined //wheelchair_accessible_entrance, 휠체어 이용 가능 여부
  //googleReviews?: Review[] | null | undefined
  attractionStartTime?: string | null | undefined
  attractionEndTime?: string | null | undefined
  reviews?: Review[]
  naverBlog?: NaverBlog[]
  youtube?: Youtube[]
  type?: 'attraction' | 'restaurant'

  // 2023.09.07 (목) 추가
  imageList?: string[]
  geoHierarchy?: GeoHierarchy
  nameKo?: string | undefined
  nameEn?: string | undefined
  subCategory?: SubCategory
  description?: string | null | undefined
  rating?: number | null | undefined //rating, 트립어드바이저 별점
  ratingCount?: number | null | undefined //user_ratings_total, 트립어드바이저 별점

  addressEn?: string | null | undefined
  addressKo?: string | null | undefined

  recommendedVisitLength?: string
  operationTime?: OperationTimeByDay[]
  operationDescription?: string[]

  itemPrice?: string[]

  homepage?: string | null | undefined

  phoneNumber?: number | null | undefined //international_phone_number, 전화번호

  datalab?: any
  articles?: any
  naverImageList?: any
}

interface Summary {
  overview: string
}
