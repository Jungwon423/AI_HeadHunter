import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import {
  handleCurrentPlace,
  selectAttractions,
  setCurrentDay,
} from '../slices/recommendSlice'
import { PlaceInfo } from '../interfaces/placeInfo'

const RecoContainer = () => {
  const dispatch = useDispatch<AppDispatch>()

  const attractions: PlaceInfo[][] = useSelector(selectAttractions)

  return (
    <div className="w-full bg-[#FAFAFA] h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex pt-7 pb-1">
          <div className="pl-4 font-bold text-xl">오사카</div>
          <span className="pt-2 text-gray-500 text-sm font-bold px-2">
            2023.08.10(화) ~ 2023.08.20(목)
          </span>
        </div>
        {attractions.map((day: PlaceInfo[]) => {
          return day.map((place: PlaceInfo) => {
            return (
              <div
                className="flex flex-row p-3 bg-white shadow-md rounded-xl px-5 my-5 cursor-pointer hover:shadow-indigo-500/40 shadow-slate-200"
                key={place.name}
                onClick={() => {
                  dispatch(handleCurrentPlace(place))
                  dispatch(setCurrentDay(attractions.indexOf(day) + 1))
                }}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  width={170}
                  height={170}
                  className="rounded-xl"
                />
                <div className="px-3 flex flex-col">
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

                  <div className="pt-1 text-xs text-gray-500">
                    <span className="line-clamp-2 ">{place.location}</span>
                  </div>
                  <div className="py-3 text-gray-700 text-sm">
                    {place.summary?.overview}
                  </div>
                </div>

                {/* {place.thought} */}
              </div>
            )
          })
        })}
      </div>
    </div>
  )
}

export default RecoContainer
