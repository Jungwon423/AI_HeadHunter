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
const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()
  //const userId: string = useSelector(selectUserId)
  const userId: string = 'yftq9ni3zt'
  //const travelId: string = useSelector(selectAttractionQueryTravelId) // !: travelId is not null
  const travelId: string = '64d2f8168daf327b97e2bebf'

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

  let buttonStatus: string = ''
  if (travelInfo.loading === 'pending') {
    buttonStatus = 'loading'
  } else if (travelInfo.loading === 'failed') {
    buttonStatus = 'something wrong'
  } else {
    buttonStatus = '추천 확인하러 가기'
  }

  const handleButtonClick = () => {
    console.log(travelInfo.loading)

    if (travelInfo.loading === 'succeeded') {
      console.log('페이지 이동')
      router.push('/travel')
  }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          {preference.inferring} {preference.conclusion}
        </div>
        <div className="flex flex-col items-center justify-center"></div>
        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600" onClick={handleButtonClick}>
  {buttonStatus}
</button>
      </div>
      
    </div>
  )

  // 버튼 회색
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

  // 버튼 빨간색 - 생성 실패했습니다
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
