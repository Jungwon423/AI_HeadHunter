import { use, useState } from 'react'
import JustButton from './JustButton'
import { useDispatch, useSelector } from 'react-redux'
import { selectCompanion, setCompanion } from '../slices/travelInfoSlice'
import { AppDispatch } from '../store'

type ISurveyProps = {
  surveys: string[]
}

const SimpleButtons = (props: ISurveyProps) => {
  const tempSurveys = props.surveys
  const selectedCompanion = useSelector(selectCompanion)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className="text-center">
      <div className="flex flex-wrap justify-center">
        {tempSurveys.map((survey) => (
          <div key={survey}>
            <JustButton
              className={`rounded-lg m-2 text-xs sm:text-sm md:text-base ${
                selectedCompanion === survey
                  ? 'bg-indigo-500 text-white'
                  : 'bg-stone-100 text-stone-600'
              }`}
              onClick={() => {
                dispatch(
                  setCompanion(selectedCompanion === survey ? null : survey),
                )
              }}
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
