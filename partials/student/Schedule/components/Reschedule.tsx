import {
    Button,
    Checkbox,
    ShowErrorNotifications,
    TextArea,
    TextInput,
    Typography,
    UploadFile,
} from '@components'
import { FileUpload } from '@hoc'
import { useNotification } from '@hooks'
import { StudentApi, useNoteAddMutation } from '@queries'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export const Reschedule = ({
    schedule,
    onCancel,
}: {
    schedule: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [reschedule, rescheduleResult] =
        StudentApi.Schedule.useRescheduleShift()
    const methods = useForm({
        mode: 'all',
    })

    useEffect(() => {
        if (schedule?.note) {
            methods.setValue('comment', schedule?.note?.comment)
        }
    }, [schedule])

    useEffect(() => {
        if (rescheduleResult.isSuccess) {
            notification.success({
                title: 'Schedule Rescheduled',
                description: 'Schedule has been rescheduled successfully',
            })
            onCancel()
        }
    }, [rescheduleResult])

    const onSubmit = (values: any) => {
        reschedule({
            id: schedule?.id,
            ...values,
            day: schedule?.day,
        })
    }
    return (
        <div className="max-h-[60vh] overflow-auto custom-scrollbar">
            <ShowErrorNotifications result={rescheduleResult} />
            <FormProvider {...methods}>
                <form
                    className="w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        <TextInput
                            name="date"
                            label={'Select Date'}
                            type={'date'}
                        />

                        <TextArea
                            label={'Note'}
                            name={'comment'}
                            placeholder={'Your Note Here...'}
                            validationIcons
                            required
                            rows={5}
                        />

                        {/* <FileUpload
                            label={'Upload your Resume'}
                            required
                            onChange={(doc: File) => {}}
                            name={'resume'}
                            component={UploadFile}
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
                            loading={rescheduleResult.isLoading}
                            disabled={rescheduleResult.isLoading}
                        >
                            Add Reschedule
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
