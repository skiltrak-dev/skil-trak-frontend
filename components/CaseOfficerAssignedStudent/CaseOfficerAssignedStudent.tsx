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
    const [isSecondWorkplace, setIsSecondWorkplace] = useState<boolean>(false)

    const workplace = student?.workplace
        ?.filter(
            (w: any) => w?.currentStatus !== WorkplaceCurrentStatus.Cancelled
        )
        ?.reduce((a: any, b: any) => (b?.createdAt > a?.createdAt ? a : b), {
            currentStatus: WorkplaceCurrentStatus.NotRequested,
        })

    const secondWorkplace = student?.workplace
        ?.filter((w: any) => w?.id !== workplace?.id)
        ?.filter(
            (w: any) => w?.currentStatus !== WorkplaceCurrentStatus.Cancelled
        )
        ?.reduce((a: any, b: any) => (b?.createdAt > a?.createdAt ? a : b), {
            currentStatus: WorkplaceCurrentStatus.NotRequested,
        })

    const updatedWorkplace = isSecondWorkplace ? secondWorkplace : workplace

    const industries = student?.industries
    const steps = checkWorkplaceStatus(updatedWorkplace?.currentStatus)
    const studentStatus = checkStudentStatus(student?.studentStatus)
    const appliedIndustry = getStudentWorkplaceAppliedIndustry(
        updatedWorkplace?.industries
    )

    const onCancelModal = () => setModal(null)

    console.log({ secondWorkplace })

    const checkKeysLength = (wp: any) =>
        Object.keys(wp)?.filter((s) => s !== 'currentStatus')?.length > 0

    console.log({ appliedIndustry })

    return (
        <div className="w-[280px]">
            {modal}
            {workplaceFilter ? (
                <ProgressCell
                    appliedIndustry={appliedIndustry}
                    studentId={student?.id}
                    assigned={student?.subadmin}
                    step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
                    studentProvidedWorkplace={
                        updatedWorkplace?.studentProvidedWorkplace ||
                        updatedWorkplace?.byExistingAbn
                    }
                />
            ) : student?.workplace && student?.workplace?.length > 0 ? (
                <ProgressCell
                    appliedIndustry={appliedIndustry}
                    studentId={student?.id}
                    assigned={student?.subadmin}
                    step={steps > 14 ? 14 : steps < 1 ? 1 : steps}
                    studentProvidedWorkplace={
                        updatedWorkplace?.studentProvidedWorkplace ||
                        updatedWorkplace?.byExistingAbn
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
                        updatedWorkplace?.studentProvidedWorkplace ||
                        updatedWorkplace?.byExistingAbn
                    }
                />
            ) : student?.subadmin ? (
                <ProgressCell
                    appliedIndustry={appliedIndustry}
                    studentId={student?.id}
                    step={3}
                    assigned={student?.subadmin}
                    studentProvidedWorkplace={
                        updatedWorkplace?.studentProvidedWorkplace ||
                        updatedWorkplace?.byExistingAbn
                    }
                />
            ) : (
                <ProgressCell
                    appliedIndustry={appliedIndustry}
                    studentId={student?.id}
                    step={1}
                    assigned={student?.subadmin}
                    studentProvidedWorkplace={
                        updatedWorkplace?.studentProvidedWorkplace ||
                        updatedWorkplace?.byExistingAbn
                    }
                />
            )}
            <div className="flex items-center justify-between gap-x-2 mt-1">
                {secondWorkplace && checkKeysLength(secondWorkplace) ? (
                    <div
                        className="bg-indigo-300 px-2 py-0.5 rounded-md cursor-pointer"
                        onClick={() => {
                            setIsSecondWorkplace(!isSecondWorkplace)
                        }}
                    >
                        <Typography variant={'xs'}>
                            View {isSecondWorkplace ? 'First' : 'Second'}{' '}
                            Workplace
                        </Typography>
                    </div>
                ) : null}

                <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                    {workplace &&
                    checkKeysLength(workplace) &&
                    appliedIndustry ? (
                        <div
                            className={
                                'bg-indigo-300 px-2 py-0.5 rounded-md  w-fit ml-auto cursor-pointer'
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
        </div>
    )
}
