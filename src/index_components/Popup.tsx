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
import { selectCity, setUser } from '../slices/travelInfoSlice'
import ButtonWithImage from './ButtonWithImage'
import LocalStorage from './LocalStorage'
import router from 'next/router'

interface PopupProps {
  isOpen: boolean
  onClose: () => void
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  function gotoSurvey() {
    let tempId: string

    if (LocalStorage.getItem('tempId') == null) {
      let randomStr: string = Math.random().toString(36).substring(2, 12)
      LocalStorage.setItem('tempId', randomStr)
      tempId = randomStr
    } else {
      tempId = LocalStorage.getItem('tempId')! // null check
    }
    dispatch(setUser(tempId))
    router.push('/survey')
  }

  const city = useSelector(selectCity)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (!city) return
    const cityInput: CityInput = {
      destination: city,
    }
    dispatch(fetchCityDetailAsync(cityInput))
  }, [city, dispatch])

  const cityInfos = useSelector(selectCityDetail)
  const cityDetail = cityInfos.city_detail

  let flightText = ''
  if (cityDetail && cityDetail.shortestFlightInfo) {
    let shortestFlightDuration = cityDetail.shortestFlightInfo.duration
    flightText =
      Math.floor(shortestFlightDuration! / 60) +
      '시간 ' +
      (shortestFlightDuration! % 60) +
      '분'
  } else {
    flightText = '항공 정보 없음'
  }

  let splittedVisa: string[] = []
  if (cityDetail && cityDetail.visaInfo) {
    splittedVisa = cityDetail?.visaInfo.description.split(',')
  }
  let timeDifference: number = 0
  let timeDifferenceText = ''
  if (cityDetail && cityDetail.timezone.offset) {
    timeDifference = cityDetail?.timezone.offset! - 540
    if (timeDifference == 0) {
      timeDifferenceText = '한국과 같음'
    } else if (timeDifference > 0) {
      timeDifferenceText =
        '한국보다 ' + Math.floor(timeDifference! / 60) + '시간 빠름'
    } else {
      timeDifferenceText =
        '한국보다 ' + Math.abs(Math.floor(timeDifference! / 60)) + '시간 느림'
    }
  } else timeDifferenceText = '시차 정보 없음'

  let frequency, electric
  if (cityDetail && cityDetail.countryInfo && cityDetail.countryInfo.plug) {
    frequency = cityDetail.countryInfo.plug[0].frequency.replace(/(\s*)/g, '') //공백제거
    electric = cityDetail.countryInfo.plug[0].electricPotential.replace(
      /(\s*)/g,
      '',
    ) //공백제거
  } else {
    frequency = '정보 없음'
    electric = '전압 정보 없음'
  }
  if (!isOpen) return null
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
        <div className="flex-col w-80 mx-6">
          <div className="text-2xl font-bold">{cityDetail?.name_ko}</div>
          <div className="mb-3 text-xl text-gray-700 font-medium">
            {cityDetail?.name_en}
          </div>
          <div className="text-xs mb-2 text-gray-500 font-bold">
            {cityDetail?.descriptionInfo.publisher}
          </div>
          <div className="flex pt-1">
            {cityDetail?.weatherRecommend ? (
              <ButtonWithImage
                imageSrc="/assets/buttonIcon/calendar.webp"
                text="추천"
                detailText={
                  <div>
                    {cityDetail?.weatherRecommend.season.map((month, index) => (
                      <div className="pl-1 text-[8px]" key={index}>
                        {month}
                      </div>
                    ))}
                  </div>
                }
              />
            ) : null}
            {cityDetail?.shortestFlightInfo ? (
              <ButtonWithImage
                imageSrc="/assets/buttonIcon/plane.png"
                text="항공"
                detailText={<div className="pl-1 text-[8px]">{flightText}</div>}
              />
            ) : null}
            {cityDetail?.visaInfo ? (
              <ButtonWithImage
                imageSrc="/assets/buttonIcon/boarding-pass.png"
                text="비자"
                detailText={
                  <div>
                    <div className="text-[7px] text-gray-600 font-bold">
                      {splittedVisa![0]}
                    </div>
                    <div className="pl-1 text-[8px]">{splittedVisa![1]}</div>
                  </div>
                }
              />
            ) : null}
            {cityDetail?.countryInfo.currencyInformation ? (
              <ButtonWithImage
                imageSrc="/assets/buttonIcon/exchange.png"
                text="환율"
                detailText={
                  <div className="pl-1 text-[8px]">
                    {cityDetail?.countryInfo.currencyInformation.exchangeRate}
                  </div>
                }
              />
            ) : null}
          </div>

          <div className="flex flex-row">
            {cityDetail?.timezone ? (
              <ButtonWithImage
                imageSrc="/assets/buttonIcon/time-zones.png"
                text="시차"
                detailText={
                  <div className="text-[7px]">{timeDifferenceText}</div>
                }
              />
            ) : null}
            {cityDetail?.priceInfo ? (
              <ButtonWithImage
                imageSrc="/assets/buttonIcon/price-tag.png"
                text="물가"
                detailText={
                  <div>
                    <div className="text-[5px] text-gray-600 font-bold">
                      한국대비
                    </div>
                    <div className="text-[8px]">
                      {cityDetail?.priceInfo.shortDescription}
                    </div>
                  </div>
                }
              />
            ) : null}
            {cityDetail?.countryInfo.plug ? (
              <ButtonWithImage
                imageSrc="/assets/buttonIcon/plug-in.png"
                text="전압"
                detailText={
                  <div>
                    <div className="text-[6px] text-gray-600 font-bold">
                      {frequency}
                    </div>
                    <div className="text-[8px]">{electric}</div>
                  </div>
                }
              />
            ) : null}
            {cityDetail?.language ? (
              <ButtonWithImage
                imageSrc="/assets/buttonIcon/languages.png"
                text="언어"
                detailText={
                  <div>
                    {cityDetail?.language.langList.map((lang, index) => (
                      <div className="pl-1 text-[6px]" key={index}>
                        {lang}
                      </div>
                    ))}
                  </div>
                }
              />
            ) : null}
          </div>
          <div className="pt-1 flex justify-between">
            <button className="flex text-sm px-6 py-2 bg-gray-500 text-white rounded-md">
              도시 정보 더 보기
            </button>
            <button
              onClick={gotoSurvey}
              className="flex text-sm px-8 py-2 bg-indigo-500 text-white rounded-md"
            >
              일정 만들기 {'>'}
            </button>
          </div>
        </div>
        <div className="flex w-72 h-80 bg-white">
          <Image
            // 여기에 클래스 적용
            className="rounded"
            src={cityDetail?.naverImage!}
            alt="image"
            width={300}
            height={200}
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
