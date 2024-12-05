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
export const AddCustomCourseRequirements = ({ onCloseModal, id }: any) => {
    const [addCustomReq, addCustomReqResult] =
        RtoApi.Courses.useAddRtoCustomCourseRequirements()
    const { notification } = useNotification()

    useEffect(() => {
        if (addCustomReqResult?.isSuccess) {
            notification.success({
                title: 'Course Requirements Added',
                description: 'Custom Course Requirements Added Successfully',
            })
            onCloseModal()
        }
    }, [addCustomReqResult.isSuccess])

    const validationSchema = yup.object({
        requirements: yup.string().required('Required'),
        description: yup.string().required('Required'),
    })

    const methods = useForm({
        // resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = async (values: any) => {
        const requirement = draftToHtmlText(values?.requirements)
        if (requirement === '<p></p>\n' || requirement.trim() === '<p></p>') {
            methods.setError('requirements', {
                type: 'requirements',
                message: 'Must add requirements',
            })
            return
        }
        const body = {
            requirement,
        }
        console.log('body', body)
        await addCustomReq({ body, id })
    }

    return (
        <>
            <ShowErrorNotifications result={addCustomReqResult} />
            <Typography variant="title">
                Add Custom Course Requirements
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
                        // disabled={!(isValid && dirty)}
                        disabled={addCustomReqResult.isLoading}
                        loading={addCustomReqResult.isLoading}
                        text="Add Custom Requirement"
                    />
                </form>
            </FormProvider>
        </>
    )
}
