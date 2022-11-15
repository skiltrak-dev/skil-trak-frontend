import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Icons
import { MdEdit } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'

// components
import {
    Card,
    Popup,
    Loading,
    GoBackButton,
    ActionDropDown,
    DeleteActionPopup,
} from 'components'
import { JobDetailData } from './components'

// Context
import { JobDataContext } from 'pages/Jobs'
// import { JobDataContext, AlertsContext } from "context";
// import { useNotification } from "hooks";

// redux
import { useGetJobDetailQuery, useRemoveJobMutation } from 'redux/query'
import { Colors } from 'utills/colors/Colors'
import { EmptyData } from 'components'

export const JobDetail = () => {
    //  param
    const { jobid } = useParams()

    const { setJobData } = useContext(JobDataContext)

    const { data, isLoading } = useGetJobDetailQuery(jobid)
    const [jobRemove, jobRemoveData] = useRemoveJobMutation()

    console.log('jobRemoveData', jobRemoveData)

    const navigate = useNavigate()

    // contexts
    // const { setjobData } = useContext(JobDataContext);
    // const { showAlerts, setShowAlerts } = useContext(AlertsContext);
    // const { notification } = useNotification();

    const [removeJob, setRemoveJob] = useState({
        isRemove: false,
        id: '',
    })

    // For redirecting to jobs list page after successfully deleted
    useEffect(() => {
        if (jobRemoveData.isSuccess) {
            navigate('/jobs/advertised-jobs')
        }
    }, [jobRemoveData.isSuccess])

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
            action: () => {
                setJobData({
                    ...data,
                    isEditing: true,
                })
                navigate(`/jobs/advertise-new-job/${jobid}`)
            },
            color: Colors.secondaryText,
        },
        {
            text: 'Delete',
            style: 'error',
            Icon: AiFillDelete,
            action: () => {
                setRemoveJob({
                    isRemove: true,
                    id: jobid,
                })
            },
            color: Colors.error,
        },
    ]

    // confirm Delete
    const deleteJob = async (id) => {
        setRemoveJob({
            isRemove: false,
            id: '',
        })
        await jobRemove(id)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <GoBackButton link={'jobs'}>Back To Jobs</GoBackButton>
                {data && <ActionDropDown dropDown={TableActionOption} />}
            </div>

            {/* Alert */}
            {/* {showAlerts && showAlerts} */}

            {/*  */}
            <Card mt={6}>
                {!isLoading ? (
                    data ? (
                        <JobDetailData data={data} />
                    ) : (
                        <EmptyData
                            actionText={'advertise job'}
                            actionLink={'/jobs/advertise-new-job'}
                        />
                    )
                ) : (
                    <Loading />
                )}
            </Card>

            {/* Popup for delete job */}
            {removeJob.isRemove && (
                <DeleteActionPopup
                    title={'Delete Job'}
                    description={
                        'Your job advertisement ‘New Job Advertisement’ will be deleted permanently. Do you want to continue'
                    }
                    onCancel={() =>
                        setRemoveJob({
                            isRemove: false,
                            id: '',
                        })
                    }
                    onConfirm={() => {
                        deleteJob(removeJob.id)
                    }}
                />
            )}

            {/* showing Popup when job delete is in progress */}
            {jobRemoveData.isLoading && (
                <div className="fixed top-1/2 left-1/2 w-465 -translate-x-1/2 -translate-y-1/2">
                    <Popup
                        title={'Deleting Job'}
                        subtitle={'Please wait for a moment'}
                        titleColor={'error'}
                        descColor={'gray'}
                        shadow={4}
                    />
                </div>
            )}
        </div>
    )
}
