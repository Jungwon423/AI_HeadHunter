import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface TravelInfoState {
  city: string
  companion: string
  travelStyle: string[]
}

const initialState: TravelInfoState = {
  city: '서울',
  companion: '혼자',
  travelStyle: ['문화', '쇼핑', '음식'],
}

export const travelInfoSlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload
    },
    setCompanion: (state, action: PayloadAction<string>) => {
      state.companion = action.payload
    },
    setTravelStyle: (state, action: PayloadAction<string[]>) => {
      state.travelStyle = action.payload
    },
  },
})

export const { setCity, setCompanion, setTravelStyle } = travelInfoSlice.actions

export const selectCity = (state: RootState) => state.travelInfo.city
export const selectCompanion = (state: RootState) => state.travelInfo.companion
export const selectTravelStyle = (state: RootState) =>
  state.travelInfo.travelStyle

export default travelInfoSlice.reducer
