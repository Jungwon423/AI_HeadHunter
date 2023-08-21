import Image from 'next/image'
import { useState } from 'react'

interface ImageWithSkeletonProps {
  originalUrl: string
  handleImageClick: void
}

const ImageWithSkeleton = ({
  originalUrl,
  handleImageClick,
}: ImageWithSkeletonProps) => {
  const [loaded, setLoaded] = useState(false)
  console.log()

  return (
    <div className={`${loaded ? '' : 'animate-pulse bg-gray-400'}`}>
      {/* <div className=""> */}
      <Image
        referrerPolicy="no-referrer"
        src={originalUrl}
        alt="Right Image"
        fill
        sizes="undefined"
        onClick={() => handleImageClick}
        onLoad={() => setLoaded(true)}
        style={{
          objectPosition: 'right',
          objectFit: 'contain',
          maxWidth: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}

export default ImageWithSkeleton
