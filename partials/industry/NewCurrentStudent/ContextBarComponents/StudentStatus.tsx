import { ShowErrorNotifications, Typography } from '@components'
import { useNotification } from '@hooks'
import { PlacementStartedModal } from '@partials/industry/currentStudents/modals'
import { SubAdminApi } from '@queries'
import { Student, StudentStatusEnum } from '@types'
import { WorkplaceCurrentStatus } from '@utils'
import React, { ReactElement, useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { PuffLoader } from 'react-spinners'

export const StudentStatus = ({
    student,
    industry,
    currentStatus,
}: {
    student: Student
    industry: any
    currentStatus: WorkplaceCurrentStatus
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [isOpened, setIsOpened] = useState<boolean>(false)
    const [selectedStatus, setSelectedStatus] =
        useState<WorkplaceCurrentStatus>()

    const { notification } = useNotification()

    const [changeCurrentStatus, changeCurrentStatusResult] =
        SubAdminApi.Student.changeCurrentStatus()

    useEffect(() => {
        setSelectedStatus(currentStatus)
    }, [currentStatus])

    useEffect(() => {
        if (changeCurrentStatusResult.isSuccess) {
            notification.success({
                title: 'Status Changed',
                description: 'Status Changed Successfully',
            })
        }
    }, [changeCurrentStatusResult])

    // const onChangeStudentStatus = (status: StudentStatusEnum) => {
    //     setIsOpened(false)
    //     setSelectedStatus(status)
    //     changeCurrentStatus({ id: studentUserId, status })
    // }

    const onModalCancelClicked = () => setModal(null)

    const studentStatusOptions = [
        {
            label: 'Placement Started',
            value: WorkplaceCurrentStatus.PlacementStarted,
            onClick: () => {
                setModal(
                    <PlacementStartedModal
                        id={industry?.id}
                        student={student}
                        agreementSigned={industry?.AgreementSigned}
                        onCancel={() => onModalCancelClicked()}
                    />
                )
            },
        },
        {
            label: 'Completed',
            value: WorkplaceCurrentStatus.Completed,
            onClick: () => {
                setModal(
                    <PlacementStartedModal
                        id={industry?.id}
                        student={student}
                        agreementSigned={industry?.AgreementSigned}
                        onCancel={() => onModalCancelClicked()}
                    />
                )
            },
        },
        {
            label: 'Terminated',
            value: WorkplaceCurrentStatus.Terminated,
            onClick: () => {
                setModal(
                    <PlacementStartedModal
                        id={industry?.id}
                        student={student}
                        agreementSigned={industry?.AgreementSigned}
                        onCancel={() => onModalCancelClicked()}
                    />
                )
            },
        },
    ]
    return (
        <>
            {modal}
            <ShowErrorNotifications result={changeCurrentStatusResult} />
            <div className=" py-3 mt-3.5">
                <Typography variant="small" medium>
                    Student Status
                </Typography>

                <div className="w-fit mt-2 relative">
                    <div
                        onClick={() => {
                            if (!changeCurrentStatusResult.isLoading) {
                                setIsOpened(!isOpened)
                            }
                        }}
                        className="relative cursor-pointer px-4 py-2.5 w-fit flex justify-evenly gap-x-2 rounded-md border border-[#128C7E] overflow-hidden"
                    >
                        {changeCurrentStatusResult.isLoading && (
                            <div className="absolute top-0 left-0 w-full h-full bg-[#ffffff70] flex justify-center items-center">
                                <PuffLoader size={20} />
                            </div>
                        )}
                        <Typography
                            variant="small"
                            color="text-[#128C7E]"
                            semibold
                            uppercase
                        >
                            {selectedStatus}
                        </Typography>
                        <IoIosArrowDown />
                    </div>
                    <div
                        className={`w-auto px-2 bg-white shadow-md rounded-md absolute top-full left-0 overflow-hidden transition-all duration-500 ${
                            isOpened ? 'max-h-40' : 'max-h-0'
                        }`}
                    >
                        {studentStatusOptions.map((status, index) => (
                            <div
                                className="border-b border-gray-100 py-1 cursor-pointer"
                                key={index}
                                onClick={() => {
                                    status.onClick()
                                    setIsOpened(false)
                                    setSelectedStatus(status.value)
                                }}
                            >
                                <Typography variant="small" medium>
                                    {status.label}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
