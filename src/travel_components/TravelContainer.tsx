import { useEffect, useState } from 'react'
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
import GuideTab from './ReviewTab'
import GoogleButton from './GoogleButton'
import { isOpenNow } from './timeUtils'
import Link from 'next/link'
import { selectCurrentTabIndex } from '../slices/tabSlice'

const TravelContainer = () => {
  const selectedPlace = useSelector(selectCurrentPlace)
  let currentReviewTab = useSelector(selectCurrentTabIndex)
  const dispatch = useDispatch()

  const [isThoughtVisible, setIsThoughtVisible] = useState(false)
  const [ifHoursVisible, setIfHoursVisible] = useState(false)

  const toggleThought = () => {
    setIsThoughtVisible(!isThoughtVisible)
  }
  const toggleHours = () => {
    setIfHoursVisible(!ifHoursVisible)
  }

  const [operationHours, setOperationHours] = useState<string[] | undefined>([])
  const [workingStatus, setWorkingStatus] = useState<boolean>(false)
  useEffect(() => {
    const newOperationHours = selectedPlace?.openingHours?.weekday_text
    setOperationHours(newOperationHours)
    setWorkingStatus(isOpenNow(newOperationHours))
  }, [selectedPlace])

  if (!selectedPlace || !selectedPlace?.coordinate) {
    return <div className="w-96 rounded-none hidden z-10"></div>
  }
  return (
    <div className="w-96 flex-col overflow-y-auto">
      <div
        className="w-full relative"
        onClick={() => dispatch(handleCurrentPlace(selectedPlace!))}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute top-0 right-0 m-2 z-10 hover:opacity-50"
        >
          <path d="M18 6L6 18"></path>
          <path d="M6 6l12 12"></path>
        </svg>
      </div>
      <div className="w-full">
        <Image
          src={selectedPlace?.image}
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
        {selectedPlace?.rating ? (
          <div className="flex px-2">
            <span className="mt-1 mx-1 mr-2">{selectedPlace?.rating}</span>
            <StarRating rating={selectedPlace?.rating} />
            <span className="mt-1 ml-1">({selectedPlace?.ratingCount})</span>
          </div>
        ) : null}
        <div className="flex text-gray-500  px-2">
          <div>
            {selectedPlace?.hashtags.map((tag, index) => (
              <span key={index}>#{tag} </span>
            ))}
          </div>
        </div>
        <div className="my-2 text-start w-full border-y-gray-200 border-x-white border-2">
          <div className="p-3">{selectedPlace?.description}</div>
        </div>
        <div className="my-2 text-start w-full">
          <div className="flex items-center px-3">
            <span>Trippy가 이 여행지를 추천하는 이유 </span>
            <button onClick={toggleThought}>
              {isThoughtVisible ? (
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              ) : (
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
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              )}
            </button>
          </div>
          {isThoughtVisible && (
            <div className="p-3">{selectedPlace?.thought}</div>
          )}
        </div>

        {selectedPlace?.googleUrl ? (
          <GoogleButton url={selectedPlace?.googleUrl}></GoogleButton>
        ) : null}
        <GuideTab></GuideTab>
        {currentReviewTab === 0 ? (
          <div>
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
            {operationHours ? (
              <div className="mt-3 flex-col items-center px-2 text-gray-700">
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
                  {workingStatus ? (
                    <span className="text-indigo-500 flex text-base font-xl px-2 py-2">
                      영업 중
                    </span>
                  ) : (
                    <span className="text-red-500 flex text-base font-xl px-2 py-2">
                      영업 종료
                    </span>
                  )}
                  <button onClick={toggleHours}>
                    {ifHoursVisible ? (
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
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    ) : (
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
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {ifHoursVisible &&
                  selectedPlace?.openingHours?.weekday_text.map(
                    (hourInterval, index) => (
                      <div className="text-sm py-1 pl-8" key={index}>
                        {hourInterval.replace('~', '-')}
                      </div>
                    ),
                  )}
              </div>
            ) : null}
            {selectedPlace?.website ? (
              <div className="mt-3 flex items-center px-2 text-gray-700">
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
                <Link className="px-2" href={selectedPlace.website}>
                  {selectedPlace.website}
                </Link>
              </div>
            ) : null}
            {selectedPlace?.phoneNumber ? (
              <div className="mt-3 flex items-center px-2 text-gray-700">
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
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <div className="px-2 text-gray-700">
                  {selectedPlace?.phoneNumber}
                </div>
              </div>
            ) : null}
            <div className="mt-3 flex items-center px-2 text-gray-700">
              <Image src="/assets/wheelchair.png" width={24} height={24} />
              <div className="px-2 text-gray-700">
                {selectedPlace?.wheelchair
                  ? '전용 휠체어 입구가 있습니다.'
                  : '휠체어 이용이 어려울 수 있습니다.'}
              </div>
            </div>
          </div>
        ) : selectedPlace?.reviews && selectedPlace.reviews.length > 0 ? (
          selectedPlace?.reviews?.map((review, index) => (
            <div key={index}>
              <span className="flex items-center p-3">
                <img
                  src={review.profile_photo_url}
                  alt={`Profile of ${review.author_name}`}
                  width={24}
                  height={24}
                />
                <span className="mx-3">{review.author_name}</span>
                <StarRating rating={review.rating} />
              </span>
              <div className="px-3 mb-4 text-gray-700 text-xs">
                {review.text}
              </div>
              <div className="border-t border-gray-400 w-full"> </div>
            </div>
          ))
        ) : (
          <div className="p-3">리뷰가 없습니다.</div>
        )}
      </div>
    </div>
  )
}

export default TravelContainer
