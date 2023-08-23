declare module 'react-ios-time-picker' {
  import * as React from 'react'

  interface TimePickerProps {
    value: Date
    onChange: (newTime: Date) => void
  }

  const TimePicker: React.FC<TimePickerProps>
  export default TimePicker
}
