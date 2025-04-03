import { ActionButton, Typography } from '@components'
import { AssessmentToolsType, User } from '@types'
import { isBrowser } from '@utils'
import React, { ReactElement, useState } from 'react'
import { AiFillEdit, AiOutlineDownload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { AssessmentActionCard } from './AssessmentActionCard'
import { LuCopy } from 'react-icons/lu'
import { AdminApi } from '@queries'
import { useContextBar } from '@hooks'
import { AddAssessmentToolCB } from '@partials/admin/rto/components/AddAssessmentToolCB'
import { CiEdit } from 'react-icons/ci'
import { ArchiveAssessmentModal } from '../../../modals'

export const AssessmentFileCard = ({
    rtoUser,
    isArchived,
    assessmentTool,
}: {
    rtoUser: User
    isArchived: boolean
    assessmentTool: AssessmentToolsType
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [remove, removeResult] = AdminApi.Rtos.useRemoveAssessmentTools()

    const contextBar = useContextBar()
    const onEditAssessment = () => {
        contextBar.setTitle('Add Assessment')
        contextBar.setContent(
            <AddAssessmentToolCB
                assessment={assessmentTool}
                edit={true}
                rtoUser={rtoUser}
            />
        )
        contextBar.show()
    }

    const onCancel = () => setModal(null)

    const onArchiveAssessment = (assessment: any) => {
        setModal(
            <ArchiveAssessmentModal
                onCancel={onCancel}
                assessment={assessment}
            />
        )
    }

    return (
        <>
            {modal}
            <div
                className={`bg-white flex items-center justify-between gap-x-2 border-[#6B7280] rounded cursor-pointer border  shadow-[0px_1px_16px_0px_rgba(0,0,0,0.10)] px-3.5 py-1.5  `}
            >
                <div>
                    <Typography variant="muted" color={'text-[#374151]'}>
                        {assessmentTool?.title}
                    </Typography>
                </div>
                <div className="flex items-center gap-x-2">
                    <AssessmentActionCard
                        Icon={AiOutlineDownload}
                        onClick={() => {
                            if (isBrowser()) {
                                window.open(assessmentTool?.file)
                            }
                        }}
                        title="Download File"
                    />
                    <AssessmentActionCard
                        Icon={LuCopy}
                        onClick={() => {
                            onArchiveAssessment(assessmentTool)
                        }}
                        title="Archive Assessment"
                    />
                    {!isArchived ? (
                        <AssessmentActionCard
                            Icon={AiFillEdit}
                            onClick={() => {
                                onEditAssessment()
                            }}
                            loading={removeResult?.isLoading}
                            title="Edit Assessment"
                        />
                    ) : null}
                    {isArchived ? (
                        <AssessmentActionCard
                            Icon={MdDelete}
                            onClick={() => {
                                remove(assessmentTool?.id)
                            }}
                            loading={removeResult?.isLoading}
                            title="Delete Assessment"
                        />
                    ) : null}

                    {/* <ActionButton
                    Icon={MdDelete}
                    loading={
                        removeResult.isLoading &&
                        selectedTool === assessment?.id
                    }
                    onClick={() => {
                        setSelectedTool(assessment?.id)
                        remove(assessment?.id)
                    }}
                    variant={'error'}
                    simple
                ></ActionButton> */}
                </div>
            </div>
        </>
    )
}
