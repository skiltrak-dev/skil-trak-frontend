import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'gallery'
export const galleryEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    addIndustryGallery: builder.mutation<any, any>({
        query: (body) => ({
            url: PREFIX,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['Industry-Gallery'],
    }),
    removeIndustryGallery: builder.mutation<any, number>({
        query: (id) => ({
            url: `${PREFIX}/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Industry-Gallery'],
    }),
    industryGallery: builder.query<any, { userId?: number }>({
        query: (params) => ({
            url: `industries/media/list`,
            params,
        }),
        providesTags: ['Industry-Gallery'],
    }),
})
