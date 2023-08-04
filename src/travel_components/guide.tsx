import { useState } from 'react'
import Image from 'next/legacy/image'
import TabMenu from './TabMenu'
import TravelNavbar from './TravelNavbar'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCity,
  selectDuration,
  placeInfo,
  selectCoordinate,
  selectTravelSchedule,
  handleCurrentPlace,
  selectCurrentDay,
} from '../slices/travelInfoSlice'
import GuideHero from './GuideHero'
import GuideDay from './GuideDay'

const Guide = () => {
  const dispatch = useDispatch()

  const city: String = useSelector(selectCity)
  const duration: number = useSelector(selectDuration)
  const currrentDay: number = useSelector(selectCurrentDay)

  const createTabs = (days: number) => {
    const tabs = ['여행 요약']

    for (let i = 1; i <= days; i++) {
      tabs.push(`${i}일차`)
    }

    return tabs
  }

  const tabs = createTabs(duration)

  return (
    <div className="flex-col w-96 overflow-y-auto">
      <TravelNavbar />
      <section className="bg-gray-50 py-4">
        <TabMenu tabs={tabs} />
      </section>
      <GuideHero></GuideHero>
      <GuideDay></GuideDay>
      <div className="flex flex-col justify-center">
        {useSelector(selectTravelSchedule)[currrentDay - 1]?.map(
          (placeInfo) => (
            <div key={placeInfo.name} className="px-3 justify-center">
              <button
                className="h-50 rounded-xl px-5 my-8 flex-col bg-gray-50 shadow-lg hover:shadow-2xl"
                onClick={() => dispatch(handleCurrentPlace(placeInfo))}
              >
                <div className="flex">
                  <div className="w-42">
                    <Image
                      src={placeInfo.image}
                      alt={placeInfo.name}
                      width={150}
                      height={200}
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="pl-3 w-42 flex-col">
                    <h2 className="flex text-base font-bold p-2">
                      {placeInfo.name}
                    </h2>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-900 text-sm">
                        10:00 AM - 11:00 AM
                      </span>
                    </div>
                    <div className="text-start w-40">
                      {placeInfo.description}
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
                  <span className="ml-1">{placeInfo.time}분 |</span>
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
          ),
        )}
      </div>
    </div>
  )
}

export default Guide
