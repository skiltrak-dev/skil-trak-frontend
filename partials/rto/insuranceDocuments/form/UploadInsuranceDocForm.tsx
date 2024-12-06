import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Button, TextInput, UploadFile } from '@components'
import { FileUpload } from '@hoc'
import { getDate } from '@utils'

export const UploadInsuranceDocForm = ({
    result,
    onSubmit,
}: {
    result: any
    onSubmit: (values: any) => void
}) => {
    const validationSchema = Yup.object({
        confirmedBy: Yup.string().required('Confirmed By is required!'),
        expiryDate: Yup.string().required('Expiry Date is required!'),
        file: Yup.mixed()
            .required('A file is required')
            .test(
                'fileValue',
                'A file is required',
                (value) => [...value]?.length > 0
            )
            .test(
                'fileSize',
                'File size is too large. Maximum size is 10MB',
                (value) =>
                    value &&
                    value?.length > 0 &&
                    value?.[0]?.size <= 10 * 1024 * 1024 // 10MB
            )
            .test(
                'fileType',
                'Unsupported file format. Only PDF are allowed.',
                (value) =>
                    value && ['application/pdf'].includes(value?.[0]?.type)
            ),
    })

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    return (
        <div>
            {' '}
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <TextInput
                        label={'Confirm By'}
                        name="confirmedBy"
                        placeholder="Add Confirm By here..."
                    />
                    <TextInput
                        name="expiryDate"
                        label={'Expiry Date'}
                        type="date"
                        placeholder="Add Expiry Date here..."
                        // min={getDate()}
                    />
                    <FileUpload
                        name={'file'}
                        component={UploadFile}
                        limit={Number(1111111111)}
                    />
                    <div className="flex justify-end mt-3">
                        <Button
                            submit
                            text="Upload"
                            loading={result?.isLoading}
                            disabled={result?.isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
