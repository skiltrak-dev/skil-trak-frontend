import { SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import { getQueryParams } from '../functions'

export const useCourseManagementApi = () => {
    const router = useRouter()

    const industryId = router.query?.id

    // API calls with better organization
    const approvedCourses = SubAdminApi.Industry.useIndustryRequestedCourses(
        getQueryParams(industryId + '', 'approved'),
        {
            skip: !industryId,
            refetchOnMountOrArgChange: true,
        }
    )

    const pendingCourses = SubAdminApi.Industry.useIndustryRequestedCourses(
        getQueryParams(industryId + '', 'pending'),
        {
            skip: !industryId,
            refetchOnMountOrArgChange: true,
        }
    )

    const previousCourses = SubAdminApi.Industry.usePreviousIndustryCourses(
        industryId,
        { skip: !industryId }
    )

    return {
        approvedCourses,
        pendingCourses,
        previousCourses,
    }
}
