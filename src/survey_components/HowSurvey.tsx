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
        <div className="mt-5 shadow-xl rounded-xl">
          <div className="font-bold p-2 bg-stone-100">투어/관광</div>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2 p-2">
            <div className="bg-white border-2 rounded">
              <div className="flex justify-center items-center px-4 py-2">
                <Image
                  src="/assets/icons/극장.png"
                  alt="대체_텍스트"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex justify-center text-stone-500 text-sm font-bold">
                극장
              </div>
            </div>
            <div className="bg-white border-2 rounded">
              <div className="flex justify-center items-center px-4 py-2">
                <Image
                  src="/assets/icons/극장.png"
                  alt="대체_텍스트"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex justify-center text-stone-500 text-sm font-bold">
                극장
              </div>
            </div>
            <div className="bg-white border-2 rounded">
              <div className="flex justify-center items-center px-4 py-2">
                <Image
                  src="/assets/icons/극장.png"
                  alt="대체_텍스트"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex justify-center text-stone-500 text-sm font-bold">
                극장
              </div>
            </div>
            <div className="bg-white border-2 rounded">
              <div className="flex justify-center items-center px-4 py-2">
                <Image
                  src="/assets/icons/극장.png"
                  alt="대체_텍스트"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex justify-center text-stone-500 text-sm font-bold">
                극장
              </div>
            </div>
            <div className="bg-white border-2 rounded">
              <div className="flex justify-center items-center px-4 py-2">
                <Image
                  src="/assets/icons/극장.png"
                  alt="대체_텍스트"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex justify-center text-stone-500 text-sm font-bold">
                극장
              </div>
            </div>
            <div className="bg-white border-2 rounded">
              <div className="flex justify-center items-center px-4 py-2">
                <Image
                  src="/assets/icons/극장.png"
                  alt="대체_텍스트"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex justify-center text-stone-500 text-sm font-bold">
                극장
              </div>
            </div>
            <div className="bg-white border-2 rounded">
              <div className="flex justify-center items-center px-4 py-2">
                <Image
                  src="/assets/icons/극장.png"
                  alt="대체_텍스트"
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex justify-center text-stone-500 text-sm font-bold">
                극장
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowSurvey
