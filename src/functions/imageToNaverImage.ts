import { SyntheticEvent } from 'react'

export const converToNaverImage = (image: string): string => {
  return (
    'https://search.pstatic.net/common?src=' +
    encodeURIComponent(image) +
    '&type=m1500_travelsearch'
  )
}

export const converToDefaultImage = (image: string): string => {
  return (
    // remove prefix : https://search.pstatic.net/common?src= and suffix : &type=m1500_travelsearch
    decodeURIComponent(image.substring(38, image.length - 24))
  )
}

export const imgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = converToDefaultImage(e.currentTarget.src)
  e.currentTarget.onerror = null
}
