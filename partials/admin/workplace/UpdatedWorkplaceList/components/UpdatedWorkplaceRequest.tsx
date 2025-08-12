// Icons
// components
import { ActionButton } from '@components'

// utils
import { WorkplaceCurrentStatus } from '@utils'

// hooks

// query
import {
    useGetWorkplaceFoldersQuery
} from '@queries'
import { ReactElement, useEffect, useState } from 'react'
import { Waypoint } from 'react-waypoint'

import {
    CancelWorkplaceModal,
    IndustryStatus,
} from '@partials/common/StudentProfileDetail/components'
import { AssignToMe } from '@partials/sub-admin/workplace/components'
import { GetFolders } from '@partials/sub-admin/workplace/hooks'

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
                    <div>
                        {assignToMe && !cancelRequest ? (
                            <AssignToMe
                                workplace={workplace}
                                appliedIndustry={appliedIndustry}
                                isAdmin={true}
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
                                student={workplace?.student}
                                // isOpen={isOpen}
                            />
                        )}
                    </div>
                </div>
            </Waypoint>
        </>
    )
}
