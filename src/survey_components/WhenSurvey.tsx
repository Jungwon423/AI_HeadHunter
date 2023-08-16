import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import MyDatePicker from './MyDatePicker'
import { useDispatch } from 'react-redux'
import { setDuration } from '../slices/travelInfoSlice'
import { AppDispatch } from '../store'
import { setTravelEndDate, setTravelStartDate } from '../slices/surveySlice'

const WhenSurvey = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const handleDatesChange = (
    newStartDate: Date | null,
    newEndDate: Date | null,
  ) => {
    setStartDate(newStartDate)
    setEndDate(newEndDate)
    const maxDate = new Date(newStartDate!)
    maxDate.setDate(newStartDate!.getDate() + 29)
    if (newEndDate! > maxDate) {
      setEndDate(maxDate)
    } else setEndDate(newEndDate)

    dispatch(setTravelStartDate(startDate?.toDateString()!))
    dispatch(setTravelEndDate(endDate?.toDateString()!))
  }

  return (
    <div className="flex py-5 w-full flex-col items-center">
      <div className="px-10 flex flex-col flex-grow">
        <div className="text-2xl font-bold pt-16">여행 날짜는 언제인가요?</div>
        <div className="text-base font-bold text-indigo-500 pt-3 pb-7">
          현재 30박 31일까지 선택가능합니다.
        </div>
        <MyDatePicker
          startDate={startDate}
          endDate={endDate}
          onDatesChange={handleDatesChange}
        ></MyDatePicker>

        <div className="flex flex-row">
          <div className="py-2 border-t-2">
            <div className="font-bold">가는날</div>
            {startDate ? (
              <div className="font-bold text-lg text-indigo-600">
                {startDate.toLocaleDateString('ko-KR', {
                  month: '2-digit',
                  day: '2-digit',
                  weekday: 'short',
                })}
              </div>
            ) : (
              <div className="text-lg font-bold text-stone-300">
                선택해주세요
              </div>
            )}
          </div>
          <div className="pl-10 py-2 border-t-2">
            <div className="font-bold">오는날</div>
            {endDate ? (
              <div className="font-bold text-lg text-indigo-600">
                {endDate.toLocaleDateString('ko-KR', {
                  month: '2-digit',
                  day: '2-digit',
                  weekday: 'short',
                })}
              </div>
            ) : (
              <div className="text-lg font-bold text-stone-300">
                선택해주세요
              </div>
            )}
          </div>
          <div className="flex flex-grow-0 md:flex-grow border-t-2"></div>
          {startDate && endDate ? (
            <div className="pl-10 pt-4 border-t-2">
              <div className="w-auto px-4 py-2 rounded-md bg-indigo-400 flex items-center justify-center">
                <span className="text-center text-white text-sm md:text-base">
                  {(() => {
                    const differenceInMilliseconds =
                      endDate.getTime() - startDate.getTime()
                    const differenceInDays = Math.ceil(
                      differenceInMilliseconds / (1000 * 60 * 60 * 24),
                    ) // 일수 계산 (소수점 올림)
                    const nights = differenceInDays // 박 수 계산
                    const days = differenceInDays + 1
                    dispatch(setDuration(days!))
                    if (nights == 0) {
                      return `당일치기`
                    } else return `${nights}박 ${days}일`
                  })()}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default WhenSurvey
