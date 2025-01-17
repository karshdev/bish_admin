import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    createAddress: builder.mutation({
      query: (payload) => ({
        url: "/address",
        method: "POST",
        body: payload,
      }),
    }),
    getAddress: builder.query({
      query: () => "/address",
    }),
    getUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

export const { useCreateAddressMutation, useGetAddressQuery, useGetUsersQuery } = api;
