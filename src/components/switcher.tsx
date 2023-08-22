import React, { useState } from 'react'

interface SwitcherProps {
  onToggle: (value: boolean) => void
}

const Switcher = (props: SwitcherProps) => {
  const [isChecked, setIsChecked] = useState(true)
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
    props.onToggle(!isChecked)
  }

  return (
    <>
      <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="sr-only"
        />
        <span className="label flex items-center text-lg font-bold text-stone-400">
          Front
        </span>
        <span
          className={`slider mx-3 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
            isChecked ? 'bg-indigo-400' : 'bg-[#CCCCCE]'
          }`}
        >
          <span
            className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
              isChecked ? 'translate-x-[28px]' : ''
            }`}
          ></span>
        </span>
        <span className="label flex items-center text-lg font-bold text-indigo-400">
          Back
        </span>
      </label>
    </>
  )
}

export default Switcher
