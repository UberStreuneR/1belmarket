import { createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
    endpoints: builder => ({
        getItems: builder.query({
            query: () => "/items",
        }),
        getCategories: builder.query({
            query: () => "/categories",
        }),
        searchItems: builder.query({
            query: key => `/items-search/${key}`,
        }),
    }),
});

export const { useGetItemsQuery, useGetCategoriesQuery, useSearchItemsQuery } =
    apiSlice;

const selectGetItemsResult = apiSlice.endpoints.getItems.select();
export const selectGetItemsResultData = createSelector(
    [selectGetItemsResult, (state, search) => search],
    (result, search) =>
        result.data?.filter(item =>
            item.hierarchy.toLowerCase().includes(search)
        ) ?? []
);
