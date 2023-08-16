// 필요한 모듈을 가져옵니다.
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import CarouselImage from './CarouselImage'

interface ImageSize {
  width: number
  height: number
}

function Carousel() {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: false,
    adaptiveHeight: true,
  }

  // 이미지 크기를 설정합니다.
  const imageSize: ImageSize = { width: 500, height: 200 }

  return (
    <div className="py-8">
      <Slider {...settings}>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/images/travel2.jpg"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
          />
        </div>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/bonus/elina2.jpg"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
          />
        </div>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/bonus/elina.jpg"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
          />
        </div>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/bonus/elina3.jpg"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
          />
        </div>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/bonus/elina3.jpg"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
          />
        </div>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/bonus/bonus.jpg"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
          />
        </div>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/bonus/bonus2.jpg"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
          />
        </div>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/bonus/bonus3.jpg"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
          />
        </div>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/bonus/bonus4.jpg"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
          />
        </div>
      </Slider>
    </div>
  )
}

export default Carousel
