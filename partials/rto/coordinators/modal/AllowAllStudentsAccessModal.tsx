import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    Switch,
    Typography,
} from '@components'
import { RtoApi } from '@queries'
import { useNotification } from '@hooks'
import { FaHourglassHalf } from 'react-icons/fa'
import { FormProvider, useForm } from 'react-hook-form'

export const AllowAllStudentsAccessModal = ({
    coordinator,
    onCancel,
}: {
    coordinator: any
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [allowPermissions, allowPermissionsResult] =
        RtoApi.Coordinator.useHasAccessAllStudents()

    const methods = useForm<{
        hasAllStudentAccess: boolean
    }>({
        defaultValues: {
            hasAllStudentAccess: coordinator?.hasAllStudentAccess,
        },
        mode: 'all',
    })

    const onConfirmClicked = async () => {
        const res: any = await allowPermissions(coordinator?.id)

        if (res?.data) {
            notification.success({
                title: 'Has Allow Access All Students',
                description: 'Has Allow Access All Students',
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={allowPermissionsResult} />
            <GlobalModal>
                <FormProvider {...methods}>
                    <form
                        className="mt-2 w-full"
                        onSubmit={methods.handleSubmit(onConfirmClicked)}
                    >
                        <div className="flex flex-col items-center gap-y-4 py-4">
                            <div className={`text-green-500`}>
                                <FaHourglassHalf size={48} />
                            </div>

                            <div className="flex flex-col items-center gap-y-2">
                                <p className="text-lg font-semibold">
                                    {coordinator?.user?.name}
                                </p>
                            </div>
                            <div className="flex gap-x-2">
                                <div className="">
                                    <Typography variant="label">
                                        Allow Access to All Students
                                    </Typography>
                                </div>

                                <div>
                                    <div className="pt-1.5">
                                        <Switch
                                            name="hasAllStudentAccess"
                                            customStyleClass="profileSwitch"
                                            onChange={() => {
                                                onConfirmClicked()
                                            }}
                                            isChecked={
                                                coordinator?.hasAllStudentAccess
                                            }
                                            loading={
                                                allowPermissionsResult?.isLoading
                                            }
                                            disabled={
                                                allowPermissionsResult?.isLoading
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                text="close"
                                variant="error"
                                onClick={() => {
                                    onCancel && onCancel()
                                }}
                            />
                        </div>
                    </form>
                </FormProvider>
            </GlobalModal>
        </>
    )
}
