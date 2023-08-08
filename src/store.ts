import {
  Action,
  configureStore,
  ThunkAction,
  AnyAction,
} from '@reduxjs/toolkit'

import counterReducer from './slices/counterSlice'
import travelInfoReducer from './slices/travelInfoSlice'
import travelChatReducer from './slices/travelChatSlice'
import questionnaireReducer from './slices/questionnaireSlice'
import queryInputSlice from './slices/queryInputSlice'
import attractionQuerySlice from './slices/imageQuerySlice'
import tabSlice from './slices/tabSlice'

export const store = configureStore({
  reducer: {
    tab: tabSlice,
    counter: counterReducer,
    travelInfo: travelInfoReducer,
    travelChat: travelChatReducer,
    questionnaire: questionnaireReducer,
    queryInput: queryInputSlice,
    attractionQuery: attractionQuerySlice,
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(thunk),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
