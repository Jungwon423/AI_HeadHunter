export interface Youtube {
  id: string
  thumbnails: string[]
  title: string
  channel: string
  duration: string
  views: string
  publish_time: string
  url_suffix: string
}
export interface NaverBlog {
  title: string
  link: string
  description: string
  bloggername: string
  bloggerlink: string
  postdate: string
}
export interface Review {
  author: string
  datePublished: string
  lang: string
  rating: number
  title: string
  description: string
  moreReviewURL: string
  description_kr: string
}
export interface HashTag {
  nameKo: string
  nameEn: string
}
