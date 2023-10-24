import {
    Button,
    Checkbox,
    ShowErrorNotifications,
    TextArea,
    UploadFile,
} from '@components'
import { FileUpload } from '@hoc'
import { useNotification } from '@hooks'
import { StudentApi } from '@queries'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export const CancelSchedule = ({
    schedule,
    onCancel,
}: {
    schedule: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [cancelSchedule, cancelScheduleResult] =
        StudentApi.Schedule.useCancelSchedule()
    const methods = useForm({
        mode: 'all',
    })

    useEffect(() => {
        if (cancelScheduleResult.isSuccess) {
            notification.error({
                title: 'Schedule Cancelled',
                description: 'Schedule has been cancelled successfully',
            })
            onCancel()
        }
    }, [cancelScheduleResult])

    const onSubmit = (values: any) => {
        cancelSchedule(schedule?.id)
    }
    return (
        <div className="max-h-[60vh] overflow-auto custom-scrollbar">
            <ShowErrorNotifications result={cancelScheduleResult} />
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        <TextArea
                            label={'Note'}
                            name={'note'}
                            placeholder={'Your Note Here...'}
                            validationIcons
                            required
                            rows={5}
                        />

                        {/* <FileUpload
                            label={'Upload your Resume'}
                            required
                            onChange={(doc: File) => {
                                // setFile(doc)
                                // setResume(URL.createObjectURL(doc))
                                // setSelectedResume(true)
                            }}
                            name={'resume'}
                            component={UploadFile}
                            // multiple
                            // limit={Number(1111111111)}
                        /> */}

                        <div className="mt-2">
                            <Checkbox
                                name={'remember'}
                                label={'Send Nofication Email'}
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <Button
                            submit
                            loading={cancelScheduleResult.isLoading}
                            disabled={cancelScheduleResult.isLoading}
                        >
                            Cancel Schedule
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
