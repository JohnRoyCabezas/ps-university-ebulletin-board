import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../utilities/axiosBaseQuery";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL_API,
  }),
  tagTypes: [
    "Auth",
    "Lesson",
    "WordChoice",
    "UserLesson",
    "Dashboard",
    "Profile",
    "Follow",
  ],
  endpoints: (builder) => ({}),
});
