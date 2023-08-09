import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { InitialQueryInput } from '../slices/questionnaireSlice'
import {
  selectUserId,
  selectCity,
  selectCompanion,
  selectDuration,
  selectBudget,
} from '../slices/travelInfoSlice'
import { selectQueryInput, setQueryInput } from '../slices/queryInputSlice'
import { link } from 'fs'
import { useRouter } from 'next/router'
import { AppThunk, AppDispatch } from '../store'
import {
  fetchAttractionQueryAsync,
  fetchAttractionQuery,
  selectAttractionQueryList,
  selectAttractionQuery,
  selectAttractionQueryResultList,
  setResultList,
} from '../slices/imageQuerySlice'

const ImageQuery = () => {
  const [count, setCount] = useState(0)

  const nextPage = () => {
    setCount(count + 1)
  }

  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()
  const userId: string = useSelector(selectUserId)
  const city: string = useSelector(selectCity)
  const companion: string = useSelector(selectCompanion)
  const duration: number = useSelector(selectDuration)
  const budget: number = useSelector(selectBudget)

  const attractionQuery = useSelector(selectAttractionQuery)

  console.log('attractionQuery', attractionQuery)

  // 여기서 초기 쿼리 입력 값을 설정하십시오.
  const initialQueryInput: InitialQueryInput = {
    user: userId,
    destination: city,
    duration: duration,
    budget: budget,
    companion: companion,
  }
  console.log('initial 화면 : initialQueryInput', initialQueryInput)

  useEffect(() => {
    dispatch(fetchAttractionQueryAsync(initialQueryInput))
    console.log('initial 화면 : initialQueryInput', initialQueryInput)
  }, [])

  const handleImageClick = (image: string) => {
    if (image === 'left') {
      dispatch(setResultList(0))
      setCount(count + 1)
    } else if (image === 'right') {
      dispatch(setResultList(1))
      setCount(count + 1)
    }
  }

  if (count === 8) {
    router.push('/preference')
    return (
      <div className="flex items-center justify-center h-screen">
        <p>query complete!</p>
      </div>
    )
  }

  if (attractionQuery.loading === 'idle') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }
  if (attractionQuery.loading === 'pending') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (attractionQuery.loading === 'failed') {
    return <p>Error: {attractionQuery.error}</p>
  }

  console.log('통과')
  console.log('count : ' + count)

  console.log(
    'attractionQuery.query_list',
    attractionQuery.query_list[count][0],
  )
  console.log(
    'attractionQuery.query_list',
    attractionQuery.query_list[count][0],
  )
  console.log(
    'attractionQuery.query_list',
    attractionQuery.query_list[count][0].image,
  )
  console.log(
    'attractionQuery.query_list',
    attractionQuery.query_list[count][1].image,
  )

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-center items-center w-screen h-28">
        <div className="text-2xl md:text-4xl xl:text-5xl font-bold">
          여행 이상형 월드컵 16강
        </div>
        <div className="font-bold text-2xl md:text-4xl xl:text-5xl ml-5">
          {count + 1}/8
        </div>
      </div>
      <div className="flex justify-center items-center h-full bg-black">
        <div className="relative w-1/2 h-full">
          <Image
            src={attractionQuery.query_list[count][0].image}
            alt="Right Image"
            fill
            sizes="undefined"
            onClick={() => handleImageClick('right')}
            style={{
              objectPosition: 'right',
              objectFit: 'contain',
              maxWidth: '100%',
              height: '100%',
            }}
          />
          <div className="flex flex-col bg-gray-800 justify-end opacity-80 p-2">
            <div className="flex justify-end text-white text-base sm:text-xl font-bold mt-2 mb-2">
              {attractionQuery.query_list[count][0].name}
            </div>
            <div className="flex justify-end text-white text-xs sm:text-sm mt-3 mb-3">
              {attractionQuery.query_list[count][0].summary?.overview}
            </div>
          </div>
        </div>
        <div className="fixed z-10">
          <Image
            src="/assets/images/vs.png"
            onClick={() => handleImageClick('right')}
            alt="Right Image"
            width={150}
            height={150}
            style={{ width: '100%', height: 'auto' }}
          ></Image>
        </div>
        <div className="relative w-1/2 h-full">
          <Image
            src={attractionQuery.query_list[count][1].image}
            alt="Right Image"
            fill
            sizes="undefined"
            onClick={() => handleImageClick('right')}
            style={{
              objectPosition: 'left',
              objectFit: 'contain',
              maxWidth: '100%',
              height: '100%',
            }}
          />

          <div className="flex flex-col bg-gray-800 justify-end opacity-80 p-2">
            <div className="text-white text-base sm:text-xl font-bold mt-2 mb-2">
              {attractionQuery.query_list[count][1].name}
            </div>
            <div className="text-white text-xs sm:text-sm mt-3 mb-3">
              {attractionQuery.query_list[count][1].summary?.overview}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageQuery
