import Head from 'next/head'
import MyNavbar from '../components/MyNavbar'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState } from 'react'
import MainTitle from '../index_components/MainTitle'
import TitleImage from '../index_components/TitleImage'
import ImageExplain from '../index_components/ImageExplain'
import { Footer } from '../footer/Footer'
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
        <div className="pt-10 flex flex-col justify-center items-center pb-20">
          <ContinentInput openPopup={openPopup}></ContinentInput>
        </div>
        <Popup isOpen={isPopupOpen} onClose={closePopup}></Popup>{' '}
        {/* 적용한 팝업(detail) */}
        <div className="pt-20 md:text-base sm:text-xl xl:text-2xl font-bold">
          추천 여행지 TOP 11
        </div>
        <div className="pb-40">
          <TravelCarousel></TravelCarousel>
        </div>
        <div className="pb-40">
          <ImageExplain
            left={true}
            h1Text={'AI가 생성한 여행지를 지금바로 확인해보세요!'}
            pText={
              '여행지에 대한 다양한 정보들과 AI가 추천한 이유를 확인할 수 있어요.'
            }
            image={'/assets/screenshot/screenshot2.png'}
          ></ImageExplain>
        </div>
        <ImageExplain
          left={false}
          h1Text={'여행 이상형 월드컵으로 AI에게 여행지 추천받기'}
          pText={
            '가고 싶은 여행지를 선택하면 AI가 사용자의 성향을 파악합니다. 그에 맞는 여행지를 추천받고 코스를 받아볼 수 있어요.'
          }
          image={'/assets/screenshot/screen1.png'}
        ></ImageExplain>
        {/* <Carousel></Carousel> */}
      </main>
      <Footer></Footer>
    </div>
  )
}
