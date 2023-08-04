import { useState, useEffect } from 'react'

const waitTexts: string[] = [
  'Please wait',
  'Processing request',
  'Almost there',
  'Hang tight',
]

const ProcessingPage = () => {
  const [waitTextIndex, setWaitTextIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWaitTextIndex((prevIndex) => (prevIndex + 1) % waitTexts.length)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-400 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-400 rounded-full animate-ping"></div>
      </div>
      <p className="text-lg md:text-xl font-bold text-center opacity-75 mt-8">
        {waitTexts[waitTextIndex]}
      </p>
    </div>
  )
}

export default ProcessingPage
