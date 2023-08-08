import { use, useState } from 'react'
import Image from 'next/legacy/image'
import TabMenu from './guide_components/TabMenu'
import TravelNavbar from './guide_components/TravelNavbar'
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
import GuideHero from './guide_components/GuideHero'
import GuideDay from './guide_components/GuideDay'

const Guide = () => {
  const dispatch = useDispatch()

  const city: String = useSelector(selectCity)
  const duration: number = useSelector(selectDuration)
  const currentDay: number = useSelector(selectCurrentDay)
  const TravelSchedule: placeInfo[][] = useSelector(selectTravelSchedule)

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
      {currentDay !== 0 ? <GuideDay></GuideDay> : null}
      {currentDay === 0 ? (
        <div className="px-3 justify-center">
          <div className="flex justify-center text-sm font-bold py-2 mt-2">
            이번 코스에서 언급된 <b>주요 키워드</b>
          </div>
          <h2 className="flex justify-center text-sm font-bold py-2 mt-2">
            여행 요약
          </h2>
          <div className="flex justify-center text-sm font-bold py-2 mt-2">
            오사카 여행에서 주의해야 할 사항은 아주 덥다는 것입니다.
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          {TravelSchedule[currentDay - 1]?.map((placeInfo) => (
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
                  <div className="pl-3 w-40 flex-col">
                    <h2 className="flex justify-center text-sm font-bold py-2 mt-2">
                      {placeInfo.name}
                    </h2>
                    <div className="h-40 overflow-y-scroll text-gray-700 text-sm text-start w-40 p-2">
                      {placeInfo.summary?.overview}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Guide
