import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import CarouselImage from './CarouselImage'

function TravelCarousel() {
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

  return (
    <div className="w-full pb-20">
      <Slider {...settings} className="my-4">
        <CarouselImage
          src="/assets/carousel/osaka.jpg"
          title="OSAKA"
          subtitle="일본 오사카"
        />
        <CarouselImage
          src="/assets/carousel/danang.jpg"
          title="DANANG"
          subtitle="베트남 다낭"
        />
        <CarouselImage
          src="/assets/carousel/bangkok.jpg"
          title="BANGKOK"
          subtitle="태국 방콕"
        />
        <CarouselImage
          src="/assets/carousel/taipei.jpg"
          title="TAIPEI"
          subtitle="대만 타이페이"
        />
        <CarouselImage
          src="/assets/carousel/singapore.jpg"
          title="SINGAPORE"
          subtitle="싱가포르 싱가포르"
        />
        <CarouselImage
          src="/assets/carousel/cebu.jpg"
          title="CEBU"
          subtitle="필리핀 세부"
        />
        <CarouselImage
          src="/assets/carousel/guam.jpg"
          title="GUAM"
          subtitle="괌 괌"
        />
        <CarouselImage
          src="/assets/carousel/bali.jpg"
          title="BALI"
          subtitle="인도네시아 발리"
        />
        <CarouselImage
          src="/assets/carousel/guam.jpg"
          title="GUAM"
          subtitle="괌 괌"
        />
        <CarouselImage
          src="/assets/carousel/hawaii.jpg"
          title="HAWAII"
          subtitle="미국 하와이"
        />
        <CarouselImage
          src="/assets/carousel/hongkong.jpg"
          title="HONGKONG"
          subtitle="홍콩 홍콩"
        />
      </Slider>
    </div>
  )
}

export default TravelCarousel
