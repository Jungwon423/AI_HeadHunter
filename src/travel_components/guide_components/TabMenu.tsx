import DraggableScrollbar from '../DraggableScrollbar'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCity,
  selectDuration,
  selectCoordinate,
  selectTravelSchedule,
  handleCurrentPlace,
  selectCurrentDay,
  setCurrentDay,
} from '../../slices/travelInfoSlice'

const TabMenu: React.FC<{
  tabs: string[]
}> = ({ tabs }) => {
  const dispatch = useDispatch()
  const currendDay: number = useSelector(selectCurrentDay)

  return (
    <div className="flex overflow-x-auto whitespace-nowrap no-scrollbar">
      <DraggableScrollbar>
        <div className="flex justify-center space-x-2 py-2">
          {tabs.map((tab, index) => {
            return (
              <button
                key={tab}
                onClick={() => dispatch(setCurrentDay(index))}
                className={`relative px-4 font-semibold cursor-pointer hover:text-black ${
                  currendDay === index ? 'text-gray-700' : 'text-gray-500'
                }`}
              >
                {tab}
                {currendDay === index && (
                  <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-[70%] h-0.5 bg-black"></span>
                )}
              </button>
            )
          })}
        </div>
      </DraggableScrollbar>
    </div>
  )
}

export default TabMenu
