import { SetStateAction, useState } from 'react'
import Image from 'next/image'
import ReactMapGL, { Marker } from 'react-map-gl'
import Map from '../components/map'

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

const Guide = () => {
    return <div className="flex-1 flex flex-wrap justify-center items-center bg-gray-100">
        {attractions.map((attraction) => (
          <div key={attraction.name} className="w-1/2 p-4">
            <Image
              src={attraction.image}
              alt={attraction.name}
              width={500}
              height={500}
              objectFit="cover"
              className="rounded-lg"
            />
            <h2 className="text-lg font-bold mt-2">{attraction.name}</h2>
          </div>
        ))}
      </div>
}

export default Guide