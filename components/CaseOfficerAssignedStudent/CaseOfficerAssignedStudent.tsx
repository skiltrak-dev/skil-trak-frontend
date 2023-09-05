import { StudentStatusProgressCell } from '@components/StudentStatusProgressCell'
import { ProgressCell } from '@partials/admin/student/components'
import { Student, SubAdmin } from '@types'
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
}: {
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

    return industries?.length > 0 ? (
        <StudentStatusProgressCell
            studentId={student?.id}
            step={studentStatus}
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
