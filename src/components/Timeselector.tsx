// components/TimeSelector.tsx
import React, { useState } from 'react'
import TimeButton from './TimeButtons'

interface TimeSelectorProps {
  label: string
  interval: number
  max: number
  onValueChange: (value: number) => void
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  label,
  interval,
  max,
  onValueChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(0)

  const handleClick = (value: number) => {
    setSelectedValue(value)
    onValueChange(value)
  }

  const renderButtons = () => {
    const buttons = []

    for (let i = 0; i <= max; i += interval) {
      buttons.push(
        <TimeButton
          key={i}
          label={i.toString().padStart(2, '0')}
          onClick={() => handleClick(i)}
          disabled={i === selectedValue}
        />,
      )
    }

    return <div className="grid grid-cols-3 gap-2">{buttons}</div>
  }

  return (
    <div>
      <h2 className="mb-2 font-bold">{label}</h2>
      {renderButtons()}
    </div>
  )
}

export default TimeSelector
