import {
  Action,
  configureStore,
  ThunkAction,
  AnyAction,
} from '@reduxjs/toolkit'

import tabSlice from './slices/tabSlice'
import persistedTravelInfoReducer from './slices/travelInfoSlice'
import persistedTravelChatReducer from './slices/travelChatSlice'
import persistedQuestionnaireReducer from './slices/questionnaireSlice'
import persistedQueryInputReducer from './slices/queryInputSlice'
import persistedAttractionQueryReducer from './slices/imageQuerySlice'
import persistedRecommendAttractionsReducer from './slices/recommendSlice'
import persistedSurveyReducer from './slices/surveySlice'
import persistedCityDetailReducer from './slices/cityDetailSlice'

export const store = configureStore({
  reducer: {
    tab: tabSlice,
    cityDetail: persistedCityDetailReducer,
    travelInfo: persistedTravelInfoReducer,
    travelChat: persistedTravelChatReducer,
    questionnaire: persistedQuestionnaireReducer,
    queryInput: persistedQueryInputReducer,
    attractionQuery: persistedAttractionQueryReducer,
    recommendAttractions: persistedRecommendAttractionsReducer,
    survey: persistedSurveyReducer,
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
