// import { useState } from 'react'
// const data = require('/public/json/whole_Geo.json')

// interface ContinentData {
//   [continent: string]: {
//     [country: string]: {
//       naverId: string
//       nameKo: string
//       nameEn: string
//       geoType: string
//       geoViewType: string
//       showAsRoot: boolean
//       image: {
//         photoURL: string
//       }
//       continentType?: string
//       countryType?: string
//     }[]
//   }
// }

// const flattenData = (data: ContinentData) => {
//   const dataArray = []
//   for (const continent of Object.keys(data)) {
//     for (const countryName in data[continent]) {
//       for (const city of data[continent][countryName]) {
//         dataArray.push({
//           continent,
//           countryName,
//           city,
//         })
//       }
//     }
//   }
//   return dataArray
// }

// const ContinentList = () => {
//   const [selectedContinent, setSelectedContinent] = useState('')
//   const [searchTerm, setSearchTerm] = useState('')
//   const continents = Object.keys(data)
//   const flatData = flattenData(data)

//   const selectContinent = (continent: string) => {
//     setSearchTerm('')
//     setSelectedContinent(continent)
//   }

//   const filterData = () => {
//     if (searchTerm === '') return []
//     return flatData.filter((data) => data.city.nameKo.includes(searchTerm))
//   }

//   const searchResults = filterData()

//   return (
//     <>
//       <input
//         type="text"
//         placeholder="검색..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       {searchTerm !== '' ? (
//         <div>
//           {searchResults.map(({ continent, countryName, city }) => (
//             <div key={city.naverId}>
//               {continent} - {countryName} - {city.nameKo}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <>
//           <div style={{ display: 'flex' }}>
//             <div>
//               {continents.map((continent) => (
//                 <div key={continent}>
//                   <button onClick={() => selectContinent(continent)}>
//                     {continent}
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div>
//               {selectedContinent && (
//                 <CountryList
//                   countries={data[selectedContinent as keyof ContinentData]}
//                   searchTerm={searchTerm}
//                 />
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   )
// }

// interface ICountryListProps {
//   countries: {
//     [country: string]: {
//       naverId: string
//       nameKo: string
//       nameEn: string
//       geoType: string
//       geoViewType: string
//       showAsRoot: boolean
//       image: {
//         photoURL: string
//       }
//       continentType?: string
//       countryType?: string
//     }[]
//   }
//   searchTerm: string
// }

// const CountryList = ({ countries, searchTerm }: ICountryListProps) => {
//   const [selectedCountry, setSelectedCountry] = useState('')
//   const countryNames = Object.keys(countries)

//   const toggleCountry = (countryName: string) => {
//     if (selectedCountry === countryName) {
//       setSelectedCountry('')
//     } else {
//       setSelectedCountry(countryName)
//     }
//   }

//   return (
//     <div>
//       {countryNames.map((countryName) => (
//         <div key={countryName}>
//           <button onClick={() => toggleCountry(countryName)}>
//             {countryName}
//           </button>
//           {selectedCountry === countryName && (
//             <CityList cities={countries[countryName]} searchTerm={searchTerm} />
//           )}
//         </div>
//       ))}
//     </div>
//   )
// }

// interface ICityListProps {
//   cities: {
//     naverId: string
//     nameKo: string
//     nameEn: string
//     geoType: string
//     geoViewType: string
//     showAsRoot: boolean
//     image: {
//       photoURL: string
//     }
//     continentType?: string
//     countryType?: string
//   }[]
//   searchTerm: string
// }

// const CityList = ({ cities, searchTerm }: ICityListProps) => {
//   const filteredCities = cities.filter((city) =>
//     city.nameKo.includes(searchTerm),
//   )
//   return (
//     <div>
//       {filteredCities.map((city) => (
//         <div key={city.naverId}>{city.nameKo}</div>
//       ))}
//     </div>
//   )
// }

// export default ContinentList
