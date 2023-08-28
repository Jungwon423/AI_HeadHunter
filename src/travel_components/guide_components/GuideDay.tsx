import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentDay,
  toggleOpenRecommend,
} from '../../slices/travelInfoSlice'
import { AppDispatch } from '../../store'

const GuideDay = () => {
  const currentDay: number = useSelector(selectCurrentDay)

  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-white divide-y-2 flex flex-col">
      <div className="flex items-center justify-between h-16">
        <div className="ml-2 font-bold text-lg font-mono">Day {currentDay}</div>
        <div className="flex justify-center">
          <button
            className="px-2 py-2 rounded-md bg-indigo-400 flex flex-row items-center justify-center"
            onClick={() => {
              dispatch(toggleOpenRecommend())
            }}
          >
            <div className="text-white text-sm ">여행 편집하러가기</div>
          </button>
        </div>
        {/* <div className="flex items-center">
          <button className="px-4 py-2 rounded-md bg-indigo-500 flex items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 mr-2 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            <span className="text-white text-sm">코스 최적화하기</span>
          </button>
        </div> */}
      </div>
      {/* <div className="flex flex-row">
        <div className="pt-4 flex justify-center items-center text-center font-bold pr-5">
          <div className="flex justify-center">
            여행 목록이 마음에 안드시나요?
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <button
            className="px-2 py-2 rounded-md bg-indigo-400 flex flex-row items-center justify-center"
            onClick={() => {
              dispatch(toggleOpenRecommend())
            }}
          >
            <div className="text-white text-sm ">여행 편집하러가기</div>
          </button>
        </div>
      </div> */}
    </div>
  )
}

export default GuideDay
