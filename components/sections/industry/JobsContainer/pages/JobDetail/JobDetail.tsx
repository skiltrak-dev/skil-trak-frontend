import React, { useContext, useEffect, useState } from 'react'
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
  //   ActionDropDown,
  //   DeleteActionPopup,
} from 'components'
import { JobDetailData } from './components'

// Context
// import { JobDataContext, AlertsContext } from "context";
// import { useNotification } from "hooks";

// redux
import { useGetJobDetailQuery, useRemoveJobMutation } from '@queries'
import { getThemeColors } from '@theme'
import { EmptyData } from 'components'

const Colors = getThemeColors()

export const JobDetailContainer = () => {
  //  param
  const router = useRouter()
  const jobId = router.query.jobId

  const { data, isLoading } = useGetJobDetailQuery(jobId)
  const [jobRemove, jobRemoveData] = useRemoveJobMutation()

  console.log('jobRemoveData', jobRemoveData)

  // contexts
  // const { setjobData } = useContext(JobDataContext);
  // const { showAlerts, setShowAlerts } = useContext(AlertsContext);
  // const { notification } = useNotification();

  const [removeJob, setRemoveJob] = useState<any | null>({
    isRemove: false,
    id: '',
  })

  // For redirecting to jobs list page after successfully deleted
  useEffect(() => {
    if (jobRemoveData.isSuccess) {
      router.push('/jobs/advertised-jobs')
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
        router.push(`/jobs/advertise-new-job/${jobId}`)
      },
      color: Colors.secondary,
    },
    {
      text: 'Delete',
      style: 'error',
      Icon: AiFillDelete,
      action: () => {
        setRemoveJob({
          isRemove: true,
          id: jobId,
        })
      },
      color: Colors.error,
    },
  ]

  // confirm Delete
  const deleteJob = async (id: any) => {
    setRemoveJob({
      isRemove: false,
      id: '',
    })
    await jobRemove(id)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <BackButton
          link={'/portals/industry/jobs/advertised-jobs'}
          text={'Back To Jobs'}
        />
        {/* {data && <ActionDropDown dropDown={TableActionOption} />} */}
      </div>

      {/* Alert */}
      {/* {showAlerts && showAlerts} */}

      {/*  */}
      <Card>
        {!isLoading ? (
          data ? (
            <JobDetailData data={data} />
          ) : (
            'Empty'
          )
        ) : (
          <LoadingAnimation />
        )}
      </Card>

      {/* Popup for delete job */}
      {/* {removeJob.isRemove && (
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
      )} */}

      {/* showing Popup when job delete is in progress */}
      {/* {jobRemoveData.isLoading && (
        <div className="fixed top-1/2 left-1/2 w-465 -translate-x-1/2 -translate-y-1/2">
          <Popup
            title={'Deleting Job'}
            subtitle={'Please wait for a moment'}
            titleColor={'error'}
            descColor={'gray'}
            shadow={4}
          />
        </div>
      )} */}
    </div>
  )
}
