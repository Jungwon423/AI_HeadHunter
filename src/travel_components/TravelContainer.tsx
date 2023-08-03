import { useState } from 'react'
import Image from 'next/legacy/image'
import { useSelector, useDispatch } from 'react-redux'
import {
  placeInfo,
  selectCoordinate,
  selectTravelSchedule,
  handleCurrentPlace,
  selectCurrentPlace,
} from '../slices/travelInfoSlice'

const TravelContainer = () => {
  const selectedPlace = useSelector(selectCurrentPlace)
  const dispatch = useDispatch()

  return (
      <div
        className="h-56 rounded-xl px-5 my-8 flex-col bg-indigo shadow-lg hover:shadow-2xl cursor-pointer z-50"
      >
        <h2 className="flex text-start text-lg font-bold mt-2 p-2">
            {selectedPlace?.name}
        </h2>
        <div className="flex p-2">
          <div className="w-40">
            <Image
              src="https://media.tacdn.com/media/attractions-splice-spp-400x400/0b/27/58/3d.jpg"
              alt={selectedPlace?.name}
              width={150}
              height={150}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="pl-4 w-52 h-16 flex-col">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-gray-900 text-base py-2">
                10:00 AM - 11:00 AM
              </span>
            </div>
            <div className="text-start w-full overflow-hidden">
              <div className="line-clamp-4">{selectedPlace?.description}</div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default TravelContainer
