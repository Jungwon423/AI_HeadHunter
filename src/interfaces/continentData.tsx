import { ContinentProps } from '../index_components/ContinentInput'

export interface ContinentData {
  [continent: string]: {
    [country: string]: {
      naverId: string
      nameKo: string
      nameEn: string
      geoType: string
      geoViewType: string
      showAsRoot: boolean
      image: {
        photoURL: string
      }
      continentType?: string
      countryType?: string
    }[]
  }
}

export interface SearchResult {
  city?: {
    naverId: any
    nameKo: string
  }
  geoType?: string
  naverId?: string
  countryName: string
}

export interface ICountryListProps extends ContinentProps {
  countries: {
    [country: string]: {
      naverId: string
      nameKo: string
      nameEn: string
      geoType: string
      geoViewType: string
      showAsRoot: boolean
      image: {
        photoURL: string
      }
      continentType?: string
      countryType?: string
    }[]
  }
  searchTerm: string
}

export interface ICityListProps extends ContinentProps {
  cities: {
    naverId: string
    nameKo: string
    nameEn: string
    geoType: string
    geoViewType: string
    showAsRoot: boolean
    image: {
      photoURL: string
    }
    continentType?: string
    countryType?: string
  }[]
  searchTerm: string
}
