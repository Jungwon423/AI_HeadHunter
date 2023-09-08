import { useSelector } from 'react-redux'
import { selectCurrentPlace } from '../slices/travelInfoSlice'
import GuideTab from './ReviewTab'
import GoogleButton from '../travel_components/GoogleButton'
import { selectCurrentTabIndex } from '../slices/tabSlice'
import 'react-image-gallery/styles/css/image-gallery.css'
import RecommendDetailHome from './RecommendDetail_components/home'
import RecommendDetailReview from './RecommendDetail_components/review'
import RecommendDetailBlog from './RecommendDetail_components/blog'
import RecommendDetailYoutube from './RecommendDetail_components/youtube'

const RecommmendDetail = () => {
  const selectedPlace = useSelector(selectCurrentPlace)
  let currentReviewTab = useSelector(selectCurrentTabIndex)

  if (!selectedPlace || !selectedPlace?.coordinate) {
    return <div className="w-1/3 rounded-none hidden z-10"></div>
  }
  return (
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
  )
}

export default RecommmendDetail
