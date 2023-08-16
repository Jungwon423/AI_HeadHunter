import Image from 'next/legacy/image'
import { useSelector } from 'react-redux'
import { selectCurrentPlace } from '../slices/travelInfoSlice'
import StarRating from './StarRating'
import GuideTab from './ReviewTab'
import GoogleButton from './GoogleButton'
import { selectCurrentTabIndex } from '../slices/tabSlice'
import CloseButton from './container_components/CloseButton'
import ContainerTitle from './container_components/ContainerTitle'
import Recommend from './container_components/Recommend'
import Location from './container_components/Location'
import OperationHours from './container_components/OperationHours'
import Website from './container_components/Website'
import PhoneNumber from './container_components/PhoneNumber'

const TravelContainer = () => {
  const selectedPlace = useSelector(selectCurrentPlace)
  let currentReviewTab = useSelector(selectCurrentTabIndex)

  if (!selectedPlace || !selectedPlace?.coordinate) {
    return <div className="w-96 rounded-none hidden z-10"></div>
  }
  return (
    <div className="w-96 flex-col overflow-y-auto">
      <CloseButton />
      <div className="w-full">
        <Image
          src={selectedPlace?.image!}
          alt={selectedPlace?.name}
          width={384}
          height={280}
          style={{
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="w-full h-16 flex-col">
        <ContainerTitle></ContainerTitle>
        <div className="my-2 text-start w-full border-y-gray-200 border-x-white border-2">
          <div className="p-3">{selectedPlace?.description}</div>
        </div>
        <Recommend></Recommend>

        {selectedPlace?.googleUrl ? (
          <GoogleButton url={selectedPlace?.googleUrl}></GoogleButton>
        ) : null}
        <GuideTab></GuideTab>
        {currentReviewTab === 0 ? (
          <div>
            <Location></Location>
            <OperationHours></OperationHours>
            <Website></Website>
            <PhoneNumber></PhoneNumber>
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
