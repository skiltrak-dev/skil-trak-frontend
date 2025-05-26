import { SubAdminApi } from '@queries'
import { MdCancel } from 'react-icons/md'
import * as Yup from 'yup'

import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    Typography,
    UploadFile,
} from '@components'
import { useNotification } from '@hooks'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FileUpload } from '@hoc'

export const UploadCourseFileModal = ({
    onCancel,
    approval,
}: {
    approval: any
    onCancel: (val?: boolean) => void
}) => {
    const [uploadFile, uploadFileResult] =
        SubAdminApi.Industry.uploadCourseDocForIndustry()

    const { notification } = useNotification()

    const validationSchema = Yup.object({
        file: Yup.mixed()
            .required('A file is required')
            .test(
                'fileValue',
                'A file is required',
                (value) => [...value]?.length > 0
            )
            .test(
                'fileSize',
                'File size is too large. Maximum size is 5MB',
                (value) =>
                    value &&
                    value?.length > 0 &&
                    value?.[0]?.size <= 10 * 1024 * 1024 // 10MB
            )
            .test(
                'fileType',
                'Unsupported file format. PDF,JPG,Png formats are allowed.',
                (value) =>
                    value &&
                    [
                        'image/jpg',
                        'image/png',
                        'image/jpeg',
                        'application/pdf',
                    ].includes(value?.[0]?.type)
            ),
    })

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = async (values: any) => {
        const formData = new FormData()

        console.log({ approval })

        formData.append('file', values?.file?.[0])

        const res: any = await uploadFile({ id: approval?.id, body: formData })

        if (res?.data) {
            notification.success({
                title: 'File Uploaded',
                description: 'File Uploaded Successfully',
            })
            onCancel()
        }
    }
    return (
        <>
            <ShowErrorNotifications result={uploadFileResult} />
            <GlobalModal>
                <div className="max-w-2xl p-5 relative flex flex-col gap-y-2 py-5">
                    {onCancel ? (
                        <MdCancel
                            onClick={() => {
                                if (onCancel) {
                                    onCancel()
                                }
                            }}
                            className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                        />
                    ) : null}
                    <div className="flex flex-col gap-y-2 justify-between items-center">
                        <div className="mx-auto">
                            <Typography center semibold>
                                Upload Course File
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <FormProvider {...methods}>
                            <form
                                className="mt-2 w-full"
                                onSubmit={methods.handleSubmit(onSubmit)}
                            >
                                <FileUpload
                                    name={'file'}
                                    component={UploadFile}
                                    limit={Number(1111111111)}
                                />
                                <div className="flex justify-end mt-3">
                                    <Button
                                        submit
                                        text="Upload"
                                        loading={uploadFileResult?.isLoading}
                                        disabled={uploadFileResult?.isLoading}
                                    />
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}
