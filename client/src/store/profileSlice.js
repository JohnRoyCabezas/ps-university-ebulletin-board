import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: ({ id }) => ({
        url: `/profile/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Profile", id }],
    }),
  }),
});

export const { useGetUserProfileQuery } = extendedApiSlice;
