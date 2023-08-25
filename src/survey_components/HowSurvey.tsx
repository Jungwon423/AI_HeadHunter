import React, { use, useState } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import TimePicker from '../custom_time_picker/Timepicker'
import TimePickerPM from '../custom_time_picker/TimepickerPM'
import SimpleTable from './Table'
// import { data } from './timeData'
import {
  selectDayDetails,
  selectEndDate,
  selectStartDate,
} from '../slices/timeSlice'

const HowSurvey = () => {
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

  const startDate = useSelector(selectStartDate)
  const endDate = useSelector(selectEndDate)

  function formatDate(tempDate: string) {
    const date = new Date(tempDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하기 때문에 +1 필요
    const day = String(date.getDate()).padStart(2, '0')

    const weekdays = ['일', '월', '화', '수', '목', '금', '토']
    const weekday = weekdays[date.getDay()]

    return `${year}.${month}.${day}(${weekday})`
  }

  // dateRange를 생성합니다.
  const dateRange = getDateRange(new Date(startDate), new Date(endDate))
  const data = dateRange.map((date, index) => {
    const dayOfWeekKorean = ['일', '월', '화', '수', '목', '금', '토'][
      date.getDay()
    ]
    return [
      <div>{`${date.getMonth() + 1}/${date.getDate()}`}</div>,
      <div>{dayOfWeekKorean}</div>,
      <div>
        <TimePicker index={index} start={true}></TimePicker>
      </div>,
      <div>
        <TimePickerPM index={index} start={false}></TimePickerPM>
      </div>,
    ]
  })
  const [toggleState, setToggleState] = useState<boolean>(false)

  const handleToggle = () => {
    setToggleState(!toggleState)
  }
  const hi = true
  const dd = useSelector(selectDayDetails)
  console.log(dd)
  const header = ['일자', '요일', '시작시간', '종료시간']
  return (
    <div className="flex flex-col py-5 w-full justify-center">
      <div className="px-10 flex flex-col flex-grow">
        <div className="text-2xl pt-20 font-bold">여행 스타일을 알려주세요</div>
        <div className="pt-5 font-bold text-stone-600">
          가보고 싶은 곳을 고를 때 나는
        </div>
        <div className="w-[500px] grid grid-cols-2 gap-4 pt-2">
          <div className="w-[220px] h-[230px] border-2 pt-2 px-5 flex flex-col rounded-lg items-center justify-center">
            <div className="p-1">
              <Image
                src={`/assets/famous.jpg`}
                alt="대체_텍스트"
                width={200}
                height={200}
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div className="font-bold text-gray-600">유명한 곳에 갈래요</div>
          </div>
          <div className="w-[220px] h-[230px] border-2 pt-2 px-5 flex flex-col rounded-lg items-center justify-center">
            <div className="p-1">
              <Image
                src={`/assets/novel.jpg`}
                alt="대체_텍스트"
                width={200}
                height={200}
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div className="font-bold text-gray-600">참신한 곳에 갈래요</div>
          </div>
        </div>
        <div className="pt-5 font-bold text-stone-600">
          관광지를 둘러볼 때 나는
        </div>
        <div className="w-[500px] grid grid-cols-2 gap-4 pt-2">
          <div className="w-[220px] h-[230px] border-2 pt-2 px-5 flex flex-col rounded-lg items-center justify-center">
            <div className="p-1">
              <Image
                src={`/assets/busy.jpg`}
                alt="대체_텍스트"
                width={200}
                height={200}
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div className="font-bold text-gray-600">바쁘게 돌아다닌다</div>
          </div>
          <div className="w-[220px] h-[230px] border-2 pt-2 px-5 flex flex-col rounded-lg items-center justify-center">
            <div className="p-1">
              <Image
                src={`/assets/lazy.jpg`}
                alt="대체_텍스트"
                width={200}
                height={200}
                layout="responsive"
                objectFit="contain"
              />
            </div>
            <div className="font-bold text-gray-600">느긋하게 다닌다</div>
          </div>
        </div>
        <div className="flex pt-10">
          <div className="flex text-lg font-bold pr-5">여행 시작 시간</div>
          <div className="px-2 pt-1">{formatDate(startDate)}</div>
          <TimePicker index={0} start={true}></TimePicker>
        </div>
        <div className="flex pt-5">
          <div className="text-lg font-bold pr-5">여행 종료 시간</div>
          <div className="pl-2 pr-3 pt-1">{formatDate(endDate)}</div>
          <TimePickerPM index={data.length - 1} start={true} />
        </div>
        <div className="flex">
          <div className="pt-3 pr-2 text-gray-700">여행시간 상세 설정</div>
          <div onClick={() => handleToggle()} className="cursor-pointer">
            {toggleState ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="flex text-black font-extrabold mt-4 mr-2 w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                  />
                </svg>
              </>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="flex text-black font-extrabold mt-4 mr-2 w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            )}
          </div>
        </div>
        {toggleState ? (
          <div>
            <div className="text-gray-600 pt-5 text-sm">
              여행 날짜별 <b>시작시간</b>과 <b>종료시간</b>을 설정해주세요.
            </div>
            <div className="text-gray-600 text-sm">
              기본 여행 시간은 <b>오전 10시</b> ~ <b>오후 10시</b> 입니다.
            </div>
            <div className="flex pt-3">
              <div className="w-[400px]">
                <SimpleTable header={header} data={data} />
              </div>
            </div>
            {/* <TripDateTimeInput onDateTimeChanged={handleDateTimeChanged} /> */}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default HowSurvey
