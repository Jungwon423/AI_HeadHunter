import { useState } from 'react'
import TravelMap from '../travel_components/TravelMap'
import Guide from '../travel_components/guide'
import { Attraction } from '../interfaces/attraction'

const TravelCoursePage = () => {
  const attractions = [
    {
      name: '자유의 여신상',
      image: '/assets/images/statue-of-liberty.jpg',
      latitude: 40.6892,
      longitude: -74.0445,
      time: 15,
      description: '자유의 여신상은 유명해요',
    },
    {
      name: 'Eiffel Tower',
      image: '/assets/images/eiffel-tower.webp',
      latitude: 48.8584,
      longitude: 2.2945,
      time: 30,
      description:
        'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.',
    },
    {
      name: 'Sydney Opera House',
      image: '/assets/images/sydney-opera-house.jpg',
      latitude: -33.8568,
      longitude: 151.2153,
      time: 45,
      description:
        "Sydney Opera House is a multi-venue performing arts centre at Sydney Harbour in Sydney, New South Wales, Australia. It is one of the 20th century's most famous and distinctive buildings.",
    },
  ]
  const [selectedAttraction, setSelectedAttraction] =
    useState<Attraction | null>(null)

  const handleAttraction = (attraction: Attraction | null) => {
    if (attraction === selectedAttraction) {
      setSelectedAttraction(null)
    } else {
      setSelectedAttraction(attraction)
    }
  }

  return (
    <div className="flex h-screen">
      <Guide
        attractions={attractions}
        onhandleAttraction={handleAttraction}
        selectedAttraction={selectedAttraction}
      ></Guide>
      <TravelMap attractionInfo={selectedAttraction}></TravelMap>
    </div>
  )
}

export default TravelCoursePage
