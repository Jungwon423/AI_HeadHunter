import TravelButton from './TravelButton'

type ITravelCompanionProps = {
  selectedCompanion: string
  onCompanionClick: (style: string) => void
}

const TravelCompanion = (props: ITravelCompanionProps) => {
  const companions = [
    '혼자',
    '친구와',
    '연인과',
    '아이들과',
    '부모님과',
    '배우자와',
    '기타',
  ]

  const handleCompanionClick = (style: string) => {
    props.onCompanionClick(style)
  }

  return (
    <div className="text-center py-50">
      <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
        누구와 함께 가시나요?
      </h2>
      <div className="flex flex-wrap justify-center mt-6">
        {companions.map((companion) => (
          <div key={companion}>
            <TravelButton
              className={`m-2 text-xs sm:text-sm md:text-base ${
                props.selectedCompanion === companion
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
    </div>
  )
}

export { TravelCompanion }
