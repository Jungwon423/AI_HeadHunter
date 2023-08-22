import React, { useEffect, useState } from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import DatePicker from 'react-datepicker'
import ko from 'date-fns/locale/ko'
// import '../styles/datepicker.css'
//import styles from '../styles/datepicker.module.css'
// import 'react-datepicker/dist/react-datepicker.css'
interface myDateProps {
  startDate: Date | null
  endDate: Date | null
  onDatesChange: (newStartDate: Date | null, newEndDate: Date | null) => void
}

const MyDatePicker = ({ startDate, endDate, onDatesChange }: myDateProps) => {
  const twoMonthsLater = () => {
    const currentDate = new Date()
    return new Date(currentDate.setMonth(currentDate.getMonth() + 2))
  }

  const dayClassNames = (date: Date) => {
    const day = date.getDay()
    if (day === 6) {
      return 'react-datepicker__saturday'
    } else if (day === 0) {
      return 'react-datepicker__sunday'
    } else {
      return ''
    }
  }

  return (
    <>
      <div className="hidden md:flex">
        <DatePicker
          minDate={new Date()}
          maxDate={twoMonthsLater()}
          dayClassName={dayClassNames}
          locale={ko}
          selected={startDate}
          onChange={(dates) => {
            const [newStartDate, newEndDate] = dates
            onDatesChange(newStartDate, newEndDate)
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          monthsShown={2} // 동시에 보여질 달력의 개수 설정
          peekNextMonth // 다음/이전 달의 일부를 미리보기 설
          renderCustomHeader={({
            date,
            monthDate,
            decreaseMonth,
            increaseMonth,
            customHeaderCount,
          }) => (
            <div className="pb-4">
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
              {customHeaderCount === 0 ? (
                <span className="text-sm">
                  {date.getFullYear()}년 {monthDate.getMonth() + 1}월
                </span>
              ) : (
                <span className="text-sm">
                  {date.getFullYear()}년 {monthDate.getMonth() + 1}월
                </span>
              )}
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
      </div>
      <div className="md:hidden">
        <DatePicker
          minDate={new Date()}
          maxDate={twoMonthsLater()}
          dayClassName={dayClassNames}
          locale={ko}
          selected={startDate}
          onChange={(dates) => {
            const [newStartDate, newEndDate] = dates
            onDatesChange(newStartDate, newEndDate)
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          monthsShown={1} // 동시에 보여질 달력의 개수 설정
          peekNextMonth // 다음/이전 달의 일부를 미리보기 설
          renderCustomHeader={({
            date,
            monthDate,
            decreaseMonth,
            increaseMonth,
          }) => (
            <div className="pb-4">
              <button
                aria-label="Previous Month"
                className={
                  'react-datepicker__navigation react-datepicker__navigation--previous'
                }
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

              <span className="text-sm">
                {date.getFullYear()}년 {monthDate.getMonth() + 1}월
              </span>

              <button
                aria-label="Next Month"
                className={
                  'react-datepicker__navigation react-datepicker__navigation--next'
                }
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
      </div>
    </>
  )
}

export default MyDatePicker
