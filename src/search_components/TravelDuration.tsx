// components/TravelDurationInput.tsx
import React, { useState, useEffect } from 'react'

interface TravelDurationProps {
  onDurationChange: (value: number) => void
}

const TravelDuration: React.FC<TravelDurationProps> = ({
  onDurationChange,
}) => {
  const [inputValue, setInputValue] = useState<number | null>(null)
  const [durationText, setDurationText] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = parseInt(event.target.value)

    const clampedValue = Math.min(Math.max(enteredValue, 1), 30)
    setInputValue(clampedValue)
  }

  useEffect(() => {
    if (inputValue !== null && inputValue > 1) {
      const nights = inputValue - 1
      setDurationText(`${nights}박 ${inputValue}일`)
    } else if (inputValue === 1) {
      setDurationText('당일여행')
    } else {
      setDurationText('')
    }
    onDurationChange(inputValue || 0)
  }, [inputValue])

  return (
    <div className="text-center py-10">
      <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
        여행 기간을 알려주세요
      </h2>
      <div className="flex flex-wrap justify-center mt-6 items-center space-x-4">
        <input
          type="number"
          value={inputValue || ''}
          onChange={handleInputChange}
          placeholder="3일"
          className="duration-input w-16 md:w-24 px-4 py-2 bg-white border-2 border-gray-300 rounded-md focus:border-indigo-500 text-lg md:text-xl text-gray-700 focus:outline-none"
        />
        <div className="w-auto px-4 py-2 rounded-md bg-indigo-500 flex items-center justify-center">
          <span className="text-center text-white text-sm md:text-base xl:text-xl">
            {durationText}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TravelDuration
