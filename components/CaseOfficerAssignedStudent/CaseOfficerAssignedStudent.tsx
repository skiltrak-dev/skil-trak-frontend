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
    const workplace = student?.workplace?.reduce(
        (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
        {
            currentStatus: WorkplaceCurrentStatus.NotRequested,
        }
    )
    const industries = student?.industries
    const steps = checkWorkplaceStatus(workplace?.currentStatus)
    const studentStatus = checkStudentStatus(student?.studentStatus)
    const appliedIndustry = getStudentWorkplaceAppliedIndustry(
        workplace?.industries
    )

    console.log(
        'Khaluu',
        industries?.find(
            (ind: any) => ind?.id === appliedIndustry?.industry?.id
        )
    )

    const studentStatusValues = Object.values(StudentStatusEnum)?.filter(
        (status: string) => status !== StudentStatusEnum.ACTIVE
    )

    const wpStatusValues = [
        WorkplaceCurrentStatus.PlacementStarted,
        WorkplaceCurrentStatus.Completed,
        WorkplaceCurrentStatus.Terminated,
    ]

    return workplaceFilter ? (
        <ProgressCell
            appliedIndustry={appliedIndustry}
            studentId={student?.id}
            assigned={student?.subadmin || workplace?.assignedTo}
            step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
        />
    ) : industries?.length > 0 &&
      studentStatusValues.includes(student?.studentStatus) &&
      wpStatusValues.includes(workplace.currentStatus) ? (
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
            assigned={student?.subadmin || workplace?.assignedTo}
            step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
        />
    ) : student?.subadmin ? (
        <ProgressCell
            appliedIndustry={appliedIndustry}
            studentId={student?.id}
            step={3}
            assigned={student?.subadmin || workplace?.assignedTo}
        />
    ) : (
        <ProgressCell
            appliedIndustry={appliedIndustry}
            studentId={student?.id}
            step={1}
            assigned={student?.subadmin || workplace?.assignedTo}
        />
    )
}
