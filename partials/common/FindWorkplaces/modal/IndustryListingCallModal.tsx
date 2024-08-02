import {
    Modal,
    ShowErrorNotifications,
    TextArea,
    Typography,
} from '@components'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'

interface onSubmitType {
    note: string
}

export const IndustryListingCallModal = ({
    id,
    note,
    onCancel,
}: {
    id: number
    note: string
    onCancel: () => void
}) => {
    const [addNote, addNoteResult] =
        CommonApi.FindWorkplace.useAddFutureIndustryListingNote()

    const { notification } = useNotification()

    const validationSchema = Yup.object({
        comment: Yup.string().required('Note is required'),
    })
    const methods = useForm<onSubmitType>({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: onSubmitType) => {
        addNote({
            id: id,
            body: values,
        }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: `Note added`,
                    description: `note added successfully`,
                })
                onCancel()
            }
        })
    }
    return (
        <>
            <ShowErrorNotifications result={addNoteResult} />
            <Modal
                title={'Note'}
                subtitle={'Add Note!'}
                onCancelClick={onCancel}
                loading={addNoteResult?.isLoading}
                onConfirmClick={methods.handleSubmit(onSubmit)}
            >
                <div>
                    <FormProvider {...methods}>
                        <form className="mt-2 w-full">
                            <TextArea
                                name={'comment'}
                                placeholder={'Add Note'}
                                showError={false}
                                rows={7}
                            />
                        </form>
                    </FormProvider>
                </div>
            </Modal>
        </>
    )
}
