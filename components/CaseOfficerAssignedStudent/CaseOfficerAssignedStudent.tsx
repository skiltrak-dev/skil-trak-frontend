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

export interface StudentSubAdmin extends Student {
    subadmin: SubAdmin
}

export const CaseOfficerAssignedStudent = ({
    student,
    workplaceFilter,
}: {
    workplaceFilter?: WorkplaceCurrentStatus
    student: StudentSubAdmin
}) => {
    const workplace = student?.workplace
        ?.filter(
            (w: any) => w?.currentStatus !== WorkplaceCurrentStatus.Cancelled
        )
        ?.reduce((a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b), {
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
            assigned={workplace?.assignedTo || student?.subadmin}
            step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
        />
    ) : industries?.length > 0 ? (
        <StudentStatusProgressCell
            studentId={student?.id}
            step={
                workplace?.currentStatus === WorkplaceCurrentStatus.Cancelled
                    ? 4
                    : studentStatus
            }
            appliedIndustry={appliedIndustry}
        />
    ) : student?.workplace && student?.workplace?.length > 0 ? (
        <ProgressCell
            appliedIndustry={appliedIndustry}
            studentId={student?.id}
            assigned={workplace?.assignedTo || student?.subadmin}
            step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
        />
    ) : student?.subadmin ? (
        <ProgressCell
            appliedIndustry={appliedIndustry}
            studentId={student?.id}
            step={3}
            assigned={workplace?.assignedTo || student?.subadmin}
        />
    ) : (
        <ProgressCell
            appliedIndustry={appliedIndustry}
            studentId={student?.id}
            step={1}
            assigned={workplace?.assignedTo || student?.subadmin}
        />
    )
}
