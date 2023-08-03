import {
  placeInfo,
  selectCoordinate,
  selectTravelSchedule,
  handleCurrentPlace,
  selectCurrentPlace,
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
} from 'react-map-gl'
import { use, useState } from 'react'
import ChatScreen from './ChatScreen'
import Pin from './Pin'
import TravelChat from './TravelChat'

const TravelMap = () => {
  const showChat = useSelector(selectShowChat)

  const dispatch = useDispatch()

  const selectedPlace = useSelector(selectCurrentPlace)

  const placeList: placeInfo[] = useSelector(selectTravelSchedule)?.get(2) || []

  console.log(useSelector(selectTravelSchedule).get(2))

  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'

  const coordinate = useSelector(selectCoordinate)

  return (
    <div className="flex-grow">
      <TravelChat></TravelChat>
      <Map
        initialViewState={{
          longitude: coordinate[0],
          latitude: coordinate[1],
          zoom: 12,
        }}
        mapStyle="mapbox://styles/zigdeal/clkjl2a7y001401r27iv81iw2"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {placeList.map((place, i) => (
          <Marker
            key={i}
            latitude={place.coordinate[0]}
            longitude={place.coordinate[1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation()
              dispatch(handleCurrentPlace(place))
              console.log('Marker Clicked')
              console.log(place)
            }}
          >
            <Pin></Pin>
          </Marker>
        ))}
        {selectedPlace && (
          <Popup
            anchor="top"
            latitude={selectedPlace.coordinate[0]}
            longitude={selectedPlace.coordinate[1]}
            onClose={() => {
              dispatch(handleCurrentPlace(selectedPlace))
            }}
          >
            <div>{selectedPlace.name}</div>
          </Popup>
        )}
      </Map>
      {showChat && <ChatScreen onClose={() => dispatch(setShowChat(false))} />}
    </div>
  )
}

export default TravelMap
