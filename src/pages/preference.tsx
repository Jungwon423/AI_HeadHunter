import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, selectTravelId } from '../slices/travelInfoSlice'
import { AppDispatch } from '../store'
import { useRouter } from 'next/router'
import { selectImageQueryResultList } from '../slices/imageQuerySlice'
import {
  initialize,
  selectPreference,
  selectRecommendInfo,
} from '../slices/recommendSlice'
import { RecommendInput } from '../interfaces/recommendInput'

import Loading from '../components/loading'

import {
  PreferenceInput,
  fetchPreferenceAsync,
} from '../functions/fetchPreference'
import { ZeroOrOne } from '../interfaces/zeroOrOne'
import { fetchRecommendAttractionsAsync } from '../functions/fetchRecommend'

const PreferencePage = () => {
  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()

  // selector from 'travelInfoSlice'
  const userId: string = useSelector(selectUser)
  const travelId: string = useSelector(selectTravelId)

  // selector from 'imageQuerySlice'
  const resultList = useSelector(selectImageQueryResultList)

  // selector from 'recommendSlice'
  const preference = useSelector(selectPreference)
  const recommendInfo = useSelector(selectRecommendInfo)

  const [preferenceLoaded, setPreferenceLoaded] = useState(false)
  const [scheduleLoaded, setScheduleLoaded] = useState(false)

  useEffect(() => {
    dispatch(initialize())
  }, [])

  useEffect(() => {
    const PreferenceInput: PreferenceInput = {
      travel_id: travelId,
      user: userId,
      answers: resultList as ZeroOrOne[],
    }
    if (preferenceLoaded === false) {
      console.log('preferenceLoaded: ' + preferenceLoaded)
      console.log('preference Input: ', PreferenceInput)
      dispatch(fetchPreferenceAsync(PreferenceInput))
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
      recommendInfo.preferenceLoading === 'succeeded'
    ) {
      console.log(
        'recommendInfo.preferenceLoading : ' + recommendInfo.preferenceLoading,
      )
      console.log('여행지 추천 Input: ', recommendInput)
      dispatch(fetchRecommendAttractionsAsync(recommendInput))
      setScheduleLoaded(true)
    }
  }, [recommendInfo.preferenceLoading])

  if (recommendInfo.preferenceLoading === 'pending') {
    return <Loading></Loading>
  }

  if (recommendInfo.preferenceLoading === 'failed') {
    return <p>Error: {recommendInfo.error}</p>
  }

  let buttonStatus: string = ''
  if (recommendInfo.loading === 'pending') {
    buttonStatus = 'loading'
  } else if (recommendInfo.loading === 'failed') {
    buttonStatus = 'something wrong'
  } else {
    buttonStatus = '추천 확인하러 가기'
  }

  let buttonColor: string = 'bg-blue-500'
  if (recommendInfo.loading === 'pending') {
    buttonColor = 'bg-gray-500'
  } else if (recommendInfo.loading === 'failed') {
    buttonColor = 'bg-red-500'
  } else {
    buttonColor = 'bg-blue-500'
  }

  let buttonClass = `rounded px-4 py-2 font-bold text-white hover:bg-blue-600 ${buttonColor} `

  const handleButtonClick = () => {
    if (recommendInfo.loading === 'succeeded') {
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

export default PreferencePage
