import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface TabState {
  currentTabIndex: number
}

const initialState: TabState = {
  currentTabIndex: 0,
}

export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setCurrentTabIndex: (state, action: PayloadAction<number>) => {
      state.currentTabIndex = action.payload
    },
  },
})

export const { setCurrentTabIndex } = tabSlice.actions
export const selectCurrentTabIndex = (state: RootState) =>
  state.tab.currentTabIndex
export default tabSlice.reducer
