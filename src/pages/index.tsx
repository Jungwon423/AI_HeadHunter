import Head from 'next/head'
import MyNavbar from '../search_components/MyNavbar'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React, { useState } from 'react'
import MapboxGeocoderContainer from '../index_components/MapboxGeocoderContainer'
import MainTitle from '../index_components/MainTitle'
import TitleImage from '../index_components/TitleImage'
import ImageExplain from '../index_components/ImageExplain'
import { Footer } from '../footer/Footer'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, selectValue } from '../slices/counterSlice'
import Carousel from '../index_components/Carousel'
import Popup from '../index_components/Popup'
import DatePicker from '../index_components/DatePicker'

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const openPopup = () => {
    setIsPopupOpen(true)
  }

  const closePopup = () => {
    setIsPopupOpen(false)
  }
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'

  return (
    <div className="bg-white min-h-screen">
      <Head>
        <title>Triper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation section */}
      <MyNavbar />
      <main className="w-3/4 mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <MainTitle></MainTitle>
        <div className="py-10">
          <MapboxGeocoderContainer accessToken={TOKEN} />
        </div>

        <TitleImage></TitleImage>
        <div className="mx-auto">
          <button
            onClick={openPopup}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Open Popup
          </button>
          <Popup isOpen={isPopupOpen} onClose={closePopup}>
            {/* 내용을 여기에 입력하세요. */}
            <h1 className="text-xl mb-4">Popup Title</h1>
          </Popup>
        </div>
        <DatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        {selectedDate && (
          <p className="mt-4">
            선택한 날짜:{' '}
            <strong>{selectedDate.toLocaleDateString('ko-KR')}</strong>
          </p>
        )}

        <div className="md:text-base sm:text-xl xl:text-2xl font-bold">
          추천 여행지
        </div>
        <Carousel></Carousel>
        <ImageExplain
          left={true}
          h1Text={''}
          pText={''}
          image={''}
        ></ImageExplain>
        <ImageExplain
          left={false}
          h1Text={''}
          pText={''}
          image={''}
        ></ImageExplain>
      </main>
      <Footer></Footer>
      {/* Footer section */}
    </div>
  )
}
