import { useState } from 'react'
import Image from 'next/legacy/image'
import TabMenu from './TabMenu'
import TravelNavbar from './TravelNavbar'
import { useSelector } from 'react-redux'
import { selectCity, selectDuration } from '../slices/travelInfo'
import { Attraction } from '../interfaces/attraction'

interface GuideProps {
  onhandleAttraction: (attraction: Attraction | null) => void;
  attractions: Attraction[];
  selectedAttraction : Attraction | null;
}

const Guide = (props: GuideProps) => {
  const handleAttraction = (attraction: Attraction) => {
    if (attraction.toString() == props.selectedAttraction?.toString()) {
      props.onhandleAttraction(null); // 이미 선택된 관광명소를 누르면 null 값 반환
      console.log("null")
    } else {
      props.onhandleAttraction(attraction); // 관광명소 선택
      console.log(attraction)
    }
  };

  const [activeTab, setActiveTab] = useState(0)
  
  const city = useSelector(selectCity)
  const duration = useSelector(selectDuration)

  const createTabs = (days: number) => {
    const tabs = ["여행 요약"];

    for (let i = 1; i <= days; i++) {
      tabs.push(`${i}일차`);
    }

    return tabs;
  };

  const tabs = createTabs(duration);

  return (
    <div className="flex-col max-w-lg overflow-y-auto">
      <TravelNavbar />
      <section className="bg-gray-50 py-4">
        <TabMenu tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      </section>
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
            <span className="text-lg sm:text-xl md:text-2xl font-extrabold text-white">
              앤비님
            </span>
            <span className="text-lg sm:text-xl md:text-2xl text-white">
              을 위한 여행 일정
            </span>
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
                    {duration-1}박 {duration}일
                  </span>
                </div>
              </div>
              <div className="flex-col px-5">
                <div className="flex-col mb-2 text-sm sm:text-base md:text-xl">
                  · 여행지역 : {city}
                </div>
                <div className="flex text-sm sm:text-base md:text-xl">
                  · 총 이동거리 12km
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow">
        <div className="flex items-center justify-between h-16">
          <div className="ml-2 font-bold text-xl font-mono">Day1</div>
          <div className="flex items-center">
            <button className="px-4 py-2 rounded-md bg-indigo-500 flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <span className="text-white">일정 재생성하기</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        {props.attractions.map((attraction) => (
          <div key={attraction.name} className="w-full ml-10 justify-center">
            <button className="h-56 rounded-xl px-5 my-8 flex-col bg-gray-50 shadow-lg hover:shadow-2xl" onClick={()=>handleAttraction(attraction)}>
              <h2 className="flex text-start text-lg font-bold mt-2 p-2">
                {attraction.name}
              </h2>
              <div className="flex p-2">
                <div className="w-40">
                  <Image
                    src={attraction.image}
                    alt={attraction.name}
                    width={150}
                    height={150}
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="pl-4 w-52 h-16 flex-col">
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
                    <span className="text-gray-900 text-base py-2">
                      10:00 AM - 11:00 AM
                    </span>
                  </div>
                  <div className="text-start w-full overflow-hidden">
                    <div className="line-clamp-4">{attraction.description}</div>
                  </div>
                </div>
              </div>
            </button>
            <div className="flex justify-center items-center text-center mr-12">
              <div className="px-2 flex items-center">
                <Image
                  src="/assets/running-person.svg"
                  width={15}
                  height={15}
                  className="rounded-lg"
                />
                <span className="ml-1">{attraction.time}분 |</span>
              </div>
              <div className="px-2 flex items-center">
                <Image
                  src="/assets/car.svg"
                  width={15}
                  height={15}
                  className="rounded-lg"
                />
                <span className="ml-1">30분</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Guide
