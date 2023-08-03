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

  if (!selectedPlace || !selectedPlace?.coordinate) {
    return <div className="w-96 rounded-xl px-5 my-8 hidden z-10"></div>
  }
  return (
    <div className="w-96 rounded-xl px-5 my-8 flex-col shadow-lg hover:shadow-2xl">
      <button
        className="relative top-0 right-0 p-2"
        onClick={() => dispatch(handleCurrentPlace(selectedPlace!))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x"
        >
          <path d="M18 6L6 18"></path>
          <path d="M6 6l12 12"></path>
        </svg>
      </button>
      <div className="w-full">
        <Image
          src="https://media.tacdn.com/media/attractions-splice-spp-400x400/0b/27/58/3d.jpg"
          alt={selectedPlace?.name}
          width={350}
          height={200}
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="pl-4 w-full h-16 flex-col">
        <h2 className="flex text-start text-lg font-bold mt-2 p-2">
          {selectedPlace?.name}
        </h2>
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
        <div className="text-start w-full">
          <div className="line-clamp-4">{selectedPlace?.description}</div>
        </div>
        <div>-----------------------------</div>
        <div>운영 시간은 10시부터 10시까지에요 </div>
        <div>그는 없기로 유명해요 </div>
        <div className="text-gray-900 bg-gray h-56">hi</div>
      </div>
    </div>
  )
}

export default TravelContainer
