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
import Slider from 'react-slick'
import Responsive from '../index_components/ex'
import Slick from '../index_components/Slick'

interface itemsProps {
  item: string
  name: string
}

const items: itemsProps[] = [
  {
    item: 'http://placehold.it/1200x400',
    name: '이미지01',
  },
  {
    item: 'http://placehold.it/1200x400/ff0000',
    name: '이미지02',
  },
  {
    item: 'http://placehold.it/1200x400/00ffff',
    name: '이미지03',
  },
]

function Item() {
  return (
    <Slick>
      {items.map((item, index) => (
        <div key={index}>
          <img src={item.item} alt={item.name} />
        </div>
      ))}
    </Slick>
  )
}
export default function Home() {
  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

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
        <div className="container mx-auto">
          <h1 className="text-4xl mb-8">Auto Carousel Demo</h1>
        </div>
        <Responsive></Responsive>
        <Slick>
          {items.map((item, index) => (
            <div key={index}>
              <img src={item.item} alt={item.name} />
            </div>
          ))}
        </Slick>
        <div>
          <h2> Single Item</h2>
          <Slider {...settings}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </div>

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
