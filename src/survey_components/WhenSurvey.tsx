import React, { useEffect, useState } from 'react'
import MyDatePicker from './MyDatePicker'
import { useDispatch } from 'react-redux'
import { setDuration } from '../slices/travelInfoSlice'
import { AppDispatch } from '../store'
import { setEndDate, setStartDate } from '../slices/timeSlice'

const WhenSurvey = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [startDate, setStart] = useState<Date | null>(null)
  const [endDate, setEnd] = useState<Date | null>(null)
  const handleDatesChange = (
    newStartDate: Date | null,
    newEndDate: Date | null,
  ) => {
    setStart(newStartDate)
    setEnd(newEndDate)
    let maxDate = new Date(newStartDate!)
    maxDate.setDate(newStartDate!.getDate() + 7)
    if (newEndDate! > maxDate) {
      setEnd(maxDate)
    } else setEnd(newEndDate)
  }

  useEffect(() => {
    dispatch(setStartDate(startDate?.toString()!))
    dispatch(setEndDate(endDate?.toString()!))
    dispatch(setDuration(duration(startDate, endDate)))
  }, [startDate, endDate])

  const duration = (startDate: Date | null, endDate: Date | null) => {
    if (endDate != null && startDate != null) {
      const differenceInMilliseconds = endDate.getTime() - startDate.getTime()
      const differenceInDays = Math.ceil(
        differenceInMilliseconds / (1000 * 60 * 60 * 24),
      ) // 일수 계산 (소수점 올림)
      const days = differenceInDays + 1
      return days
    } else return 0
  }
  return (
    <div className="flex py-5 w-full flex-col items-center">
      <div className="px-10 flex flex-col flex-grow">
        <div className="text-2xl font-bold pt-16">여행 날짜는 언제인가요?</div>
        <div className="text-base font-bold text-indigo-500 pt-3 pb-7">
          7박 8일까지 선택가능합니다
        </div>

        <div className="flex flex-row pb-10">
          <div className="py-2 border-b-2">
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
          <div className="pl-10 py-2 border-b-2">
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
          <div className="flex-grow-0 md:flex-grow border-b-2"></div>
          {startDate && endDate ? (
            <div className=" pl-10 pt-4 border-b-2">
              <div className="w-auto px-4 py-2 rounded-md bg-indigo-400 flex items-center justify-center">
                {duration(startDate, endDate) == 0 ? (
                  <span className="text-center text-white text-sm md:text-base">
                    당일치기
                  </span>
                ) : (
                  <span className="text-center text-white text-sm md:text-base">
                    {duration(startDate, endDate) - 1}박{' '}
                    {duration(startDate, endDate)}일
                  </span>
                )}
              </div>
            </div>
          ) : null}
        </div>

        <MyDatePicker
          startDate={startDate}
          endDate={endDate}
          onDatesChange={handleDatesChange}
        ></MyDatePicker>
      </div>
    </div>
  )
}

export default WhenSurvey
