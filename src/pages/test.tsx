import Image from 'next/image'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

// const DynamicComponentWithNoSSR = dynamic(
//   () => import('../components/TimePicker2'),
//   { ssr: false },
// )

const TestPage: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date())
  const [value, setValue] = useState(0)

  const increaseValue = () => {
    setValue((prevValue) => prevValue + 1)
  }

  const decreaseValue = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1)
    }
  }

  return (
    <>
      {/* <DynamicComponentWithNoSSR></DynamicComponentWithNoSSR> */}
      <div className="container mx-auto">
        <h1 className="text-4xl my-8">시간 선택기</h1>
        <div></div>
        <div className="flex">
          <input
            type="number"
            className="border-2 border-gray-300 p-2 rounded-md"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />

          <button
            onClick={increaseValue}
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-auto"
          >
            Increase
          </button>

          <button
            onClick={decreaseValue}
            className="bg-red-500 text-white rounded-md"
          >
            Decrease
          </button>
        </div>
      </div>
    </>
  )
}

export default TestPage
