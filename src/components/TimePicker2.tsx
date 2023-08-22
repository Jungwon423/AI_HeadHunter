import Image from 'next/image'
import React, { useRef, useEffect, useState, useCallback } from 'react'

import 'react-time-picker/dist/TimePicker.css'
import TimePicker from 'react-ios-time-picker'
//import TimePicker from 'react-ios-time-picker';

const TimePicker2: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date())

  const handleChange = (newTime: Date): void => {
    setTime(newTime)
  }

  return (
    <div>
      <TimePicker value={time} onChange={handleChange} />
    </div>
  )
}

export default TimePicker2
