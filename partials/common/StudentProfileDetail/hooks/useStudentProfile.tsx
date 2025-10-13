import { useRouter } from 'next/router'
import { getUserCredentials } from '@utils'
import { useAlert, useContextBar } from '@hooks'
import {
    CommonApi,
    useGetSubAdminStudentDetailQuery,
    useStudentAssessmentCoursesQuery,
} from '@queries'

export const useStudentProfile = () => {
    const router = useRouter()
    const contextBar = useContextBar()
    const { alert: alertMessage, setAlerts, alerts } = useAlert()

    const studentId = Number(router.query?.id)
    const role = getUserCredentials()?.role

    const profile = useGetSubAdminStudentDetailQuery(studentId, {
        skip: !studentId,
        refetchOnMountOrArgChange: 30,
    })

    const studentCourses = useStudentAssessmentCoursesQuery(
        Number(profile?.data?.id),
        {
            skip: !profile?.data?.id,
            refetchOnMountOrArgChange: 300,
        }
    )

    // Track profile visitor
    CommonApi.Industries.useAddProfileVisitor(Number(profile?.data?.user?.id), {
        skip: !profile?.data,
    })

    return {
        profile,
        studentId,
        role,
        router,
        contextBar,
        alertMessage,
        setAlerts,
        alerts,
        studentCourses,
    }
}
