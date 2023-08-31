import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentPlace } from '../../slices/recommendSlice'
import { useEffect, useState } from 'react'
import { isOpenNow } from '../../travel_components/timeUtils'

const OperationHours = () => {
  const selectedPlace = useSelector(selectCurrentPlace)
  const toggleHours = () => {
    setIfHoursVisible(!ifHoursVisible)
  }
  const [ifHoursVisible, setIfHoursVisible] = useState(false)
  const [operationHours, setOperationHours] = useState<string[] | undefined>([])
  const [workingStatus, setWorkingStatus] = useState<boolean>(false)
  useEffect(() => {
    const newOperationHours = selectedPlace?.openingHours?.weekday_text
    setOperationHours(newOperationHours)
    setWorkingStatus(isOpenNow(newOperationHours))
  }, [selectedPlace])
  return (
    <div>
      {operationHours ? (
        <div className="mt-3 flex-col items-center px-2 text-gray-700">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {workingStatus ? (
              <span className="text-indigo-500 flex text-base font-xl px-2 py-2">
                영업 중
              </span>
            ) : (
              <span className="text-red-500 flex text-base font-xl px-2 py-2">
                영업 종료
              </span>
            )}
            <button onClick={toggleHours}>
              {ifHoursVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              )}
            </button>
          </div>
          {ifHoursVisible &&
            selectedPlace?.openingHours?.weekday_text.map(
              (hourInterval, index) => (
                <div className="text-sm py-1 pl-8" key={index}>
                  {hourInterval.replace('~', '-')}
                </div>
              ),
            )}
        </div>
      ) : null}
    </div>
  )
}

export default OperationHours
