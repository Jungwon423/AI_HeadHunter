// components/FallbackImage.tsx

import React, { useState } from 'react'

interface FallbackImageProps {
  src: string
  fallbackSrc: string
  alt: string
  className?: string
  onClick: () => void
  loadingDelay?: number // 새로운 속성 추가
}

const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className,
  onClick,
  loadingDelay = 0, // 기본값 설정
}) => {
  const [imageUrl, setImageUrl] = useState(src)

  const handleError = () => {
    setImageUrl(fallbackSrc)
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      onClick={onClick}
      onError={handleError}
    />
  )
}

export default FallbackImage
