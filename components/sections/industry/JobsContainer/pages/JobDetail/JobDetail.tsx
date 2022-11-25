import React, { useContext, useEffect, useState, ReactElement } from 'react'
import { useRouter } from 'next/router'

// Icons
import { MdEdit } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'

// components
import {
    Card,
    Popup,
    LoadingAnimation,
    BackButton,
    TableAction,
    //   ActionDropDown,
    //   DeleteActionPopup,
} from '@components'
import { DeleteModal } from '../../modals'
import { JobDetailData } from './components'

// Context
// import { JobDataContext, AlertsContext } from "context";
// import { useNotification } from "hooks";

// redux
import { useGetJobDetailQuery, useRemoveJobMutation } from '@queries'
import { getThemeColors } from '@theme'
import { EmptyData } from '@components'

const Colors = getThemeColors()

export const JobDetailContainer = () => {
    //  param
    const router = useRouter()
    const jobId = router.query.jobId

    const [modal, setModal] = useState<ReactElement | null>(null)

    const { data, isLoading, isError } = useGetJobDetailQuery(jobId)

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onDeleteClicked = (job: any) => {
        setModal(
            <DeleteModal job={job} onCancel={() => onModalCancelClicked()} />
        )
    }

    // contexts
    // const { setjobData } = useContext(JobDataContext);
    // const { showAlerts, setShowAlerts } = useContext(AlertsContext);
    // const { notification } = useNotification();

    // For redirecting to jobs list page after successfully deleted

    // const statusStyle = (status) => {
    //   return status === "Active"
    //     ? "success"
    //     : status === userStatus.PENDING
    //     ? "info"
    //     : status === "Expired"
    //     ? "error"
    //     : "primary";
    // };

    const TableActionOption = [
        {
            text: 'Edit',
            Icon: MdEdit,
            onClick: () => {
                router.push(`/jobs/advertise-new-job/${jobId}`)
            },
        },
        {
            text: 'Delete',
            style: 'error',
            Icon: AiFillDelete,
            onClick: (job: any) => onDeleteClicked(job),
        },
    ]

    return (
        <div>
            {modal}
            <div className="flex justify-between items-center mb-2">
                <BackButton
                    link={'/portals/industry/jobs/advertised-jobs'}
                    text={'Back To Jobs'}
                />
                {data && (
                    <TableAction
                        text="..."
                        options={TableActionOption}
                        rowItem={data}
                    />
                )}
            </div>

            {/* Alert */}
            {/* {showAlerts && showAlerts} */}

            {/*  */}
            <Card>
                {!isLoading ? (
                    data ? (
                        <JobDetailData data={data} />
                    ) : (
                        !isError && <EmptyData />
                    )
                ) : (
                    <LoadingAnimation />
                )}
            </Card>
        </div>
    )
}
