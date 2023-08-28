import { OpeningHours } from './openingHours'
import { Review } from './review'

export interface PlaceInfo {
  name?: string | null | undefined
  coordinate?: number[] | null | undefined
  image?: string | null | undefined
  naverImage?: string | null | undefined
  description?: string | null | undefined
  time?: number | null | undefined
  summary?: Summary | null | undefined //editorial_summary, 짧은 설명
  rating?: number | null | undefined //rating,  구글 별점
  ratingCount?: number | null | undefined //user_ratings_total, 구글 별점 갯수
  hashtags?: string[] | null | undefined //types, 를 해쉬태그로
  phoneNumber?: number | null | undefined //international_phone_number, 전화번호
  location?: string | null | undefined //formatted address
  googleUrl?: string | null | undefined //url, 구글 url
  website?: string | null | undefined //website, 관광지 website
  openingHours?: OpeningHours | null | undefined //current_opening_hours -> weekday_text, 운영 시간
  thought?: string | null | undefined //thought, ai의 추천 이유
  wheelchair?: boolean | null | undefined //wheelchair_accessible_entrance, 휠체어 이용 가능 여부
  reviews?: Review[] | null | undefined
  attractionStartTime?: string | null | undefined
  attractionEndTime?: string | null | undefined
}

interface Summary {
  overview: string
}
