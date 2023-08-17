// components/DelayedImage.tsx
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface DelayedImageProps {
  src: string
  alt: string
  width: number
  height: number
  delay?: number
}

export default function DelayedImage({
  src,
  alt,
  width,
  height,
  delay = 0,
}: DelayedImageProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return loaded && <Image src={src} alt={alt} width={width} height={height} />
}
