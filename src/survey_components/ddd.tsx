import React, { useState } from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePicker from 'react-datepicker'
import ko from 'date-fns/locale/ko'
import 'react-datepicker/dist/react-datepicker.css'

function SDatePicker({ ...props }: ReactDatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date('2023/08/10'),
  )
  const [endDate, setEndDate] = useState<Date | null>(new Date('2023/08/10'))
  console.log(startDate, endDate)
  return (
    <>
      {/* <DatePicker
        {...props}
        disabledKeyboardNavigation
        locale={ko}
        selected={startDate}
        onChange={(date) => date && setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      /> */}
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
      <DatePicker
        locale={ko}
        selected={startDate}
        onChange={(date) => {
          if (date) {
            setStartDate(date[0])
            setEndDate(date[1] || null)
          }
        }}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        monthsShown={2} // 동시에 보여질 달력의 개수 설정
        peekNextMonth // 다음/이전 달의 일부를 미리보기 설정
        showMonthDropdown // 월 선택 설정
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          customHeaderCount,
        }) => (
          <div>
            <button
              aria-label="Previous Month"
              className={
                'react-datepicker__navigation react-datepicker__navigation--previous'
              }
              style={customHeaderCount === 1 ? { visibility: 'hidden' } : {}}
              onClick={decreaseMonth}
            >
              <span
                className={
                  'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
                }
              >
                {'<'}
              </span>
            </button>
            <span>
              {date.getFullYear()}년 {date.getMonth() + 1}월
            </span>
            <button
              aria-label="Next Month"
              className={
                'react-datepicker__navigation react-datepicker__navigation--next'
              }
              style={customHeaderCount === 0 ? { visibility: 'hidden' } : {}}
              onClick={increaseMonth}
            >
              <span
                className={
                  'react-datepicker__navigation-icon react-datepicker__navigation-icon--next'
                }
              >
                {'>'}
              </span>
            </button>
          </div>
        )}
      />
    </>
  )
}

export default SDatePicker
