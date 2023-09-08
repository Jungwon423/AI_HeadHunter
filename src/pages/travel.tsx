import { use } from 'react'
import RecoContainer from '../travel_components/RecoContainer'
import TravelContainer from '../travel_components/TravelContainer'
import TravelMap from '../travel_components/TravelMap'
import Guide from '../travel_components/guide'
import {
  changeRecommendScheduleOrder,
  changeTravelScheduleOrder,
  moveRecommendToTravel,
  moveTravelToRecommend,
  selectOpenRecommend,
} from '../slices/travelInfoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import { AppDispatch } from '../store'

const TravelCoursePage = () => {
  const openRecommend = useSelector(selectOpenRecommend)

  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="flex h-screen">
      <DragDropContext
        onDragEnd={(result) => {
          console.log('onDragEnd')
          const prevId = result.source.droppableId
          const newId = result.destination?.droppableId
          const prevIndex = result.source.index
          const newIndex = result.destination?.index

          // console.log('prevId', prevId)
          // console.log('nextId', newId)
          // console.log('prevIndex', prevIndex)
          // console.log('nextIndex', newIndex)

          if (prevId === 'travelSchedule' && newId === 'travelSchedule') {
            dispatch(
              changeTravelScheduleOrder({
                prevIndex,
                newIndex,
              }),
            )
          } else if (
            prevId === 'recommendSchedule' &&
            newId === 'travelSchedule'
          ) {
            dispatch(moveRecommendToTravel({ prevIndex, newIndex }))
          } else if (
            prevId === 'travelSchedule' &&
            newId === 'recommendSchedule'
          ) {
            dispatch(moveTravelToRecommend({ prevIndex, newIndex }))
          } else if (
            prevId === 'recommendSchedule' &&
            newId === 'recommendSchedule'
          ) {
            dispatch(changeRecommendScheduleOrder({ prevIndex, newIndex }))
          }
        }}
        onDragStart={() => {
          console.log('onDragStart')
        }}
      >
        <Guide></Guide>
        <div className="flex flex-grow relative">
          <TravelMap></TravelMap>
          <div className="z-1 absolute ">
            {openRecommend && <RecoContainer></RecoContainer>}
          </div>

          <div className="z-1 absolute w-5/12 ">
            {!openRecommend && <TravelContainer></TravelContainer>}
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

export default TravelCoursePage
