import { SetStateAction, useState } from 'react'
import Image from 'next/image'
import ReactMapGL, { Marker } from 'react-map-gl'
import exp from 'constants'


const attractions = [
  {
    name: 'Statue of Liberty',
    image: '/assets/images/statue-of-liberty.jpg',
    latitude: 40.6892,
    longitude: -74.0445,
  },
  {
    name: 'Eiffel Tower',
    image: '/assets/images/eiffel-tower.webp',
    latitude: 48.8584,
    longitude: 2.2945,
  },
  {
    name: 'Sydney Opera House',
    image: '/assets/images/sydney-opera-house.jpg',
    latitude: -33.8568,
    longitude: 151.2153,
  },
]

const Map = () => {

    
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: attractions[0].latitude,
    longitude: attractions[0].longitude,
    zoom: 12,
  })

    return (
        <div className="flex-1 h-full">
        <ReactMapGL
          {...viewport}
          //onViewportChange={(nextViewport: typeof ViewportProps) => setViewport(nextViewport)}
          //mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          mapboxAccessToken="pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtqbDF2N3MwcHJ5M3FucjdqdzhpaWlnIn0.XMJC6lSrpUxqUutc61sK8g"
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {attractions.map((attraction) => (
            <Marker
              key={attraction.name}
              latitude={attraction.latitude}
              longitude={attraction.longitude}
            >
              <button className="bg-transparent border-none cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 14.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    )
    
}

export default Map