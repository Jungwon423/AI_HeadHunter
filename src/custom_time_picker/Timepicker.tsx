import React, { useEffect, useState } from 'react'
import { Portal } from 'react-portal'
import TimePickerSelection from './TimePickerSelection'

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
}) {
  const [isOpen, setIsOpen] = useState(initialIsOpenValue)
  const [height, setHeight] = useState(cellHeight)
  const [inputValue, setInputValue] = useState(initialValue)

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
  }

  return (
    <>
      <div className="flex react-ios-time-picker-main" onClick={handleClick}>
        <input
          id={id}
          name={name}
          className={`react-ios-time-picker-input ${inputClassName || ''}`}
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
            <TimePickerSelection {...params} />
          </div>
        </Portal>
      )}
    </>
  )
}

export default TimePicker
