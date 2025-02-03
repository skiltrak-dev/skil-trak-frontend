import React, { useEffect } from 'react'
import { SubAdminApi } from '@queries'

import {
    Button,
    draftToHtmlText,
    InputContentEditor,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useNotification } from '@hooks'
import { useRouter } from 'next/router'

export const AddRtoListingNoteModal = ({ onCloseModal }: any) => {
    const router = useRouter()
    const id = router.query.id
    const { notification } = useNotification()
    // useAddIndustryListingDetailsNote
    const [addNote, addNoteResult] =
        SubAdminApi.Rto.useAddRtoListingDetailsNote()

    useEffect(() => {
        if (addNoteResult.isSuccess) {
            notification.success({
                title: 'Note Added',
                description: 'Note Added Successfully',
            })
            onCloseModal?.()
        }
    }, [addNoteResult.isSuccess])

    const validationSchema = yup.object({
        requirements: yup.string().required('Required'),
    })

    const methods = useForm({
        mode: 'all',
        // defaultValues: {
        //     requirements: getInitialEditorState(),
        // },
    })
    const onSubmit = async (values: any) => {
        const comment = draftToHtmlText(values?.comment)
        if (comment === '<p></p>\n' || comment.trim() === '<p></p>') {
            methods.setError('note', {
                type: 'note',
                message: 'Must add note',
            })
            return
        }

        const body = { comment }
        addNote({ id, body })

        // Use the same submit method for both add and update
    }
    return (
        <div>
            <ShowErrorNotifications result={addNoteResult} />
            <Typography variant="title">Add note</Typography>
            <FormProvider {...methods}>
                <form
                    className="mt-6 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <InputContentEditor label="Note" name="comment" />
                    <Button
                        submit
                        disabled={addNoteResult.isLoading}
                        loading={addNoteResult.isLoading}
                        text={'Add Note'}
                    />
                </form>
            </FormProvider>
        </div>
    )
}
