import Image from 'next/image'

interface surveyButtonProps {
  text: string
  img: string
  // alt: string
  // className: string
  onClick: () => void
}

const surveyButton = (props: surveyButtonProps) => {
  const buttons = [
    {
      imageSrc: '/assets/icons/극장.png',
      alt: '대체_텍스트1',
      text: '버튼_텍스트1',
    },
    {
      imageSrc: '/assets/icons/극장.png',
      alt: '대체_텍스트2',
      text: '버튼_텍스트2',
    },
    {
      imageSrc: '/assets/icons/극장.png',
      alt: '대체_텍스트3',
      text: '버튼_텍스트3',
    },

    {
      imageSrc: '/assets/icons/극장.png',
      alt: '대체_텍스트3',
      text: '버튼_텍스트3',
    },
    {
      imageSrc: '/assets/icons/극장.png',
      alt: '대체_텍스트3',
      text: '버튼_텍스트3',
    },
    {
      imageSrc: '/assets/icons/극장.png',
      alt: '대체_텍스트3',
      text: '버튼_텍스트3',
    },
    // 여기에 더 많은 버튼 정보를 추가하실 수 있습니다.
  ]

  const src: string = '/assets/icons/극장.png'

  return (
    <div>
      <div>
        <p> 여행지</p>
      </div>
      <div className="container flex flex-wrap">
        {buttons.map((button, index) => (
          <div
            key={index}
            className="w-1/3 p-2" // 변경한 클래스를 사용하여 4열 그리드를 만듭니다.
          >
            <div>
              <button className="border border-gray-500 p-5 rounded-lg flex flex-col items-center justify-center w-full">
                <div className="relative w-full overflow-hidden pb-[20%]">
                  <div className="absolute top-0 left-0 w-1/10 h-1/10 p-20 flex items-center">
                    <Image
                      src={src}
                      alt="대체_텍스트"
                      layout="fill"
                      objectFit="cover"
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                </div>
                <div className="pt-3">
                  <span>극장</span>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default surveyButton
