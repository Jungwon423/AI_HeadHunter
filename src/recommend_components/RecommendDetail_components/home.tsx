import { useSelector } from 'react-redux'
import { selectCurrentPlace } from '../../slices/travelInfoSlice'
import BasicInfo from './home_basic_info'
import TripAdviser from './home_tripadvisor'

const RecommendDetailHome = () => {
  const selectedPlace = useSelector(selectCurrentPlace)

  console.log(selectedPlace)

  return (
    <>
      <BasicInfo></BasicInfo>
      <TripAdviser></TripAdviser>
      <TripAdviser></TripAdviser>
      <TripAdviser></TripAdviser>
    </>
  )
}

export default RecommendDetailHome
