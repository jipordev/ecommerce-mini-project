import {ecommerceApi} from "../api";
import {id} from "postcss-selector-parser";

export const productApi = ecommerceApi.injectEndpoints({
    endpoints: (builder) => ({
        // get all products
        getProducts: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 1, pageSize = 10 }) =>
                `/api/products/?page=${page}&page_size=${pageSize}`,
        }),
        getProductById: builder.query<any, number>({
                query: (id) => `/api/products/${id}/`,
        }),
        createProduct: builder.mutation<any, { newProduct: object, accessToken: string }>({
            query: ({ newProduct, accessToken }) => ({
                url: "/api/products/",
                method: "POST",
                body: newProduct,
            }),
        }),
        // update a product
        updateProduct: builder.mutation<
            any,
            { id: number; updatedProduct: object;}>({
            query: ({ id, updatedProduct}) => ({
                url: `/api/products/${id}/`,
                method: "PATCH",
                body: updatedProduct,
            }),
        }),
        // delete a product
        deleteProduct: builder.mutation<any, { id: number; accessToken: string }>({
            query: ({ id, accessToken }) => ({
                url: `/api/products/${id}/`,
                method: "DELETE",
            }),
        }),
        uploadProductImage: builder.mutation<any, FormData>({
            query: (file) => ({
                url: `/api/file/product/`,
                method: "POST",
                body:file
            })
        }),
        uploadCategoryImage: builder.mutation<any, FormData>({
            query: (file) => ({
                url: `/api/file/brand/`,
                method: "POST",
                body: file
            })
        }),
        getCategoryImage: builder.query<any, { page:number, pageSize:number }>({
            query: ({page =1, pageSize = 10}) => `/api/file/category/?page=${page}&page_size=${pageSize}`,
        }),
        getProductImage: builder.query<any, {page:number , pageSize : number}>({
            query: ({ page = 1, pageSize = 10 }) => `/api/file/product/?page=${page}&page_size=${pageSize}`,
        })
    })
})
export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useUploadProductImageMutation,
    useUploadCategoryImageMutation,
    useGetCategoryImageQuery,
    useGetProductImageQuery
} = productApi