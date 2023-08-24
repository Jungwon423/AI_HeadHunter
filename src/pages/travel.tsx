import { use } from 'react'
import RecoContainer from '../recommend_components/RecoContainer'
import TravelContainer from '../travel_components/TravelContainer'
import TravelMap from '../travel_components/TravelMap'
import Guide from '../travel_components/guide'
import { selectOpenRecommend } from '../slices/travelInfoSlice'
import { useSelector } from 'react-redux'
import TravelInfo from '../travel_components/TravelInfo'

const TravelCoursePage = () => {
  const openRecommend = useSelector(selectOpenRecommend)

  return (
    <div className="flex h-screen">
      <Guide></Guide>
      {openRecommend && <TravelInfo></TravelInfo>}
      {!openRecommend && <TravelContainer></TravelContainer>}
      {/* <TravelContainer></TravelContainer> */}
      <TravelMap></TravelMap>
    </div>
  )
}

export default TravelCoursePage
