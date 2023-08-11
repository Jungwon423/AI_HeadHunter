import {
  selectCoordinate,
  selectTravelSchedule,
  handleCurrentPlace,
  selectCurrentPlace,
  selectCurrentDay,
} from '../slices/travelInfoSlice'
import { useSelector } from 'react-redux'
import { selectShowChat, setShowChat } from '../slices/travelChatSlice'
import { useDispatch } from 'react-redux'

import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Source,
  Layer,
} from 'react-map-gl'
import ChatScreen from './ChatScreen'
import Pin from './Pin'
import TravelChat from './TravelChat'
import GeocoderControl from './GeocoderControl'
import { PlaceInfo } from '../interfaces/placeInfo'

const TravelMap = () => {
  const pinColors = [
    '#FF5A5F',
    '#00A699',
    '#FFB400',
    '#007A87',
    '#FEBB31',
    '#6B5B95',
    '#F37735',
    '#CCD6DD',
    '#D84A4A',
    '#DBD5B5',
    '#7DCFB6',
    '#1287A5',
    '#F3C969',
    '#A5AAD9',
    '#E6B89C',
    '#EFEFEF',
    '#CF6766',
    '#4F84C4',
    '#A5AA52',
    '#D4CFC9',
  ]

  const showChat = useSelector(selectShowChat)

  const dispatch = useDispatch()

  const selectedPlace = useSelector(selectCurrentPlace)
  const currentDay: number = useSelector(selectCurrentDay)
  console.log('currentDay: ' + currentDay)

  const travelSchedule: PlaceInfo[][] = useSelector(selectTravelSchedule) || []

  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'

  const coordinate = useSelector(selectCoordinate)
  console.log('coordinate' + coordinate)

  return (
    <div className="flex-grow">
      <TravelChat></TravelChat>
      <Map
        initialViewState={{
          longitude: coordinate[0], //130 어쩌구
          latitude: coordinate[1],
          zoom: 11.7,
        }}
        mapStyle="mapbox://styles/zigdeal/clkjl2a7y001401r27iv81iw2"
        mapboxAccessToken={TOKEN}
      ></Map>

      {showChat && <ChatScreen onClose={() => dispatch(setShowChat(false))} />}
    </div>
  )
}

export default TravelMap
