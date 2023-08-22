import React, { useState } from 'react'
import TimePicker from 'react-time-picker'

const TimeInput = () => {
  const [time, setTime] = useState('12:00') // 기본값은 12시 0분으로 설정합니다.
  const setTimeto = (time: any) => {
    setTime(time)
  }

  return (
    <div className="relative">
      <TimePicker
        className="bg-white px-4 py-2 rounded-md shadow-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disableClock={true} // 분 단위를 선택하는 clock 기능을 끕니다.
        onChange={setTimeto}
        value={time}
      />
      <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-md shadow-md overflow-hidden">
        {/* 시간 선택 input을 클릭할 때마다 보여지는 드롭다운 메뉴 */}
        <p className="text-gray-400 text-sm px-2 py-1">시간 선택</p>
        <div className="flex flex-wrap">
          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
            <div
              className={`w-1/6 px-2 py-1 ${
                time.split(':')[0] === `${hour}` ? 'bg-gray-200' : ''
              }`}
              key={hour}
              onClick={() => {
                setTime(`${hour}:${time.split(':')[1]}`)
              }}
            >
              {hour}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimeInput
