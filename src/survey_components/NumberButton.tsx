import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setDuration } from '../slices/travelInfoSlice'

interface NumberButtonProps {
  onDurationChange: (value: number) => void
}

const NumberButton: React.FC<NumberButtonProps> = ({ onDurationChange }) => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState<number | null>(1)
  useEffect(() => {
    if (inputValue !== null) {
      dispatch(setDuration(inputValue))
    }
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = parseInt(event.target.value)

    const clampedValue = Math.min(Math.max(enteredValue, 1), 30)
    setInputValue(clampedValue)
  }

  const handleDecrease = () => {
    if (inputValue && inputValue > 1) {
      setInputValue(inputValue - 1)
    }
  }

  const handleIncrease = () => {
    if (inputValue === null) {
      setInputValue(1)
    } else if (inputValue > 0 && inputValue < 30) {
      setInputValue(inputValue + 1)
    }
  }

  return (
    <div className="flex items-center justify-center text-center">
      <div className="mt-6 items-center space-x-0">
        <button
          onClick={handleDecrease}
          className="bg-indigo-500 w-8 text-white font-bold px-2 py-3 rounded-l-md hover:bg-indigo-600"
        >
          -
        </button>
        <input
          type="number"
          value={inputValue || ''}
          onChange={handleInputChange}
          placeholder="3"
          className="text-center duration-input w-16 md:w-20 h-12 pb-1 bg-white border-2 border-indigo-500 text-lg md:text-xl text-gray-700 focus:outline-none"
        />
        <button
          onClick={handleIncrease}
          className="bg-indigo-500 w-8 text-white font-bold px-2 py-3 rounded-r-md hover:bg-indigo-600"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default NumberButton
