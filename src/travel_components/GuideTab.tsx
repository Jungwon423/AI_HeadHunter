import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const GuideTab = () => {
  const tabs = ['개요', '리뷰', '정보']
  const dispatch = useDispatch()
  const [currentTabIndex, setCurrentTabIndex] = useState(0)

  const handleClickTab = (index: React.SetStateAction<number>) => {
    setCurrentTabIndex(index)
  }

  return (
    <div className="flex w-full">
      <div className="flex justify-center space-x-2 py-2 w-full">
        {tabs.map((tab, index) => {
          return (
            <button
              key={tab}
              className={`flex-1 relative px-4 font-semibold cursor-pointer hover:text-black ${
                currentTabIndex === index ? 'text-gray-700' : 'text-gray-500'
              }`}
              onClick={() => handleClickTab(index)}
            >
              {tab}
              {currentTabIndex === index && (
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-[40%] h-0.5 bg-black"></span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default GuideTab
