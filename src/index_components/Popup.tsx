// components/Popup.tsx
import React from 'react'
import Image from 'next/image'
import { useEffect } from 'react'
import {
  CityInput,
  fetchCityDetailAsync,
  selectCityDetail,
} from '../slices/cityDetailSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { selectCity } from '../slices/travelInfoSlice'

interface PopupProps {
  isOpen: boolean
  onClose: () => void
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  // const city = useSelector(selectCity)
  if (!isOpen) return null
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    const cityInput: CityInput = {
      destination: '오사카',
    }
    dispatch(fetchCityDetailAsync(cityInput))
  }, [])
  const cityInfos = useSelector(selectCityDetail)
  console.log(cityInfos.city_detail)
  const cityDetail = cityInfos.city_detail

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-20">
      {/* {children} */}
      <div className="flex relative bg-white rounded-lg shadow-md px-16 py-16">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-700"
        >
          X
        </button>
        <div className="flex-col w-96 mx-6">
          <div className="text-2xl font-bold">{cityDetail?.name_ko}</div>
          <div className="mb-5 text-xl text-gray-700 font-medium">
            {cityDetail?.name_en}
          </div>
          <div className="text-xs text-gray-500 font-bold">
            {cityDetail?.descriptionInfo.legacy}
          </div>
          <div className="flex">
            <button className="flex flex-col px-2 mr-2 py-2 bg-gray-50 rounded-md shadow-sm">
              <div className="flex flex-row pb-3">
                <Image
                  src="/assets/buttonIcon/calendar.webp"
                  alt="추천시기"
                  width={25}
                  height={25}
                  style={{
                    height: 'auto',
                  }}
                  className="px-1"
                ></Image>
                <div className="pl-1 text-[8px]">추천 시기</div>
              </div>
              {cityDetail?.weatherRecommend.season.map((month, index) => (
                <div className="pl-1 text-[8px]" key={index}>
                  {month}
                </div>
              ))}
            </button>
            <button className="flex flex-col px-2 py-2 bg-gray-50 rounded-md shadow-sm">
              <div className="flex flex-row pb-3">
                <Image
                  src="/assets/buttonIcon/plane.png"
                  alt="항공"
                  width={25}
                  height={25}
                  style={{
                    height: 'auto',
                  }}
                  className="px-1"
                ></Image>
                <div className="pl-1 text-[8px]">항공</div>
              </div>
              <div className="pl-1 text-[8px]">
                {cityDetail?.shortestFlightInfo!.duration}
              </div>
            </button>

            <button className="flex flex-col px-2 py-2 bg-gray-50 rounded-md shadow-sm">
              <div className="flex flex-row pb-3">
                <Image
                  src="/assets/buttonIcon/boarding-pass.png"
                  alt="비자"
                  width={25}
                  height={25}
                  style={{
                    height: 'auto',
                  }}
                  className="px-1"
                ></Image>
                <div className="pl-1 text-[8px]">비자</div>
              </div>
              <div className="pl-1 text-[8px]">
                {cityDetail?.visaInfo.description}
              </div>
            </button>
          </div>

          <button className="relative top-5 right-1 text-sm px-4 py-2 bg-gray-500 text-white rounded-md">
            더보기
          </button>
          <button className="relative top-5 right-1 text-sm px-4 py-2 bg-indigo-500 text-white rounded-md">
            일정 만들기 {'>'}
          </button>
        </div>
        <div className="flex bg-white">
          <Image
            // 여기에 클래스 적용
            className="rounded"
            src={cityDetail?.image.photoURL!}
            alt="travel"
            width={200}
            height={250}
            quality={100}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Popup
