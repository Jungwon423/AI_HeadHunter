import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setQuestionnaire,
  selectQuestionnaire,
  QuestionnaireState,
} from '../slices/questionnaireSlice'

const QuestionnairePage = () => {
  const question = useSelector(selectQuestionnaire)
  const dispatch = useDispatch()

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  )

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
  }

  const handleSubmit = () => {
    // Show loading dialog for 5 seconds
    setTimeout(() => {
      alert('Thank you for submitting your answers!')
    }, 5000)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-8">
        <p className="text-lg md:text-xl font-bold mb-4">{question.text}</p>
        <div className="flex flex-col items-center">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`py-2 px-4 rounded-lg border-2 border-gray-400 mb-2 ${
                selectedOption === option ? 'bg-indigo-400 text-white' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <button
        className="py-2 px-4 rounded-lg border-2 border-gray-400 bg-indigo-400 text-white mt-8"
        onClick={handleSubmit}
      >
        Submit Answer
      </button>
    </div>
  )
}

export default QuestionnairePage
