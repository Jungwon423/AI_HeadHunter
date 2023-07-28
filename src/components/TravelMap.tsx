import Map from 'react-map-gl'
import GeocoderControl from './geocoder-coder'
import { useState } from 'react'
import ChatScreen from './ChatScreen'

const TravelMap = () => {
  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'

  const [showChat, setShowChat] = useState(false)

  const handleChatClick = () => {
    setShowChat(true)
  }

  return (
    <div className="flex-grow">
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
          longitude: -79.4512,
          latitude: 43.6568,
          zoom: 13,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" />
      </Map>

      {showChat && <ChatScreen onClose={() => setShowChat(false)} />}
    </div>
  )
}

export default TravelMap
