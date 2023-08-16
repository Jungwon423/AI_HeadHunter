import React, { useState } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store'
import {
  MajorCategoriesWithMinorCategories,
  MinorCategory,
} from '../interfaces/category'
import { checkMinorCategory, selectCategory } from '../slices/travelInfoSlice'

const HowSurvey = () => {
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

  return (
    <div className="flex py-5 w-full flex-col items-center overflow-y-auto">
      <div className="px-10 flex flex-col flex-grow">
        <div className="text-2xl font-bold">
          관심있는 활동을 모두 골라주세요
        </div>
        <div className="my-3 rounded-xl">
          {Object.entries(survey).map(([majorCategory, minorCategories]) => (
            <div
              className="mt-3 shadow-lg rounded-xl border-l-4 border-indigo-300"
              key={majorCategory}
            >
              <div className="font-bold px-2">{majorCategory}</div>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2 p-2">
                {minorCategories.map((minorCategory: MinorCategory) => (
                  <div
                    key={minorCategory.name}
                    className={`relative border-2 rounded bg-white ${
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
                          width={25}
                          height={25}
                        />
                      </div>
                    )}
                    <div className="flex justify-center items-center px-4 py-2">
                      <Image
                        src="/assets/icons/테마파크.png"
                        alt="대체_텍스트"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="flex justify-center text-stone-500 text-sm font-bold">
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

export default HowSurvey
