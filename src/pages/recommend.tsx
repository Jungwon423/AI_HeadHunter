import { useDispatch, useSelector } from 'react-redux'
import {
  initialize,
  handleCurrentPlace,
  setCurrentDay,
  selectUserId,
  selectAttractions,
} from '../slices/recommendSlice'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Source,
  Layer,
} from 'react-map-gl'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { selectAttractionQueryTravelId } from '../slices/imageQuerySlice'
import { AppDispatch } from '../store'
import Image from 'next/image'
import RecommendMap from '../travel_components/RecommendMap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { fetchTravelScheduleAsync } from '../slices/travelInfoSlice'
import { RecommendInput } from '../interfaces/recommendInput'
import RecommendNav from '../recommend_components/RecommendNav'
import RecoContainer from '../recommend_components/RecoContainer'

const RecommendPage = () => {
  const TOKEN =
    'pk.eyJ1IjoiemlnZGVhbCIsImEiOiJjbGtrcGNwdXQwNm1oM2xvZTJ5Z2Q4djk5In0._rw_aFaBfUjQC-tjkV53Aw'
  const [viewport, setViewport] = useState({
    latitude: 37.5665, // 초기 위도, 예시로 서울의 위도를 사용함
    longitude: 126.978, // 초기 경도, 예시로 서울의 경도를 사용함
    zoom: 10, // 초기 줌 레벨
    width: '100vw',
    height: '100vh',
  })
  const dispatch = useDispatch<AppDispatch>()
  const userId: string = useSelector(selectUserId)
  const travelId: string = useSelector(selectAttractionQueryTravelId) // !: travelId is not null
  // const showChat = useSelector(selectShowChat)

  useEffect(() => {
    dispatch(initialize())
    const input: RecommendInput = {
      user: userId,
      travel_id: travelId,
    }
    dispatch(fetchTravelScheduleAsync(input))
  }, [])

  return (
    <div className="flex flex-row">
      <div className="bg-white w-[700px] min-w-[700px] relative h-screen max-h-screen overflow-hidden">
        <div className="flex flex-row">
          <RecommendNav></RecommendNav>
          <RecoContainer></RecoContainer>
        </div>
      </div>
      <div className="">
        <RecommendMap></RecommendMap>
      </div>
    </div>
  )
}

export default RecommendPage
