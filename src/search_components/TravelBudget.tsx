import { useState } from 'react'

interface TravelBudgetProps {
  onBudgetChange: (value: number) => void
}

const TravelBudget: React.FC<TravelBudgetProps> = ({ onBudgetChange }) => {
  const [budget, setBudget] = useState<string>('')

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^0-9]/g, '') // remove non-numeric characters
    const formattedValue = '₩' + rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',') // add commas every 3 digits
    // if (formattedValue === '₩') {
    //   setBudget('')
    // }
    setBudget(formattedValue)
    onBudgetChange(parseInt(rawValue))
  }

  return (
    <div className="flex flex-col items-center justify-center py-5">
      <div className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
        여행 예산을 입력해주세요.
      </div>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="text-2xl md:text-3xl font-medium text-center border-b-2 border-gray-400 focus:outline-none focus:border-indigo-400 w-48 md:w-64"
        value={budget}
        onChange={handleBudgetChange}
      />
    </div>
  )
}

export default TravelBudget
