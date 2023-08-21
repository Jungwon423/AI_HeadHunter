// ButtonWithImage.tsx
import React, { ReactNode } from 'react'
import Image from 'next/image'

interface ButtonWithImageProps {
  imageSrc: string
  text: string
  detailText: ReactNode
}

const ButtonWithImage: React.FC<ButtonWithImageProps> = ({
  imageSrc,
  text,
  detailText,
}) => {
  return (
    <button className="flex flex-col w-24 h-18 mr-2 mb-2 px-2 py-2 bg-gray-50 rounded-md shadow-sm">
      <div className="flex flex-row pb-3">
        <Image
          src={imageSrc}
          alt={text}
          width={30}
          height={30}
          style={{
            height: 'auto',
          }}
          className="px-1"
        />
        <div className="pl-1 text-[15px] font-semibold font-sans">{text}</div>
      </div>
      {detailText}
    </button>
  )
}

export default ButtonWithImage
