import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation({
      query: ({ id }) => ({
        url: `/follow/${id}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Follow", id: "LIST" }],
    }),
  }),
});

export const { useFollowUserMutation } = extendedApiSlice;
