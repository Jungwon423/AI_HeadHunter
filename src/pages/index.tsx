import Head from 'next/head'
import MyNavbar from '../components/MyNavbar'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState } from 'react'
import MainTitle from '../index_components/MainTitle'
import TitleImage from '../index_components/TitleImage'
import ImageExplain from '../index_components/ImageExplain'
import Popup from '../index_components/Popup'
import Link from 'next/link'
import ContinentInput from '../index_components/ContinentInput'
import Carousel from '../index_components/carousel/Carousel'
import TravelCarousel from '../index_components/carousel/TravelCarousel'
import Image from 'next/image'

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const openPopup = () => {
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Trippy</title>
        <Link href="/favicon.ico"></Link>
      </Head>

      <MyNavbar />
      <main className="w-3/4 mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <MainTitle></MainTitle>
        {/* <div className="py-10">
          <MapboxGeocoderContainer accessToken={TOKEN} />
        </div> */}
        <div className="relative pt-10 flex flex-col justify-center items-center pb-20 z-20">
          <div className="absolute z-999 top-12">
            <ContinentInput openPopup={openPopup}></ContinentInput>
          </div>
        </div>
        <Popup isOpen={isPopupOpen} onClose={closePopup}></Popup>{' '}
        {/* 적용한 팝업(detail) */}
        <div className="pt-20 md:text-base sm:text-xl xl:text-2xl font-bold">
          추천 여행지 TOP 10
        </div>
        <div className="pb-40">
          <TravelCarousel openPopup={openPopup}></TravelCarousel>
        </div>
        <div className="pb-40">
          <ImageExplain
            left={true}
            h1Text={'나에게 딱 맞는 관광명소를 추천'}
            pText={'여행지에 대한 모든 정보는 여기에서!'}
            image={'/assets/screenshot/recommend.png'}
          ></ImageExplain>
        </div>
        <ImageExplain
          left={false}
          h1Text={'나만의 여행 플래너 '}
          pText={'AI가 계획해준 최적의 여행코스를 만나보세요'}
          image={'/assets/screenshot/travel.png'}
        ></ImageExplain>
        <div className="py-20"></div>
        {/* <Carousel></Carousel> */}
      </main>
    </div>
  )
}
