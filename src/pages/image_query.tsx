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
    router.push('/travel')
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
    attractionQuery.query_list[count][0].image,
  )
  console.log(
    'attractionQuery.query_list',
    attractionQuery.query_list[count][1].image,
  )
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-row w-full">
        <div className="w-1/2 h-80 rounded-lg overflow-hidden">
          <Image
            src={attractionQuery.query_list[count][0].image}
            alt="Left Image"
            width={400}
            height={400}
            style={{ objectFit: 'cover' }}
            onClick={() => handleImageClick('left')}
          />
        </div>
        <div className="w-1/2 h-80 rounded-lg overflow-hidden">
          <Image
            src={attractionQuery.query_list[count][1].image}
            alt="Right Image"
            width={400}
            height={400}
            style={{ objectFit: 'cover' }}
            onClick={() => handleImageClick('right')}
          />
        </div>
      </div>
    </div>
  )
}

export default ImageQuery
