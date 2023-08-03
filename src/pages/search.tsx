import Image from 'next/legacy/image'
import { useState } from 'react'
import Head from 'next/head'
import MyNavbar from '../search_components/MyNavbar'
import router from 'next/router'
import SearchHero from '../search_components/SearchHero'

import { useSelector, useDispatch } from 'react-redux'
import {
  setCompanion,
  setTravelStyle,
  setDuration,
  setTravelSchedule,
  placeInfo,
} from '../slices/travelInfoSlice'
import { TravelStyles } from '../search_components/TravelStyles'
import { TravelCompanion } from '../search_components/TravelCompanion'
import TravelDuration from '../search_components/TravelDuration'
import TravelBudget from '../search_components/TravelBudget'

const TravelTitle = () => (
  <div className="text-center py-10 sm:py-15 md:py-20 bg-indigo-400 rounded-tl-xl rounded-tr-xl">
    <h1 className="text-lg sm:text-xl md:text-3xl font-extrabold tracking-tight text-white">
      어떤 스타일의 여행을 할 계획인가요?
    </h1>
  </div>
)

export default function SearchPage() {
  // Redux 테스트
  const dispatch = useDispatch()

  const [travelDuration, setTravelDuration] = useState<number>(0)
  const handleDurationChange = (value: number) => {
    setTravelDuration(value)
    console.log(`여행 기간: ${value}일`)
  }

  const [selectedCompanion, setSelectedCompanion] = useState<string>('')
  const handleCompanionClick = (companion: string) => {
    if (selectedCompanion === companion) {
      setSelectedCompanion('')
    } else {
      setSelectedCompanion(companion)
    }
  }

  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const handleStylesClick = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((c) => c !== style))
    } else {
      setSelectedStyles([...selectedStyles, style])
    }
  }
  const removeStyle = (style: string) => {
    setSelectedStyles(selectedStyles.filter((c) => c !== style))
  }

  const [selectedBudget, setSelectedBudget] = useState<number>(0)
  const handleBudget = (budget: number) => {
    setSelectedBudget(budget)
  }

  return (
    <div>
      <Head>
        <title>Travel Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyNavbar />
      <SearchHero />
      <div className="absolute top-80 sm:top-80 md:top-96 inset-20 justify-center items-center">
        <div className="bg-white min-w-4xl max-w-7xl rounded-xl shadow-xl">
          <TravelTitle />
          <TravelDuration onDurationChange={handleDurationChange} />
          <TravelCompanion
            selectedCompanion={selectedCompanion}
            onCompanionClick={handleCompanionClick}
          />
          {/* <TravelStyles
            selectedStyles={selectedStyles}
            onStylesClick={handleStylesClick}
            onRemoveStyle={removeStyle}
          /> */}
          <TravelBudget onBudgetChange={handleBudget}></TravelBudget>
          <div className="relative m-5 p-5 inset-0 flex-auto justify-center text-center bg-indigo">
            <button
              className="w-full text-base sm:text-lg md:text-xl text-white font-bold py-4 px-20 rounded-xl bg-indigo-400 hover:bg-indigo-700 focus:outline-none"
              onClick={async () => {
                // TODO : redux에 저장하는 코드
                console.log('selectedStyles : ' + selectedStyles)
                console.log('selectedCompanion : ' + selectedCompanion)
                console.log('travelDuration : ' + travelDuration)
                dispatch(setCompanion(selectedCompanion))
                dispatch(setTravelStyle(selectedStyles))
                dispatch(setDuration(travelDuration))
                console.log('selectedBudget : ' + selectedBudget)
                // const res = await fetch('http://localhost:3000/api/travelInfo')
                // const data = await res.json()
                // console.log('API 응답 : ')
                // console.log(data)
                router.push('/questionnaire')
              }}
            >
              여행하러 가기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
