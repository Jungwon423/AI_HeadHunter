import Head from 'next/head'
import MyNavbar from '../search_components/MyNavbar'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState } from 'react'
import MainTitle from '../index_components/MainTitle'
import TitleImage from '../index_components/TitleImage'
import ImageExplain from '../index_components/ImageExplain'
import { Footer } from '../footer/Footer'
import Popup from '../index_components/Popup'
import { AutocompleteInput } from '../index_components/AutocompleteInput'
import Link from 'next/link'
import ContinentInput from '../index_components/ContinentInput'

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const openPopup = () => {
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
  }
  // const sampleItems = ['오사카', '도쿄', '서울', '방콕', '파리']

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Trippy</title>
        <Link href="/favicon.ico"></Link>
      </Head>

      <MyNavbar />
      <main className="w-3/4 mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <MainTitle></MainTitle>
        {/* <AutocompleteInput items={sampleItems} /> */}
        {/* <div className="py-10">
          <MapboxGeocoderContainer accessToken={TOKEN} />
        </div> */}
        <div className="pt-10 flex flex-col justify-center items-center">
          <ContinentInput></ContinentInput>
        </div>

        <TitleImage></TitleImage>
        <div className="mx-auto">
          <button
            onClick={openPopup}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            오사카 버튼
          </button>
          <Popup isOpen={isPopupOpen} onClose={closePopup}></Popup>
        </div>

        <div className="md:text-base sm:text-xl xl:text-2xl font-bold">
          추천 여행지
        </div>
        {/* <Carousel></Carousel> */}
        <ImageExplain
          left={true}
          h1Text={'여행 이상형 월드컵으로 AI에게 여행지 추천받기'}
          pText={
            '가고 싶은 여행지를 선택하면 AI가 사용자의 성향을 파악합니다. 그에 맞는 여행지를 추천받고 코스를 받아볼 수 있어요.'
          }
          image={''}
        ></ImageExplain>
        <ImageExplain
          left={false}
          h1Text={'여행 이상형 월드컵으로 AI에게 여행지 추천받기'}
          pText={
            '가고 싶은 여행지를 선택하면 AI가 사용자의 성향을 파악합니다. 그에 맞는 여행지를 추천받고 코스를 받아볼 수 있어요.'
          }
          image={''}
        ></ImageExplain>
      </main>
      <Footer></Footer>
    </div>
  )
}
