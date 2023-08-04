import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setQuestionnaire,
  selectQuestionnaire,
  QuestionnaireState,
  fetchInitialQueryAsync,
  InitialQueryInput,
  QueryInput,
  fetchQuery,
  fetchQueryAsync,
} from '../slices/questionnaireSlice'
import {
  selectUserId,
  selectCity,
  selectCompanion,
  selectDuration,
} from '../slices/travelInfoSlice'
import { selectQueryInput } from '../slices/queryInputSlice'
import { link } from 'fs'
import { useRouter } from 'next/router'
import { AppThunk } from '../store'

const QuestionnairePage = () => {
  const dispatch = useDispatch()
  const userId: string = useSelector(selectUserId)
  const questionnaire: QuestionnaireState = useSelector(selectQuestionnaire)
  const { thought, question, options, travelId, finished, loading, error } =
    questionnaire
  const queryInput: QueryInput = useSelector(selectQueryInput)

  const router = useRouter()

  // 데이터 가져오기
  useEffect(() => {
    dispatch(fetchQueryAsync(queryInput))
  }, [dispatch])

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  )

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
  }

  const handleSubmit = () => {
    router.push('/wait')
  }

  if (questionnaire.loading === 'pending') {
    return <p>Loading...</p>
  }

  if (questionnaire.loading === 'failed') {
    return <p>Error: {questionnaire.error}</p>
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-8">
        <p className="text-lg md:text-xl font-bold mb-4">
          {questionnaire.thought}
        </p>
        <div className="flex flex-col items-center">
          {questionnaire.options!.map((option, index) => (
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
