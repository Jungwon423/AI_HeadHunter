import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectUser,
  selectCompanion,
  selectDuration,
  selectCategory,
  selectTravelId,
} from '../slices/travelInfoSlice'
import { useRouter } from 'next/router'
import { AppDispatch } from '../store'
import {
  selectImageQuery,
  selectImageQueryResultList,
  setResultList,
  initialize,
} from '../slices/imageQuerySlice'
import { ImageQueryInput } from '../interfaces/imageQuery'
import { fetchImageQueryAsync } from '../functions/fetchImageQuery'
import { MajorCategoriesWithMinorCategories } from '../interfaces/category'
import Loading2 from '../components/loading2'
import NameAndDescription from '../image_query_component/name_and_description'
import { selectEndDate, selectStartDate } from '../slices/timeSlice'

const ImageQuery = () => {
  const [isLoading1, setIsLoading1] = useState(false)

  const [isLoading2, setIsLoading2] = useState(false)
  const [count, setCount] = useState(0)

  const router = useRouter()

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
  const attractionQuery = useSelector(selectImageQuery)
  const resultList = useSelector(selectImageQueryResultList)
  const startDate = useSelector(selectStartDate)
  const endDate = useSelector(selectEndDate)

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
    dispatch(initialize())
    dispatch(fetchImageQueryAsync(ImageQueryInput))
    setIsLoading1(false)
    setIsLoading2(false)
  }, [])

  const handleImageClick = (image: string) => {
    if (image === 'left') {
      dispatch(setResultList(0))
      setIsLoading1(true)
      setIsLoading2(true)
      setCount(count + 1)
    } else if (image === 'right') {
      dispatch(setResultList(1))
      setCount(count + 1)
      setIsLoading1(true)
      setIsLoading2(true)
    }
  }

  if (count === attractionQuery.query_list.length && count !== 0) {
    router.push('/preference')
    return <Loading2></Loading2>
  }

  if (
    attractionQuery.loading === 'idle' ||
    attractionQuery.loading === 'pending'
  ) {
    return <Loading2></Loading2>
  }

  if (attractionQuery.loading === 'failed') {
    return <p>Error: {attractionQuery.error}</p>
  }
  let originalUrl = attractionQuery.query_list[count][0].image!
  let originalUrl2 = attractionQuery.query_list[count][1].image!

  console.log('imageUrl1', originalUrl)
  console.log('imageUrl2', originalUrl2)

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full"></div>
      <div className="flex justify-center items-center w-screen h-28">
        <div className="text-2xl md:text-4xl xl:text-5xl font-bold">
          관광명소 월드컵
        </div>
        <div className="font-bold text-2xl md:text-4xl xl:text-5xl ml-5">
          {count + 1} / {attractionQuery.query_list.length}
        </div>
      </div>
      <div className="flex justify-center items-center h-full bg-black">
        <div className="relative w-1/2 h-full">
          <Image
            property="true"
            referrerPolicy="no-referrer"
            src={originalUrl}
            alt="Left Image"
            fill
            sizes="undefined"
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            onClick={() => handleImageClick('left')}
            style={{
              objectPosition: 'right',
              objectFit: 'contain',
              maxWidth: '100%',
              height: '100%',
              display: isLoading1 ? 'none' : '',
            }}
            onLoadStart={() => {
              console.log('loading')
            }}
            onLoadingComplete={() => {
              setIsLoading1(false)
              console.log('loading complete')
            }}
          />

          <NameAndDescription
            name={attractionQuery.query_list[count][0].name ?? ''}
            description={
              attractionQuery.query_list[count][0].summary?.overview ?? ''
            }
          ></NameAndDescription>
          {isLoading1 && <Loading2></Loading2>}
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
            referrerPolicy="no-referrer"
            src={originalUrl2}
            alt="Right Image"
            fill
            sizes="undefined"
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            onClick={() => handleImageClick('right')}
            style={{
              objectPosition: 'left',
              objectFit: 'contain',
              maxWidth: '100%',
              height: '100%',
              display: isLoading2 ? 'none' : '',
            }}
            onLoadingComplete={() => {
              setIsLoading2(false)
            }}
          />
          <NameAndDescription
            name={attractionQuery.query_list[count][1].name ?? ''}
            description={
              attractionQuery.query_list[count][1].summary?.overview ?? ''
            }
          ></NameAndDescription>
          {isLoading2 && <Loading2></Loading2>}
        </div>
      </div>
    </div>
  )
}

export default ImageQuery
