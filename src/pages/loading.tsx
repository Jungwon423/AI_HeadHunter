import { useState, useEffect } from 'react'
import Lottie from 'react-lottie-player'

import loadingJson_1 from '../../public/assets/lottie/loading_1.json'

const waitTexts: string[] = [
  'Please wait',
  'Processing request',
  'Almost there',
  'Hang tight',
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
      <Lottie loop animationData={loadingJson_1} play style={{width : 150, height: 150}}></Lottie>
      <p className="text-lg md:text-xl font-bold text-center opacity-75 mt-8">
        {waitTexts[waitTextIndex]}
      </p>
    </div>
  )
}

export default Loading
