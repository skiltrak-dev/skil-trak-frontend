import {
    Button,
    draftToHtmlText,
    InputContentEditor,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RtoApi } from '@queries'
import * as yup from 'yup'
import { useNotification } from '@hooks'
import { convertFromHTML, ContentState, EditorState } from 'draft-js'

export const AddCustomCourseRequirements = ({
    onCloseModal,
    courseId,
    initialRequirements,
}: {
    onCloseModal?: () => void
    courseId?: any
    initialRequirements?: string
}) => {
   
    const [submitCustomReq, submitCustomReqResult] =
        RtoApi.Courses.useAddRtoCustomCourseRequirements()
    const { notification } = useNotification()

    const isEditMode = initialRequirements !== undefined

    const getInitialEditorState = () => {
        if (initialRequirements) {
            const blocksFromHTML = convertFromHTML(initialRequirements)
            const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            )
            return EditorState.createWithContent(contentState)
        }
        return EditorState.createEmpty()
    }

    useEffect(() => {
        if (submitCustomReqResult.isSuccess) {
            notification.success({
                title: isEditMode
                    ? 'Course Requirements Updated'
                    : 'Course Requirements Added',
                description: isEditMode
                    ? 'Custom Course Requirements Updated Successfully'
                    : 'Custom Course Requirements Added Successfully',
            })
            onCloseModal?.()
        }
    }, [submitCustomReqResult.isSuccess])

    const validationSchema = yup.object({
        requirements: yup.string().required('Required'),
    })

    const methods = useForm({
        mode: 'all',
        defaultValues: {
            requirements: getInitialEditorState(),
        },
    })

    const onSubmit = async (values: any) => {
        const requirements = draftToHtmlText(values?.requirements)
        if (requirements === '<p></p>\n' || requirements.trim() === '<p></p>') {
            methods.setError('requirements', {
                type: 'requirements',
                message: 'Must add requirements',
            })
            return
        }

        const body = { requirements }

        // Use the same submit method for both add and update
        await submitCustomReq({
            body,
            id: courseId,
        })
    }

    return (
        <>
            <ShowErrorNotifications result={submitCustomReqResult} />
            <Typography variant="title">
                {isEditMode ? 'Edit' : 'Add'} Custom Course Requirements
            </Typography>
            <FormProvider {...methods}>
                <form
                    className="mt-6 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <InputContentEditor
                        label="Requirement"
                        name="requirements"
                    />
                    <Button
                        submit
                        disabled={submitCustomReqResult.isLoading}
                        loading={submitCustomReqResult.isLoading}
                        text={
                            isEditMode
                                ? 'Update Requirement'
                                : 'Add Custom Requirement'
                        }
                    />
                </form>
            </FormProvider>
        </>
    )
}
