import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'

interface ImageSize {
  width: number
  height: number
}

function TravelCarousel() {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: false,
  }

  // 이미지 크기를 설정합니다.
  const imageSize: ImageSize = { width: 500, height: 400 }

  return (
    <div className="py-8">
      <Slider {...settings}>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/carousel/osaka.webp"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
            style={{ width: 'auto' }}
            className="rounded-xl"
          />
        </div>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/carousel/sydney.jpg"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
            style={{ width: 'auto' }}
            className="rounded-xl"
          />
        </div>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/carousel/hawaii.jpg"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
            style={{ width: 'auto' }}
            className="rounded-xl"
          />
        </div>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/carousel/danang.jpg"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
            style={{ width: 'auto' }}
            className="rounded-xl"
          />
        </div>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/carousel/dubai.jpg"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
            style={{ width: 'auto' }}
            className="rounded-xl"
          />
        </div>
        <div className={`w-${imageSize.width} h-${imageSize.height}`}>
          <Image
            src="/assets/carousel/bankok.jpg"
            alt="travel"
            width={imageSize.width}
            height={imageSize.height}
            style={{ width: 'auto' }}
            className="rounded-xl"
          />
        </div>
      </Slider>
    </div>
  )
}

export default TravelCarousel
