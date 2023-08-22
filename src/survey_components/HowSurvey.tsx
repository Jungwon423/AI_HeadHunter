import React, { useState } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import TripDateTimeInput from '../components/trip'

const HowSurvey = () => {
  const dispatch = useDispatch<AppDispatch>()
  const handleDateTimeChanged = (start: string, end: string) => {
    console.log('여행 시작 시간:', start)
    console.log('여행 종료 시간:', end)
  }

  return (
    <div className="flex py-5 w-full flex-row items-center">
      <div className="px-10 flex flex-col flex-grow">
        <div className="text-2xl font-bold pt-20">여행시작 시간</div>
        <div className="flex flex-row pt-12">
          <div className="flex flex-row w-48 shadow-xl rounded-md">
            <div className="flex-col bg-indigo-400 rounded-l-md px-3 py-3">
              <div className="flex justify-center text-white font-extrabold">
                23
              </div>
              <div className="flex text-stone-100">OCT</div>
            </div>
            <div className="flex flex-col justify-center items-center px-5">
              <div className="flex flex-row justify-center text-indigo-500">
                <div className="font-extrabold">08</div>
                <div className="">:23am</div>
              </div>
              <div className="flex text-indigo-400">FROM</div>
            </div>
          </div>
          <div className="mx-10 flex flex-row w-42 shadow-xl rounded-md">
            <div className="flex-col bg-indigo-400 rounded-l-md px-3 py-3">
              <div className="flex justify-center text-white font-extrabold">
                26
              </div>
              <div className="flex text-stone-100">OCT</div>
            </div>
            <div className="flex flex-col justify-center items-center px-5">
              <div className="flex flex-row justify-center text-indigo-500">
                <div className="font-extrabold">17</div>
                <div className="">:54pm</div>
              </div>
              <div className="flex text-indigo-400">TO</div>
            </div>
          </div>
        </div>
        <TripDateTimeInput onDateTimeChanged={handleDateTimeChanged} />
      </div>
    </div>
  )
}

export default HowSurvey
