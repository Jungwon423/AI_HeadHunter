import React from 'react'
import Image from 'next/image'

interface CircleListItemProps {
  text: string
  onClick: () => void
  isSelected: boolean
}

const CircleListItem: React.FC<CircleListItemProps> = ({
  text,
  onClick,
  isSelected,
}) => {
  // 아래의 예제에서는 Heroicons의 아이콘 SVG 코드를 사용합니다.
  // 원하는 아이콘 코드로 변경할 수 있습니다.
  const defaultIcon = (
    <div
      className={` h-2 w-2 bg-indigo-600 rounded-full transition-all duration-300 ease-in-out`}
    ></div>
  )

  const selectedIcon = (
    <div>
      <Image
        src="/assets/images/circle.png"
        alt="circle"
        width={15}
        height={15}
        style={{
          maxWidth: '100%',
          width: 'auto',
          height: 'auto',
        }}
      />
    </div>
  )

  return (
    <div className="flex items-center cursor-pointer" onClick={onClick}>
      <span>{isSelected ? selectedIcon : defaultIcon}</span>
      <span className="ml-4 font-bold text-gray-600 ">{text}</span>
    </div>
  )
}

export default CircleListItem
