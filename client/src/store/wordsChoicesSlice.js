import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWordsChoices: builder.query({
      query: (id) => ({
        url: `/lessons/${id}/words`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "WordChoice", id: "LIST" },
      ],
    }),
    getWordChoice: builder.query({
      query: ({ lessonID, wordID }) => ({
        url: `/lessons/${lessonID}/words/${wordID}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "WordChoice", id: "LIST" }],
    }),
    createWordChoice: builder.mutation({
      query: ({ data, id }) => ({
        url: `/lessons/${id}/words`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "WordChoice", id: "LIST" }],
    }),
    updateWordChoice: builder.mutation({
      query: ({ data, lessonID, wordID }) => ({
        url: `/lessons/${lessonID}/words/${wordID}`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "WordChoice", id: arg.id },
      ],
    }),
    deleteWordChoice: builder.mutation({
      query: ({ lessonID, wordID }) => ({
        url: `/lessons/${lessonID}/words/${wordID}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "WordChoice", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetWordsChoicesQuery,
  useGetWordChoiceQuery,
  useCreateWordChoiceMutation,
  useUpdateWordChoiceMutation,
  useDeleteWordChoiceMutation,
} = extendedApiSlice;
