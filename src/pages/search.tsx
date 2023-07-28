import Image from 'next/image'
import { useState } from 'react'
import Head from 'next/head'
import TravelButton from '../components/TravelButton'
import MyNavbar from '../navbar/MyNavbar'
import router from 'next/router'

const TravelTitle = () => (
  <div className="text-center py-20 bg-indigo-500 rounded-tl-xl rounded-tr-xl">
    <h1 className="text-lg sm:text-2xl md:text-4xl font-extrabold tracking-tight text-white">
      어떤 스타일의 여행을 할 계획인가요?
    </h1>
  </div>
)

const TravelCompanions = () => {
  const [selectedCompanions, setSelectedCompanions] = useState<string[]>([])

  const companions = [
    '혼자',
    '친구와',
    '연인과',
    '아이들과',
    '부모님과',
    '배우자와',
    '기타',
  ]

  const handleCompanionClick = (companion: string) => {
    if (selectedCompanions.includes(companion)) {
      setSelectedCompanions(selectedCompanions.filter((c) => c !== companion))
    } else {
      setSelectedCompanions([...selectedCompanions, companion])
    }
  }

  const removeCompanion = (companion: string) => {
    setSelectedCompanions(selectedCompanions.filter((c) => c !== companion))
  }

  return (
    <div className="text-center py-20">
      <h2 className="text-lg sm:text-xl md:text-3xl font-extrabold tracking-tight text-gray-900">
        누구와 함께 가시나요?
      </h2>
      <div className="flex flex-wrap justify-center mt-6">
        {companions.map((companion) => (
          <div key={companion}>
            <TravelButton
              className={`m-2 ${
                selectedCompanions.includes(companion)
                  ? 'bg-gray-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleCompanionClick(companion)}
            >
              {companion}
            </TravelButton>
          </div>
        ))}
      </div>
      <div className="mt-6">
        {selectedCompanions.map((companion) => (
          <span
            key={companion}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {companion}
            <button
              type="button"
              className="ml-2 text-gray-500 hover:text-gray-900"
              onClick={() => removeCompanion(companion)}
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.414-8l-2.293-2.293a1 1 0 011.414-1.414L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}

const TravelStyles = () => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])

  const styles = [
    '체험·액티비티',
    'SNS 핫플레이스',
    '자연과 함께',
    '유명 관광지',
    '여유롭게 힐링',
    '문화·예술·역사',
    '관광보다 먹방',
    '쇼핑은 열정적으로',
  ]

  const handleStylesClick = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((c) => c !== style))
    } else {
      setSelectedStyles([...selectedStyles, style])
    }
  }

  const removeStyle = (style: string) => {
    setSelectedStyles(selectedStyles.filter((c) => c !== style))
  }

  return (
    <div className="text-center py-20">
      <h2 className="text-lg sm:text-xl md:text-3xl font-extrabold tracking-tight text-gray-900">
        여행 스타일을 알려주세요!
      </h2>
      <div className="flex flex-wrap justify-center mt-6">
        {styles.map((style) => (
          <div key={style}>
            <TravelButton
              className={`m-2 ${
                selectedStyles.includes(style)
                  ? 'bg-gray-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleStylesClick(style)}
            >
              {style}
            </TravelButton>
          </div>
        ))}
      </div>
      <div className="mt-6">
        {selectedStyles.map(
          (
            style, //추가되는 버튼
          ) => (
            <span
              key={style}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {style}
              <button
                type="button"
                className="ml-2 text-gray-500 hover:text-gray-900" //제거 x버튼
                onClick={() => removeStyle(style)}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.414-8l-2.293-2.293a1 1 0 011.414-1.414L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          ),
        )}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Travel Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyNavbar />
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/travel.jpg"
            alt="travel"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            AI가 만들어 주는{' \n'}
            <div className="text-primary-500">나만의 여행</div>
          </h1>
        </div>
      </section>
      <div className="absolute top-3/4 inset-20 flex justify-center items-center">
        <div className="bg-white max-w-7xl rounded-xl shadow-xl">
          <TravelTitle />
          <TravelCompanions />
          <TravelStyles />
          <div className="relative m-5 p-5 inset-0 flex justify-center text-center bg-indigo">
            <button
              className="text-lg sm:text-xl md:text-2xl text-white font-bold py-4 px-20 rounded-xl bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              onClick={() => router.push('/travel')}
            >
              여행하러 가기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
