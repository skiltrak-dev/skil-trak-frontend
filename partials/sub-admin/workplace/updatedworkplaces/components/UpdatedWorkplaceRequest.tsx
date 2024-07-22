// Icons
// components
import { ActionButton, ShowErrorNotifications } from '@components'

// utils
import { WorkplaceCurrentStatus } from '@utils'

// hooks

// query
import { useContextBar, useNotification } from '@hooks'
import {
    SubAdminApi,
    useCancelWorkplaceStatusMutation,
    useGetWorkplaceFoldersQuery,
} from '@queries'
import { Course } from '@types'
import { ReactElement, useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import {
    CancelWorkplaceModal,
    IndustryStatus,
} from '@partials/common/StudentProfileDetail/components'
import { AssignToMe } from '../../components'
import { GetFolders } from '../../hooks'

export const WPStatusForCancelButon = [
    WorkplaceCurrentStatus.Applied,
    WorkplaceCurrentStatus.CaseOfficerAssigned,
    WorkplaceCurrentStatus.Interview,
    WorkplaceCurrentStatus.AwaitingWorkplaceResponse,
    WorkplaceCurrentStatus.AppointmentBooked,
    WorkplaceCurrentStatus.AwaitingAgreementSigned,
    WorkplaceCurrentStatus.NoResponse,
    WorkplaceCurrentStatus.Rejected,
]
type WorkplaceRequestProps = {
    workplace: any
    assignToMe?: boolean
    cancelRequest?: boolean
}
export const UpdatedWorkplaceRequest = ({
    workplace,
    assignToMe = false,
    cancelRequest = false,
}: WorkplaceRequestProps) => {
    const [appliedIndustry, setAppliedIndustry] = useState<any | null>(null)
    const [course, setCourse] = useState<any | null>(null)
    const [onEnterWorkplace, setOnEnterWorkplace] = useState<boolean>(false)
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [isOpened, setIsOpened] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const { setContent, show } = useContextBar()
    const { notification } = useNotification()

    // query
    const [cancelWorkplace, cancelWorkplaceResult] =
        useCancelWorkplaceStatusMutation()
    const [assignCourse, assignCourseResult] =
        SubAdminApi.Workplace.assignCourse()

    // query
    const workplaceFolders = useGetWorkplaceFoldersQuery(
        {
            workplaceId: Number(workplace?.id),
            appliedIndustryId: appliedIndustry?.industry?.id,
            courseId: course?.id,
        },
        { skip: !workplace || !appliedIndustry || !course || !onEnterWorkplace }
    )

    const folders = GetFolders(workplaceFolders)

    useEffect(() => {
        setAppliedIndustry(workplace.industries?.find((i: any) => i.applied))
        setCourse(workplace?.courses ? workplace?.courses[0] : {})
    }, [workplace])

    useEffect(() => {
        if (cancelWorkplaceResult.isSuccess) {
            notification.error({
                title: 'Workplace Cancelled',
                description: 'Workplace Cancelled Successfully',
            })
        }
    }, [cancelWorkplaceResult])

    const courseOptions =
        workplace?.student?.courses?.length > 0
            ? workplace?.student?.courses?.map((course: Course) => ({
                  item: course,
                  value: course?.id,
                  label: course?.title,
              }))
            : []

    const onCancelWorkplaceClicked = () => {
        setModal(
            <CancelWorkplaceModal
                onCancel={() => {
                    setModal(null)
                }}
                workplaceId={workplace?.id}
            />
        )
    }

    return (
        <>
            {modal}
            <Waypoint
                onEnter={() => setOnEnterWorkplace(true)}
                onLeave={() => setOnEnterWorkplace(false)}
            >
                <div>
                    <ShowErrorNotifications result={cancelWorkplaceResult} />
                    <div>
                        {assignToMe && !cancelRequest ? (
                            <AssignToMe
                                workplace={workplace}
                                appliedIndustry={appliedIndustry}
                            />
                        ) : cancelRequest ? (
                            WPStatusForCancelButon.includes(
                                workplace?.currentStatus
                            ) && (
                                <div className="mt-3">
                                    <ActionButton
                                        variant={'error'}
                                        onClick={async () => {
                                            onCancelWorkplaceClicked()
                                        }}
                                        loading={
                                            cancelWorkplaceResult.isLoading
                                        }
                                        disabled={
                                            cancelWorkplaceResult.isLoading
                                        }
                                    >
                                        Cancel Request
                                    </ActionButton>
                                </div>
                            )
                        ) : (
                            <IndustryStatus
                                folders={folders}
                                workplace={workplace}
                                appliedIndustry={appliedIndustry}
                                // isOpen={isOpen}
                            />
                        )}
                    </div>
                </div>
            </Waypoint>
        </>
    )
}
