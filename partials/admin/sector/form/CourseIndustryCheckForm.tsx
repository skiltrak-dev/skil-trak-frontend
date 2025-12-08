import * as yup from 'yup'
import { AdminApi } from '@queries'
import { Button, Select } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { AddFolderFormType, DefaultDocumentsType, Folder } from '@types'

interface CourseFolderFormProps {
    initialValues?: Folder
    onSubmit: (values: AddFolderFormType) => void
    edit?: boolean
    onCancel?: () => void
}

export const CourseIndustryCheckForm = ({
    edit,
    onSubmit,
    onCancel,
    initialValues,
}: CourseFolderFormProps) => {
    const defaultDocuments = AdminApi.DefaultDocuments.defaultDocuments({
        search: '',
        skip: 0,
        limit: 200,
    })

    const validationSchema = yup.object({
        defaultDocument: yup.number().required('Document template is required'),
    })

    const methods = useForm<AddFolderFormType>({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues as AddFolderFormType,
        mode: 'all',
    })

    const defaultDocumentsOptions = defaultDocuments.data?.data?.map(
        (d: DefaultDocumentsType) => ({
            label: d?.name,
            value: d?.id,
        })
    )

    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div className="">
                    <Select
                        name="defaultDocument"
                        label={'Document Template'}
                        required
                        options={defaultDocumentsOptions}
                        loading={defaultDocuments.isLoading}
                        disabled={defaultDocuments.isLoading}
                        onlyValue
                    />

                    <div className="mt-2 flex gap-x-2">
                        <Button
                            submit
                            variant={edit ? 'info' : 'primary'}
                            loading={methods.formState.isSubmitting}
                            disabled={methods.formState.isSubmitting}
                        >
                            {edit ? 'Update Folder' : 'Add Folder'}
                        </Button>
                        {onCancel && (
                            <Button
                                variant="secondary"
                                onClick={() => onCancel()}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
