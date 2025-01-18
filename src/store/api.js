import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend-bish-ig0p.onrender.com//api",
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (payload) => ({
        url: "/admin/login",
        method: "POST",
        body: payload,
      }),
    }),
    createAddress: builder.mutation({
      query: (payload) => ({
        url: "/address",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Address"],
    }),
    getAddress: builder.query({
      query: () => "/address",
      providesTags: ["Address"],
    }),
    getUsers: builder.query({
      query: () => "/users",
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useGetAddressQuery,
  useGetUsersQuery,
  useCreateAdminMutation,
  useDeleteAddressMutation,
} = api;
