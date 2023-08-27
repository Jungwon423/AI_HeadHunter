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
    flightText = '항공 정보없음'
  }
  let splittedFlight = flightText.split(' ')

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
        <div className="flex-col w-82 md:w-96 mx-6">
          <div className="text-3xl font-bold">{cityDetail?.name_ko}</div>
          <div className="ml-1 mb-3 text-2xl text-gray-700 font-medium">
            {cityDetail?.name_en}
          </div>
          <div className="mb-2 text-gray-500 font-bold">
            {cityDetail?.descriptionInfo.publisher}
          </div>
          <div className="flex pt-1">
            {cityDetail?.weatherRecommend ? (
              <ButtonWithImage
                imageSrc="/assets/buttonIcon/calendar.webp"
                text="추천"
                detailText={
                  <div className="flex flex-col w-full">
                    {cityDetail?.weatherRecommend.season.map((month, index) => (
                      <div className="text-[14px]" key={index}>
                        <div className="justify-center">{month}</div>
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
                detailText={
                  <div className="w-full flex flex-col">
                    <div className="flex justify-center text-[13px]">
                      {splittedFlight[0]}
                    </div>
                    <div className="flex justify-center text-[13px]">
                      {splittedFlight[1]}
                    </div>
                  </div>
                }
              />
            ) : null}
            {cityDetail?.visaInfo ? (
              <ButtonWithImage
                imageSrc="/assets/buttonIcon/boarding-pass.png"
                text="비자"
                detailText={
                  <div className="w-full flex flex-col">
                    <div className="flex justify-center text-[11px] text-gray-600 font-bold">
                      {splittedVisa![0]}
                    </div>
                    <div className="flex justify-center text-[13px] ">
                      {splittedVisa![1]}
                    </div>
                  </div>
                }
              />
            ) : null}
            {cityDetail?.countryInfo.currencyInformation ? (
              <ButtonWithImage
                imageSrc="/assets/buttonIcon/exchange.png"
                text="환율"
                detailText={
                  <div className="flex flex-col w-full text-[13px]">
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
                  <div className="flex flex-col w-full text-[12px]">
                    {timeDifferenceText}
                  </div>
                }
              />
            ) : null}
            {cityDetail?.priceInfo ? (
              <ButtonWithImage
                imageSrc="/assets/buttonIcon/price-tag.png"
                text="물가"
                detailText={
                  <div className="flex flex-col w-full">
                    <div className="text-[11px] text-gray-600 font-bold">
                      한국대비
                    </div>
                    <div className="text-[13px]">
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
                  <div className="flex flex-col w-full">
                    <div className="text-[11px] text-gray-600 font-bold">
                      {frequency}
                    </div>
                    <div className="text-[13px]">{electric}</div>
                  </div>
                }
              />
            ) : null}
            {cityDetail?.language ? (
              <ButtonWithImage
                imageSrc="/assets/buttonIcon/languages.png"
                text="언어"
                detailText={
                  <div className="flex flex-col w-full">
                    {cityDetail?.language.langList.map((lang, index) => (
                      <div className="pl-1 text-[12px]" key={index}>
                        {lang}
                      </div>
                    ))}
                  </div>
                }
              />
            ) : null}
          </div>
          <div className="pt-1 flex justify-between">
            <button className="flex text px-10 py-2 bg-gray-500 text-white rounded-md">
              도시 정보 더 보기
            </button>
            <button
              onClick={gotoSurvey}
              className="flex flex-grow mx-1 px-8 py-2 bg-indigo-500 text-white rounded-md justify-center"
            >
              일정 만들기 {'>'}
            </button>
          </div>
        </div>
        <div className="hidden md:flex w-[360px] h-[365px] bg-white">
          <Image
            // 여기에 클래스 적용
            className="rounded"
            src={cityDetail?.naverImage!}
            alt="image"
            width={350}
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
