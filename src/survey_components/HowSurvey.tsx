import React, { useState } from 'react'
import Image from 'next/image'
import MyDatePicker from './MyDatePicker'

const HowSurvey = () => {
  return (
    <div className="flex py-5 w-full flex-col items-center overflow-y-auto">
      <div className="px-10 flex flex-col flex-grow">
        <div className="text-2xl font-bold">
          관심있는 활동을 모두 골라주세요
        </div>
        <div className="grid grid-cols-2 gap-4 pt-5">
          <div className="bg-gray-100 w-96 h-96 p-4 shadow-md rounded-lg">
            Item 1
          </div>
          <div className="bg-gray-100 w-96 h-96 p-4 shadow-md rounded-lg">
            Item 1
          </div>
          <div className="bg-gray-100 w-96 h-96 p-4 shadow-md rounded-lg">
            Item 1
          </div>
          <div className="bg-gray-100 w-96 h-96 p-4 shadow-md rounded-lg">
            Item 1
          </div>
        </div>
        <div className="text-base font-bold text-indigo-500 pt-3 pb-7"></div>
      </div>
    </div>
  )
}

export default HowSurvey
