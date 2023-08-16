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

const Test = () => {
  //const city = useSelector(selectCity)
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
    <div>
      <div>
        <div>{cityDetail?.name_ko}</div>
        <div>{cityDetail?.name_en}</div>
        {cityDetail?.imageList.map((img, index) => (
          <div className="border-t-2" key={index}>
            <Image
              src={img.photoURL}
              alt={img.source}
              width={30}
              height={30}
              style={{
                height: 'auto',
                width: 'auto',
              }}
            ></Image>
          </div>
        ))}
        <div>{cityDetail?.descriptionInfo.legacy}</div>
      </div>
    </div>
  )
}

export default Test
