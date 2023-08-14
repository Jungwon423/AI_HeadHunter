import React, { useState } from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePicker from 'react-datepicker'
import ko from 'date-fns/locale/ko'

function SDatePicker({ ...props }: ReactDatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date('2023/08/10'),
  )
  const [endDate, setEndDate] = useState<Date | null>(new Date('2023/08/10'))
  console.log(startDate, endDate)
  return (
    <>
      <DatePicker
        {...props}
        disabledKeyboardNavigation
        locale={ko}
        selected={startDate}
        onChange={(date) => date && setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        {...props}
        disabledKeyboardNavigation
        selected={endDate}
        locale={ko}
        onChange={(date) => date && setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </>
  )
}

export default SDatePicker
