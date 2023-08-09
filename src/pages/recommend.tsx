import { useSelector } from 'react-redux'
import { placeInfo, selectTravelSchedule } from '../slices/travelInfoSlice'

// TODO : 페이지 수정

const RecommendPage = () => {
  const TravelSchedule: placeInfo[][] = useSelector(selectTravelSchedule)

  return TravelSchedule.map((day: placeInfo[]) => {
    return day.map((place: placeInfo) => {
      return (
        <div className="flex flex-col md:flex-row" key={place.name}>
          <img
            src={place.image}
            alt={place.name}
            className="w-full md:w-1/2 mb-4 md:mb-0"
          />
          <div className="flex flex-col md:w-1/2 md:pl-4">
            <h2 className="text-2xl font-bold mb-2">{place.name}</h2>
            <p className="text-gray-600 text-lg mb-2">
              {place.summary?.overview}
            </p>
            <ul className="list-disc pl-4 mb-2">
              <li className="text-gray-600 text-lg">{`Estimated time: ${place.time} hours`}</li>
              <li className="text-gray-600 text-lg">{`Rating: ${place.rating}`}</li>
            </ul>
            <p className="text-gray-600 text-lg">{place.thought}</p>
          </div>
        </div>
      )
    })
  })
  // return (
  //   <div className="flex h-screen">
  //     <Guide></Guide>
  //     <TravelContainer></TravelContainer>
  //     <TravelMap></TravelMap>
  //   </div>
  // )
}

export default RecommendPage
