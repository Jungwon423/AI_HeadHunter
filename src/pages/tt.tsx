import { useState } from 'react'

const TimeSelector = () => {
  const [value, setValue] = useState(0)

  const increaseValue = () => {
    setValue((prevValue) => prevValue + 1)
  }

  const decreaseValue = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1)
    }
  }

  const handleWheelEvent = (e: any) => {
    e.deltaY < 0 ? increaseValue() : decreaseValue()
  }

  return (
    <div className="flex">
      <input
        type="number"
        className="border-2 border-gray-300 p-2 rounded-md"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        onWheel={handleWheelEvent}
      />

      <button onClick={increaseValue} className="">
        Increase
      </button>

      <button
        onClick={decreaseValue}
        className="relative bg-slate-600 text-white px-4 py-2 rounded-md ml-10"
      >
        Decrease
      </button>
    </div>
  )
}

export default TimeSelector
