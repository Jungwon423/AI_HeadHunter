import router from 'next/router'
import MyNavbar from '../search_components/MyNavbar'
import CircleListItem from '../survey_components/CircleList'
import { useEffect, useState } from 'react'
import WhoSurvey from '../survey_components/WhoSurvey'
import 'react-datepicker/dist/react-datepicker.css'
import WhenSurvey from '../survey_components/WhenSurvey'
import HowSurvey from '../survey_components/HowSurvey'
import {
  selectDuration,
  setBudget,
  setCompanion,
  setDuration,
  setTravelStyle,
  setUserId,
} from '../slices/travelInfoSlice'
import { useSelector, useDispatch } from 'react-redux'
import LocalStorage from '../index_components/LocalStorage'
import { CityInput, fetchCityDetailAsync } from '../slices/cityDetailSlice'
import { AppDispatch, AppThunk } from '../store'

export default function SurveyPage() {
  const dispatch = useDispatch<AppDispatch>()
  let duration = useSelector(selectDuration)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const CityInput2: CityInput = {
    destination: 'Seoul',
  }
  useEffect(() => {
    dispatch(fetchCityDetailAsync(CityInput2))
  }, [])

  const handleItemClick = (index: number) => {
    setSelectedIndex(index)
  }
  const items = [
    '주로 누구와 여행하시나요?',
    '여행 날짜는 언제 인가요?',
    '여행 스타일은 어떻게 되시나요?',
  ]
  const handleButtonClick = async () => {
    if (selectedIndex === 2) {
      let tempId: string

      if (LocalStorage.getItem('tempId') == null) {
        let randomStr: string = Math.random().toString(36).substring(2, 12)
        LocalStorage.setItem('tempId', randomStr)
        tempId = randomStr
      } else {
        tempId = LocalStorage.getItem('tempId')! // null check
      }
      dispatch(setUserId(tempId))
      // dispatch(setCompanion(selectedCompanion));
      // dispatch(setTravelStyle(selectedStyles));
      // dispatch(setDuration(duration))
      router.push('/image_query')
    } else {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  return (
    <div className="min-h-screen pb-16">
      <MyNavbar></MyNavbar>

      <div className="flex flex-row w-screen">
        <div className="hidden md:block overflow-hidden w-0 md:w-1/3 md:min-w-1/3 relative p-8">
          <button onClick={() => router.back}>
            <div className="flex justify-center items-center bg-slate-300 h-8 w-8 rounded-full mb-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="indigo"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </div>
          </button>
          <div className="pt-20 flex flex-col space-y-16">
            {items.map((item, index) => (
              <CircleListItem
                key={index}
                text={item}
                onClick={() => handleItemClick(index)}
                isSelected={selectedIndex === index}
              />
            ))}
          </div>
        </div>
        {selectedIndex == 0 ? <WhoSurvey /> : null}
        {selectedIndex == 1 ? <WhenSurvey></WhenSurvey> : null}
        {selectedIndex == 2 ? <HowSurvey></HowSurvey> : null}
      </div>
      <div className="fixed bottom-0 h-16 w-full border-t-2 bg-stone-50 shadow-gray-200 shadow-inner flex items-center justify-end pr-5">
        <button
          className="relative w-28 h-12 rounded-xl bg-indigo-500 flex items-center justify-center"
          onClick={async () => handleButtonClick()}
        >
          <span className="text-center text-white text-sm md:text-base">
            Next
          </span>
        </button>
      </div>
    </div>
  )
}
