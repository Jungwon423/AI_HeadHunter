import { useDispatch, useSelector } from 'react-redux'
import { initialize, selectAttractions } from '../slices/recommendSlice'
import { useEffect } from 'react'
import { AppDispatch } from '../store'
import RecommendMap from '../recommend_components/RecommendMap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {
  selectTravelId,
  selectUser,
  setRecommendSchedule,
} from '../slices/travelInfoSlice'
import { RecommendInput } from '../interfaces/recommendInput'
import RecommendNav from '../recommend_components/RecommendNav'
import RecoContainer from '../recommend_components/RecoContainer'
import { fetchTravelScheduleAsync } from '../functions/fetchTravel'
import { PlaceInfo } from '../interfaces/placeInfo'

const RecommendPage = () => {
  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'
  const dispatch = useDispatch<AppDispatch>()
  const userId: string = useSelector(selectUser)
  const travelId: string = useSelector(selectTravelId)

  const recommendSchedule: PlaceInfo[][] = useSelector(selectAttractions)

  useEffect(() => {
    dispatch(setRecommendSchedule(recommendSchedule))
    dispatch(initialize())
    const travelInput: RecommendInput = {
      user: userId,
      travel_id: travelId,
    }
    dispatch(fetchTravelScheduleAsync(travelInput))
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
