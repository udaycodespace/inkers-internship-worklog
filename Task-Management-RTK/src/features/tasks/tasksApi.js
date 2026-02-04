// src/features/tasks/tasksApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://69663836f6de16bde44c9b1f.mockapi.io/api/v1' }), 
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks', // Make sure your resource in MockAPI is named "tasks"
      providesTags: ['Task'],
    }),
    addTask: builder.mutation({
      query: (newTask) => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: 'PUT', // MockAPI uses PUT
        body: patch,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
})

export const { 
  useGetTasksQuery, 
  useAddTaskMutation, 
  useUpdateTaskMutation, 
  useDeleteTaskMutation 
} = tasksApi