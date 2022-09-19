import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query({
      query: () => ({
        url: "/lessons",
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Lesson", id })),
              { type: "Lesson", id: "LIST" },
            ]
          : [{ type: "Lesson", id: "LIST" }],
    }),
    getLesson: builder.query({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Lesson", id }],
    }),
    createLesson: builder.mutation({
      query: (data) => ({
        url: "/lessons",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "Lesson", id: "LIST" }],
    }),
    updateLesson: builder.mutation({
      query: ({ data, id }) => ({
        url: `/lessons/${id}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Lesson", id: arg.id }],
    }),
    deleteLesson: builder.mutation({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Lesson", id: arg.id }],
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useGetLessonQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = extendedApiSlice;
