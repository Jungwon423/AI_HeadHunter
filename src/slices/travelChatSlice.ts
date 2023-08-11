import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export interface TravelChatState {
  showChat: boolean
}

const initialState: TravelChatState = {
  showChat: false,
}

export const travelChatSlice = createSlice({
  name: 'travelChat',
  initialState,
  reducers: {
    setShowChat: (state, action: PayloadAction<boolean>) => {
      state.showChat = action.payload
    },
  },
})

const persistConfig = {
  key: 'chat',
  storage,
}

const persistedTravelChatReducer = persistReducer(
  persistConfig,
  travelChatSlice.reducer,
)

export const { setShowChat } = travelChatSlice.actions

export const selectShowChat = (state: RootState) => state.travelChat.showChat

export default persistedTravelChatReducer
