import { useState } from 'react'

interface TravelBudgetProps {
  onBudgetChange: (value: number) => void
}

const TravelBudget: React.FC<TravelBudgetProps> = ({ onBudgetChange }) => {
  const [budget, setBudget] = useState<string>('')

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/,/g, '') // remove existing commas
    const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') // add commas every 3 digits
    setBudget(formattedValue)
    onBudgetChange(parseInt(value))
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-lg md:text-xl font-bold mb-4">
        Please enter your travel budget
      </p>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="text-2xl md:text-3xl font-bold text-center border-b-2 border-gray-400 focus:outline-none focus:border-indigo-400 w-48 md:w-64"
        value={budget}
        onChange={handleBudgetChange}
      />
    </div>
  )
}

export default TravelBudget
