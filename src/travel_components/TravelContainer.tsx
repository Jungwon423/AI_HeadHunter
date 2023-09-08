import Image from 'next/legacy/image'
import { useSelector } from 'react-redux'
import { selectCurrentPlace } from '../slices/travelInfoSlice'
import StarRating from './StarRating'
import GoogleButton from './GoogleButton'
import { selectCurrentTabIndex } from '../slices/tabSlice'
import CloseButton from './container_components/CloseButton'
import Website from './container_components/Website'
import PhoneNumber from './container_components/PhoneNumber'
import YouTube from 'react-youtube'
import { useState } from 'react'
import { motion } from 'framer-motion'
import RecommmendDetail from '../recommend_components/RecommendDetail'
import RecommendDetailHome from './TravelContainer_components/home'
import RecommendDetailReview from './TravelContainer_components/review'
import RecommendDetailBlog from './TravelContainer_components/blog'
import RecommendDetailYoutube from './TravelContainer_components/youtube'
import GuideTab from './TravelContainer_components/TravelReviewTab'

const TravelContainer = () => {
  const selectedPlace = useSelector(selectCurrentPlace)
  let currentReviewTab = useSelector(selectCurrentTabIndex)

  if (!selectedPlace || !selectedPlace?.coordinate) {
    return <div className="w-1/3 rounded-none hidden z-10"></div>
  }
  return (
    <motion.div
      initial={{ x: -1000 }} // 초기 위치 (왼쪽)
      animate={{ x: 0 }} // 최종 위치 (오른쪽)
      transition={{
        type: 'spring',
        stiffness: 60,
        damping: 20,
      }}
      // "flex flex-col h-full overflow-y-auto items-center
      className="flex-col flex  overflow-y-auto bg-[#FAFAFA] h-screen z-0 "
    >
      <CloseButton />

      <div className="flex flex-col h-full overflow-y-auto items-center">
        <GuideTab></GuideTab>
        {/* {selectedPlace?.googleUrl ? (
        <GoogleButton url={selectedPlace?.googleUrl}></GoogleButton>
      ) : null} */}
        {currentReviewTab === 0 ? (
          <RecommendDetailHome></RecommendDetailHome>
        ) : null}
        {currentReviewTab === 1 ? (
          <RecommendDetailReview></RecommendDetailReview>
        ) : null}
        {currentReviewTab === 2 ? (
          <RecommendDetailBlog></RecommendDetailBlog>
        ) : null}
        {currentReviewTab === 3 ? (
          <RecommendDetailYoutube></RecommendDetailYoutube>
        ) : null}
      </div>
    </motion.div>
  )
}

export default TravelContainer
