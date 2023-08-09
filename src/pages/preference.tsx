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

const Preference = () => {
  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()
  const userId: string = useSelector(selectUserId)
  const travelId: string = useSelector(selectAttractionQueryTravelId) // !: travelId is not null

  const resultList = useSelector(selectAttractionQueryResultList)

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
      console.log('preference 추천 Input: ', recommendInput)
      dispatch(fetchPreferenceAsync(recommendInput))
      setPreferenceLoaded(true)
    }
  }, [])

  useEffect(() => {
    const recommendInput: recommendInput = {
      user: userId,
      travel_id: travelId,
    }
    if (
      scheduleLoaded === false &&
      travelInfo.preferenceLoading === 'succeeded'
    ) {
      console.log('여행지 추천 Input: ', recommendInput)
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

  let buttonStatus: string = ''
  if (travelInfo.loading === 'pending') {
    buttonStatus = 'loading'
  } else if (travelInfo.loading === 'failed') {
    buttonStatus = 'something wrong'
  } else {
    buttonStatus = '추천 확인하러 가기'
  }

  let buttonColor: string = 'bg-blue-500'
  if (travelInfo.loading === 'pending') {
    buttonColor = 'bg-gray-500'
  } else if (travelInfo.loading === 'failed') {
    buttonColor = 'bg-red-500'
  } else {
    buttonColor = 'bg-blue-500'
  }

  let buttonClass = `rounded px-4 py-2 font-bold text-white hover:bg-blue-600 ${buttonColor} `

  const handleButtonClick = () => {
    if (travelInfo.loading === 'succeeded') {
      router.push('/recommend')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="rounded overflow-hidden border border-black">
          <h2 className="text-2xl font-bold mb-2">Inferring</h2>
          <p className="text-gray-600 text-lg">{preference.inferring}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="rounded overflow-hidden border border-black">
            <h2 className="text-2xl font-bold mb-2">Conclusion</h2>
            <p className="text-gray-600 text-lg">{preference.conclusion}</p>
          </div>
        </div>
        <button className={buttonClass} onClick={handleButtonClick}>
          {buttonStatus}
        </button>
      </div>
    </div>
  )
}

export default Preference
