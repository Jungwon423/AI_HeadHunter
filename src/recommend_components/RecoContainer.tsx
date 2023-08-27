import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { selectAttractions, setCurrentDay } from '../slices/recommendSlice'
import { PlaceInfo } from '../interfaces/placeInfo'
import {
  selectCity,
  handleCurrentPlace,
  setIsCurrentPlaceInCourse,
  setOpenRecommend,
  selectRecommendSchedule,
  selectCurrentDay,
} from '../slices/travelInfoSlice'
import Image from 'next/legacy/image'
import { set } from 'date-fns'
import { selectEndDate, selectStartDate } from '../slices/timeSlice'

const RecoContainer = () => {
  const dispatch = useDispatch<AppDispatch>()

  // const attractions: PlaceInfo[][] = useSelector(selectAttractions)
  const attractions: PlaceInfo[][] = useSelector(selectRecommendSchedule)
  console.log(attractions)

  const currentDay: number = useSelector(selectCurrentDay)

  const city: string = useSelector(selectCity)
  const travelStartDate = useSelector(selectStartDate)
  const travelEndDate = useSelector(selectEndDate)

  return (
    <div className="p-2">
      <div className="flex pt-7 pb-1">
        <div className="pl-4 font-bold text-xl">{city}</div>
        <span className="pt-2 text-gray-500 text-sm font-bold px-2">
          {travelStartDate} ~ {travelEndDate}
        </span>
      </div>
      {attractions.map(
        (day: PlaceInfo[], i) =>
          (currentDay == 0 || currentDay == i + 1) &&
          day.map((place: PlaceInfo) => {
            return (
              <div
                className="flex flex-row p-3 bg-white shadow-md rounded-xl px-5 my-5 cursor-pointer hover:shadow-indigo-500/40 shadow-slate-200"
                key={place.name}
                onClick={() => {
                  dispatch(handleCurrentPlace(place))
                  dispatch(setOpenRecommend(false))
                  dispatch(setIsCurrentPlaceInCourse(false))
                  dispatch(setCurrentDay(attractions.indexOf(day) + 1))
                }}
              >
                <div className="w-42 flex flex-col justify-center">
                  <Image
                    referrerPolicy="no-referrer"
                    src={place.image!}
                    alt={place.name!}
                    width={150}
                    height={180}
                    className="rounded-xl w-1/2"
                  />
                </div>
                <div className="px-3 flex flex-col w-40">
                  <div className="text-base font-bold">{place.name}</div>
                  <div className="flex flex-row pl-1s pt-1">
                    <div className="text-sm font-bold">{place.rating}</div>
                    <i
                      key={place.rating}
                      className="pl-1 bi bi-star-fill text-yellow-400 text-sm"
                    ></i>
                    <span className="font-bold text-blue-300 text-xs pt-0.5 pl-2">
                      명소
                    </span>
                  </div>

                  {/* <div className="pt-1 text-xs text-gray-500">
                    <span className="line-clamp-2 ">{place.location}</span>
                  </div> */}
                  <div className="py-3 text-gray-700 text-sm">
                    {place.description}
                  </div>
                </div>
              </div>
            )
          }),
      )}
    </div>
  )
}

export default RecoContainer
