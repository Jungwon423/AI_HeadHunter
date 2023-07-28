import Head from 'next/head'
import Image from 'next/image'
import MyNavbar from '../navbar/MyNavbar'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import React from 'react'
import MapboxGeocoderContainer from '../index_components/MapboxGeocoderContainer'
import MainTitle from '../index_components/MainTitle'
import TitleImage from '../index_components/TitleImage'

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
      </main>

      {/* Footer section */}
      <footer className="bg-gray-800 py-8">
        <p className="text-center text-gray-400">
          &copy; 2021 Plan Your Next Trip
        </p>
      </footer>
    </div>
  )
}
