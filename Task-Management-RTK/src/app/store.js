import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import { tasksApi } from '../features/tasks/tasksApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
})
