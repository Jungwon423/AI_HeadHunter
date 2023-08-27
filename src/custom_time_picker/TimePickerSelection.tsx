import React, { use, useEffect, useState } from 'react'
import HourFormat from './HourFormat'
import HourWheel from './HourWheel'
import MinuteWheel from './MinuteWheel'
import {
  selectDayDetails,
  setEndTime,
  setStartTime,
  updateDayDetail,
} from '../slices/timeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'

function TimePickerSelection({
  pickerDefaultValue,
  initialValue,
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
  index,
  start,
}: any) {
  const initialTimeValue = use12Hours ? initialValue.slice(0, 5) : initialValue
  const [value, setValue] = useState(
    initialValue === null ? pickerDefaultValue : initialTimeValue,
  )
  const [hourFormat, setHourFormat] = useState({
    mount: false,
    hourFormat: initialValue.slice(6, 8),
  })

  useEffect(() => {
    if (controllers === false) {
      const finalSelectedValue = use12Hours
        ? `${value} ${hourFormat.hourFormat}`
        : value
      setInputValue(finalSelectedValue)
      onChange(finalSelectedValue)
    }
  }, [value])

  useEffect(() => {
    if (hourFormat.mount) {
      onAmPmChange(hourFormat.hourFormat)
    }
  }, [hourFormat])

  const params = {
    height,
    value,
    setValue,
    controllers,
    use12Hours,
    onAmPmChange,
    setHourFormat,
    hourFormat,
  }
  const dayDetails = useSelector(selectDayDetails)
  function convertTo24Hour(timeStr: string): {
    hours: number
    minutes: number
  } {
    const [time, period] = timeStr.split(' ')
    let [hours, minutes] = time.split(':')

    if (period === 'PM' && hours !== '12') {
      hours = String(Number(hours) + 12)
    } else if (period === 'AM' && hours === '12') {
      hours = '00'
    }
    return { hours: Number(hours), minutes: Number(minutes) }
  }
  const startTime = new Date(dayDetails[index].startTime)

  const dispatch = useDispatch<AppDispatch>()

  const handleSave = () => {
    const finalSelectedValue = use12Hours
      ? `${value} ${hourFormat.hourFormat}`
      : value
    setInputValue(finalSelectedValue)
    onChange(finalSelectedValue)
    console.log(finalSelectedValue)
    const { hours, minutes }: { hours: number; minutes: number } =
      convertTo24Hour(finalSelectedValue)
    const newDate = new Date(startTime)
    newDate.setHours(hours)
    newDate.setMinutes(minutes)
    if (start) {
      dispatch(setStartTime({ index, startTime: newDate.toString() }))
    } else {
      dispatch(setEndTime({ index, endTime: newDate.toString() }))
    }
    onSave(finalSelectedValue)
    setIsOpen(false)
  }
  const handleCancel = () => {
    onCancel()
    setIsOpen(false)
  }

  return (
    <>
      {controllers && (
        <div className="react-ios-time-picker-btn-container">
          <button
            className="react-ios-time-picker-btn react-ios-time-picker-btn-cancel"
            onClick={handleCancel}
          >
            {cancelButtonText}
          </button>
          <button className="react-ios-time-picker-btn" onClick={handleSave}>
            {saveButtonText}
          </button>
        </div>
      )}
      <div
        className="react-ios-time-picker-container"
        style={{ height: `${height * 5 + 40}px` }}
      >
        <div
          className="react-ios-time-picker-selected-overlay"
          style={{
            top: `${height * 2 + 20}px`,
            height: `${height}px`,
          }}
        />
        <HourWheel {...params} />
        {seperator && <div className="react-ios-time-picker-colon">:</div>}
        <MinuteWheel {...params} />
        {use12Hours && <HourFormat {...params} />}
      </div>
    </>
  )
}

export default TimePickerSelection
