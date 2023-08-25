import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export interface TimeState {
  dayDetails: DayDetail[]
  startDate: string
  endDate: string
}
export interface DayDetail {
  day: string //date를 string으로
  startTime: string
  endTime: string
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
const getInitialDayDetails = (startDate: Date, endDate: Date): DayDetail[] => {
  const dates = getDateRange(startDate, endDate)

  const initialValue = (date: Date): DayDetail => {
    const startDate = new Date(date)
    startDate.setHours(10, 0, 0) // 오전 10시 설정

    const endDate = new Date(date)
    endDate.setHours(22, 0, 0) // 오후 10시 설정

    return {
      day: date.toISOString(),
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
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
  startDate: new Date(2023, 8, 25).toISOString(),
  endDate: new Date(2023, 8, 27).toISOString(),
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
    setStartTime: (
      state,
      action: PayloadAction<{ index: number; startTime: string }>,
    ) => {
      state.dayDetails[action.payload.index].startTime =
        action.payload.startTime
    },
    setEndTime: (
      state,
      action: PayloadAction<{ index: number; endTime: string }>,
    ) => {
      state.dayDetails[action.payload.index].endTime = action.payload.endTime
    },
    // setDayDetail: (state, action: PayloadAction<DayDetail>) => {
    //   state.dayDetails = action.payload
    // },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload
      state.dayDetails = getInitialDayDetails(
        new Date(action.payload),
        new Date(state.endDate),
      )
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload
      state.dayDetails = getInitialDayDetails(
        new Date(state.startDate),
        new Date(action.payload),
      )
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

export const {
  updateDayDetail,
  setStartDate,
  setEndDate,
  setStartTime,
  setEndTime,
} = timeDetailSlice.actions

export const selectDayDetails = (state: RootState) =>
  state.timeDetail.dayDetails
export const selectStartDate = (state: RootState) => state.timeDetail.startDate
export const selectEndDate = (state: RootState) => state.timeDetail.endDate

export default persistedTimeDetailReducer
