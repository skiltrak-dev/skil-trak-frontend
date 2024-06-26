// Icons
import { RiBook2Fill } from 'react-icons/ri'
// components
import {
    ActionButton,
    Button,
    Card,
    InitialAvatar,
    Select,
    ShowErrorNotifications,
    Typography,
} from '@components'

// utils
import {
    CourseSelectOption,
    WorkplaceCurrentStatus,
    ellipsisText,
    formatOptionLabel,
    getUserCredentials,
} from '@utils'

// hooks

// query
import { useContextBar, useNotification } from '@hooks'
import { ViewAgreement } from '@partials/common'
import {
    SubAdminApi,
    useCancelWorkplaceStatusMutation,
    useGetWorkplaceFoldersQuery,
} from '@queries'
import { Course } from '@types'
import { useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import Link from 'next/link'
import { UserRoles } from '@constants'
import { BsDot } from 'react-icons/bs'
import { IndustryStatus } from '@partials/common/StudentProfileDetail/components'
import { GetFolders } from '../../hooks'
import { AssignToMe } from '../../components'

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

    const role = getUserCredentials()?.role

    return (
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
                                        await cancelWorkplace(
                                            Number(workplace?.id)
                                        )
                                    }}
                                    loading={cancelWorkplaceResult.isLoading}
                                    disabled={cancelWorkplaceResult.isLoading}
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
    )
}
