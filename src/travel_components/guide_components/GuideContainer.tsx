import DraggableScrollbar from '../DraggableScrollbar'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import {
  handleCurrentPlace,
  placeInfo,
  selectCity,
  selectCurrentDay,
  selectDuration,
  selectTravelSchedule,
} from '../../slices/travelInfoSlice'

const TravelSchedule: placeInfo[][] = useSelector(selectTravelSchedule)
const currentDay: number = useSelector(selectCurrentDay)
const dispatch = useDispatch()

const GuideContainer = () => {
  return (
    <div>
      {TravelSchedule[currentDay - 1]?.map((placeInfo) => (
        <div key={placeInfo.name} className="px-3 justify-center">
          <button
            className="h-50 rounded-xl px-5 my-8 flex-col bg-gray-50 shadow-lg hover:shadow-2xl"
            onClick={() => dispatch(handleCurrentPlace(placeInfo))}
          >
            <div className="flex">
              <div className="w-42">
                <Image
                  src={placeInfo.image}
                  alt={placeInfo.name}
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
