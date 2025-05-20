import { PaginationValues } from '@types'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { WpAppRequEnum } from '@partials/rto/wpApprovalReq/enum'

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
    wpApprovalRequest: builder.query<any, PaginationValues>({
        query: () => `${PREFIX}/workplace-approval/request/pending/list`,
        providesTags: ['RTOWorkplace'],
    }),
    wpApprovalRequestChangeStatus: builder.mutation<
        any,
        { id: number; status: WpAppRequEnum }
    >({
        query: ({ id, ...params }) => ({
            url: `subadmin/approval-request/${id}/status/update`,
            params,
            method: 'PATCH',
        }),
        invalidatesTags: ['RTOWorkplace'],
    }),
})
