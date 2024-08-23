import React, { ReactElement, useState } from 'react'
import { SubAdminApi, useGetSubAdminIndustriesProfileQuery } from '@queries'
import {
    IndustryContactPerson,
    IndustryDetail,
    IndustryProfileAvatar,
    IndustrySectors,
} from '@partials/common/IndustryProfileDetail'
import { ProfileLinks } from './components'
import { ActionButton, Typography } from '@components'
import { AddNoteModal, ViewNoteModal } from './modal'
import { UpdatedCourseList } from '@partials/common/UpdatedCourseList'
import { getSectors } from '@utils'

export const IndustryDetailCB = ({
    id,
    industryUserId,
}: {
    id: number
    industryUserId: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const industry = useGetSubAdminIndustriesProfileQuery(Number(id), {
        skip: !id,
        refetchOnMountOrArgChange: true,
    })
    const profile = SubAdminApi.SubAdmin.useProfile()

    const sectorsWithCourses = getSectors(industry?.data?.courses)

    const onCancelClicked = () => setModal(null)

    const onCreateNoteClicked = () => {
        setModal(
            <AddNoteModal
                userId={industryUserId}
                onCancel={onCancelClicked}
                viewNote={onViewNoteClicked}
            />
        )
    }
    const onViewNoteClicked = () => {
        setModal(
            <ViewNoteModal
                userId={industryUserId}
                onCancel={onCancelClicked}
                creatNote={onCreateNoteClicked}
            />
        )
    }
    return (
        <div>
            {modal}
            <div className="flex justify-between items-center">
                <div>
                    <IndustryProfileAvatar
                        avatar={industry?.data?.user?.avatar as string}
                    />
                </div>
                <ProfileLinks industry={industry?.data} />
            </div>
            {/*  */}
            <div className="flex justify-between items-center gap-x-3">
                <div className="mt-2">
                    <Typography semibold>
                        <span className="text-[15px]">
                            {' '}
                            {industry?.data?.user?.name}
                        </span>
                    </Typography>
                    <Typography variant="xs" color="text-[#6B7280]">
                        {industry?.data?.isSnoozed
                            ? '---'
                            : industry?.data?.user?.email}
                    </Typography>
                </div>
            </div>
            {/*  */}
            <IndustryDetail industry={industry?.data} />
            <IndustryContactPerson industry={industry?.data} />
            {/*  */}
            {/*  */}
            {!profile?.data?.isAssociatedWithRto ? (
                <div className="flex items-center gap-x-2 py-3">
                    <Typography variant="label">Note: </Typography>
                    <div className="flex items-center">
                        <ActionButton
                            variant="info"
                            simple
                            onClick={() => {
                                onViewNoteClicked()
                            }}
                        >
                            View
                        </ActionButton>
                        <ActionButton
                            variant="info"
                            simple
                            onClick={() => {
                                onCreateNoteClicked()
                            }}
                        >
                            Add
                        </ActionButton>
                    </div>
                </div>
            ) : null}
            {/*  */}{' '}
            <UpdatedCourseList sectorsWithCourses={sectorsWithCourses} />
            {/* <IndustrySectors courses={industry?.data?.courses} /> */}
        </div>
    )
}
