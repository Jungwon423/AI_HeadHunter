import { useDispatch, useSelector } from 'react-redux'
import {
  placeInfo,
  fetchTravelScheduleAsync,
  recommendInput,
  selectUserId,
  selectTravelInfo,
  initialize,
} from '../slices/travelInfoSlice'
import { useRouter } from 'next/router'
import { selectAttractions } from '../slices/recommendSlice'
import { useEffect } from 'react'
import { selectAttractionQueryTravelId } from '../slices/imageQuerySlice'
import { AppDispatch } from '../store'

// TODO : 페이지 수정

const RecommendPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userId: string = useSelector(selectUserId)
  const travelId: string = useSelector(selectAttractionQueryTravelId) // !: travelId is not null
  const travelInfo = useSelector(selectTravelInfo)

  useEffect(() => {
    dispatch(initialize())
  }, [])

  useEffect(() => {
    const input: recommendInput = {
      user: userId,
      travel_id: travelId,
    }
    dispatch(fetchTravelScheduleAsync(input))
  }, [])

  const router = useRouter()

  const navigateToTravelPage = () => {
    // TODO : 여행 페이지로 이동
    router.push('/travel')
  }

  console.log('loading_state : ', travelInfo.loading)

  let buttonStatus: string = ''
  let buttonColor: string = 'bg-blue-500'

  if (travelInfo.loading === 'pending') {
    buttonStatus = 'loading'
    buttonColor = 'bg-gray-500'
  } else if (travelInfo.loading === 'failed') {
    buttonStatus = 'something wrong'
    buttonColor = 'bg-red-500'
  } else {
    buttonStatus = '추천 확인하러 가기'
    buttonColor = 'bg-blue-500'
  }

  let buttonClass = `rounded px-4 py-2 font-bold text-white hover:bg-blue-600 ${buttonColor} `

  const attractions: placeInfo[][] = useSelector(selectAttractions)

  return (
    <div className="flex-col">
      <button className={buttonClass} onClick={navigateToTravelPage}>
        {buttonStatus}
      </button>
      <div className="flex-row justify-center">
        <button onClick={navigateToTravelPage}>Go to Travel Page</button>
      </div>
      {attractions.map((day: placeInfo[]) => {
        return day.map((place: placeInfo) => {
          return (
            <div className="flex flex-col md:flex-row" key={place.name}>
              <img
                src={place.image}
                alt={place.name}
                className="w-full md:w-1/2 mb-4 md:mb-0"
              />
              <div className="flex flex-col md:w-1/2 md:pl-4">
                <h2 className="text-2xl font-bold mb-2">{place.name}</h2>
                <p className="text-gray-600 text-lg mb-2">
                  {place.summary?.overview}
                </p>
                <ul className="list-disc pl-4 mb-2">
                  <li className="text-gray-600 text-lg">{`Estimated time: ${place.time} hours`}</li>
                  <li className="text-gray-600 text-lg">{`Rating: ${place.rating}`}</li>
                </ul>
                <p className="text-gray-600 text-lg">{place.thought}</p>
              </div>
            </div>
          )
        })
      })}
    </div>
  )
}

export default RecommendPage
