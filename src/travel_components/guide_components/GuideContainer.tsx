import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/legacy/image'
import {
  handleCurrentPlace,
  selectCity,
  selectCurrentDay,
  selectDuration,
  selectTravelSchedule,
  setIsCurrentPlaceInCourse,
  setOpenRecommend,
  changeTravelScheduleOrder,
} from '../../slices/travelInfoSlice'
import { PlaceInfo } from '../../interfaces/placeInfo'
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd'

const GuideContainer = () => {
  const currentDay: number = useSelector(selectCurrentDay)
  const TravelSchedule: PlaceInfo[][] = useSelector(selectTravelSchedule)
  const dispatch = useDispatch()
  return (
    <Droppable droppableId="travelSchedule">
      {(provided, snapshot) => (
        <div
          className="flex flex-col justify-center"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {TravelSchedule[currentDay - 1]?.map((placeInfo, i) => (
            <Draggable
              index={i}
              draggableId={placeInfo.name!}
              key={placeInfo.name!}
            >
              {(provided, snapshot) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <div
                    key={placeInfo.name}
                    className="px-2 justify-center items-center flex-col"
                  >
                    <div
                      className="flex flex-row h-24 rounded-xl px-3 my-2 bg-gray-50 shadow-lg hover:shadow-2xl"
                      onClick={() => {
                        dispatch(handleCurrentPlace(placeInfo))
                        dispatch(setOpenRecommend(false))
                        dispatch(setIsCurrentPlaceInCourse(true))
                      }}
                    >
                      <div className="h-20 py-3">
                        <Image
                          src={placeInfo.image ?? '/default-image.jpg'}
                          alt={placeInfo.name!}
                          width={70}
                          height={70}
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>

                      <div className="pl-3 w-64 flex flex-col">
                        <h2 className="tracking-tighter leading-3 text-[13px] font-bold mt-3">
                          {placeInfo.name}
                        </h2>
                        <div className="flex flex-row pt-1">
                          <div className="text-xs font-bold">
                            {placeInfo.rating}
                          </div>
                          <i
                            key={placeInfo.rating}
                            className="pl-1 bi bi-star-fill text-yellow-400 text-xs"
                          ></i>
                          <span className="font-bold text-blue-300 text-[10px] pt-0.5 pl-2">
                            명소
                          </span>
                        </div>
                        {placeInfo.description != null ? (
                          <div className="pt-1 text-[11px] text-gray-600 line-clamp-2">
                            {placeInfo.description}
                          </div>
                        ) : (
                          <div className="pt-1 text-[11px] text-gray-600 text-xs">
                            오사카의 유명한 맛집입니다.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default GuideContainer
