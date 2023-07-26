import Image from 'next/image'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { NavbarTwoColumns } from '../navbar/NavbarTwoColumns'
import TravelButton from '../components/travelButton'

const TravelTitle = () => (
  <div className="text-center py-20">
    <h1 className="text-xl sm:text-2xl md:text-5xl font-extrabold tracking-tight text-gray-900">
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
          <div key={companion} >
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
        여행
      </h2>
      <div className="flex flex-wrap justify-center mt-6">
        {styles.map((style) => (
          <div key={style} >
            <TravelButton className={`m-2 ${
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
        {selectedStyles.map((style) => (             //추가되는 버튼
          <span
            key={style}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {style}
            <button
              type="button"
              className="ml-2 text-gray-500 hover:text-gray-900"          //제거 x버튼
              onClick={() => removeStyle(style)}
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

export default function HomePage() {
  return (
    <div>
      <Head>
        <title>Travel Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <NavbarTwoColumns logo={<Logo />}>
        <li>
          <Link href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template">
            GitHub
          </Link>
        </li>
        <li>
          <Link href="/">Sign in</Link>
        </li>
      </NavbarTwoColumns> */}
      {/* Navigation section */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="/assets/images/logo.png"
                alt="Logo"
                width={32}
                height={32}
              />
              <span className="ml-2 font-bold text-xl font-mono">Triper</span>
            </div>
            <div className="flex items-center">
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      <TravelTitle />
      <TravelCompanions />
      <TravelStyles />
    </div>
  )
}
