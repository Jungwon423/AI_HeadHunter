import router from 'next/router'
import MyNavbar from '../search_components/MyNavbar'
import CircleListItem from '../survey_components/CircleList'
import { useEffect, useState } from 'react'
import WhoSurvey from '../survey_components/WhoSurvey'
import 'react-datepicker/dist/react-datepicker.css'
import WhenSurvey from '../survey_components/WhenSurvey'
import HowSurvey from '../survey_components/HowSurvey'
import { selectDuration, selectUserId } from '../slices/travelInfoSlice'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, AppThunk } from '../store'
import { FirstInput, fecthSurveyInputAsync } from '../slices/surveySlice'
import { selectCity } from '../slices/travelInfoSlice'

export const SurveyPage = () => {
  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector(selectUserId)
  const city = useSelector(selectCity)

  useEffect(() => {
    const firstInput: FirstInput = {
      user: user!,
      destination: city,
    }

    console.log(firstInput)

    dispatch(fecthSurveyInputAsync(firstInput))
  }, [])

  const [selectedIndex, setSelectedIndex] = useState<number>(0)

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
      router.push('/image_query')
    } else {
      setSelectedIndex(selectedIndex + 1)
    }
  }
  const handleBackClick = async () => {
    if (selectedIndex === 0) {
      router.replace('/')
    } else {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  return (
    <div className="min-h-screen pb-16">
      <MyNavbar></MyNavbar>

      <div className="flex flex-row w-screen">
        <div className="hidden md:block overflow-hidden w-0 md:w-1/3 md:min-w-1/3 relative p-8">
          <button onClick={handleBackClick}>
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

export default SurveyPage
