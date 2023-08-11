import TravelContainer from '../travel_components/TravelContainer'
import TravelMap from '../travel_components/TravelMap'
import Guide from '../travel_components/guide'

const TravelCoursePage = () => {
  return (
    <div className="flex h-screen">
      <Guide></Guide>
      <TravelContainer></TravelContainer>
      <TravelMap></TravelMap>
    </div>
  )
}

export default TravelCoursePage
