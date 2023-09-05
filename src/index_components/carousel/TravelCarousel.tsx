import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import CarouselImage from './CarouselImage'
import { useDispatch } from 'react-redux'
import { setCity } from '../../slices/travelInfoSlice'

export interface CarouselProps {
  openPopup: () => void
}
function TravelCarousel({ openPopup }: CarouselProps) {
  const settings = {
    className: 'relative',
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: true,
    autoplay: true,
    // centerMode: true,
  }
  const dispatch = useDispatch()
  function getCityInfo(cityName: any) {
    dispatch(setCity(cityName))
    openPopup()
  }

  return (
    <div className="w-full pb-20">
      <Slider {...settings} className="my-4">
        <CarouselImage
          src="/assets/carousel/osaka.jpg"
          title="OSAKA"
          subtitle="일본 오사카"
          onClick={() => getCityInfo('오사카')}
        />
        <CarouselImage
          src="/assets/carousel/danang.jpg"
          title="DANANG"
          subtitle="베트남 다낭"
          onClick={() => getCityInfo('다낭')}
        />
        <CarouselImage
          src="/assets/carousel/bangkok.jpg"
          title="BANGKOK"
          subtitle="태국 방콕"
          onClick={() => getCityInfo('방콕')}
        />
        <CarouselImage
          src="/assets/carousel/taipei.jpg"
          title="TAIPEI"
          subtitle="대만 타이페이"
          onClick={() => getCityInfo('타이페이')}
        />
        <CarouselImage
          src="/assets/carousel/singapore.jpg"
          title="SINGAPORE"
          subtitle="싱가포르 싱가포르"
          onClick={() => getCityInfo('싱가포르')}
        />
        <CarouselImage
          src="/assets/carousel/cebu.jpg"
          title="CEBU"
          subtitle="필리핀 세부"
          onClick={() => getCityInfo('세부')}
        />
        <CarouselImage
          src="/assets/carousel/bali.jpg"
          title="BALI"
          subtitle="인도네시아 발리"
          onClick={() => getCityInfo('발리')}
        />
        <CarouselImage
          src="/assets/carousel/guam.jpg"
          title="GUAM"
          subtitle="괌 괌"
          onClick={() => getCityInfo('괌')}
        />
        <CarouselImage
          src="/assets/carousel/hawaii.jpg"
          title="HAWAII"
          subtitle="미국 하와이"
          onClick={() => getCityInfo('하와이')}
        />
        <CarouselImage
          src="/assets/carousel/hongkong.jpg"
          title="HONGKONG"
          subtitle="홍콩 홍콩"
          onClick={() => getCityInfo('홍콩')}
        />
      </Slider>
    </div>
  )
}

export default TravelCarousel
