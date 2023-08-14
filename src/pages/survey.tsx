import router from 'next/router'
import MyNavbar from '../search_components/MyNavbar'
import CircleListItem from '../survey_components/CircleList'
import { SyntheticEvent, useState } from 'react'
import WhoSurvey from '../survey_components/WhoSurvey'
// import CustomDatePicker from '../survey_components/CustomDatePicker'
import 'react-datepicker/dist/react-datepicker.css'
import TDatePicker from '../survey_components/test'
import DatePicker from '../index_components/DatePicker'
import SDatePicker from '../survey_components/ddd'

export default function SurveyPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleItemClick = (index: number) => {
    setSelectedIndex(index)
  }
  const items = [
    '어디로 떠나시나요?',
    '언제 가시나요?',
    '여행 스타일은 어떻게 되시나요?',
  ]
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  return (
    <div className="h-screen">
      <MyNavbar></MyNavbar>

      <div className="flex flex-row w-screen">
        <div className="hidden md:block overflow-hidden w-0 md:w-1/3 md:min-w-1/3 relative p-8">
          <button onClick={() => router.back}>
            <div className="flex justify-center items-center bg-slate-300 h-8 w-8 rounded-full mb-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="indigo"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </div>
          </button>
          <div className="pt-20 flex flex-col space-y-16">
            {items.map((item, index) => (
              <CircleListItem
                key={index}
                text={item}
                onClick={() => handleItemClick(index)}
                isSelected={selectedIndex === index}
              />
            ))}
          </div>
        </div>
        {selectedIndex == 0 ? <WhoSurvey /> : null}
        {selectedIndex == 1 ? (
          <div className="flex py-5 w-full flex-col items-center">
            <div className="px-10 flex flex-col flex-grow">
              <div className="text-2xl font-bold pt-20">
                여행 날짜는 언제인가요?
              </div>
              {/* <TDatePicker
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  //setDateRange(update)
                  console.log(update)
                }}
                isClearable
                placeholderText="달력"
              /> */}
              <SDatePicker
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  //setDateRange(update)
                  console.log(update)
                }}
              ></SDatePicker>
              {selectedDate && (
                <p className="mt-4">
                  선택한 날짜:{' '}
                  <strong>{selectedDate.toLocaleDateString('ko-KR')}</strong>
                </p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
