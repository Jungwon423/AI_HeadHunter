import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import { PlaceInfo } from '../interfaces/placeInfo'
import { handleCurrentPlace, selectCity } from '../slices/travelInfoSlice'
import {
  dateToString,
  selectEndDate,
  selectStartDate,
} from '../slices/timeSlice'
import {
  selectAttractions,
  selectRestaurants,
  selectDepreactedAttractions,
  selectDepreactedRestaurants,
  selectRecommendState,
} from '../slices/recommendSlice'

const RecommendContainer = () => {
  const dispatch = useDispatch<AppDispatch>()

  const attractions: PlaceInfo[] = useSelector(selectAttractions).reduce(
    (acc, val) => acc.concat(val),
    [],
  )
  const restaurant: PlaceInfo[] = useSelector(selectRestaurants).reduce(
    (acc, val) => acc.concat(val),
    [],
  )
  const deprecatedAttractions: PlaceInfo[] = useSelector(
    selectDepreactedAttractions,
  ).reduce((acc, val) => acc.concat(val), [])
  const deprecatedRestaurants: PlaceInfo[] = useSelector(
    selectDepreactedRestaurants,
  ).reduce((acc, val) => acc.concat(val), [])

  const recommendState = useSelector(selectRecommendState)

  const places = (recommendState: any) => {
    if (recommendState === '전체') {
      // return attractions
      //   .concat(restaurant)
      //   .concat(deprecatedAttractions)
      //   .concat(deprecatedRestaurants)
      return attractions.concat(deprecatedAttractions)
    } else if (recommendState === '추천') {
      // return attractions.concat(restaurant)
      return attractions
    } else {
      // return deprecatedAttractions.concat(deprecatedRestaurants)
      return deprecatedAttractions
    }
  }

  const StartDate = useSelector(selectStartDate)
  const travelStartDate = dateToString(new Date(StartDate))
  const EndDate = useSelector(selectEndDate)
  const travelEndDate = dateToString(new Date(EndDate))
  let city = useSelector(selectCity)

  return (
    <div className="bg-[#FAFAFA] h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex pt-7 pb-1 ">
          <div className="pl-3 font-bold text-xl">{city}</div>
          <span className="pt-2 text-gray-500 text-sm font-bold px-2">
            {travelStartDate} ~ {travelEndDate}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-5">
          {places(recommendState).map((place: PlaceInfo) => {
            return (
              <div
                className="flex flex-row my-1 h-24 py-3 bg-white shadow-md rounded-xl px-5 cursor-pointer hover:shadow-indigo-500/40 shadow-slate-200"
                key={place.name}
                onClick={() => {
                  dispatch(handleCurrentPlace(place))
                }}
              >
                <img
                  referrerPolicy="no-referrer"
                  src={place.image!}
                  alt={place.name!}
                  style={{ height: '70px', objectFit: 'cover' }}
                  object-fit="fill"
                  className="rounded-xl w-[70px]"
                />

                <div className="pl-3">
                  <div className="tracking-tighter leading-3 text-[12px] font-bold">
                    {place.name}
                  </div>
                  <div className="pt-1 flex flex-row">
                    <div className="text-xs font-bold">{place.rating}</div>
                    <i
                      key={place.rating}
                      className="pl-1 bi bi-star-fill text-yellow-400 text-xs"
                    ></i>
                    <span className="font-bold text-blue-300 text-[10px] pt-0.5 pl-2">
                      명소
                    </span>
                  </div>

                  <div className="pt-1 text-[10px] text-gray-600">
                    <span className="line-clamp-2 hover:line-clamp-3">
                      {place.description}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RecommendContainer
