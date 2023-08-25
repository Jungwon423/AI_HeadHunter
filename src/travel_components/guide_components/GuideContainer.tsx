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
} from '../../slices/travelInfoSlice'
import { PlaceInfo } from '../../interfaces/placeInfo'
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd'

const GuideContainer = () => {
  const currentDay: number = useSelector(selectCurrentDay)
  const TravelSchedule: PlaceInfo[][] = useSelector(selectTravelSchedule)
  const dispatch = useDispatch()
  return (
    <DragDropContext
      onDragEnd={() => {
        console.log('onDragEnd')
      }}
      onDragStart={() => {
        console.log('onDragStart')
      }}
    >
      <Droppable droppableId="droppable">
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
                      className="px-3 justify-center items-center flex-col"
                    >
                      <div
                        className="h-50 rounded-xl px-5 my-2 flex-col bg-gray-50 shadow-lg hover:shadow-2xl"
                        onClick={() => {
                          dispatch(handleCurrentPlace(placeInfo))
                          dispatch(setOpenRecommend(false))
                          dispatch(setIsCurrentPlaceInCourse(true))
                        }}
                      >
                        <div className="flex">
                          <div className="w-42 flex flex-col justify-center">
                            <Image
                              src={placeInfo.image ?? '/default-image.jpg'}
                              alt={placeInfo.name!}
                              width={150}
                              height={180}
                              objectFit="cover"
                              className="rounded-lg"
                            />
                          </div>
                          <div className="pl-3 w-40 flex flex-col justify-center">
                            <h2 className="flex justify-center text-sm font-bold py-2 mt-2">
                              {placeInfo.name}
                            </h2>
                            <div className="h-40 overflow-y-scroll text-gray-700 text-sm text-start w-40 p-2">
                              {placeInfo.description}
                            </div>
                          </div>
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
    </DragDropContext>
  )
}

export default GuideContainer
