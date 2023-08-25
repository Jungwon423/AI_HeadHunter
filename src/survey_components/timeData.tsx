import TimePicker from '../custom_time_picker/Timepicker'
import { useDispatch, useSelector } from 'react-redux'
import TimePickerPM from '../custom_time_picker/TimepickerPM'
import { AppDispatch } from '../store'
import { useFormatter } from 'next-intl'
import { selectDayDetails } from '../slices/timeSlice'

const getDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dateArray: Date[] = []

  for (
    let currentDate = startDate;
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    dateArray.push(new Date(currentDate))
  }

  return dateArray
}

const startDate = new Date('2023-08-24')
const endDate = new Date('2023-08-27')

// dateRange를 생성합니다.
const dateRange = getDateRange(startDate, endDate)
// const dispatch = useDispatch<AppDispatch>()
// dateRange와 한 주의 요일을 사용하여 data 배열을 만듭니다.
export const data = dateRange.map((date, index) => {
  const dayOfWeekKorean = ['일', '월', '화', '수', '목', '금', '토'][
    date.getDay()
  ]
  return [
    <div>{`${date.getMonth() + 1}/${date.getDate()}`}</div>,
    <div>{dayOfWeekKorean}</div>,
    <div>
      <TimePicker></TimePicker>
    </div>,
    <div>
      <TimePickerPM></TimePickerPM>
    </div>,
  ]
})
