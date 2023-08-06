import TravelContainer from '../travel_components/TravelContainer'
import TravelMap from '../travel_components/TravelMap'
import Guide from '../travel_components/guide'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchTravelSchedule,
  fetchTravelScheduleAsync,
  recommendInput,
  selectTravelInfo,
  selectUserId,
} from '../slices/travelInfoSlice'
import { fetchQueryAsync, selectTravelId } from '../slices/questionnaireSlice'
import { AppDispatch } from '../store'

const TravelCoursePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userId: string = useSelector(selectUserId)
  const travelId: string = useSelector(selectTravelId)! // !: travelId is not null
  const travelInfo = useSelector(selectTravelInfo)

  useEffect(() => {
    // const recommendInput: recommendInput = {
    //   user: userId,
    //   travel_id: travelId,
    // }
    const recommendInput: recommendInput = {
      user: '6arap7v529',
      travel_id: '64cf68c0af83b81942465af6',
    }
    console.log('travelInput: ', recommendInput)
    dispatch(fetchTravelScheduleAsync(recommendInput))
  }, [dispatch])

  if (travelInfo.loading === 'pending') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (travelInfo.loading === 'failed') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error: {travelInfo.error}</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <Guide></Guide>
      <TravelContainer></TravelContainer>
      <TravelMap></TravelMap>
    </div>
  )
}

export default TravelCoursePage
