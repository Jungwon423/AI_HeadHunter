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
import MyNavbar from '../components/MyNavbar'
import { selectCityDetail } from '../slices/cityDetailSlice'
import Switcher12 from '../components/switcher'
import { fetchTravelScheduleAsync } from '../functions/fetchTravel'
import SmallLoading from '../components/small_loading'
import { ItineraryInput } from '../interfaces/preference'
import { fetchItinerary } from '../functions/fetchItinerary'

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
  const [itineraryLoaded, setItineraryLoaded] = useState(false)

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
      dispatch(fetchRecommendAttractionsAsync(recommendInput))

      // // TODO : 실제 API로 대체
      // dispatch(initialize())
      // const travelInput: RecommendInput = {
      //   user: userId,
      //   travel_id: travelId,
      // }
      // dispatch(fetchTravelScheduleAsync(travelInput))
      setScheduleLoaded(true)
    }
  }, [recommendInfo.preferenceLoading])

  useEffect(() => {
    const ItineraryInput: ItineraryInput = {
      travel_id: travelId,
      user: userId,
    }
    if (itineraryLoaded === false) {
      // dispatch(fetchItinerary(ItineraryInput))
      setPreferenceLoaded(true)
    }
  }, [])

  if (
    recommendInfo.preferenceLoading === 'pending' ||
    recommendInfo.preferenceLoading === 'idle'
  ) {
    return <Loading></Loading>
  }

  if (recommendInfo.preferenceLoading === 'failed') {
    return <p>Error: {recommendInfo.error}</p>
  }

  let buttonStatus: string = ''
  let buttonColor: string = 'bg-blue-500'
  let buttonHover: string = ''

  if (recommendInfo.loading === 'pending') {
    buttonStatus = 'loading'
    buttonColor = 'bg-gray-500'
    buttonHover = ''
  } else if (recommendInfo.loading === 'failed') {
    buttonStatus = 'something wrong'
    buttonColor = 'bg-red-500'
    buttonHover = ''
  } else {
    buttonStatus = '추천 관광명소 보러가기'
    buttonColor = 'bg-blue-500'
    buttonHover = 'hover:bg-blue-600'
  }

  let buttonClass = `rounded px-4 py-2 font-bold text-white ${buttonHover} ${buttonColor} `

  const handleButtonClick = () => {
    if (recommendInfo.loading === 'succeeded') {
      router.push('/recommend')
    }
  }

  return (
    <div className="w-screen h-screen">
      <MyNavbar></MyNavbar>

      <div className="bg-indigo-100 h-[1000px] md:h-screen xl:h-screen">
        {/* <div className="font-bold text-xl text-indigo-500 flex items-center justify-center">
          앤비님의 여행 엽서가 도착했어요!
        </div> */}
        <div className="grid grid-cols-3 py-8">
          <div className="w-1/3"></div>
          <div className="justify-self-center">
            <Switcher12 onToggle={handleToggle}></Switcher12>
          </div>
          <div className="justify-self-end px-5">
            <button
              className={buttonClass}
              onClick={handleButtonClick}
              disabled={recommendInfo.loading !== 'succeeded'}
            >
              <div className="flex flex-row justify-center items-center">
                {recommendInfo.loading == 'pending' && (
                  <SmallLoading></SmallLoading>
                )}
                {buttonStatus}
              </div>
            </button>
          </div>
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
