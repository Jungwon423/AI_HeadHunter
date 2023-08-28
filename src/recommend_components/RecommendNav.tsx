import React from 'react'
import Image from 'next/image'
import router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { selectTravelInfo } from '../slices/travelInfoSlice'
import { AppDispatch } from '../store'
import {
  selectRecommendState,
  setRecommendState,
} from '../slices/recommendSlice'

const RecommendNav = () => {
  const dispatch = useDispatch<AppDispatch>()
  const travelInfo = useSelector(selectTravelInfo)

  const recommendState: '전체' | '추천' | '비추천' =
    useSelector(selectRecommendState)

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
    <div className="w-[170px] h-screen flex flex-col">
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
      {['전체', '추천', '비추천'].map((state) => (
        <div
          key={state}
          className={`${
            state === recommendState ? 'text-blue-400' : 'text-slate-300'
          } text-sm py-5 ml-6 cursor-pointer font-bold hover:text-blue-300 `}
          onClick={() => {
            dispatch(setRecommendState(state as '전체' | '추천' | '비추천'))
          }}
        >
          {state}
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
