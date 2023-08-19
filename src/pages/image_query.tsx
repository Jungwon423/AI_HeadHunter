import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectUser,
  selectCompanion,
  selectDuration,
  selectTravelStartDate,
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
import FallbackImage from '../components/FallbackImage'
import DelayedImage from '../components/DelayedImage'
import Loading2 from '../components/loading2'
import ImageWithSkeleton from './imageWithSkeleton'
import MyNavbar from '../components/MyNavbar'
import NameAndDescription from '../image_query_component/name_and_description'

const ImageQuery = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [count, setCount] = useState(0)

  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()

  // selector from 'travelInfoSlice'
  const userId: string = useSelector(selectUser)
  const travelId: string = useSelector(selectTravelId)

  const companion: string = useSelector(selectCompanion)
  const duration: number = useSelector(selectDuration)

  const travelStartDate: string = useSelector(selectTravelStartDate)

  const majorCategoriesWithMinorCategories: MajorCategoriesWithMinorCategories =
    useSelector(selectCategory)

  // selector from 'imageQuerySlice'
  const attractionQuery = useSelector(selectImageQuery)
  const resultList = useSelector(selectImageQueryResultList)

  // 여기서 초기 쿼리 입력 값을 설정하십시오.
  const ImageQueryInput: ImageQueryInput = {
    user: userId,
    travel_id: travelId,
    majorCategoriesWithMinorCategories: majorCategoriesWithMinorCategories,
    companion: companion,
    duration: duration,
    date: travelStartDate, // TODO : 실제값 채워넣기
  }

  useEffect(() => {
    dispatch(initialize())
    console.log('ImageQueryInput : ', ImageQueryInput)
    dispatch(fetchImageQueryAsync(ImageQueryInput))
  }, [])

  const handleImageClick = (image: string) => {
    console.log('resultList : ' + resultList)
    if (image === 'left') {
      dispatch(setResultList(0))
      setIsLoading(true)
      setCount(count + 1)
    } else if (image === 'right') {
      dispatch(setResultList(1))
      setCount(count + 1)
      setIsLoading(true)
    }
  }

  if (count === attractionQuery.query_list.length && count !== 0) {
    router.push('/preference')
    return (
      <div className="flex items-center justify-center h-screen">
        <p>query complete!</p>
      </div>
    )
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
  const prefix = 'https://search.pstatic.net/common?src='
  const suffix = '&type=m1500_travelsearch'
  const suffix2 = '&type=w800_travelsearch'
  const encodingFirst = (url: string) => {
    let encodedUrl = encodeURIComponent(url)
    let firstImage = prefix + encodedUrl + suffix
    let firstImage2 = prefix + encodedUrl + suffix2
    return [firstImage, firstImage2]
  }
  const encodingSecond = (url: string) => {
    let encodedUrl = encodeURIComponent(url)
    let secondImage = prefix + encodedUrl + suffix
    let secondImage2 = prefix + encodedUrl + suffix2
    return [secondImage, secondImage2]
  }
  let originalUrl = attractionQuery.query_list[count][0].image!
  let originalUrl2 = attractionQuery.query_list[count][1].image!
  let firstImage = encodingFirst(originalUrl)[0]
  let firstImage2 = encodingFirst(originalUrl)[1]
  let secondImage = encodingSecond(originalUrl2)[0]
  let secondImage2 = encodingSecond(originalUrl2)[1]
  console.log('firstImage : ', firstImage)
  console.log('secondImage : ', secondImage)

  // console.log('image 1 : ', attractionQuery.query_list[count][0].image)
  // console.log('image 2 : ', attractionQuery.query_list[count][1].image)

  console.log(attractionQuery.query_list[count])

  return (
    <div className="flex flex-col h-screen">
      <MyNavbar></MyNavbar>
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
            referrerPolicy="no-referrer"
            src={originalUrl}
            alt="Right Image"
            fill
            sizes="undefined"
            onClick={() => {
              handleImageClick('left')
            }}
            placeholder="blur"
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            style={{
              objectPosition: 'right',
              objectFit: 'contain',
              maxWidth: '100%',
              height: '100%',
              display: isLoading ? 'block' : 'none', // 이미지가 로드된 경우에만 보이게 함
            }}
            onLoadStart={() => {
              console.log('time : ', new Date())
            }}
            onLoadingComplete={() => {
              console.log('time : ', new Date())
            }}
          />

          <NameAndDescription
            name={attractionQuery.query_list[count][0].name ?? ''}
            description={
              attractionQuery.query_list[count][0].summary?.overview ?? ''
            }
          ></NameAndDescription>
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
            placeholder="blur"
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            onClick={() => handleImageClick('right')}
            style={{
              objectPosition: 'right',
              objectFit: 'contain',
              maxWidth: '100%',
              height: '100%',
            }}
          />
          <NameAndDescription
            name={attractionQuery.query_list[count][1].name ?? ''}
            description={
              attractionQuery.query_list[count][1].summary?.overview ?? ''
            }
          ></NameAndDescription>
        </div>
      </div>
    </div>
  )
}

export default ImageQuery
