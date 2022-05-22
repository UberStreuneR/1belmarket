import { createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;

            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: builder => ({
        getItems: builder.query({
            query: () => "/items",
        }),
        getCategories: builder.query({
            query: () => "/categories",
        }),
        getCategoryTree: builder.query({
            query: () => "category-tree/",
        }),
        searchItems: builder.query({
            query: key => `/items-search/${key}`,
        }),
        loginUser: builder.mutation({
            query: ({ username, password }) => {
                return {
                    url: "login/",
                    method: "POST",
                    body: { username: username, password: password },
                };
            },
        }),
        signupUser: builder.mutation({
            query: ({ username, email, password1, password2 }) => {
                return {
                    url: "register/",
                    method: "POST",
                    body: { username, email, password1, password2 },
                };
            },
        }),
    }),
});

export const {
    useGetItemsQuery,
    useGetCategoriesQuery,
    useLoginUserMutation,
    useSignupUserMutation,
    useGetCategoryTreeQuery,
    useSearchItemsQuery,
} = apiSlice;

const selectGetItemsResult = apiSlice.endpoints.getItems.select();
export const selectGetItemsResultData = createSelector(
    [selectGetItemsResult, (state, search) => search.toLowerCase()],
    (result, search) =>
        result.data?.filter(item =>
            item.hierarchy.toLowerCase().includes(search)
        ) ?? []
);
