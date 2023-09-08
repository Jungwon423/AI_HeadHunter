import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentDay,
  selectTravelOverview,
  toggleOpenRecommend,
} from '../../slices/travelInfoSlice'
import { AppDispatch } from '../../store'

const GuideDay = () => {
  const currentDay: number = useSelector(selectCurrentDay)

  const overview = useSelector(selectTravelOverview)

  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-white divide-y-2 flex flex-col">
      <div className="flex items-center justify-between h-12">
        <div className="ml-2 font-bold text-lg font-mono">Day {currentDay}</div>
        <div className="flex justify-center">
          <button
            className="px-2 py-2 rounded-md bg-indigo-400 flex flex-row items-center justify-center"
            onClick={() => {
              dispatch(toggleOpenRecommend())
            }}
          >
            <div className="text-white text-sm ">여행 편집하러가기</div>
          </button>
        </div>
      </div>
      <div>{overview[currentDay - 1]}</div>
    </div>
  )
}

export default GuideDay
