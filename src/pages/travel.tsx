import { useState } from 'react'
import TravelMap from '../travel_components/TravelMap'
import Guide from '../travel_components/guide'

const TravelCoursePage = () => {
  return (
    <div className="flex h-screen">
      <Guide></Guide>
      <TravelMap></TravelMap>
    </div>
  )
}

export default TravelCoursePage
