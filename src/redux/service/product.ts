import {ecommerceApi} from "../api";

export const productApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all products
        getProducts: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 1, pageSize = 10 }) =>
                `/api/products/?page=${page}&page_size=${pageSize}`,
        }),

    })
})
export const {
    useGetProductsQuery
} = productApi