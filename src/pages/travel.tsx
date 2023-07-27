import { useState } from 'react';
import TravelMap from '../components/TravelMap'
import Guide from '../components/guide'

const TravelCoursePage = () => {
  return (
    <div className="flex">
      <Guide></Guide>
      <TravelMap></TravelMap>
    </div>
  )
}

export default TravelCoursePage
