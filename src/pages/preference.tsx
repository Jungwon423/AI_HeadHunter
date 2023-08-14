import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchPreferenceAsync,
  recommendInputV2,
  selectPreference,
  selectUserId,
  initialize,
  selectTravelInfo,
} from '../slices/travelInfoSlice'
import { AppDispatch } from '../store'
import { useRouter } from 'next/router'
import {
  ZeroOrOne,
  selectAttractionQueryResultList,
  selectAttractionQueryTravelId,
} from '../slices/imageQuerySlice'
import {
  fetchRecommendAttractionsAsync,
  selectRecommendAttractions,
} from '../slices/recommendSlice'
import { RecommendInput } from '../interfaces/recommendInput'
import Loading from '../components/loading'

const Preference = () => {
  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()
  const userId: string = useSelector(selectUserId)
  const travelId: string = useSelector(selectAttractionQueryTravelId) // !: travelId is not null

  const resultList = useSelector(selectAttractionQueryResultList)

  const preference = useSelector(selectPreference)
  const travelInfo = useSelector(selectTravelInfo)

  const recommendAttractions = useSelector(selectRecommendAttractions)

  const [preferenceLoaded, setPreferenceLoaded] = useState(false)
  const [scheduleLoaded, setScheduleLoaded] = useState(false)

  useEffect(() => {
    dispatch(initialize())
  }, [])

  useEffect(() => {
    const recommendInput: recommendInputV2 = {
      travel_id: travelId,
      user: userId,
      answers: resultList as ZeroOrOne[],
    }
    if (preferenceLoaded === false) {
      console.log('preferenceLoaded: ' + preferenceLoaded)
      console.log('preference 추천 Input: ', recommendInput)
      dispatch(fetchPreferenceAsync(recommendInput))
      setPreferenceLoaded(true)
    }
  }, [])

  useEffect(() => {
    const recommendInput: RecommendInput = {
      user: userId,
      travel_id: travelId,
    }
    if (
      scheduleLoaded === false &&
      preferenceLoaded === true &&
      travelInfo.preferenceLoading === 'succeeded'
    ) {
      console.log(
        'travelInfo.preferenceLoading : ' + travelInfo.preferenceLoading,
      )
      console.log('여행지 추천 Input: ', recommendInput)
      dispatch(fetchRecommendAttractionsAsync(recommendInput))
      setScheduleLoaded(true)
    }
  }, [travelInfo.preferenceLoading])

  if (travelInfo.preferenceLoading === 'pending') {
    return <Loading></Loading>
  }

  if (travelInfo.preferenceLoading === 'failed') {
    return <p>Error: {travelInfo.error}</p>
  }

  let buttonStatus: string = ''
  if (recommendAttractions.loading === 'pending') {
    buttonStatus = 'loading'
  } else if (recommendAttractions.loading === 'failed') {
    buttonStatus = 'something wrong'
  } else {
    buttonStatus = '추천 확인하러 가기'
  }

  let buttonColor: string = 'bg-blue-500'
  if (recommendAttractions.loading === 'pending') {
    buttonColor = 'bg-gray-500'
  } else if (recommendAttractions.loading === 'failed') {
    buttonColor = 'bg-red-500'
  } else {
    buttonColor = 'bg-blue-500'
  }

  let buttonClass = `rounded px-4 py-2 font-bold text-white hover:bg-blue-600 ${buttonColor} `

  const handleButtonClick = () => {
    if (recommendAttractions.loading === 'succeeded') {
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
