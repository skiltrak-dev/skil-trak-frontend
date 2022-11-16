import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// components
import {
  Card,
  Popup,
  ActionAlert,
  BackButton,
  ActionAlertType,
  //   ShowErrorNotifications,
} from 'components'
// import { RightSidebarData } from './components'

// hooks
import { useContextBar } from 'hooks'

// query
import {
  useAddJobMutation,
  useUpdateJobMutation,
  useGetJobDetailQuery,
} from '@queries'

// form
import { JobForm } from './JobForm'

// utills
import { trimString } from '@utils'

export const AdvertiseNewJobContainer = () => {
  const router = useRouter()
  const jobId = router.query.jobId

  // hooks
  const { setContent } = useContextBar()

  // query
  const editValues = useGetJobDetailQuery(jobId, { skip: !jobId })
  const [add, addResult] = useAddJobMutation()
  const [update, updateResult] = useUpdateJobMutation()

  const [editing] = useState(editValues?.data?.id !== undefined)

  //   useEffect(() => {
  //     setContent(
  //       <>
  //         <RightSidebarData />
  //       </>
  //     )
  //   }, [setContent])

  

  const isLoading = addResult.isLoading || updateResult.isLoading
  // const isError = addResult.isError || updateResult.isError;
  const isSuccess = addResult.isSuccess || updateResult.isSuccess

  const onSubmit = async (values: any) => {
    if (editing) {
      const { isEditing, industry, ...rest } = values
      const trimValues = trimString(rest)
      await update(trimValues)
    } else {
      const trimValues = trimString(values)
      await add(trimValues)
    }
  }

  return (
    <>
      {/* <ShowErrorNotifications result={!editing ? addResult : updateResult} /> */}

      <BackButton link={'jobs'} text={'Back To Jobs'} />

      <Card>
        {isLoading && (
          <Popup
            title={!editing ? 'Saving Job' : 'Updating Job'}
            subtitle={'Please wait for a moment'}
            variant={!editing ? 'success' : 'info'}
          />
        )}

        {isSuccess && (
          <ActionAlert
            title={
              !editing
                ? 'Job Advertisement Created Successfully!'
                : 'Job Advertisement Updated Successfully!'
            }
            description={'You will be redirected to jobs in a moment.'}
            variant={!editing ? 'primary' : 'info'}
            primaryAction={{
              text: 'Back To List',
              onClick: () => {
                router.push(`/jobs/advertised-jobs`)
              },
            }}
            secondaryAction={{
              text: 'View Job Detail',
              onClick: () => {
                router.push(
                  `/jobs/job-detail/${
                    editing ? updateResult?.originalArgs?.id : addResult.data.id
                  }`
                )
              },
            }}
          />
        )}

        {!isLoading && !isSuccess && (
          <JobForm
            editValues={editValues}
            editing={editing}
            onSubmit={onSubmit}
          />
        )}
      </Card>
    </>
  )
}
