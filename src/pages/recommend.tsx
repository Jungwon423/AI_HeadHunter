import { useDispatch, useSelector } from 'react-redux'
import {
  initialize,
  handleCurrentPlace,
  setCurrentDay,
  selectCurrentDay,
  selectCurrentPlace,
  selectUserId,
} from '../slices/recommendSlice'
import { useRouter } from 'next/router'
import { selectAttractions } from '../slices/recommendSlice'
import { useEffect } from 'react'
import { selectAttractionQueryTravelId } from '../slices/imageQuerySlice'
import { AppDispatch } from '../store'
import Image from 'next/image'
import RecommendMap from '../travel_components/RecommendMap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {
  fetchTravelScheduleAsync,
  selectTravelInfo,
} from '../slices/travelInfoSlice'
import { RecommendInput } from '../interfaces/recommendInput'
import { PlaceInfo } from '../interfaces/placeInfo'

const RecommendPage = () => {
  const dispatch = useDispatch()
  const userId: string = useSelector(selectUserId)
  const travelId: string = useSelector(selectAttractionQueryTravelId) // !: travelId is not null
  const travelInfo = useSelector(selectTravelInfo)
  // const showChat = useSelector(selectShowChat)

  const selectedPlace = useSelector(selectCurrentPlace)
  console.log(selectedPlace)
  const currentDay: number = useSelector(selectCurrentDay)
  console.log('currentDay: ' + currentDay)

  useEffect(() => {
    dispatch(initialize())
    const input: RecommendInput = {
      user: userId,
      travel_id: travelId,
    }
    //dispatch(fetchTravelScheduleAsync(input))
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
    buttonStatus = '다음'
    buttonColor = 'bg-blue-500'
  }

  let buttonClass = `rounded px-4 py-2 font-bold text-white hover:bg-blue-600 ${buttonColor} `

  const attractions: PlaceInfo[][] = useSelector(selectAttractions)

  return (
    <div className="flex flex-row">
      <div className="bg-white w-[550px] min-w-[550px] relative h-screen max-h-screen overflow-hidden">
        <div className="flex flex-row">
          <div className="w-[100px] h-screen">
            <div className="flex list-none ml-3 my-5">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={10}
                height={10}
                style={{
                  maxWidth: '100%',
                  width: 'auto',
                  height: 'auto',
                }}
              />
              <span className="ml-1 font-bold text-xs font-mono">Trippy</span>
            </div>

            <div className="text-gray-600 text-sm py-4 ml-5">Day 1</div>
            <div className="text-gray-600 text-sm py-4 ml-5">Day 2</div>
            <div className="text-gray-600 text-sm py-4 ml-5">Day 3</div>

            <div className="relative flex items-end justify-center">
              <button className={buttonClass} onClick={navigateToTravelPage}>
                {buttonStatus}
              </button>
            </div>
          </div>

          <div className="w-full bg-gray-100 h-screen overflow-y-auto">
            <div className="p-4">
              <div className="flex pt-7 pb-4">
                <div className="font-bold text-xl">오사카</div>
                <span className="pt-2 text-gray-500 text-sm font-bold px-2">
                  2023.08.10(화) ~ 2023.08.20(목)
                </span>
              </div>
              {attractions.map((day: PlaceInfo[]) => {
                return day.map((place: PlaceInfo) => {
                  return (
                    <div
                      className="flex flex-row p-3 bg-white shadow-md rounded-xl px-5 my-5 cursor-pointer"
                      key={place.name}
                      onClick={() => {
                        dispatch(handleCurrentPlace(place))
                        dispatch(setCurrentDay(attractions.indexOf(day) + 1))
                        // console.log(place)
                      }}
                    >
                      <img
                        src={place.image}
                        alt={place.name}
                        width={100}
                        height={100}
                        className="rounded-xl"
                      />
                      <div className="px-3 flex flex-col">
                        <div className="text-base font-bold">{place.name}</div>
                        <div className="flex flex-row pl-1s pt-1">
                          <div className="text-sm font-bold">
                            {place.rating}
                          </div>
                          <i
                            key={place.rating}
                            className="pl-1 bi bi-star-fill text-yellow-400 text-sm"
                          ></i>
                        </div>
                        <div className="py-3 text-gray-700 text-sm">
                          {place.summary?.overview}
                        </div>
                      </div>

                      {/* {place.thought} */}
                    </div>
                  )
                })
              })}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="">
          <RecommendMap></RecommendMap>
        </div>
      </div>
    </div>
  )
}

export default RecommendPage
