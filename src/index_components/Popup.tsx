// components/Popup.tsx
import React from 'react'
import Image from 'next/image'

interface PopupProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
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
        <div className="flex-col w-56 mx-6">
          <div className="text-2xl font-bold">오사카</div>
          <div className="mb-5 text-xl text-gray-700 font-medium">Osaka</div>
          <div className="text-xs text-gray-500 font-bold">
            오사카는 혼슈의 중심 부근에 위치합니다. 오사카 시는 1889년에
            시제(市制)가 시행되었으며, 현재 인구 약 250만 명, 넓이 약 221km²인
            도시입니다. 오사카는 일본의 대표적인 관광지 중에 하나 입니다.
            도톤보리 강에서 먹는 타코야끼의 맛을 느껴보세요. 유명한
          </div>
          <button className="relative top-5 right-1 text-sm px-4 py-2 bg-indigo-500 text-white rounded-md">
            일정 만들기 {'>'}
          </button>
        </div>
        <div className="flex bg-white">
          <Image
            // 여기에 클래스 적용
            className="rounded"
            src="/assets/images/osaka.webp "
            alt="travel"
            width={200}
            height={250}
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
