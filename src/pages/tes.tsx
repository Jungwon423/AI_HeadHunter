import React, { useState } from 'react'
import TimePicker from '../custom_time_picker/Timepicker'

function App() {
  const [value, setValue] = useState('10:00')

  const onChange = (time: any) => {
    setValue(time)
  }

  return (
    <div className="h-screen justify-center items-center relative">
      <TimePicker onChange={() => onChange(value)} />
    </div>
  )
}

export default App
