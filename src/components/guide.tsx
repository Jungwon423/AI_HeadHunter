import { SetStateAction, useState } from 'react'
import Image from 'next/image'
import ReactMapGL, { Marker } from 'react-map-gl'
import Map from '../components/map'
import TabMenu from './TabMenu'
import router from 'next/router'

const attractions = [
  {
    name: 'Statue of Liberty',
    image: '/assets/images/statue-of-liberty.jpg',
    latitude: 40.6892,
    longitude: -74.0445,
  },
  {
    name: 'Eiffel Tower',
    image: '/assets/images/eiffel-tower.webp',
    latitude: 48.8584,
    longitude: 2.2945,
  },
  {
    name: 'Sydney Opera House',
    image: '/assets/images/sydney-opera-house.jpg',
    latitude: -33.8568,
    longitude: 151.2153,
  },
]

const Guide = () => {
    

  const [activeTab, setActiveTab] = useState(0)
    const tabs = ['여행 요약', '1일차', '2일차', '3일차'] // 실제 데이터로 대체
    
    return <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow">
          <div className="flex justify-between h-16">
            <button onClick={() => router.push('/')}>
              <div className="flex-shrink-0 flex items-center">
                <Image
                  src="/assets/images/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                />
                <span className="ml-2 font-bold text-xl font-mono">Triper</span>
              </div>
            </button>
            <div className="flex items-center">
              <button className="px-4 py-2 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <section className="bg-gray-50 py-4">
          <TabMenu
            tabs={tabs}
            activeTab={activeTab}
            onTabClick={setActiveTab}
          />
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            앤비님의 여행 일정
          </h1>
        </div>
      </section>

        <div className="flex flex-wrap justify-center items-center bg-gray-100">
          {attractions.map((attraction) => (
            <div key={attraction.name} className="w-1/2 p-4">
              <Image
                src={attraction.image}
                alt={attraction.name}
                width={500}
                height={500}
                objectFit="cover"
                className="rounded-lg"
              />
              <h2 className="text-lg font-bold mt-2">{attraction.name}</h2>
            </div>
          ))}
        </div>
      </div>
}

export default Guide