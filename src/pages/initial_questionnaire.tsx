import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setQuestionnaire,
  selectQuestionnaire,
  QuestionnaireState,
  fetchInitialQueryAsync,
  InitialQueryInput,
  QueryInput,
} from '../slices/questionnaireSlice'
import {
  selectUserId,
  selectCity,
  selectCompanion,
  selectDuration,
} from '../slices/travelInfoSlice'
import { link } from 'fs'
import { useRouter } from 'next/router'
import { AppThunk } from '../store'
import { setQueryInput } from '../slices/queryInputSlice'

const InitialQuestionnairePage = () => {
  const dispatch = useDispatch()
  const userId: string = useSelector(selectUserId)
  const city: string = useSelector(selectCity)
  const companion: string = useSelector(selectCompanion)
  const duration: number = useSelector(selectDuration)
  const budget: number = useSelector(selectDuration)
  const questionnaire: QuestionnaireState = useSelector(selectQuestionnaire)
  const { thought, question, options, travelId, finished, loading, error } =
    questionnaire

  // 여기서 초기 쿼리 입력 값을 설정하십시오.
  const initialQueryInput: InitialQueryInput = {
    user: userId,
    destination: city,
    duration: duration,
    budget: budget,
    companion: companion,
  }
  // const initialQueryInput: InitialQueryInput = {
  //   user: '6arap7v529',
  //   destination: '일본, 오사카부오사카시',
  //   duration: 3,
  //   budget: 1200000,
  //   companion: '연인과',
  // }

  const router = useRouter()

  // 데이터 가져오기
  useEffect(() => {
    dispatch(fetchInitialQueryAsync(initialQueryInput))
  }, [dispatch])

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined,
  )

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
  }

  // 제출하기 버튼 클릭 : 다음 화면으로 이동

  const handleSubmit = () => {
    const queryInput: QueryInput = {
      travelId: travelId!,
      user: userId,
      anwser: [selectedOption] as string[],
    }
    dispatch(setQueryInput(queryInput))
    // router.push('/questionnaire')
  }

  if (questionnaire.loading === 'pending') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
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

export default InitialQuestionnairePage
