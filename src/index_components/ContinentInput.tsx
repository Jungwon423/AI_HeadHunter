import { useState } from 'react'
const data = require('/public/json/whole_Geo.json')
import Image from 'next/image'

interface ContinentData {
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

const flattenData = (data: ContinentData) => {
  const dataArray = []
  for (const continent of Object.keys(data)) {
    for (const countryName in data[continent]) {
      dataArray.push({
        continent,
        countryName,
      })
      for (const city of data[continent][countryName]) {
        dataArray.push({
          continent,
          countryName,
          city,
        })
      }
    }
  }
  return dataArray
}

const ContinentInput = () => {
  const [selectedContinent, setSelectedContinent] = useState('유럽')
  const [searchTerm, setSearchTerm] = useState('')
  const continents = Object.keys(data)
  const flatData = flattenData(data)

  const selectContinent = (continent: string) => {
    setSearchTerm('')
    setSelectedContinent(continent)
  }

  const filterData = () => {
    if (searchTerm === '') return []
    return flatData.filter(
      (data) =>
        data.city?.nameKo.includes(searchTerm) ||
        data.countryName.includes(searchTerm),
    )
  }

  const searchResults = filterData()

  return (
    <>
      <input
        type="text"
        placeholder="검색..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm !== '' ? (
        <div>
          {searchResults.map(({ countryName, city }) => (
            <div key={city ? city.naverId : countryName}>
              {city ? (
                <>
                  {countryName} - {city.nameKo}
                </>
              ) : (
                <>{countryName}</>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div style={{ display: 'flex' }}>
            <div>
              {continents.map((continent) => (
                <div key={continent}>
                  <button onClick={() => selectContinent(continent)}>
                    {continent}
                  </button>
                </div>
              ))}
            </div>
            <div>
              {selectedContinent && (
                <CountryList
                  countries={data[selectedContinent as keyof ContinentData]}
                  searchTerm={searchTerm}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

interface ICountryListProps {
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

const CountryList = ({ countries, searchTerm }: ICountryListProps) => {
  const [selectedCountry, setSelectedCountry] = useState('')
  const countryNames = Object.keys(countries)

  const toggleCountry = (countryName: string) => {
    if (selectedCountry === countryName) {
      setSelectedCountry('')
    } else {
      setSelectedCountry(countryName)
    }
  }

  return (
    <div>
      {countryNames.map((countryName) => (
        <div key={countryName}>
          <button onClick={() => toggleCountry(countryName)}>
            {countryName}
          </button>
          {selectedCountry === countryName && (
            <>
              <Country cities={countries[countryName]} />
              <CityList
                cities={countries[countryName]}
                searchTerm={searchTerm}
              />
            </>
          )}
        </div>
      ))}
    </div>
  )
}

const Country = ({ cities }: { cities: ICityListProps['cities'] }) => {
  const countryData = cities.find((city) => city.geoType === '국가')
  if (!countryData) return <></>

  return (
    <div className="flex">
      <div>{countryData.nameKo}</div>
    </div>
  )
}

interface ICityListProps {
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

const CityList = ({ cities, searchTerm }: ICityListProps) => {
  const filteredCities = cities.filter((city) =>
    city.nameKo.includes(searchTerm),
  )

  const countryData = cities.find((city) => city.geoType === '국가')

  if (countryData && !filteredCities.includes(countryData)) {
    filteredCities.unshift(countryData)
  }

  return (
    <div>
      {filteredCities.map((city) => (
        <div className="flex" key={city.naverId}>
          <div>{city.nameKo}</div>
        </div>
      ))}
    </div>
  )
}

export default ContinentInput
