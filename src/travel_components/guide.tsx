import TabMenu from './guide_components/TabMenu'
import TravelNavbar from './guide_components/TravelNavbar'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectDuration,
  selectTravelSchedule,
  selectCurrentDay,
} from '../slices/travelInfoSlice'
import GuideHero from './guide_components/GuideHero'
import GuideDay from './guide_components/GuideDay'
import GuideContainer from './guide_components/GuideContainer'
import { PlaceInfo } from '../interfaces/placeInfo'

const Guide = () => {
  const duration: number = useSelector(selectDuration)
  const currentDay: number = useSelector(selectCurrentDay)

  const createTabs = (days: number) => {
    const tabs = ['여행 요약']

    for (let i = 1; i <= days; i++) {
      tabs.push(`${i}일차`)
    }

    return tabs
  }

  const tabs = createTabs(duration)

  return (
    <div className="w-96 bg-[#FAFAFA] h-screen overflow-y-auto">
      <div className="flex-col w-96 overflow-y-auto">
        <TravelNavbar />
        <section className="bg-gray-50 px-1 py-2">
          <TabMenu tabs={tabs} />
        </section>
        {/* <GuideHero></GuideHero> */}
        {currentDay !== 0 ? <GuideDay></GuideDay> : null}
        {currentDay === 0 ? (
          <div className="px-3 justify-center">
            <div className="flex justify-center text-sm font-bold py-2 mt-2">
              이번 코스에서 언급된 <b className="px-1"> 주요 키워드</b>
            </div>
            <h2 className="flex justify-center text-sm font-bold py-2 mt-2">
              여행 요약
            </h2>
            <div className="flex justify-center text-sm font-bold py-2 mt-2">
              오사카 여행에서 주의해야 할 사항은 아주 덥다는 것입니다.
            </div>
            <div className="flex justify-center text-sm font-bold py-2 mt-2">
              overview
            </div>
          </div>
        ) : (
          <GuideContainer></GuideContainer>
        )}
      </div>
    </div>
  )
}

export default Guide
