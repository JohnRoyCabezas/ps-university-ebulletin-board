import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDashboard: builder.query({
      query: () => ({
        url: `/dashboard`,
        method: "GET",
      }),
      providesTags: [{ type: "Dashboard", id: "LIST" }],
    }),
  }),
});

export const { useGetUserDashboardQuery } = extendedApiSlice;
