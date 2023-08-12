import router from 'next/router'
import MyNavbar from '../search_components/MyNavbar'
import CircleListItem from '../survey_components/CircleList'
import { useState } from 'react'
import { SurveyButton } from '../survey_components/SurveyButtons'
import { TravelCompanion } from '../search_components/TravelCompanion'
import TravelDuration from '../search_components/TravelDuration'
import NumberButton from '../survey_components/NumberButton'

export default function SurveyPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleItemClick = (index: number) => {
    setSelectedIndex(index)
  }
  const [selectedSurveys, setSelectedSurveys] = useState<string[]>([])
  const handleSurveysClick = (style: string) => {
    if (selectedSurveys.includes(style)) {
      setSelectedSurveys(selectedSurveys.filter((c) => c !== style))
    } else {
      setSelectedSurveys([...selectedSurveys, style])
    }
  }

  const items = [
    '어디로 떠나시나요?',
    '언제 가시나요?',
    '여행 스타일은 어떻게 되시나요?',
  ]
  const [selectedCompanion, setSelectedCompanion] = useState<string>('')
  const [travelDuration, setTravelDuration] = useState<number>(0)
  const handleDurationChange = (value: number) => {
    setTravelDuration(value)
  }
  return (
    <div className="h-screen">
      <MyNavbar></MyNavbar>

      <div className="flex flex-row">
        <div className=" w-[300px] min-w-[300px] relative p-3">
          <button onClick={() => router.back}>
            <div className="flex justify-center items-center bg-slate-300 h-8 w-8 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
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
          <div className="pt-20 px-7 flex flex-col space-y-10">
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
        <div className="flex flex-col py-5">
          <div className="px-10">
            <div className="text-2xl font-bold pt-20">
              주로 누구와 여행하시나요?
            </div>
            <div className="text-base font-bold text-indigo-500 pt-3 pb-5">
              동행 정보를 고려한 여행 일정을 받아볼 수 있어요.
            </div>
            <div className="flex font-bold text-xl pt-3">어른</div>
            <SurveyButton
              surveys={['10대', '20대', '30대', '40대', '50대', '60대 이상']}
              selectedSurveys={selectedSurveys}
              onSurveyClick={handleSurveysClick}
            />
            <div className="flex font-bold text-xl pt-7">아이</div>
            <SurveyButton
              surveys={['10대', '20대', '30대', '40대', '50대', '60대 이상']}
              selectedSurveys={selectedSurveys}
              onSurveyClick={handleSurveysClick}
            />
            <div className="flex font-bold text-xl pt-7">총 인원수</div>
            <NumberButton onDurationChange={handleDurationChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
