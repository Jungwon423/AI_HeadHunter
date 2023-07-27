import { useState } from 'react'
import Image from 'next/image'
import TabMenu from './TabMenu'
import TravelNavbar from '../navbar/TravelNavbar'

const attractions = [
  {
    name: '자유의 여신상',
    image: '/assets/images/statue-of-liberty.jpg',
    latitude: 40.6892,
    longitude: -74.0445,
    time: 15,
    description:
      'The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor within New York City, in the United States.',
  },
  {
    name: 'Eiffel Tower',
    image: '/assets/images/eiffel-tower.webp',
    latitude: 48.8584,
    longitude: 2.2945,
    time: 30,
    description:
      'The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.',
  },
  {
    name: 'Sydney Opera House',
    image: '/assets/images/sydney-opera-house.jpg',
    latitude: -33.8568,
    longitude: 151.2153,
    time: 45,
    description:
      "Sydney Opera House is a multi-venue performing arts centre at Sydney Harbour in Sydney, New South Wales, Australia. It is one of the 20th century's most famous and distinctive buildings.",
  },
]

const Guide = () => {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['여행 요약', '1일차', '2일차', '3일차'] // 실제 데이터로 대체

  return (
    <div className="flex-col max-w-2xl">
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
            <span className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white">
              앤비님
            </span>
            <span className="text-xl sm:text-2xl md:text-4xl text-white">
              을 위한 여행 일정
            </span>
          </div>
          <div className="pb-4">
            <div className="bg-white rounded w-128 h-32 p-8">
              <div className="mb-4 text-sm sm:text-xl md:text-2xl">
                여행지역 : Los Angeles
              </div>
              <div className="text-sm sm:text-xl md:text-2xl">
                총 이동거리 12km
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow">
        <div className="flex items-center justify-between h-16">
          <div className="ml-2 font-bold text-xl font-mono">Day1</div>
          <div className="flex items-center">
            <button className="px-4 py-2 rounded-md bg-indigo-600 flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <span className="text-white">일정 재생성하기</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        {attractions.map((attraction) => (
          <div>
            <button
              key={attraction.name}
              className="rounded-xl mx-12 my-8 p-1 flex bg-gray-50 shadow-lg hover:shadow-2xl"
            >
              <div className="flex-none justify-center item-center w-32 md:w-48 h-32 md:h-48">
                <Image
                  src={attraction.image}
                  alt={attraction.name}
                  width={300}
                  height={300} // 원하는 높이
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="pl-4 flex-auto">
                <h2 className="text-start text-lg font-bold mb-2">
                  {attraction.name}
                </h2>
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-900 text-lg px-2">
                    {' '}
                    10:00 AM - 11:00 AM{' '}
                  </span>
                </div>
                <p>{attraction.description}</p>
              </div>
            </button>
            <div className="flex justify-center text-center">
              {' '}
              {'<'} {attraction.time} minutes | {'>'} 30 minutes{' '}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Guide
