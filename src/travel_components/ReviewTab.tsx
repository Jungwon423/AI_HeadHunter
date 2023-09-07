import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentTabIndex, selectCurrentTabIndex } from '../slices/tabSlice'

const ReviewTab = () => {
  const tabs = ['개요', '리뷰', '블로그', '유투브']
  const dispatch = useDispatch()
  const currentTabIndex = useSelector(selectCurrentTabIndex)

  const handleClickTab = (index: number) => {
    dispatch(setCurrentTabIndex(index))
  }

  return (
    <div className="flex  w-full bg-white h-16 items-center">
      <div className="w-1/12"></div>
      <div className="flex space-x-2 py-2 w-96">
        {tabs.map((tab, index) => {
          return (
            <div>
              <button
                key={tab}
                className={`flex-1 relative text-base px-6 font-semibold cursor-pointer hover:text-black ${
                  currentTabIndex === index ? 'text-sky-400' : 'text-stone-700'
                }`}
                onClick={() => handleClickTab(index)}
              >
                {tab}
                {currentTabIndex === index && (
                  <span className="absolute left-1/2 transform -translate-x-1/2 top-11 w-[60%] h-0.5 bg-sky-400"></span>
                )}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ReviewTab
