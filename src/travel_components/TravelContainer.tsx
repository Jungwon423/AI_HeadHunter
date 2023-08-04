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
import StarRating from './StarRating'
import GuideTab from './GuideTab'
import GoogleButton from './GoogleButton'
import { isOpenNow } from './timeUtils'
import Link from 'next/link'

const TravelContainer = () => {
  const operatingHours = [
    '월요일 오전 9:00 ~ 오후 5:00',
    '화요일 오전 9:00 ~ 오후 5:00',
    '수요일 오전 9:00 ~ 오후 5:00',
    '목요일 오전 9:00 ~ 오후 5:00',
    '금요일 오후 12:30 ~ 오후 10:00',
    '토요일 오전 11:30 ~ 오후 6:30',
    '일요일 오전 11:30 ~ 오후 8:30',
  ]
  const selectedPlace = useSelector(selectCurrentPlace)
  const dispatch = useDispatch()

  const [workingStatus, setWorkingStatus] = useState(isOpenNow(operatingHours))
  let statusText = workingStatus ? '영업 중' : '영업 종료'

  if (!selectedPlace || !selectedPlace?.coordinate) {
    return <div className="w-96 rounded-none hidden z-10"></div>
  }
  return (
    <div className="w-96 flex-col overflow-y-auto">
      <div
        className="relative top-0 right-0"
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
      </div>
      <div className="w-full">
        <Image
          src="https://media.tacdn.com/media/attractions-splice-spp-400x400/0b/27/58/3d.jpg"
          alt={selectedPlace?.name}
          width={384}
          height={280}
          objectFit="cover"
        />
      </div>
      <div className="w-full h-16 flex-col">
        <h2 className="flex text-start text-lg font-bold py-2 px-2">
          {selectedPlace?.name}
        </h2>
        <div className="flex px-2">
          <span className="mt-1 mx-1 mr-2">4.4</span>
          <StarRating rating={4.4} />
          <span className="mt-1 ml-1">(61850)</span>
        </div>
        <div className="flex text-gray-500  px-2">
          <div>
            {selectedPlace?.hashtags.map((tag, index) => (
              <span key={index}>#{tag} </span>
            ))}
          </div>
        </div>
        <div className="my-2 text-start w-full border-y-gray-200 border-x-white border-2">
          <div className="p-3 line-clamp-4">{selectedPlace?.description}</div>
        </div>
        <div className="my-2 text-start w-full border-y-gray-200 border-x-white border-2">
          <div className="p-3 line-clamp-4">{selectedPlace?.thought}</div>
        </div>
        <GoogleButton
          url={'https://maps.google.com/?cid=1081374622389182017'}
        ></GoogleButton>
        <GuideTab></GuideTab>
        <div className="flex px-2 mt-3 text-gray-700">
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
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          <div className="px-2">{selectedPlace?.location}</div>
        </div>
        <div className="flex-col items-center px-2 text-gray-700">
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
            <span className="flex text-base font-xl px-2 py-2">
              {statusText}
            </span>
          </div>
          {operatingHours.map((hourInterval, index) => (
            <div className="text-base py-1 pl-8" key={index}>
              {hourInterval.replace('~', '-')}
            </div>
          ))}
        </div>
        <div className="flex items-center px-2 text-gray-700">
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
              d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
            />
          </svg>
          <Link className="px-2" href={selectedPlace?.website}>
            {selectedPlace?.website}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TravelContainer
