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

  // const sampleItems = ['오사카', '도쿄', '서울', '방콕', '파리']
  const originalUrl =
    'http://media-cdn.tripadvisor.com/media/photo-o/1a/83/dc/77/photo2jpg.jpg'
  //  'http://media-cdn.tripadvisor.com/media/photo-o/1b/8a/06/b7/pitogyros-oia-santorini.jpg'
  //  'http://media-cdn.tripadvisor.com/media/photo-o/1b/e8/69/70/img-20200831-102616-largejpg.jpg'
  // 'https://dbscthumb-phinf.pstatic.net/5885_000_12/20201229162607724_DFELFUSQ6.jpg/fb344_33_i1.jpg?type=w540_fst'
  // 'http://media-cdn.tripadvisor.com/media/photo-o/17/50/77/f1/entrapped-fish.jpg'
  //    'http://media-cdn.tripadvisor.com/media/photo-o/0c/b5/92/9e/stabilimento-di-gran.jpg'
  //  'http://media-cdn.tripadvisor.com/media/photo-o/19/be/f1/f4/photo0jpg.jpg'
  //  'http://media-cdn.tripadvisor.com/media/photo-o/0c/b5/92/9e/stabilimento-di-gran.jpg'
  //'https://dbscthumb-phinf.pstatic.net/5885_000_12/20201229163310416_XJEW55SNU.jpg/fb345_37_i1.jpg?type=w540_fst'
  //'http://media-cdn.tripadvisor.com/media/photo-o/18/f7/5d/9e/photo1jpg.jpg'
  let encodedUrl = encodeURIComponent(originalUrl)
  console.log(encodedUrl)
  // encodedUrl =
  //   'http%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F19%2F90%2F03%2F15%2Fmuseum-apartment-with.jpg'
  const prefix = 'https://search.pstatic.net/common?src='
  const suffix = '&type=w800_travelsearch'

  const apiUrl = prefix + encodedUrl + suffix
  console.log(apiUrl)

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Trippy</title>
        <Link href="/favicon.ico"></Link>
      </Head>
      <Image src={apiUrl} alt="대체_텍스트" width={1500} height={1500} />

      <MyNavbar />
      <main className="w-3/4 mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <MainTitle></MainTitle>
        {/* <div className="py-10">
          <MapboxGeocoderContainer accessToken={TOKEN} />
        </div> */}
        <div className="pt-10 flex flex-col justify-center items-center">
          <ContinentInput openPopup={openPopup}></ContinentInput>
        </div>
        <Popup isOpen={isPopupOpen} onClose={closePopup}></Popup>{' '}
        {/* 적용한 팝업(detail) */}
        <div className="pt-20 md:text-base sm:text-xl xl:text-2xl font-bold">
          추천 여행지 TOP 11
        </div>
        <TravelCarousel></TravelCarousel>
        <ImageExplain
          left={true}
          h1Text={'AI가 생성한 여행지를 지금바로 확인해보세요!'}
          pText={
            '여행지에 대한 다양한 정보들과 AI가 추천한 이유를 확인할 수 있어요.'
          }
          image={'/assets/screenshot/screenshot2.png'}
        ></ImageExplain>
        <ImageExplain
          left={false}
          h1Text={'여행 이상형 월드컵으로 AI에게 여행지 추천받기'}
          pText={
            '가고 싶은 여행지를 선택하면 AI가 사용자의 성향을 파악합니다. 그에 맞는 여행지를 추천받고 코스를 받아볼 수 있어요.'
          }
          image={'/assets/screenshot/screen1.png'}
        ></ImageExplain>
        <Carousel></Carousel>
      </main>
      <Footer></Footer>
    </div>
  )
}
