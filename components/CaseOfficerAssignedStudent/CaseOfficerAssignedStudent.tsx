import { StudentStatusProgressCell } from '@components/StudentStatusProgressCell'
import { ProgressCell } from '@partials/admin/student/components'
import { Student, StudentStatusEnum, SubAdmin } from '@types'
import {
    WorkplaceCurrentStatus,
    checkStudentStatus,
    checkWorkplaceStatus,
    getStudentWorkplaceAppliedIndustry,
} from '@utils'
import React, { ReactElement, useState } from 'react'
import { AuthorizedUserComponent, Typography } from '@components'
import { UserRoles } from '@constants'
import { ViewStatusChangeHistoryModal } from '@partials/admin/student/modals'
import { WorkplaceWorkIndustriesType } from 'redux/queryTypes'

export const CaseOfficerAssignedStudent = ({
    student,
    workplaceFilter,
}: {
    student: Student
    workplaceFilter?: WorkplaceCurrentStatus
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
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

    const onCancelModal = () => setModal(null)

    console.log({ workplace })

    return (
        <div>
            {modal}
            {workplaceFilter ? (
                <ProgressCell
                    appliedIndustry={appliedIndustry}
                    studentId={student?.id}
                    assigned={student?.subadmin}
                    step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
                    studentProvidedWorkplace={
                        workplace?.studentProvidedWorkplace ||
                        workplace?.byExistingAbn
                    }
                />
            ) : student?.workplace && student?.workplace?.length > 0 ? (
                <ProgressCell
                    appliedIndustry={appliedIndustry}
                    studentId={student?.id}
                    assigned={student?.subadmin}
                    step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
                    studentProvidedWorkplace={
                        workplace?.studentProvidedWorkplace ||
                        workplace?.byExistingAbn
                    }
                />
            ) : industries?.length > 0 ? (
                <StudentStatusProgressCell
                    assigned={student?.subadmin}
                    studentId={student?.id}
                    step={
                        workplace?.currentStatus ===
                        WorkplaceCurrentStatus.Cancelled
                            ? 4
                            : studentStatus
                    }
                    appliedIndustry={appliedIndustry}
                    studentProvidedWorkplace={
                        workplace?.studentProvidedWorkplace ||
                        workplace?.byExistingAbn
                    }
                />
            ) : student?.subadmin ? (
                <ProgressCell
                    appliedIndustry={appliedIndustry}
                    studentId={student?.id}
                    step={3}
                    assigned={student?.subadmin}
                    studentProvidedWorkplace={
                        workplace?.studentProvidedWorkplace ||
                        workplace?.byExistingAbn
                    }
                />
            ) : (
                <ProgressCell
                    appliedIndustry={appliedIndustry}
                    studentId={student?.id}
                    step={1}
                    assigned={student?.subadmin}
                    studentProvidedWorkplace={
                        workplace?.studentProvidedWorkplace ||
                        workplace?.byExistingAbn
                    }
                />
            )}
            <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                {workplace &&
                Object.keys(workplace)?.filter((s) => s !== 'currentStatus')
                    ?.length > 0 ? (
                    <div
                        className={
                            'bg-indigo-300 px-2 py-0.5 rounded-md mt-1 w-fit ml-auto cursor-pointer'
                        }
                        onClick={() => {
                            setModal(
                                <ViewStatusChangeHistoryModal
                                    onCancel={onCancelModal}
                                    appliedIndustry={
                                        appliedIndustry as WorkplaceWorkIndustriesType
                                    }
                                />
                            )
                        }}
                    >
                        <Typography variant={'xs'}>
                            View Status History
                        </Typography>
                    </div>
                ) : null}
            </AuthorizedUserComponent>
        </div>
    )
}
