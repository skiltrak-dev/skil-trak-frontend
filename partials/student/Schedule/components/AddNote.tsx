import { Button, Checkbox, ShowErrorNotifications, TextArea } from '@components'
import { useNotification } from '@hooks'
import { StudentApi } from '@queries'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export const AddNote = ({
    schedule,
    onCancel,
}: {
    schedule: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [addNote, addNoteResult] = StudentApi.Schedule.useAddScheduleNote()
    const methods = useForm({
        mode: 'all',
    })

    useEffect(() => {
        if (schedule?.note) {
            methods.setValue('comment', schedule?.note?.comment)
        }
    }, [schedule])

    useEffect(() => {
        if (addNoteResult.isSuccess) {
            notification.success({
                title: 'Note Added',
                description: 'Note added successfully',
            })
            onCancel()
        }
    }, [addNoteResult])

    const onSubmit = (values: any) => {
        addNote({
            id: schedule?.id,
            comment: values?.comment,
        })
    }
    return (
        <div>
            <ShowErrorNotifications result={addNoteResult} />
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        <TextArea
                            label={'Note'}
                            name={'comment'}
                            placeholder={'Your Note Here...'}
                            validationIcons
                            required
                            rows={7}
                        />

                        <Checkbox
                            name={'remember'}
                            label={'Send Nofication Email'}
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <Button
                            submit
                            loading={addNoteResult.isLoading}
                            disabled={addNoteResult.isLoading}
                        >
                            Add Note
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
