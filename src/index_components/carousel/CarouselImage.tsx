import React, { useState } from 'react'
import Image from 'next/image'
import styles from './CarouselImage.module.css'

interface CarouselImageProps {
  src: string
  title: string
  subtitle: string
  onClick: () => void
}

const CarouselImage = (props: CarouselImageProps) => {
  const [mouseDownTime, setMouseDownTime] = useState(0)

  const handleMouseDown = () => {
    setMouseDownTime(Date.now())
  }

  const handleMouseUp = () => {
    const elapsedTime = Date.now() - mouseDownTime

    // 짧은 시간 내에 MouseDown과 MouseUp이 발생한 경우 클릭으로 간주 (ex. 150ms)
    if (elapsedTime < 150) {
      props.onClick()
    }
  }
  return (
    <div className="relative h-[160px] md:h-[300px] xl:h-[500px] focus:outline-none">
      <Image
        src={props.src}
        alt={props.title}
        fill
        priority
        sizes="undefined"
        className="relative rounded-[8%] p-2"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />

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
