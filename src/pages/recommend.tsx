import { useDispatch, useSelector } from 'react-redux'
import { initialize, selectUserId } from '../slices/recommendSlice'
import { useEffect } from 'react'
import { selectAttractionQueryTravelId } from '../slices/imageQuerySlice'
import { AppDispatch } from '../store'
import RecommendMap from '../recommend_components/RecommendMap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { fetchTravelScheduleAsync } from '../slices/travelInfoSlice'
import { RecommendInput } from '../interfaces/recommendInput'
import RecommendNav from '../recommend_components/RecommendNav'
import RecoContainer from '../recommend_components/RecoContainer'

const RecommendPage = () => {
  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'
  const dispatch = useDispatch<AppDispatch>()
  const userId: string = useSelector(selectUserId)
  const travelId: string = useSelector(selectAttractionQueryTravelId) // !: travelId is not null
  // const showChat = useSelector(selectShowChat)

  useEffect(() => {
    dispatch(initialize())
    const input: RecommendInput = {
      user: userId,
      travel_id: travelId,
    }
    dispatch(fetchTravelScheduleAsync(input))
  }, [])

  return (
    <div className="flex flex-row">
      <div className="bg-white w-1/2 min-w-[700px] relative h-screen max-h-screen overflow-hidden">
        <div className="flex flex-row">
          <RecommendNav></RecommendNav>
          <RecoContainer></RecoContainer>
        </div>
      </div>
      <div className="w-1/2">
        <RecommendMap></RecommendMap>
      </div>
    </div>
  )
}

export default RecommendPage
