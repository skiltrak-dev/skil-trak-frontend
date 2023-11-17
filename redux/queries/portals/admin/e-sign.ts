import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

import {
    UserCount,
    PaginatedResponse,
    Rto,
    UserStatus,
    Sector,
    Course,
    PaginationWithSearch,
    CourseWithAssessmentEvidence,
} from '@types'

const PREFIX = 'admin'
export const eSignEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    saveEsign: builder.mutation<any, any>({
        query: (body) => ({
            url: `${PREFIX}/add-esign`,
            method: 'POST',
            body,
        }),
        invalidatesTags: ['E-Sign'],
    }),
})
