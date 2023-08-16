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

export interface ICountryListProps {
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

export interface ICityListProps {
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
