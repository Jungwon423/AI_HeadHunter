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
} from '../../slices/not_used/questionnaireSlice'
import {
  selectUserId,
  selectCity,
  selectCompanion,
  selectDuration,
} from '../../slices/travelInfoSlice'
import { selectQueryInput, setQueryInput } from '../../slices/queryInputSlice'
import { link } from 'fs'
import { useRouter } from 'next/router'
import { AppThunk, AppDispatch } from '../../store'

const QuestionnairePage = () => {
  const router = useRouter()
  const [count, setCount] = useState(0)

  const nextPage = () => {
    setCount(count + 1)
  }

  //const dispatch = useDispatch()
  const dispatch = useDispatch<AppDispatch>()
  const userId: string = useSelector(selectUserId)
  const questionnaire: QuestionnaireState = useSelector(selectQuestionnaire)
  const { thought, question, options, travel_id, finished, loading, error } =
    questionnaire
  const queryInput: QueryInput = useSelector(selectQueryInput)
  console.log('2번째 query 화면 : queryInput: ', queryInput)

  console.log('2번째 query 화면 : questionnaire: ', questionnaire)

  // 데이터 가져오기
  useEffect(() => {
    console.log('2번째 query 화면 : queryInput: ', queryInput)
    dispatch(fetchQueryAsync(queryInput))
  }, [dispatch, count])

  const [selectedOption, setSelectedOption] = useState<string[] | undefined>(
    undefined,
  )

  const handleOptionClick = (option: string) => {
    if (selectedOption?.includes(option)) {
      setSelectedOption(selectedOption.filter((item) => item !== option))
    } else {
      setSelectedOption([...(selectedOption ?? []), option])
    }
  }

  const handleSubmit = () => {
    const queryInput: QueryInput = {
      travel_id: travel_id!,
      user: userId,
      answer: selectedOption as string[],
    }
    dispatch(setQueryInput(queryInput))

    console.log('initial 화면 : queryInput', queryInput)
    nextPage()
  }

  if (questionnaire.loading === 'pending') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (questionnaire.loading === 'failed') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error: {questionnaire.error}</p>
      </div>
    )
  }

  if (questionnaire.finished) {
    router.push('/travel')
    return (
      <div className="flex items-center justify-center h-screen">
        <p>끝</p>
      </div>
    )
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
                selectedOption?.includes(option)
                  ? 'bg-indigo-400 text-white'
                  : ''
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
