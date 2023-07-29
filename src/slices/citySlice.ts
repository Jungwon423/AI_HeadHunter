import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface CityState {
    city: string
}

const initialState: CityState = {
    city: '서울',
}

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
    },
})

export const selectCity = (state: RootState) => state.city.city

export default citySlice.reducer