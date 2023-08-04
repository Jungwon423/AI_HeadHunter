// components/StarRating.tsx

import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

interface StarRatingProps {
  rating: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const maxStars = 5
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating - fullStars > 0

  return (
    <div className="flex">
      {[...Array(maxStars)].map((_, i) => {
        const ratingValue = i + 1

        if (ratingValue <= fullStars) {
          return (
            <i key={i} className="bi bi-star-fill text-yellow-400 text-xl"></i>
          )
        } else if (ratingValue === fullStars + 1 && hasHalfStar) {
          return (
            <i key={i} className="bi bi-star-half text-yellow-400 text-xl"></i>
          )
        } else {
          return <i key={i} className="bi bi-star text-yellow-400 text-xl"></i>
        }
      })}
    </div>
  )
}

export default StarRating
