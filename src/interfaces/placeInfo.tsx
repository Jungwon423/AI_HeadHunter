import { OpeningHours } from '../interfaces/openingHours'
import { Review } from '../interfaces/review'

export interface PlaceInfo {
  name: string
  coordinate: number[]
  image: string
  description: string
  time: number
  summary?: Summary //editorial_summary, 짧은 설명
  rating?: number //rating,  구글 별점
  ratingCount?: number //user_ratings_total, 구글 별점 갯수
  hashtags: string[] //types, 를 해쉬태그로
  phoneNumber?: number //international_phone_number, 전화번호
  location?: string //formatted address
  googleUrl?: string //url, 구글 url
  website?: string //website, 관광지 website
  openingHours?: OpeningHours //current_opening_hours -> weekday_text, 운영 시간
  thought?: string //thought, ai의 추천 이유
  wheelchair?: boolean //wheelchair_accessible_entrance, 휠체어 이용 가능 여부
  reviews?: Review[]
}

interface Summary {
  overview: string
}
