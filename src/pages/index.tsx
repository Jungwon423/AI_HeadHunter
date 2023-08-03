import Head from 'next/head'
import MyNavbar from '../search_components/MyNavbar'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React from 'react'
import MapboxGeocoderContainer from '../index_components/MapboxGeocoderContainer'
import MainTitle from '../index_components/MainTitle'
import TitleImage from '../index_components/TitleImage'
import ImageExplain from '../index_components/ImageExplain'
import { Footer } from '../footer/Footer'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, selectValue } from '../slices/counterSlice'

export default function Home() {
  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'

  return (
    <div className="bg-white min-h-screen">
      {/* Head section */}
      <Head>
        <title>Triper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation section */}
      <MyNavbar />

      {/* Main content section */}
      <main className="w-3/4 mx-auto py-16 px-4 sm:px-6 lg:px-8">

        <MainTitle></MainTitle>

        <MapboxGeocoderContainer accessToken={TOKEN} />

        <TitleImage></TitleImage>
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
