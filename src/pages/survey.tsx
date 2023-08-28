import router from 'next/router'
import MyNavbar from '../components/MyNavbar'
import CircleListItem from '../survey_components/CircleList'
import { use, useEffect, useState } from 'react'
import WhoSurvey from '../survey_components/WhoSurvey'
import 'react-datepicker/dist/react-datepicker.css'
import WhenSurvey from '../survey_components/WhenSurvey'
import HowSurvey from '../survey_components/HowSurvey'
import {
  selectDuration,
  selectUser,
  selectCity,
  selectTravelStyle,
  selectCompanion,
} from '../slices/travelInfoSlice'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { SurveyInput } from '../interfaces/input'
import { fecthSurveyInputAsync } from '../functions/fetchSurveyInput'
import ActivitySurvey from '../survey_components/AcitivitySurvey'
import {
  selectEndDate,
  selectStartDate,
  setStartDate,
} from '../slices/timeSlice'
import Loading2 from '../components/loading2'

export const SurveyPage = () => {
  const travelStyle = useSelector(selectTravelStyle)
  const dispatch = useDispatch<AppDispatch>()

  const user = useSelector(selectUser)
  const city = useSelector(selectCity)

  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleItemClick = (index: number) => {
    setSelectedIndex(index)
  }
  const items = [
    '주로 누구와 여행하시나요?',
    '여행 날짜는 언제 인가요?',
    '여행 스타일은 어떻게 되시나요?',
    '여행지에서 하고 싶은 활동을 골라주세요',
  ]
  let startDate = useSelector(selectStartDate)
  let endDate = useSelector(selectEndDate)
  let companion = useSelector(selectCompanion)

  const handleButtonClick = async () => {
    let isValid = false

    switch (selectedIndex) {
      case 0: // WhoSurvey
        isValid = companion != null
        break
      case 1: // WhenSurvey
        isValid =
          startDate != null &&
          endDate != null &&
          startDate <= endDate &&
          startDate != '' &&
          endDate != ''
        break
      case 2: // HowSurvey
        isValid =
          (travelStyle.includes('famous') || travelStyle.includes('novel')) &&
          (travelStyle.includes('lazy') || travelStyle.includes('busy'))

        if (isValid) {
          setIsLoading(true)
          const surveyInput: SurveyInput = {
            user: user!,
            destination: city,
            travelStyle: travelStyle,
          }
          await dispatch(fecthSurveyInputAsync(surveyInput))
          setIsLoading(false)
        }
        break
      case 3: // ActivitySurvey
        isValid = true
        break
      default:
        return
    }

    if (isValid) {
      if (selectedIndex === items.length - 1) {
        router.push('/image_query')
      } else {
        setSelectedIndex(selectedIndex + 1)
      }
    } else {
      alert('옵션을 선택해주세요!')
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
          <div className="pt-28 flex flex-col space-y-16">
            {items.map((item, index) => (
              <CircleListItem
                key={index}
                text={item}
                // onClick={() => handleItemClick(index)}
                onClick={() => console.log('click')}
                isSelected={selectedIndex === index}
              />
            ))}
          </div>
        </div>
        <div className="relative">
          <button className="absolute left-2 top-8" onClick={handleBackClick}>
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

          {selectedIndex == 0 ? <WhoSurvey /> : null}
          {selectedIndex == 1 ? <WhenSurvey></WhenSurvey> : null}
          {selectedIndex == 2 ? <HowSurvey></HowSurvey> : null}
          {selectedIndex == 3 ? (
            isLoading ? (
              <Loading2 />
            ) : (
              <ActivitySurvey></ActivitySurvey>
            )
          ) : null}
        </div>
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
