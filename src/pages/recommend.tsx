import { useDispatch, useSelector } from 'react-redux'
import {
  initializeRecommend,
  selectAttractions,
  selectRecommendInfo,
} from '../slices/recommendSlice'
import { useEffect, useState } from 'react'
import { AppDispatch } from '../store'
import RecommendMap from '../recommend_components/RecommendMap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {
  selectCategory,
  selectCompanion,
  selectDuration,
  selectTravelId,
  selectUser,
  setRecommendSchedule,
} from '../slices/travelInfoSlice'
import { RecommendInput } from '../interfaces/recommendInput'
import RecommendNav from '../recommend_components/RecommendNav'
import { fetchTravelScheduleAsync } from '../functions/fetchTravel'
import { PlaceInfo } from '../interfaces/placeInfo'
import RecommendContainer from '../recommend_components/RecommendContainer'
import RecommmendDetail from '../recommend_components/RecommendDetail'
import { ImageQueryInput } from '../interfaces/imageQuery'
import { selectEndDate, selectStartDate } from '../slices/timeSlice'
import { MajorCategoriesWithMinorCategories } from '../interfaces/category'
import { fetchRecommendAttractionsAsync } from '../functions/fetchRecommend'
import Loading2 from '../components/loading2'
import Loading from '../components/loading'

const RecommendPage = () => {
  const dispatch = useDispatch<AppDispatch>()

  // selector from 'travelInfoSlice'
  const userId: string = useSelector(selectUser)
  const travelId: string = useSelector(selectTravelId)

  const companion: string | null = useSelector(selectCompanion)
  const duration: number = useSelector(selectDuration)

  //const travelStartDate: string = useSelector(selectTravelStartDate)
  const travelStartDate: string = useSelector(selectStartDate) //IosdateString
  const majorCategoriesWithMinorCategories: MajorCategoriesWithMinorCategories =
    useSelector(selectCategory)

  // selector from 'imageQuerySlice'
  const startDate = useSelector(selectStartDate)
  const endDate = useSelector(selectEndDate)

  const recommendSchedule: PlaceInfo[][] = useSelector(selectAttractions)

  // selector from 'recommendSlice'
  const recommendInfo = useSelector(selectRecommendInfo)

  // 여기서 초기 쿼리 입력 값을 설정하십시오.
  const ImageQueryInput: ImageQueryInput = {
    user: userId,
    travel_id: travelId,
    majorCategoriesWithMinorCategories: majorCategoriesWithMinorCategories,
    companion: companion,
    duration: duration,
    date: travelStartDate, // TODO : 실제값 채워넣기
    startDate: startDate,
    endDate: endDate,
  }

  useEffect(() => {
    dispatch(fetchRecommendAttractionsAsync(ImageQueryInput))
    dispatch(initializeRecommend())
  }, [])

  useEffect(() => {
    if (recommendInfo.loading == 'succeeded') {
      dispatch(setRecommendSchedule(recommendSchedule))
      const travelInput: RecommendInput = {
        user: userId,
        travel_id: travelId,
      }
      dispatch(fetchTravelScheduleAsync(travelInput))
    }
  }, [recommendInfo.loading])

  if (recommendInfo.loading === 'idle' || recommendInfo.loading === 'pending') {
    return <Loading></Loading>
  } else {
    return (
      <div className="flex flex-row">
        <div className="bg-white min-w-[700px] w-1/2 relative h-screen max-h-screen overflow-hidden">
          <div className="flex flex-row">
            <RecommendNav></RecommendNav>
            <RecommendContainer></RecommendContainer>
          </div>
        </div>
        <div className="flex w-1/2 h-screen">
          <RecommmendDetail></RecommmendDetail>
        </div>
        {/* <div className="w-1/2">
        <RecommendMap></RecommendMap>
      </div> */}
      </div>
    )
  }
}

export default RecommendPage
