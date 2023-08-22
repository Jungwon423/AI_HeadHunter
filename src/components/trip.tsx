// components/TripDateTimeInput.tsx

import React, { ChangeEventHandler, useState } from 'react'

interface TripDateTimeInputProps {
  onDateTimeChanged: (start: string, end: string) => void
}

const TripDateTimeInput: React.FC<TripDateTimeInputProps> = ({
  onDateTimeChanged,
}) => {
  const [startDateTime, setStartDateTime] = useState('')
  const [endDateTime, setEndDateTime] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.name === 'start') {
      setStartDateTime(event.target.value)
    } else if (event.target.name === 'end') {
      setEndDateTime(event.target.value)
    }
    onDateTimeChanged(startDateTime, endDateTime)
  }

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="start"
          className="block text-sm font-medium text-gray-700"
        >
          여행 시작 시간
        </label>
        <input
          type="datetime-local"
          name="start"
          id="start"
          className="mt-2 p-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md"
          value={startDateTime}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="end"
          className="block text-sm font-medium text-gray-700"
        >
          여행 종료 시간
        </label>
        <input
          type="datetime-local"
          name="end"
          id="end"
          className="mt-2 p-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm rounded-md"
          value={endDateTime}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default TripDateTimeInput
