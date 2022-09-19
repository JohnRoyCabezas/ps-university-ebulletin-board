import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [{ type: "Auth", id: "LIST" }],
    }),
  }),
});

export const { useRegisterUserMutation } = extendedApiSlice;
