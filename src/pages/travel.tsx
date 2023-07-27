import { SetStateAction, useState } from 'react'
import Image from 'next/image'
import ReactMapGL, { Marker } from 'react-map-gl'
import Map from '../components/map'
import Guide from '../components/guide'

const TravelCoursePage = () => {

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Guide></Guide>
      <Map></Map>
    </div>
  )
}

export default TravelCoursePage
