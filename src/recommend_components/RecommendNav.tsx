import React, { useState } from 'react'
import Image from 'next/image'
import router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { selectTravelInfo } from '../slices/travelInfoSlice'
import { PlaceInfo } from '../interfaces/placeInfo'
import { selectAttractions, setCurrentDay } from '../slices/recommendSlice'
import { AppDispatch } from '../store'

const RecommendNav = () => {
  const dispatch = useDispatch<AppDispatch>()
  const travelInfo = useSelector(selectTravelInfo)

  const attractions: PlaceInfo[][] = useSelector(selectAttractions) || []
  let buttonStatus: string = ''
  let buttonColor: string = 'bg-blue-500'

  const navigateToTravelPage = () => {
    router.push('/travel')
  }

  if (travelInfo.loading === 'pending') {
    buttonStatus = 'loading'
    buttonColor = 'bg-gray-500'
  } else if (travelInfo.loading === 'failed') {
    buttonStatus = 'something wrong'
    buttonColor = 'bg-red-500'
  } else {
    buttonStatus = '다음'
    buttonColor = 'bg-blue-500'
  }

  let buttonClass = `rounded px-4 py-2 font-bold text-white hover:bg-blue-600 ${buttonColor} `

  const changeDay = (day: number) => {
    dispatch(setCurrentDay(day))
  }

  return (
    <div className="w-[100px] h-screen flex flex-col">
      <button
        className="flex list-none ml-3 my-5"
        onClick={() => router.push('/')}
      >
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={10}
          height={10}
          style={{
            maxWidth: '100%',
            width: 'auto',
            height: 'auto',
          }}
        />
        <span className="ml-1 font-bold text-xs font-mono">Trippy</span>
      </button>
      <div
        className="text-slate-300 text-sm py-5 ml-6 cursor-pointer font-bold hover:text-blue-400"
        onClick={() => changeDay(0)}
      >
        전체
      </div>
      {attractions.map((attraction, day) => (
        <div
          key={day}
          className="text-slate-300 text-sm py-5 ml-6 cursor-pointer font-bold hover:text-blue-400"
          onClick={() => changeDay(day + 1)}
        >
          Day {day + 1}
        </div>
      ))}

      <div className="flex-grow"></div>
      <div className="flex justify-center pl-2 pb-5">
        <button className={buttonClass} onClick={navigateToTravelPage}>
          {buttonStatus}
        </button>
      </div>
    </div>
  )
}

export default RecommendNav
