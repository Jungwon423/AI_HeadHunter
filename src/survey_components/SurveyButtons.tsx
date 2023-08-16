import { useState } from 'react'
import JustButton from './JustButton'

type ISurveyProps = {
  surveys: string[]
  selectedSurveys: string[]
  onSurveyClick: (survey: string) => void
}

const SurveyButton = (props: ISurveyProps) => {
  //const surveys = ['10대', '20대', '30대', '40대', '50대', '60대 이상']
  const tempSurveys = props.surveys
  const handleSurveyClick = (survey: string) => {
    props.onSurveyClick(survey)
  }

  return (
    <div className="text-center">
      <div className="flex flex-wrap justify-center">
        {tempSurveys.map((survey) => (
          <div key={survey}>
            <JustButton
              className={`rounded-lg m-2 text-xs sm:text-sm md:text-base ${
                props.selectedSurveys.includes(survey)
                  ? 'bg-indigo-500 text-white'
                  : 'bg-stone-100 text-stone-600'
              }`}
              onClick={() => handleSurveyClick(survey)}
            >
              {survey}
            </JustButton>
          </div>
        ))}
      </div>
    </div>
  )
}

export { SurveyButton }
