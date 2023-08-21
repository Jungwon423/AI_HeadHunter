// components/KeywordImage.tsx
import React, { useState, useEffect } from 'react'
import { fetchImage } from './extractKeywords'

interface KeywordImageProps {
  keyword: string
}

const KeywordImage: React.FC<KeywordImageProps> = ({ keyword }) => {
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const getImage = async () => {
      const url = await fetchImage(keyword)
      setImageUrl(url)
    }

    if (keyword) {
      getImage()
    }
  }, [keyword])

  return (
    <div className="m-4">
      <p className="text-center font-semibold">{keyword}</p>
      {imageUrl ? (
        <img
          className="w-full h-64 object-cover"
          src={imageUrl}
          alt={keyword}
        />
      ) : (
        <div className="h-64 w-full bg-gray-200">
          이미지를 찾을 수 없습니다.
        </div>
      )}
    </div>
  )
}

export default KeywordImage
