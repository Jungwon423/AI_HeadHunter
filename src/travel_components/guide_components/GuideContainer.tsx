import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/legacy/image'
import {
  handleCurrentPlace,
  selectCity,
  selectCurrentDay,
  selectDuration,
  selectTravelSchedule,
} from '../../slices/travelInfoSlice'
import { PlaceInfo } from '../../interfaces/placeInfo'

const GuideContainer = () => {
  const currentDay: number = useSelector(selectCurrentDay)
  const TravelSchedule: PlaceInfo[][] = useSelector(selectTravelSchedule)
  const dispatch = useDispatch()
  return (
    <div className="flex flex-col justify-center">
      {TravelSchedule[currentDay - 1]?.map((placeInfo) => (
        <div key={placeInfo.name} className="px-3 justify-center">
          <button
            className="h-50 rounded-xl px-5 my-8 flex-col bg-gray-50 shadow-lg hover:shadow-2xl"
            onClick={() => dispatch(handleCurrentPlace(placeInfo))}
          >
            <div className="flex">
              <div className="w-42">
                <Image
                  src={placeInfo.image ?? '/default-image.jpg'}
                  alt={placeInfo.name!}
                  width={150}
                  height={200}
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="pl-3 w-40 flex-col">
                <h2 className="flex justify-center text-sm font-bold py-2 mt-2">
                  {placeInfo.name}
                </h2>
                <div className="h-40 overflow-y-scroll text-gray-700 text-sm text-start w-40 p-2">
                  {placeInfo.summary?.overview}
                </div>
              </div>
            </div>
          </button>
        </div>
      ))}
    </div>
  )
}

export default GuideContainer
