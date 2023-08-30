import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/legacy/image'
import {
  selectCity,
  selectCurrentDay,
  selectDuration,
  selectTravelSchedule,
} from '../../slices/travelInfoSlice'
import { PlaceInfo } from '../../interfaces/placeInfo'

const GuideHero = () => {
  const city: String = useSelector(selectCity)
  const duration: number = useSelector(selectDuration)
  const currentDay: number = useSelector(selectCurrentDay)
  const TravelSchedule: PlaceInfo[][] = useSelector(selectTravelSchedule)
  console.log(TravelSchedule)

  return (
    <section className="relative">
      <div className="absolute inset-0">
        <Image
          src="/assets/images/travel2.jpg"
          alt="travel"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="md:pb-1">
          <span className="text-sm font-bold text-white">앤비님</span>
          <span className="text-xs text-white">을 위한 여행 일정</span>
        </div>
        <div className="pb-4">
          <div className="bg-white flex rounded w-80 h-16 p-3">
            <div className="w-12 flex-col justify-center">
              <div className="px-2">
                <Image
                  src="/assets/buttonIcon/calendar.webp"
                  alt="travel"
                  objectFit="fill"
                  width={500}
                  height={500}
                  quality={100}
                ></Image>
              </div>
              <div className="w-12 justify-center rounded-md bg-indigo-500 flex items-center">
                <span className="flex text-center text-white text-[6px]">
                  {duration - 1}박 {duration}일
                </span>
              </div>
            </div>
            <div className="flex-col px-5">
              <div className="flex-col text-[8px]">· 여행지역 : {city}</div>
              <div className="flex text-[7px]">
                {TravelSchedule[currentDay - 1]?.length}개의 장소
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GuideHero
