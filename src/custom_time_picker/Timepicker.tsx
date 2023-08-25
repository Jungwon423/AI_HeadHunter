import React, { useEffect, useState } from 'react'
import { Portal } from 'react-portal'
import TimePickerSelection from './TimePickerSelection'
import { useSelector } from 'react-redux'
import { selectCityDetail } from '../slices/cityDetailSlice'
import { selectDayDetails } from '../slices/timeSlice'

function TimePicker({
  value: initialValue = null,
  cellHeight = 28,
  placeHolder = '10:00 AM',
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
  start = true,
}) {
  const [isOpen, setIsOpen] = useState(initialIsOpenValue)
  const [height, setHeight] = useState(cellHeight)
  let [inputValue, setInputValue] = useState<string | null>(initialValue)
  let temp = useSelector(selectDayDetails)
  if (temp[0].startTime === null) {
  } else {
    inputValue = temp[0].startTime
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

  return (
    <>
      <div className="flex react-ios-time-picker-main" onClick={handleClick}>
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
            <div className="react-ios-time-picker react-ios-time-picker-transition">
              <TimePickerSelection {...params} />
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}

export default TimePicker
