import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentPlace } from '../../slices/recommendSlice'

const Location = () => {
  const selectedPlace = useSelector(selectCurrentPlace)
  return (
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
  )
}

export default Location
