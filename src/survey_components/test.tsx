import React from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import ko from 'date-fns/locale/ko'

function TDatePicker({ ...props }: ReactDatePickerProps) {
  return (
    <div className="w-64 h-64">
      <ReactDatePicker {...props} disabledKeyboardNavigation locale={ko} />
    </div>
  )
}

export default TDatePicker
