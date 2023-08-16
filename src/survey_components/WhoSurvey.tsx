import React, { useState } from 'react'
import { SurveyButton } from './SurveyButtons'
import NumberButton from './NumberButton'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import {
  setCompanion,
  setCompanionAdult,
  setCompanionChild,
} from '../slices/travelInfoSlice'
import { SimpleButtons } from './SimpleButtons'

const WhoSurvey = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedSurveys, setSelectedSurveys] = useState<string[]>([])
  const handleSurveysClick = (style: string) => {
    if (selectedSurveys.includes(style)) {
      setSelectedSurveys(selectedSurveys.filter((c) => c !== style))
    } else {
      setSelectedSurveys([...selectedSurveys, style])
    }
    // TODO : 1개만 설정되도록 수정
  }
  const [selectedSurveys2, setSelectedSurveys2] = useState<string[]>([])
  const handleSurveys2Click = (style: string) => {
    if (selectedSurveys2.includes(style)) {
      setSelectedSurveys2(selectedSurveys2.filter((c) => c !== style))
    } else {
      setSelectedSurveys2([...selectedSurveys2, style])
    }
    // TODO : 1개만 설정되도록 수정
    dispatch(setCompanionAdult(selectedSurveys2[0]))
  }
  const [selectedSurvey3, setSelectedSurvey3] = useState<string | null>(null)
  const handleSurveys3Click = (style: string) => {
    if (selectedSurvey3 === style) {
      setSelectedSurvey3(null)
      dispatch(setCompanionChild(''))
    } else {
      dispatch(setCompanionChild(style))
      setSelectedSurvey3(style)
    }
    console.log()
  }
  const [travelDuration, setTravelDuration] = useState<number>(0)
  const handleDurationChange = (value: number) => {
    setTravelDuration(value)
  }
  const shouldShowChildrenButton = () => {
    return (
      selectedSurvey3 === '부모님과' ||
      selectedSurvey3 === '친구와' ||
      selectedSurvey3 === '배우자와'
    )
  }

  return (
    <div className="flex py-5 w-full flex-col items-center">
      <div className="px-10 flex flex-col flex-grow">
        <div className="text-2xl font-bold pt-20">
          주로 누구와 여행하시나요?
        </div>
        <div className="text-base font-bold text-indigo-500 pt-3 pb-5">
          동행 정보를 고려한 여행 일정을 받아볼 수 있어요.
        </div>
        <SimpleButtons
          surveys={['혼자', '연인과', '친구와', '부모님과', '배우자와']}
          selectedSurvey={selectedSurvey3}
          onSurveyClick={handleSurveys3Click}
        ></SimpleButtons>
        <div className="flex font-bold text-xl pt-3">나이</div>
        <SurveyButton
          surveys={['10대', '20대', '30대', '40대', '50대', '60대 이상']}
          selectedSurveys={selectedSurveys}
          onSurveyClick={handleSurveysClick}
        />
        {shouldShowChildrenButton() && (
          <>
            <div className="flex font-bold text-xl pt-7 pb-3">아이</div>
            <SurveyButton
              surveys={[
                '48개월 미만',
                '미취학',
                '초등학생',
                '중학생',
                '고등학생',
              ]}
              selectedSurveys={selectedSurveys2}
              onSurveyClick={handleSurveys2Click}
            />
          </>
        )}
        <div className="flex flex-row items-center pt-6">
          <div className="font-bold text-xl pt-5">총 인원수</div>
          <div className="flex flex-grow"></div>

          <NumberButton onDurationChange={handleDurationChange} />
        </div>
      </div>
    </div>
  )
}

export default WhoSurvey
