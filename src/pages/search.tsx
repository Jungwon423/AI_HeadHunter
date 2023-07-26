import Image from 'next/image'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from '../components/button'
import { NavbarTwoColumns } from '../navbar/NavbarTwoColumns'
import { Logo } from '../logo/Logo'
import TravelButton from '../components/travelButton'
import TravelButton2 from '../components/travelButton2'

const TravelTitle = () => (
  <div className="text-center py-20">
    <h1 className="text-xl sm:text-2xl md:text-5xl font-extrabold tracking-tight text-gray-900">
      어떤 스타일의 여행을 할 계획인가요?
    </h1>
  </div>
)

const TravelCompanions = () => {
  //const [selectedCompanion, setSelectedCompanion] = useState('');
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
  return (
    <div className="text-center py-20">
      <h2 className="text-lg sm:text-xl md:text-3xl font-extrabold tracking-tight text-gray-900">
        누구와 함께 가시나요?
      </h2>
      <div className="flex flex-wrap justify-center mt-6">
        {companions.map((companion) => (
          <div key={companion} className="m-2">
            <TravelButton2
              onClick={() =>
                setSelectedCompanions([...selectedCompanions, companion])
              }
            >
              {companion}
            </TravelButton2>
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
      {selectedCompanions.length > 0 && (
        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-400 rounded-full text-base font-medium text-gray-700 bg-gray-100"
            onClick={() => setSelectedCompanions([])}
          >
            <svg
              className="w-4 h-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.414-8l-2.293-2.293a1 1 0 011.414-1.414L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10z"
                clipRule="evenodd"
              />
            </svg>
            선택한 동행자 지우기
          </button>
        </div>
      )}
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
  return (
    <div className="py-20">
      <h2 className="flex justify-center text-3xl font-extrabold text-gray-900">
        여행 스타일
      </h2>
      <div className="mt-8 flex justify-center">
        {styles.map((style) => (
          <TravelButton2
            key={style}
            className={`mx-2 ${
              selectedStyles.includes(style)
                ? 'bg-gray-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleStylesClick(style)}
          >
            {style}
          </TravelButton2>
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

      <NavbarTwoColumns logo={<Logo />}>
        <li>
          <Link href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template">
            GitHub
          </Link>
        </li>
        <li>
          <Link href="/">Sign in</Link>
        </li>
      </NavbarTwoColumns>

      <TravelTitle />
      <TravelCompanions />
      <TravelStyles />
    </div>
  )
}
