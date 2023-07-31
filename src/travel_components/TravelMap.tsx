import {selectCity, selectCoordinate, setCity } from '../slices/travelInfo'
import { useSelector, useDispatch } from 'react-redux'

import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl'
import { useState } from 'react'
import ChatScreen from './ChatScreen'
import { Attraction } from '../interfaces/attraction'

interface TravelMapProps {
  attractionInfo: Attraction | null ;
}

const TravelMap = (props: TravelMapProps) => {
  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'

  const [showChat, setShowChat] = useState(false)

  const handleChatClick = () => {
    setShowChat(true)
  }
  const coordinate = useSelector(selectCoordinate)
  console.log(props.attractionInfo)

  return (
    <div className="flex-grow">
      <div className="travel-map">
      <div className="container">
        {props.attractionInfo!=null ? (
          <>
          <button className="close-button">
          X
        </button>
            <h2>{props.attractionInfo.name}</h2>
            <p>{props.attractionInfo.description}</p>
          </>
        ) : (
          null
        )}
      </div>
    </div>
      <div className="absolute bottom-8 right-8 z-10">
        {!showChat && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 md:py-3 px-4 md:px-10 rounded-xl shadow"
            onClick={handleChatClick}
          >
            <div className="text-base sm:text-lg md:text-xl">
              Trippy AI에게 더 물어보기
            </div>
          </button>
        )}
      </div>
      <Map
        initialViewState={{
          longitude: coordinate[0],
          latitude: coordinate[1],
          zoom: 13,
        }}
        mapStyle="mapbox://styles/zigdeal/clkjl2a7y001401r27iv81iw2"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
      </Map>
      {showChat && <ChatScreen onClose={() => setShowChat(false)} />}
    </div>
  )
}

export default TravelMap
