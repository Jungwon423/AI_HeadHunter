import React, { useState } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import TripDateTimeInput from '../components/trip'
import TimeInput from './TimeInput'
import TimePicker from 'react-time-picker'
// import { TimePicker2 } from 'react-ios-time-picker'

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

  return (
    <div className="flex py-5 w-full flex-row items-center">
      <div className="px-10 flex flex-col flex-grow">
        <div className="text-2xl font-bold pt-20">여행시작 시간</div>
        <div className="flex flex-col pt-12">
          2023.08.24(목) - 2023.08.27(일)
          <div>여행 시작 시간</div>
          <div>마드리드를 떠나는 시간</div>
        </div>
        <TripDateTimeInput onDateTimeChanged={handleDateTimeChanged} />
        <TimeInput />
      </div>
      <div>
        <TimePicker onChange={onChange} value={value} />
        {/* <TimePicker label="Basic time picker" /> */}
      </div>
    </div>
  )
}

export default HowSurvey
