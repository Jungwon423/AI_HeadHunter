import DraggableScrollbar from '../DraggableScrollbar'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { selectCity, selectDuration } from '../../slices/travelInfoSlice'

const GuideHero = () => {
  const city: String = useSelector(selectCity)
  const duration: number = useSelector(selectDuration)

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
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="md:pb-3">
          <span className="text-xl font-extrabold text-white">앤비님</span>
          <span className="text-xl text-white">을 위한 여행 일정</span>
        </div>
        <div className="pb-4">
          <div className="bg-white flex rounded w-128 h-32 p-6">
            <div className="w-16 flex-col">
              <Image
                src="/assets/images/calendar.webp"
                alt="travel"
                objectFit="fill"
                width={70}
                height={70}
                quality={100}
              ></Image>
              <div className="w-16 px-1 py-1 rounded-md bg-indigo-500 flex items-center text-center ">
                <span className="flex text-center text-white text-xs ml-2">
                  {duration - 1}박 {duration}일
                </span>
              </div>
            </div>
            <div className="flex-col px-5">
              <div className="flex-col mb-2 text-base">· 여행지역 : {city}</div>
              <div className="flex text-base">· 총 이동거리 12km</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GuideHero
