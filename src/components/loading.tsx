import { useState, useEffect } from 'react'
import Lottie from 'react-lottie-player'

import loadingJson_1 from '../../public/assets/lottie/loading_1.json'

const waitTexts: string[] = [
  '나에게 딱 맞는 여행지를 찾는 중...',
  '잠시만 기다려주세요',
  '여행지를 추천받는 중...',
  '여행지 추천 이유 적는 중...',
  '여행지 분석 중...',
]

const Loading = () => {
  const [waitTextIndex, setWaitTextIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWaitTextIndex((prevIndex) => (prevIndex + 1) % waitTexts.length)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie
        loop
        animationData={loadingJson_1}
        play
        style={{ width: 150, height: 150 }}
      ></Lottie>
      <p className="text-lg md:text-xl font-bold text-center opacity-75 mt-8">
        {waitTexts[waitTextIndex]}
      </p>
    </div>
  )
}

export default Loading
