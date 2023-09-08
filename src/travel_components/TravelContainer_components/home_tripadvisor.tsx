import { useSelector } from 'react-redux'
import { selectCurrentPlace } from '../../slices/travelInfoSlice'
import StarRating from '../../travel_components/StarRating'

const TripAdviser = () => {
  const selectedPlace = useSelector(selectCurrentPlace)
  return (
    <div className="flex flex-col  w-10/12   bg-white shadow-md rounded-xl   hover:shadow-indigo-500/40  shadow-slate-200 p-7 overflow-x-auto">
      <div className="flex text-xl font-black pb-8">TripAdvisor 정보</div>
      {selectedPlace?.rating ? (
        <div className="flex my-1">
          <span className="mt-1 mr-5 text-gray-500 font-bold">별점 </span>
          <span className="text-gray-700 mt-1 mr-2">
            {selectedPlace?.rating}
          </span>
          <StarRating rating={selectedPlace?.rating} />
          <span className="text-gray-700 mt-1 ml-1">
            ({selectedPlace?.ratingCount})
          </span>
        </div>
      ) : null}
      <div className="my-1">
        <span className="mt-1 mr-5 text-gray-500 font-bold">주소 </span>
        <span>
          {selectedPlace?.addressKo === null
            ? selectedPlace.addressEn
            : selectedPlace?.addressKo}
        </span>
      </div>
      <div className="my-1">
        <span className="mt-1 mr-5 text-gray-500 font-bold">운영시간 </span>
        <span></span>
        {selectedPlace?.recommendedVisitLength}{' '}
        {selectedPlace?.operationTime?.toString()}
      </div>
      <div className="my-1">
        <span className="mt-1 mr-5 text-gray-500 font-bold">가격 </span>
        <span>{selectedPlace?.itemPrice?.toString()}</span>
      </div>
      <div className="my-1">
        <span className="mt-1 mr-5 text-gray-500 font-bold">
          공식 홈페이지{' '}
        </span>
        <span> {selectedPlace?.homepage} </span>
      </div>
      <div>
        <span className="mt-1 mr-5 text-gray-500 font-bold">전화번호 </span>
        <span>{selectedPlace?.phoneNumber}</span>
      </div>
    </div>
  )
}

export default TripAdviser
