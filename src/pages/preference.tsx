import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { AppDispatch } from '../store'
import {
  fetchPreference,
  selectUserId,
  recommendInputV2,
  fetchPreferenceAsync,
  selectPreference,
  selectTravelInfo,
} from '../slices/travelInfoSlice'
import { selectTravelId } from '../slices/questionnaireSlice'
import {
  selectAttractionQueryResultList,
  selectAttractionQueryTravelId,
} from '../slices/imageQuerySlice'

const Preference = () => {
  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()
  const userId: string = useSelector(selectUserId)
  const travelId: string = useSelector(selectAttractionQueryTravelId) // !: travelId is not null
  console.log('travelId: ', travelId)
  const resultList = useSelector(selectAttractionQueryResultList)

  const preference = useSelector(selectPreference)
  const travelInfo = useSelector(selectTravelInfo)

  const recommendInput: recommendInputV2 = {
    travel_id: travelId,
    user: userId,
    resultList: resultList,
  }

  console.log('recommendInput: ', recommendInput)

  useEffect(() => {
    dispatch(fetchPreferenceAsync(recommendInput))
  }, [])

  if (travelInfo.loading === 'pending') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (travelInfo.loading === 'failed') {
    return <p>Error: {travelInfo.error}</p>
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          {preference.inferring} {preference.conclusion}
        </div>
        <div className="flex flex-col items-center justify-center"></div>
      </div>
    </div>
  )
}

export default Preference
