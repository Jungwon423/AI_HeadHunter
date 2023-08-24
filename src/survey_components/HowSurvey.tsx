import React, { use, useState } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import TripDateTimeInput from '../components/trip'
import TimePicker from '../custom_time_picker/Timepicker'
import TimePickerPM from '../custom_time_picker/TimepickerPM'
import SimpleTable from './Table'
import { data } from './timeData'
import { selectDayDetails } from '../slices/timeSlice'

const HowSurvey = () => {
  const dispatch = useDispatch<AppDispatch>()
  const handleDateTimeChanged = (start: string, end: string) => {
    console.log('여행 시작 시간:', start)
    console.log('여행 종료 시간:', end)
  }
  const [value, setValue] = useState('10:00')

  const onChange = (timeValue: any) => {
    setValue(timeValue)
  }
  const [toggleState, setToggleState] = useState<boolean>(false)

  const handleToggle = () => {
    setToggleState(!toggleState)
  }

  const header = ['일자', '요일', '시작시간', '종료시간']
  const dayDetails = useSelector(selectDayDetails)
  console.log(dayDetails)
  console.log(new Date(2023, 8, 25).toDateString())

  return (
    <div className="flex py-5 w-full flex-row items-center">
      <div className="px-10 flex flex-col flex-grow">
        <div className="text-2xl font-bold pt-20">여행시작 시간</div>
        <div className="flex pt-5">
          <div className="font-bold pr-3 pt-1">2023.08.24(목)</div>{' '}
          <TimePicker onChange={() => onChange(value)} />
          <div className="w-5 pt-1">---</div>
          <div className="font-bold pl-3 pr-3 pt-1">2023.08.27(일)</div>{' '}
          <TimePickerPM onChange={() => onChange(value)} />
        </div>
        <div className="flex">
          <div className="pt-3 pr-2 text-gray-700">여행시간 상세 설정</div>
          <div onClick={() => handleToggle()} className="cursor-pointer">
            {toggleState ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="flex text-black font-extrabold mt-4 mr-2 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="flex text-black font-extrabold mt-4 mr-2 w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </div>
        </div>
        {toggleState ? (
          <div>
            <div className="text-gray-600 pt-5 text-sm">
              여행 날짜별 <b>시작시간</b>과 <b>종료시간</b>을 설정해주세요.
            </div>
            <div className="text-gray-600 text-sm">
              기본 여행 시간은 <b>오전 10시</b> ~ <b>오후 10시</b> 입니다.
            </div>
            <div className="flex pt-3">
              <div className="w-[400px]">
                <SimpleTable header={header} data={data} />
              </div>
            </div>
            {/* <TripDateTimeInput onDateTimeChanged={handleDateTimeChanged} /> */}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default HowSurvey
