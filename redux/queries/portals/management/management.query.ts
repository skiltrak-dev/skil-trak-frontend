import { emptySplitApi } from '../empty.query'
import { documentsEndpoints } from './documents'

export const managementApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        ...documentsEndpoints(build),
    })
})

const {
    useUploadKpiReportMutation,
} = managementApi

export const ManagementApi = {
    Documents:{
        useUploadKpiReport: useUploadKpiReportMutation
    }
}