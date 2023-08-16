import { useState } from 'react'
import JustButton from './JustButton'

type ISurveyProps = {
  surveys: string[]
  selectedSurvey: string | null
  onSurveyClick: (survey: string) => void
}

const SimpleButtons = (props: ISurveyProps) => {
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
                props.selectedSurvey === survey
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

export { SimpleButtons }
