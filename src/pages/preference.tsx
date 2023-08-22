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
import Image from 'next/image'
import {
  PreferenceInput,
  fetchPreferenceAsync,
} from '../functions/fetchPreference'
import { ZeroOrOne } from '../interfaces/zeroOrOne'
import { fetchRecommendAttractionsAsync } from '../functions/fetchRecommend'
import MyNavbar from '../components/MyNavbar'
import { selectCityDetail } from '../slices/cityDetailSlice'
import Switcher12 from '../components/switcher'

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

  const cityDetail = useSelector(selectCityDetail)
  const city = cityDetail.city_detail

  const [isChecked, setIsChecked] = useState(true)
  const handleToggle = (value: boolean) => {
    setIsChecked(value)
  }

  useEffect(() => {
    dispatch(initialize())
  }, [])

  useEffect(() => {
    const PreferenceInput: PreferenceInput = {
      travel_id: travelId,
      user: userId,
      answers: resultList as ZeroOrOne[],
    }
    console.log('preferenceInput: ', PreferenceInput)
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
    <div className="w-screen h-screen">
      <MyNavbar></MyNavbar>

      <div className="bg-indigo-100 h-[1000px] md:h-screen xl:h-screen">
        <button className={buttonClass} onClick={handleButtonClick}>
          {buttonStatus}
        </button>
        <div className="font-bold text-xl text-indigo-500 flex items-center justify-center">
          앤비님의 여행 엽서가 도착했어요!
        </div>
        <div className="flex items-center justify-center py-8">
          <Switcher12 onToggle={handleToggle}></Switcher12>
        </div>
        {isChecked ? (
          <div className=" flex items-center justify-center">
            <div className='min-w-[800px] rounded-xl hidden md:flex flex-row justify-center w-[950px] h-[550px] bg-cover bg-[url("/assets/postcard.png")]'>
              <div className="w-1/2">
                <div className="leading-7 relative top-[290px] font-bold text-gray-600 p-12">
                  {preference.conclusion}
                </div>
              </div>
              <div className="w-1/2">
                <div className="leading-6 relative top-[250px] text-sm text-gray-600 px-14 py-10">
                  {preference.inferring}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center justify-center">
            <div className="flex justify-center bg-white rounded-xl w-[850px] h-[550px]">
              <div className='rounded-xl flex flex-row justify-center mt-[10px] w-[830px] h-[530px] bg-cover bg-[url("/assets/post2.png")]'>
                <div className="w-1/2"></div>
                <div className="w-1/2"></div>
              </div>
            </div>
          </div>
        )}
        {isChecked ? (
          <div className="md:hidden flex items-center justify-center">
            <div className='rounded-xl flex flex-col justify-center w-[430px] h-[800px] bg-cover bg-[url("/assets/pattern2.png")]'>
              <div className="h-1/2">
                <div className="leading-7 top-28 relative font-bold text-sm text-gray-600 p-12">
                  {preference.conclusion}
                </div>
              </div>
              <div className="h-1/2">
                <div className="leading-6 relative text-xs text-gray-600 px-14 py-10">
                  {preference.inferring}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="md:hidden flex items-center justify-center">
            <div className='rounded-xl flex flex-col justify-center w-[430px] h-[800px]  bg-cover bg-[url("/assets/pattern1.png")]'>
              <div className="h-1/2"></div>
              <div className="h-1/2"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PreferencePage
