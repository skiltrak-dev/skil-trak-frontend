import { StudentStatusProgressCell } from '@components/StudentStatusProgressCell'
import { ProgressCell } from '@partials/admin/student/components'
import { Student, StudentStatusEnum, SubAdmin } from '@types'
import {
    WorkplaceCurrentStatus,
    checkStudentStatus,
    checkWorkplaceStatus,
    getStudentWorkplaceAppliedIndustry,
} from '@utils'
import React from 'react'

export const CaseOfficerAssignedStudent = ({
    student,
    workplaceFilter,
}: {
    student: Student
    workplaceFilter?: WorkplaceCurrentStatus
}) => {
    const workplace = student?.workplace
        ?.filter(
            (w: any) => w?.currentStatus !== WorkplaceCurrentStatus.Cancelled
        )
        ?.reduce((a: any, b: any) => (b?.createdAt > a?.createdAt ? a : b), {
            currentStatus: WorkplaceCurrentStatus.NotRequested,
        })

    const industries = student?.industries
    const steps = checkWorkplaceStatus(workplace?.currentStatus)
    const studentStatus = checkStudentStatus(student?.studentStatus)
    const appliedIndustry = getStudentWorkplaceAppliedIndustry(
        workplace?.industries
    )

    return workplaceFilter ? (
        <ProgressCell
            appliedIndustry={appliedIndustry}
            studentId={student?.id}
            assigned={student?.subadmin}
            step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
            studentProvidedWorkplace={
                workplace?.studentProvidedWorkplace || workplace?.byExistingAbn
            }
        />
    ) : student?.workplace && student?.workplace?.length > 0 ? (
        <ProgressCell
            appliedIndustry={appliedIndustry}
            studentId={student?.id}
            assigned={student?.subadmin}
            step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
            studentProvidedWorkplace={
                workplace?.studentProvidedWorkplace || workplace?.byExistingAbn
            }
        />
    ) : industries?.length > 0 ? (
        <StudentStatusProgressCell
            assigned={student?.subadmin}
            studentId={student?.id}
            step={
                workplace?.currentStatus === WorkplaceCurrentStatus.Cancelled
                    ? 4
                    : studentStatus
            }
            appliedIndustry={appliedIndustry}
            studentProvidedWorkplace={
                workplace?.studentProvidedWorkplace || workplace?.byExistingAbn
            }
        />
    ) : student?.subadmin ? (
        <ProgressCell
            appliedIndustry={appliedIndustry}
            studentId={student?.id}
            step={3}
            assigned={student?.subadmin}
            studentProvidedWorkplace={
                workplace?.studentProvidedWorkplace || workplace?.byExistingAbn
            }
        />
    ) : (
        <ProgressCell
            appliedIndustry={appliedIndustry}
            studentId={student?.id}
            step={1}
            assigned={student?.subadmin}
            studentProvidedWorkplace={
                workplace?.studentProvidedWorkplace || workplace?.byExistingAbn
            }
        />
    )
}
