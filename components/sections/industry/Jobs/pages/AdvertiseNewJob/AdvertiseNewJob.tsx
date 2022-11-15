import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// components
import {
    Card,
    Popup,
    ActionAlert,
    GoBackButton,
    ActionAlertType,
    ShowErrorNotifications,
} from 'components'
import { RightSidebarData } from './components'

// hooks
import { useContextBar } from 'hooks'

// context
import { JobDataContext } from 'pages/Jobs'

// query
import {
    useAddJobMutation,
    useUpdateJobMutation,
    useGetJobDetailQuery,
} from 'redux/query'

// form
import { JobForm } from './JobForm'

// utills
import { trimString } from 'utills'

export const AdvertiseNewJob = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    // hooks
    const { setContent } = useContextBar()

    // query
    const editValues = useGetJobDetailQuery(id, { skip: !id })
    const [add, addResult] = useAddJobMutation()
    const [update, updateResult] = useUpdateJobMutation()

    const [editing] = useState(editValues?.data?.id !== undefined)

    useEffect(() => {
        setContent(
            <>
                <RightSidebarData />
            </>
        )
    }, [setContent])

    const isLoading = addResult.isLoading || updateResult.isLoading
    // const isError = addResult.isError || updateResult.isError;
    const isSuccess = addResult.isSuccess || updateResult.isSuccess

    const onSubmit = async (values) => {
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
            <ShowErrorNotifications
                result={!editing ? addResult : updateResult}
            />

            <GoBackButton link={'jobs'}>Back To Jobs</GoBackButton>

            <Card>
                {isLoading && (
                    <Popup
                        title={!editing ? 'Saving Job' : 'Updating Job'}
                        subtitle={'Please wait for a moment'}
                        variant={!editing ? 'success' : 'info'}
                        noShadow
                    />
                )}

                {isSuccess && (
                    <ActionAlert
                        title={
                            !editing
                                ? 'Job Advertisement Created Successfully!'
                                : 'Job Advertisement Updated Successfully!'
                        }
                        description={
                            'You will be redirected to jobs in a moment.'
                        }
                        variant={
                            !editing
                                ? ActionAlertType.SUCCESS
                                : ActionAlertType.INFO
                        }
                        primaryAction={{
                            text: 'Back To List',
                            onClick: () => {
                                navigate(`/jobs/advertised-jobs`)
                            },
                        }}
                        secondaryAction={{
                            text: 'View Job Detail',
                            onClick: () => {
                                navigate(
                                    `/jobs/job-detail/${
                                        editing
                                            ? updateResult?.originalArgs?.id
                                            : addResult.data.id
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
