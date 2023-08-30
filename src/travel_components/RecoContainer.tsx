import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { selectAttractions } from '../slices/recommendSlice'
import { PlaceInfo } from '../interfaces/placeInfo'
import {
  selectCity,
  handleCurrentPlace,
  setIsCurrentPlaceInCourse,
  setOpenRecommend,
  selectRecommendSchedule,
  selectCurrentDay,
  setCurrentDay,
} from '../slices/travelInfoSlice'
import Image from 'next/legacy/image'
import {
  dateToString,
  selectEndDate,
  selectStartDate,
} from '../slices/timeSlice'
import { Draggable, Droppable } from 'react-beautiful-dnd'

const RecoContainer = () => {
  const dispatch = useDispatch<AppDispatch>()

  // const attractions: PlaceInfo[][] = useSelector(selectAttractions)
  const attractions: PlaceInfo[][] = useSelector(selectRecommendSchedule)
  console.log(attractions)

  const currentDay: number = useSelector(selectCurrentDay)

  const city: string = useSelector(selectCity)
  const StartDate = useSelector(selectStartDate)
  const travelStartDate = dateToString(new Date(StartDate))
  const EndDate = useSelector(selectEndDate)
  const travelEndDate = dateToString(new Date(EndDate))

  return (
    <div className="bg-[#FAFAFA] h-screen overflow-y-auto">
      <Droppable droppableId="recommendSchedule">
        {(provided, snapshot) => (
          <div
            className="p-2"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div className="flex pt-7 pb-1">
              <div className="pl-4 font-bold text-xl">{city}</div>
              <span className="pt-2 text-gray-500 text-sm font-bold px-2">
                {travelStartDate} ~ {travelEndDate}
              </span>
            </div>
            {attractions.map(
              (day: PlaceInfo[], i) =>
                (currentDay == 0 || currentDay == i + 1) &&
                day.map((place: PlaceInfo, index: number) => {
                  return (
                    <Draggable
                      index={index}
                      draggableId={place.name!}
                      key={place.name}
                    >
                      {(provided, snapshot) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <div
                            className="flex h-24 flex-row my-4 p-3 bg-white shadow-md rounded-xl cursor-pointer hover:shadow-indigo-500/40 shadow-slate-200"
                            key={place.name}
                            onClick={() => {
                              dispatch(handleCurrentPlace(place))
                              dispatch(setOpenRecommend(false))
                              dispatch(setIsCurrentPlaceInCourse(false))
                              dispatch(
                                setCurrentDay(attractions.indexOf(day) + 1),
                              )
                            }}
                          >
                            <div className="justify-center">
                              <Image
                                referrerPolicy="no-referrer"
                                src={place.image!}
                                alt={place.name!}
                                width={70}
                                height={70}
                                className="rounded-xl"
                              />
                            </div>
                            <div className="px-3 flex flex-col w-[270px]">
                              <div className="tracking-tighter leading-3 text-[13px] font-bold">
                                {place.name}
                              </div>
                              <div className="flex flex-row pt-1">
                                <div className="text-xs font-bold">
                                  {place.rating}
                                </div>
                                <i
                                  key={place.rating}
                                  className="pl-1 bi bi-star-fill text-yellow-400 text-xs"
                                ></i>
                                <span className="font-bold text-blue-300 text-[10px] pt-0.5 pl-2">
                                  명소
                                </span>
                              </div>
                              <div className="pt-1 text-[11px] text-gray-600 line-clamp-2">
                                {place.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  )
                }),
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default RecoContainer
