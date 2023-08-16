import React from 'react'
import Image from 'next/image'
import styles from './CarouselImage.module.css'

interface CarouselImageProps {
  src: string
  title: string
  subtitle: string
}

const CarouselImage = (props: CarouselImageProps) => {
  return (
    <div className="relative h-[160px] md:h-[300px] xl:h-[500px] focus:outline-none">
      <div className="p-3">
        <Image
          src={props.src}
          alt={props.title}
          layout="fill"
          className="rounded-[8%] p-2"
        />
      </div>
      <div className="absolute left-4 md:left-6 xl:left-10 bottom-4 md:bottom-6 xl:bottom-10">
        <div className="relative text-base sm:text-lg md:text-xl xl:text-3xl font-bold text-white">
          {props.title}
        </div>
        <div className="relative text-xs sm:text-sm md:text-md xl:text-base text-white">
          {props.subtitle}
        </div>
      </div>
    </div>
  )
}

export default CarouselImage
