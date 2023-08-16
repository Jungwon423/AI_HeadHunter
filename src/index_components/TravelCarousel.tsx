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
    autoplay: false,
    // centerMode: true,
  }

  return (
    <div className="w-full pb-20">
      <Slider {...settings} className="my-4">
        <CarouselImage
          src="/assets/carousel/sydney.jpg"
          title="BANGKOK"
          subtitle="태국 방콕"
        />
        <div className="relative  h-[180px] md:h-[340px] xl:h-[500px] focus:outline-none p-3">
          <Image
            src="/assets/carousel/osaka.webp"
            alt="travel"
            layout="fill"
            className="rounded-xl"
          />
          <div className="absolute left-4 md:left-6 xl:left-10 bottom-4 md:bottom-6 xl:bottom-10">
            <div className="relative text-base sm:text-lg md:text-xl xl:text-3xl font-bold text-white">
              BANGKOK
            </div>
            <div className="relative text-xs sm:text-sm md:text-md xl:text-base text-white">
              태국 방콕
            </div>
          </div>
        </div>
        <div className="relative  h-[180px] md:h-[340px] xl:h-[500px] focus:outline-none p-3">
          <Image
            src="/assets/carousel/hawaii.jpg"
            alt="travel"
            layout="fill"
            className="rounded-xl"
          />
          <div className="absolute left-4 md:left-6 xl:left-10 bottom-4 md:bottom-6 xl:bottom-10">
            <div className="relative text-base sm:text-lg md:text-xl xl:text-3xl font-bold text-white">
              BANGKOK
            </div>
            <div className="relative text-xs sm:text-sm md:text-md xl:text-base text-white">
              태국 방콕
            </div>
          </div>
        </div>
        <div className="relative  h-[180px] md:h-[340px] xl:h-[500px] focus:outline-none p-3">
          <Image
            src="/assets/carousel/danang.jpg"
            alt="travel"
            layout="fill"
            className="rounded-xl"
          />
          <div className="absolute left-4 md:left-6 xl:left-10 bottom-4 md:bottom-6 xl:bottom-10">
            <div className="relative text-base sm:text-lg md:text-xl xl:text-3xl font-bold text-white">
              BANGKOK
            </div>
            <div className="relative text-xs sm:text-sm md:text-md xl:text-base text-white">
              태국 방콕
            </div>
          </div>
        </div>
        <div className="relative  h-[180px] md:h-[340px] xl:h-[500px] focus:outline-none p-3">
          <Image
            src="/assets/carousel/dubai.jpg"
            alt="travel"
            layout="fill"
            className="rounded-xl"
          />
          <div className="absolute left-4 md:left-6 xl:left-10 bottom-4 md:bottom-6 xl:bottom-10">
            <div className="relative text-base sm:text-lg md:text-xl xl:text-3xl font-bold text-white">
              BANGKOK
            </div>
            <div className="relative text-xs sm:text-sm md:text-md xl:text-base text-white">
              태국 방콕
            </div>
          </div>
        </div>
        <div className="relative  h-[180px] md:h-[340px] xl:h-[500px] focus:outline-none p-3">
          <Image
            src="/assets/carousel/bankok.jpg"
            alt="travel"
            layout="fill"
            className="rounded-xl"
          />
          <div className="absolute left-4 md:left-6 xl:left-10 bottom-4 md:bottom-6 xl:bottom-10">
            <div className="relative text-base sm:text-lg md:text-xl xl:text-3xl font-bold text-white">
              BANGKOK
            </div>
            <div className="relative text-xs sm:text-sm md:text-md xl:text-base text-white">
              태국 방콕
            </div>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default TravelCarousel
