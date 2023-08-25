import React, { useEffect, useRef, useState } from 'react'
import { Portal } from 'react-portal'
import TimePickerSelection from './TimePickerSelection'
import { useSelector } from 'react-redux'
import { selectDayDetails } from '../slices/timeSlice'

function TimePickerPM({
  value: initialValue = null,
  cellHeight = 28,
  placeHolder = '10:00 PM',
  pickerDefaultValue = '10:00',
  onChange = () => {},
  onFocus = () => {},
  onSave = () => {},
  onCancel = () => {},
  disabled = false,
  isOpen: initialIsOpenValue = false,
  required = false,
  cancelButtonText = '취소',
  saveButtonText = '저장',
  controllers = true,
  seperator = true,
  id = 'null',
  use12Hours = true,
  onAmPmChange = () => {},
  name = 'null',
  onOpen = () => {},
  popupClassName = null,
  inputClassName = null,
  index = 0,
  start = false,
}) {
  function formatLocalTime(date: Date) {
    let hours = date.getHours()
    const minutes = ('0' + date.getMinutes()).slice(-2) // Always two digits
    const period = hours >= 12 ? 'PM' : 'AM'

    if (hours > 12) {
      hours -= 12
    } else if (hours === 0) {
      hours = 12
    }
    return `${hours}:${minutes} ${period}`
  }

  const [isOpen, setIsOpen] = useState(initialIsOpenValue)
  const [height, setHeight] = useState(cellHeight)
  let [inputValue, setInputValue] = useState<string | null>(initialValue)
  let temp = useSelector(selectDayDetails)
  if (temp[index].endTime) {
    let tempDate = new Date(temp[index].endTime)
    inputValue = formatLocalTime(tempDate)
  }
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleFocus = () => {
    onFocus()
    onOpen()
  }

  //   let finalValue = inputValue
  let finalValue: string | null = ''
  finalValue = inputValue

  if (initialValue === null && use12Hours) {
    finalValue = `${pickerDefaultValue} AM`
  } else if (initialValue === null && !use12Hours) {
    finalValue = pickerDefaultValue
  }

  const params = {
    onChange,
    height,
    onSave,
    onCancel,
    cancelButtonText,
    saveButtonText,
    controllers,
    setInputValue,
    setIsOpen,
    seperator,
    use12Hours,
    onAmPmChange,
    initialValue: finalValue,
    pickerDefaultValue,
    index,
    start,
  }

  const inputRef = useRef<HTMLDivElement>(null) // useRef를 사용하여 input의 위치를 참조합니다.

  const handlePickerPosition = () => {
    if (!inputRef.current) {
      return {}
    }

    const rect = inputRef.current.getBoundingClientRect()
    return {
      top: rect.top + rect.height + window.scrollY, // input 아래에 위치
      left: rect.left + window.scrollX, //input과 같은 가로 위치
    }
  }

  return (
    <>
      <div className="react-ios-time-picker-main" onClick={handleClick}>
        <input
          id={id}
          name={name}
          className={`react-ios-time-picker-input border-none ${
            inputClassName || ''
          }`}
          value={inputValue === null ? '' : inputValue}
          type="text"
          placeholder={placeHolder}
          readOnly
          disabled={disabled}
          required={required}
          onFocus={handleFocus}
        />
      </div>
      {isOpen && !disabled && (
        <Portal>
          <div className="react-ios-time-picker-popup">
            <div
              className={`react-ios-time-picker-popup-overlay ${
                popupClassName || ''
              }`}
              onClick={() => setIsOpen(!isOpen)}
            />
            <div
              className="react-ios-time-picker react-ios-time-picker-transition"
              style={handlePickerPosition()}
            >
              <TimePickerSelection {...params} />
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}

export default TimePickerPM
