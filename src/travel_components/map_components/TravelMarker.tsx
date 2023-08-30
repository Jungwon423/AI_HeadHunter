import { Marker } from 'react-map-gl'
import { PlaceInfo } from '../../interfaces/placeInfo'
import NaverPin from '../../components/NaverPin'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store'
import {
  handleCurrentPlace,
  selectCurrentPlace,
} from '../../slices/travelInfoSlice'

interface TravelMarkerProps {
  place: PlaceInfo
}

const TravelMarker = (props: TravelMarkerProps) => {
  const selectedPlace = useSelector(selectCurrentPlace)

  const dispatch = useDispatch<AppDispatch>()

  return (
    <Marker
      style={{
        zIndex: selectedPlace?.name === props.place.name ? 100 : 0,
      }}
      latitude={props.place.coordinate![0]}
      longitude={props.place.coordinate![1]}
      onClick={(e) => {
        e.originalEvent.stopPropagation()
        dispatch(handleCurrentPlace(props.place))
        console.log('Marker Clicked')
        console.log(props.place)
      }}
    >
      <NaverPin name={props.place.name}></NaverPin>
    </Marker>
  )
}

export default TravelMarker
