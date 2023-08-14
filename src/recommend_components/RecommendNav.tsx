import React, { useState } from 'react'
import Image from 'next/image'
import router from 'next/router'
import { useSelector } from 'react-redux'
import { selectTravelInfo } from '../slices/travelInfoSlice'

const RecommendNav = () => {
  const travelInfo = useSelector(selectTravelInfo)
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

      <div className="text-slate-300 text-sm py-5 ml-6 cursor-pointer font-bold hover:text-blue-400">
        Day 1
      </div>
      <div className="text-slate-300 text-sm py-5 ml-6 cursor-pointer font-bold hover:text-blue-400">
        Day 2
      </div>
      <div className="text-slate-300 text-sm py-5 ml-6 cursor-pointer font-bold hover:text-blue-400">
        Day 3
      </div>

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
