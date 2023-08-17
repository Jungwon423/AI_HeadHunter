import React, { useState } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import {
  MajorCategoriesWithMinorCategories,
  MinorCategory,
} from '../interfaces/category'
import {
  checkMinorCategory,
  selectCategory,
  selectCity,
} from '../slices/travelInfoSlice'

const ActivitySurvey = () => {
  const dispatch = useDispatch<AppDispatch>()
  const survey: MajorCategoriesWithMinorCategories = useSelector(selectCategory)

  const check = (majorCategory: string, minorCategory: MinorCategory) => {
    dispatch(
      checkMinorCategory({
        majorCategory,
        minorCategory: minorCategory.name,
      }),
    )
  }
  const city = useSelector(selectCity)

  return (
    <div className="flex py-5 w-full flex-col items-center overflow-y-auto">
      <div className="px-10 pt-10 flex flex-col">
        <div className="text-2xl font-bold">
          {city}에서 하고 싶은 활동을 골라주세요
        </div>
        <div className="text-base font-bold text-indigo-500 pt-3">
          {city}에서 할 수 있는 것들
        </div>
        <div className="my-3 rounded-xl">
          {Object.entries(survey).map(([majorCategory, minorCategories]) => (
            <div
              className="mt-3 shadow-md shadow-indigo-200 rounded-xl rounded-t-none border-t-8 border-indigo-300"
              key={majorCategory}
            >
              <div className="font-bold pt-1 pl-2 text-gray-600 text-lg px-2">
                {majorCategory}
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-2">
                {minorCategories.map((minorCategory: MinorCategory) => (
                  <div
                    key={minorCategory.name}
                    className={`relative border-2 w-18 md:w-32 h-32 rounded bg-white ${
                      minorCategory.checked
                        ? 'border-indigo-400'
                        : 'border-stone-200'
                    }`}
                    onClick={() => {
                      check(majorCategory, minorCategory)
                    }}
                  >
                    {minorCategory.checked && (
                      <div className="absolute top-0 right-0">
                        <Image
                          src="/assets/images/check.png"
                          alt="체크 표시"
                          width={40}
                          height={40}
                        />
                      </div>
                    )}
                    <div className="flex justify-center items-center px-3 pt-4 pb-2">
                      <Image
                        src="/assets/icons/테마파크.png"
                        alt="대체_텍스트"
                        width={70}
                        height={70}
                      />
                    </div>
                    <div className="flex justify-center text-stone-500 text-base font-bold">
                      {minorCategory.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActivitySurvey
