import { Button, ShowErrorNotifications, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { CourseProgramType } from '@types'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface CourseFolderFormProps {
    onSubmit: (values: any) => void
}

export const UpdateProgramForm = ({
    selectedItem,
    handleCancel,
}: {
    handleCancel: () => void
    selectedItem: CourseProgramType
}) => {
    const [update, updateResult] = AdminApi.Courses.updateCourseProgram()

    const { notification } = useNotification()

    const validationSchema = yup.object({
        title: yup.string().required('Title is Required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: { title: selectedItem?.title },
        mode: 'all',
    })

    const handleSave = async (values: any) => {
        const res: any = await update({
            id: selectedItem?.id,
            ...values,
        })

        if (res?.data) {
            notification.success({
                title: 'Program Updated',
                description: 'Proram Updated Successfully',
            })
            handleCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={updateResult} />
            <FormProvider {...methods}>
                <form
                    className="w-full flex items-center justify-between gap-3"
                    onSubmit={methods.handleSubmit(handleSave)}
                >
                    <TextInput
                        name={'title'}
                        placeholder={'Title...'}
                        required
                        showError={false}
                    />
                    <div className="flex items-center gap-2">
                        <Button
                            submit
                            variant="info"
                            loading={updateResult?.isLoading}
                            disabled={updateResult?.isLoading}
                            className="!py-1 text-xs font-medium  !rounded-sm transition-colors"
                        >
                            Update
                        </Button>
                        <Button
                            onClick={handleCancel}
                            variant="action"
                            className="!py-1 text-xs font-medium !rounded-sm transition-colors"
                        >
                            Cancel
                        </Button>
                    </div>
                    {/* <Button
                    submit
                    loading={methods?.formState?.isSubmitting}
                    disabled={methods?.formState?.isSubmitting}
                >
                    Add
                </Button> */}
                </form>
            </FormProvider>
        </>
    )
}
