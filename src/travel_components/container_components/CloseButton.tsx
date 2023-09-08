import { useSelector, useDispatch } from 'react-redux'
import {
  handleCurrentPlace,
  selectCurrentPlace,
} from '../../slices/travelInfoSlice'

const CloseButton = () => {
  const dispatch = useDispatch()

  return (
    <div
      className="w-full relative"
      onClick={() => dispatch(handleCurrentPlace(null))}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute top-0 right-0 m-2 z-10 hover:opacity-50"
      >
        <path d="M18 6L6 18"></path>
        <path d="M6 6l12 12"></path>
      </svg>
    </div>
  )
}

export default CloseButton
