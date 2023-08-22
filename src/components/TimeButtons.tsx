// components/TimeButton.tsx
import React from 'react'

interface TimeButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

const TimeButton: React.FC<TimeButtonProps> = ({
  label,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`px-3 py-2 rounded-md text-sm font-medium border ${
        disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default TimeButton
