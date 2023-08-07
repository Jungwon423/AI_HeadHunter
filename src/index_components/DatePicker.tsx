// components/DatePicker.tsx
import React, { useState } from 'react'
import ReactDatePicker, {
  registerLocale,
  setDefaultLocale,
} from 'react-datepicker'
import { ko } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('ko', ko)
setDefaultLocale('ko')

interface DatePickerProps {
  selectedDate: Date | null
  onDateChange: (date: Date | null) => void
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={(date) => onDateChange(date)}
      locale="ko"
      dateFormat="yyyy-MM-dd"
    />
  )
}

export default DatePicker
