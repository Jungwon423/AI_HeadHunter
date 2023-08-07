import TravelContainer from '../travel_components/TravelContainer'
import TravelMap from '../travel_components/TravelMap'
import Guide from '../travel_components/guide'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchPreferenceAsync,
  fetchTravelSchedule,
  fetchTravelScheduleAsync,
  recommendInput,
  recommendInputV2,
  selectPreference,
  selectTravelInfo,
  selectUserId,
} from '../slices/travelInfoSlice'
import { fetchQueryAsync, selectTravelId } from '../slices/questionnaireSlice'
import { AppDispatch } from '../store'
import { useRouter } from 'next/router'
import {
  ZeroOrOne,
  selectAttractionQueryResultList,
  selectAttractionQueryTravelId,
} from '../slices/imageQuerySlice'

const TravelCoursePage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userId: string = useSelector(selectUserId)
  // const userId: string = '6arap7v529'
  //const travelId: string = useSelector(selectAttractionQueryTravelId) // !: travelId is not null
  const travelId: string = '64d123039a3e0eaa35903b8e'

  // console.log('travelId: ', travelId)
  //const resultList = useSelector(selectAttractionQueryResultList)
  const resultList = [1, 1, 1, 1, 1, 1, 1, 1]

  const preference = useSelector(selectPreference)
  const travelInfo = useSelector(selectTravelInfo)

  const [preferenceLoaded, setPreferenceLoaded] = useState(false)
  const [scheduleLoaded, setScheduleLoaded] = useState(false)

  useEffect(() => {
    const recommendInput: recommendInputV2 = {
      travel_id: travelId,
      user: userId,
      answers: resultList as ZeroOrOne[],
    }
    if (preferenceLoaded === false) {
      console.log('recommendInput: ', recommendInput)
      dispatch(fetchPreferenceAsync(recommendInput))
      setPreferenceLoaded(true)
    }
  }, [])

  useEffect(() => {
    console.log()
    const recommendInput: recommendInput = {
      user: userId,
      travel_id: travelId,
    }
    if (
      scheduleLoaded === false &&
      travelInfo.preferenceLoading === 'succeeded'
    ) {
      console.log('travelInput: ', recommendInput)
      dispatch(fetchTravelScheduleAsync(recommendInput))
      setScheduleLoaded(true)
    }
  }, [travelInfo.preferenceLoading])

  if (travelInfo.preferenceLoading === 'pending') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (travelInfo.preferenceLoading === 'failed') {
    return <p>Error: {travelInfo.error}</p>
  }

  if (travelInfo.loading === 'pending') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            {preference.inferring} {preference.conclusion}
          </div>
          <div className="flex flex-col items-center justify-center"></div>
        </div>
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
  //
  //
  //
  //
  //

  // useEffect(() => {
  //   const recommendInput: recommendInput = {
  //     user: userId,
  //     travel_id: travelId,
  //   }
  //   console.log('travelInput: ', recommendInput)
  //   dispatch(fetchTravelScheduleAsync(recommendInput))
  // }, [dispatch])

  // if (travelInfo.loading === 'pending') {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <p>Loading...</p>
  //     </div>
  //   )
  // }

  // if (travelInfo.loading === 'failed') {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <p>Error: {travelInfo.error}</p>
  //     </div>
  //   )
  // }

  // return (
  //   <div className="flex h-screen">
  //     <Guide></Guide>
  //     <TravelContainer></TravelContainer>
  //     <TravelMap></TravelMap>
  //   </div>
  // )
}

export default TravelCoursePage
