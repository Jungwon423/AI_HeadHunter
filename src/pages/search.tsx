import Image from 'next/image'
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
  setUserId,
  setBudget,
} from '../slices/travelInfoSlice'
import { TravelStyles } from '../search_components/TravelStyles'
import { TravelCompanion } from '../search_components/TravelCompanion'
import TravelDuration from '../search_components/TravelDuration'
import TravelBudget from '../search_components/TravelBudget'
import LocalStorage from '../index_components/LocalStorage'

const TravelTitle = () => (
  <div className="text-center py-10 sm:py-15 md:py-20 bg-indigo-400 rounded-tl-xl rounded-tr-xl">
    <h1 className="text-lg sm:text-xl md:text-3xl font-extrabold tracking-tight text-white">
      어떤 스타일의 여행을 할 계획이신가요?
    </h1>
  </div>
)

export default function SearchPage() {
  // Redux 테스트
  const dispatch = useDispatch()

  const [travelDuration, setTravelDuration] = useState<number>(0)
  const handleDurationChange = (value: number) => {
    setTravelDuration(value)
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
      <div className="absolute top-1/3 sm:top-1/3 md:top-1/2 xl:top-1/2 inset-0 sm:inset-10 md:inset-30 xl:inset-40">
        <div className="bg-white min-w-4xl max-w-7xl rounded-xl shadow-xl">
          {/* <div className="absolute top-20 right-2">
            <Image
              src="/assets/images/robot2.png"
              alt="robot2"
              width="230"
              height="300"
              objectPosition="center"
              quality={100}
            ></Image>
          </div> */}

          {/* <TravelTitle /> */}

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
          {/* <TravelBudget onBudgetChange={handleBudget}></TravelBudget> */}
          <div className="relative m-5 p-5 inset-0 flex-auto justify-center text-center bg-indigo">
            <button
              className="w-full text-base sm:text-lg md:text-xl text-white font-bold py-4 px-20 rounded-xl bg-indigo-400 hover:bg-indigo-700 focus:outline-none"
              onClick={async () => {
                // TODO : redux에 저장하는 코드
                // local storage 에서 tempId 가져오기
                let tempId: string

                if (LocalStorage.getItem('tempId') == null) {
                  let randomStr: string = Math.random()
                    .toString(36)
                    .substring(2, 12)
                  console.log('randomStr : ', randomStr)
                  LocalStorage.setItem('tempId', randomStr)
                  tempId = randomStr
                } else {
                  tempId = LocalStorage.getItem('tempId')! // null check
                }

                dispatch(setUserId(tempId))
                dispatch(setCompanion(selectedCompanion))
                dispatch(setTravelStyle(selectedStyles))
                dispatch(setDuration(travelDuration))
                dispatch(setBudget(selectedBudget))

                // const res = await fetch('http://localhost:3000/api/travelInfo')
                // const data = await res.json()
                // console.log('API 응답 : ')
                // console.log(data)
                router.push('/image_query')
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
