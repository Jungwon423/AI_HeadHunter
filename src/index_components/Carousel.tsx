import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/legacy/image'

function Carousel() {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: false,
  }
  //   var settings = {
  //     dots: true,
  //     infinite: false,
  //     speed: 500,
  //     slidesToShow: 4,
  //     slidesToScroll: 4,
  //     initialSlide: 0,
  //     responsive: [
  //       {
  //         breakpoint: 1024,
  //         settings: {
  //           slidesToShow: 3,
  //           slidesToScroll: 3,
  //           infinite: true,
  //           dots: true,
  //         },
  //       },
  //       {
  //         breakpoint: 600,
  //         settings: {
  //           slidesToShow: 2,
  //           slidesToScroll: 2,
  //           initialSlide: 2,
  //         },
  //       },
  //       {
  //         breakpoint: 480,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1,
  //         },
  //       },
  //     ],
  //   }
  return (
    <div className="py-8">
      <Slider {...settings}>
        <div className="w-96 h-96">
          <Image
            src="/assets/images/travel.jpg"
            alt="travel"
            width={500}
            height={500}
            objectPosition="center"
          />
        </div>
        <div>
          <Image
            src="/assets/images/travel2.jpg"
            alt="travel"
            width={500}
            height={500}
            objectPosition="center"
            quality={100}
          />
        </div>
        <div>
          <Image
            src="/assets/images/eiffel-tower.webp"
            alt="travel"
            width={500}
            height={500}
            objectPosition="center"
            quality={100}
          />
        </div>
        <div>
          <Image
            src="/assets/images/statue-of-liberty.jpg"
            alt="travel"
            width={500}
            height={500}
            objectPosition="center"
            quality={100}
          />
        </div>
        <div>
          <Image
            src="/assets/images/sydney-opera-house.jpg"
            alt="travel"
            width={500}
            height={500}
            objectPosition="center"
            quality={100}
          />
        </div>
        <div>
          <Image
            src="/assets/images/osaka.webp "
            alt="travel"
            width={500}
            height={500}
            objectPosition="center"
            quality={100}
          />
        </div>
      </Slider>
    </div>
  )
}

export default Carousel
