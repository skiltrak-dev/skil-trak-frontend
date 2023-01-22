import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'rtos'
export const workplaceEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getRTOWorkplaces: builder.query<any, any>({
        query: (params) => {
            return {
                url: `${PREFIX}/work-place/list`,
                params,
            }
        },
        providesTags: ['RTOWorkplace'],
    }),
    getRTOWorkplaceDetail: builder.query<any, number>({
        query: (id) => `${PREFIX}/work-place/view/${id}`,
        providesTags: ['RTOWorkplace'],
    }),
})
