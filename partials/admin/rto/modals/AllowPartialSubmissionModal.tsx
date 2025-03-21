import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    Switch,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Rto } from '@types'
import { FormProvider, useForm } from 'react-hook-form'
import { FaHourglassHalf } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

export const AllowPartialSubmissionModal = ({
    rto,
    onCancel,
}: {
    rto: Rto
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [allowPermissions, allowPermissionsResult] =
        AdminApi.Rtos.allowPartialSubmission()

    const methods = useForm<{
        allowPartialSubmission: boolean
    }>({
        defaultValues: {
            allowPartialSubmission: rto?.allowPartialSubmission,
        },
        mode: 'all',
    })

    const onConfirmClicked = async (values: any) => {
        await allowPermissions({
            allowPartialSubmission: values,
            id: rto?.id,
        }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Partial Submission Accessed Changed',
                    description: 'Partial Submission Accessed Changed',
                })
                onCancel()
            }
        })
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
                        {/* <div
                            onClick={() => {
                                onCancel && onCancel()
                            }}
                            className={`text-red-500 cursor-pointer flex justify-end px-5 py-2`}
                        >
                            <IoClose size={25} />
                        </div> */}
                        <div className="flex flex-col items-center gap-y-4 py-4">
                            <div className={`text-green-500`}>
                                <FaHourglassHalf size={48} />
                            </div>

                            <div className="flex flex-col items-center gap-y-2">
                                <p className="text-lg font-semibold">
                                    {rto?.user?.name}
                                </p>
                            </div>
                            <div className="flex gap-x-2">
                                <div className="">
                                    <Typography variant="label">
                                        Allow Partial Submission
                                    </Typography>
                                </div>

                                <div>
                                    <div className="pt-1.5">
                                        <Switch
                                            name="allowPartialSubmission"
                                            customStyleClass="profileSwitch"
                                            onChange={(e: any) => {
                                                onConfirmClicked(
                                                    e?.target?.checked
                                                )
                                            }}
                                            isChecked={
                                                rto?.allowPartialSubmission
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* <div>
                                <RadioGroup
                                    name="reportType"
                                    options={permissionsOptions}
                                    disabled={
                                        !methods?.watch()?.allowAutoReport
                                    }
                                />
                            </div> */}

                            <Button
                                text="close"
                                variant="error"
                                onClick={() => {
                                    onCancel && onCancel()
                                }}
                            />
                            {/* <div className="flex gap-x-4 items-center">
                                <Button
                                    text={'Confirm'}
                                    variant={'success'}
                                    submit
                                    loading={allowPermissionsResult.isLoading}
                                    disabled={allowPermissionsResult.isLoading}
                                />
                            </div> */}
                        </div>
                    </form>
                </FormProvider>
            </GlobalModal>
        </>
    )
}
