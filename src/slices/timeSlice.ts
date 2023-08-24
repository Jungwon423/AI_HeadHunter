import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export interface TimeState {
  dayDetails: DayDetail[]
  startDate: Date
  endDate: Date
}
export interface DayDetail {
  month: number
  day: number
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
}
const getDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dateArray: Date[] = []

  // 시작 날짜와 종료 날짜가 같으면 반복을 마칩니다.
  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    dateArray.push(new Date(currentDate))
  }

  return dateArray
}
// const daysBetween = (startDate: Date, endDate: Date): number => {
//   const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
//   const firstDate = new Date(startDate)
//   const secondDate = new Date(endDate)
//   return (
//     Math.round(
//       Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay),
//     ) + 1
//   )
// }
const getInitialDayDetails = (startDate: Date, endDate: Date): DayDetail[] => {
  //const numOfDays = daysBetween(startDate, endDate)
  const dates = getDateRange(startDate, endDate)

  const initialValue = (date: Date): DayDetail => {
    return {
      month: date.getMonth(),
      day: date.getDate(),
      startHour: 10,
      startMinute: 0,
      endHour: 22,
      endMinute: 0,
    }
  }

  return dates.map((date) => initialValue(date))
}

const initialState: TimeState = {
  //dayDetail: { startHour: 0, startMinute: 0, endHour: 0, endMinute: 0 },
  dayDetails: getInitialDayDetails(
    new Date(2023, 8, 23),
    new Date(2023, 8, 27),
  ),
  startDate: new Date(2023, 8, 25),
  endDate: new Date(2023, 8, 27),
}
export const timeDetailSlice = createSlice({
  name: 'travelTime',
  initialState,
  reducers: {
    updateDayDetail: (
      state,
      action: PayloadAction<{ index: number; dayDetail: DayDetail }>,
    ) => {
      state.dayDetails[action.payload.index] = action.payload.dayDetail
    },
    // setDayDetail: (state, action: PayloadAction<DayDetail>) => {
    //   state.dayDetails = action.payload
    // },
    setStartDate: (state, action: PayloadAction<Date>) => {
      state.startDate = action.payload
      state.dayDetails = getInitialDayDetails(state.startDate, state.endDate)
    },
    setEndDate: (state, action: PayloadAction<Date>) => {
      state.endDate = action.payload
      state.dayDetails = getInitialDayDetails(state.startDate, state.endDate)
    },
  },
})

const persistConfig = {
  key: 'time',
  storage,
}

const persistedTimeDetailReducer = persistReducer(
  persistConfig,
  timeDetailSlice.reducer,
)

export const { updateDayDetail, setStartDate, setEndDate } =
  timeDetailSlice.actions

export const selectDayDetails = (state: RootState) =>
  state.timeDetail.dayDetails
export const selectStartDate = (state: RootState) => state.timeDetail.startDate
export const selectEndDate = (state: RootState) => state.timeDetail.endDate

export default persistedTimeDetailReducer
