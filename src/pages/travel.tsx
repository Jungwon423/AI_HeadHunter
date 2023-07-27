import Map from '../components/TravelMap'
import Guide from '../components/guide'

const TravelCoursePage = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Guide />
      <Map />
    </div>
  )
}

export default TravelCoursePage
