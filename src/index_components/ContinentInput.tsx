import { useState } from 'react'
const data = require('/public/json/whole_Geo.json')
import Image from 'next/image'
import { setCity, setUser } from '../slices/travelInfoSlice'
import { useDispatch } from 'react-redux'
import useClickOutside from './useClickOutside'
import {
  ContinentData,
  ICityListProps,
  ICountryListProps,
  SearchResult,
} from '../interfaces/continentData'

export interface ContinentProps {
  openPopup: () => void
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

const getHighlightedText = (text: string, searchTerm: string) => {
  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'))
  return (
    <>
      {parts.map((part, i) => (
        <span
          key={`${part}-${i}`}
          className={
            part.toLowerCase() === searchTerm.toLowerCase()
              ? 'text-red-600'
              : ''
          }
        >
          {part}
        </span>
      ))}
    </>
  )
}

const sortResultsByIndex = (results: SearchResult[], searchTerm: string) => {
  return results.sort((a, b) => {
    const nameA = a.city ? a.city.nameKo : a.countryName
    const nameB = b.city ? b.city.nameKo : b.countryName
    const indexA = nameA.indexOf(searchTerm)
    const indexB = nameB.indexOf(searchTerm)

    if (indexA < indexB) return -1
    if (indexA > indexB) return 1
    return 0
  })
}

const ContinentInput = (props: ContinentProps) => {
  const dispatch = useDispatch()
  function getCityInfo(cityName: any) {
    dispatch(setCity(cityName))
    props.openPopup()
  }
  const [selectedContinent, setSelectedContinent] = useState('유럽')
  const [searchTerm, setSearchTerm] = useState('')
  const continents = Object.keys(data)
  const flatData = flattenData(data)

  const selectContinent = (continent: string) => {
    setSearchTerm('')
    setSelectedContinent(continent)
  }
  const [isFocused, setIsFocused] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const handleClickOutside = () => {
    // if (isFocused && !showContent) {
    //   setIsFocused(false)
    //   setShowContent(false)
    // }
    if (showContent) {
      setShowContent(false)
    }
  }

  const wrapperRef = useClickOutside<HTMLDivElement>(handleClickOutside)
  const handleFocus = () => {
    setIsFocused(true)
    setShowContent(true)
  }

  const clearInput = () => {
    setSearchTerm('')
  }

  const filterData = () => {
    if (searchTerm === '') return []
    const filteredData = flatData.filter(
      (data) =>
        data.city?.nameKo.includes(searchTerm) ||
        data.countryName.includes(searchTerm),
    )
    return sortResultsByIndex(filteredData, searchTerm)
  }

  const searchResults = filterData()
  const handleClickInside = (e: any) => {
    e.stopPropagation()
  }

  return (
    <div ref={wrapperRef} className="bg-white rounded-xl">
      <div
        className={`flex flex-row border-2 border-stone-300 rounded-md w-[360px] h-10 px-2 py-1  ${
          isFocused ? 'border-indigo-500' : ''
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="flex w-6 h-6 text-stone-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        <input
          type="text"
          placeholder="해외 국가,도시명 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onClick={handleClickInside}
          onBlur={() => setIsFocused(false)} // <-- onBlur 추가
          className="border-0 rounded-md w-[330px] px-2 py-1 focus:outline-none"
        />

        {searchTerm !== '' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 pt-1 text-stone-500"
            onClick={clearInput}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : null}
      </div>
      <div>
        {showContent && (
          <div className="">
            {searchTerm !== '' ? (
              <div className="p-1 mt-1 overflow-y-auto h-[350px] w-[355px] cursor-pointer">
                {searchResults.map((item, index) => {
                  const cityName = item.city ? item.city.nameKo : ''
                  const countryName = item.countryName
                  const key = cityName + '-' + countryName + '-' + index
                  return (
                    <div
                      className="flex p-2 border-b-2"
                      key={key}
                      onClick={() => {
                        getCityInfo(cityName)
                      }}
                    >
                      {cityName ? (
                        <>
                          <div className="text-xs font-bold">
                            {getHighlightedText(cityName, searchTerm)}
                          </div>
                          <div className="pl-2 pt-0.5 text-[10px] text-stone-500">
                            {getHighlightedText(countryName, searchTerm)}
                          </div>
                          <div className="flex-grow"></div>
                        </>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            ) : (
              <>
                <div className="flex h-[350px]">
                  <div className="w-[120px] overflow-y-auto">
                    {continents.map((continent, index) => (
                      <div className="border-t-2" key={continent + index}>
                        <button
                          className="h-12 text-stone-600 text-xs flex justify-start items-center py-3 px-5"
                          onClick={() => selectContinent(continent)}
                        >
                          {continent}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="overflow-y-auto">
                    {selectedContinent && (
                      <CountryList
                        countries={
                          data[selectedContinent as keyof ContinentData]
                        }
                        searchTerm={searchTerm}
                        openPopup={props.openPopup}
                      />
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const CountryList = ({
  countries,
  searchTerm,
  openPopup,
}: ICountryListProps) => {
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
    <div className="flex flex-col">
      {countryNames.map((countryName, idx) => (
        <div key={countryName + idx}>
          <div className="flex border-b-2 mx-6 w-[180px]">
            <button
              className="text-xs font-bold w-full flex justify-start items-center px-1 py-4"
              onClick={() => toggleCountry(countryName)}
            >
              {countryName}
            </button>
            <div
              onClick={() => toggleCountry(countryName)}
              className="cursor-pointer"
            >
              {selectedCountry === countryName ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="flex text-gray-700 mt-4 mr-2 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="flex text-gray-700 mt-4 mr-2 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="flex">
            {selectedCountry === countryName && (
              <>
                <CityList
                  key={idx}
                  cities={countries[countryName]}
                  searchTerm={searchTerm}
                  openPopup={openPopup}
                />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

const CityList = ({ cities, searchTerm, openPopup }: ICityListProps) => {
  const dispatch = useDispatch()
  function getCityInfo(cityName: any) {
    dispatch(setCity(cityName))
    openPopup()
  }
  const filteredCities = Array.from(
    new Map(cities.map((c) => [c.nameKo, c])).values(),
  )

  const toggledCategoryData = cities.find((city) => city.nameKo === searchTerm)

  if (
    toggledCategoryData &&
    !filteredCities.some((c) => c.nameKo === toggledCategoryData.nameKo)
  ) {
    filteredCities.unshift(toggledCategoryData)
  }
  return (
    <div className="w-full px-5 py-2 cursor-pointer">
      {filteredCities.map((city) => (
        <div
          className="flex p-3 h-10"
          key={`${city.naverId}`}
          onClick={() => {
            getCityInfo(city.nameKo)
          }}
        >
          <Image
            src={city.image.photoURL}
            alt={city.nameEn}
            width={17}
            height={17}
            className="rounded-full"
            style={{
              height: 'auto',
              maxWidth: '100%',
            }}
          ></Image>

          <div className="pl-2 text-[10px]">{city.nameKo}</div>
          <div className="flex-grow"></div>
          <div className="flex text-[10px] text-stone-500">도시</div>
        </div>
      ))}
    </div>
  )
}

export default ContinentInput
