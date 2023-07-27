import { SetStateAction, useState } from 'react'
import Image from 'next/image'
import ReactMapGL, { Marker } from 'react-map-gl'
import ViewportProps from 'react-map-gl'
import TabMenu from '../components/TabMenu'
import TravelNavbar from '../navbar/TravelNavbar'

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

const TravelCoursePage = () => {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: attractions[0].latitude,
    longitude: attractions[0].longitude,
    zoom: 12,
  });

  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['여행 요약', '1일차', '2일차', '3일차'] // 실제 데이터로 대체

  return (
    <div className="flex">
      <div className="flex-col max-w-2xl">
    <TravelNavbar />
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
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="md:pb-3">
          <span className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white">
            앤비님
          </span>
          <span className="text-xl sm:text-2xl md:text-4xl text-white">
            을 위한 여행 일정
          </span>
        </div>
        <div className='pb-4'>
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
      <div className="flex-grow">
        <ReactMapGL
          {...viewport}
          //onViewportChange={(nextViewport: typeof ViewportProps) => setViewport(nextViewport)}
          //mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          mapboxAccessToken="pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtqbDF2N3MwcHJ5M3FucjdqdzhpaWlnIn0.XMJC6lSrpUxqUutc61sK8g"
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          {attractions.map((attraction) => (
            <Marker
              key={attraction.name}
              latitude={attraction.latitude}
              longitude={attraction.longitude}
            >
              <button className="bg-transparent border-none cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 14.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </div>
  )
}

export default TravelCoursePage
