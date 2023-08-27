import React, { useEffect, useState } from 'react'
import { SurveyButton } from './SurveyButtons'
import NumberButton from './NumberButton'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import {
  selectCompanion,
  setCompanion,
  setCompanionAdult,
  setCompanionChild,
} from '../slices/travelInfoSlice'
import { SimpleButtons } from './SimpleButtons'

const WhoSurvey = () => {
  const dispatch = useDispatch<AppDispatch>()
  const selectedCompanion = useSelector(selectCompanion)
  useEffect(() => {
    dispatch(setCompanion(selectedCompanion))
  }, [selectedCompanion])
  const [selectedAdult, setSelectedAdult] = useState<string[]>([])
  const handleAdultClick = (style: string) => {
    if (selectedAdult.includes(style)) {
      setSelectedAdult(selectedAdult.filter((c) => c !== style))
    } else {
      setSelectedAdult([...selectedAdult, style])
    }
  }
  useEffect(() => {
    dispatch(setCompanionAdult(selectedAdult[0]))
  }, [selectedAdult])
  const [selectedChild, setSelectedChild] = useState<string[]>([])
  const handleChildClick = (style: string) => {
    if (selectedChild.includes(style)) {
      setSelectedChild(selectedChild.filter((c) => c !== style))
    } else {
      setSelectedChild([...selectedChild, style])
    }
  }
  useEffect(() => {
    dispatch(setCompanionChild(selectedChild[0]))
  }, [selectedChild])
  const [travelDuration, setTravelDuration] = useState<number>(0)
  const handleDurationChange = (value: number) => {
    setTravelDuration(value)
  }
  const shouldShowChildrenButton = () => {
    return (
      selectedCompanion === '부모님과' ||
      selectedCompanion === '친구와' ||
      selectedCompanion === '배우자와'
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
        ></SimpleButtons>
        <div className="flex font-bold text-xl pt-10">나이</div>
        <SurveyButton
          surveys={['10대', '20대', '30대', '40대', '50대', '60대 이상']}
          selectedSurveys={selectedAdult}
          onSurveyClick={handleAdultClick}
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
              selectedSurveys={selectedChild}
              onSurveyClick={handleChildClick}
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
