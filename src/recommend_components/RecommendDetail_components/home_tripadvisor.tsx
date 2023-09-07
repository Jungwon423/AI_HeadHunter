import { useSelector } from 'react-redux'
import { selectCurrentPlace } from '../../slices/travelInfoSlice'

const TripAdviser = () => {
  const selectedPlace = useSelector(selectCurrentPlace)
  return (
    <div className="flex flex-col w-4/5  bg-white shadow-md rounded-xl   hover:shadow-indigo-500/40 shadow-slate-200 my-10 overflow-hidden">
      <div>트립어드바이저 정보</div>
      <div>
        평점 {selectedPlace?.rating} {selectedPlace?.ratingCount}
      </div>
      <div>
        주소{' '}
        {selectedPlace?.addressKo === null
          ? selectedPlace.addressEn
          : selectedPlace?.addressKo}
      </div>
      <div>
        운영시간 {selectedPlace?.recommendedVisitLength}{' '}
        {selectedPlace?.operationTime?.toString()}
      </div>
      <div> 가격 {selectedPlace?.itemPrice?.toString()}</div>
      <div>공식 홈페이지 {selectedPlace?.homepage}</div>
      <div>전화번호 {selectedPlace?.phoneNumber}</div>
    </div>
  )
}

export default TripAdviser
