import {
    Button,
    GlobalModal,
    RadioGroup,
    ShowErrorNotifications,
    Switch,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Rto } from '@types'
import { FormProvider, useForm } from 'react-hook-form'
import { TbReportSearch } from 'react-icons/tb'
import { ReportingType } from '../enum'

export const AllowPermissionsModal = ({
    rto,
    onCancel,
}: {
    rto: Rto
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [allowPermissions, allowPermissionsResult] =
        AdminApi.Rtos.allowPermissions()

    const methods = useForm<{
        allowAutoReport: boolean
        reportType: ReportingType
    }>({
        defaultValues: {
            allowAutoReport: rto?.allowAutoReport,
            reportType: rto?.reportType,
        },
        mode: 'all',
    })

    const onConfirmClicked = async (values: {
        allowAutoReport: boolean
        reportType: ReportingType
    }) => {
        await allowPermissions({
            ...values,
            reportType: values?.allowAutoReport
                ? values?.reportType
                : ReportingType.WEEKLY,
            id: rto?.id,
        }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Auto Complete Accessed Changed',
                    description: 'Auto Complete Accessed Changed',
                })
                onCancel()
            }
        })
    }

    const permissionsOptions = Object.entries(ReportingType).map(
        ([label, value]) => ({
            label,
            value,
        })
    )

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
                                <TbReportSearch size={48} />
                            </div>

                            <div className="flex flex-col items-center gap-y-2">
                                <p className="text-lg font-semibold">
                                    {rto?.user?.name}
                                </p>
                            </div>
                            <div className="flex gap-x-2">
                                <div className="">
                                    <Typography variant="label">
                                        Allow Auto Reporting
                                    </Typography>
                                </div>

                                <div>
                                    <div className="pt-1.5">
                                        <Switch
                                            name="allowAutoReport"
                                            customStyleClass="profileSwitch"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <RadioGroup
                                    name="reportType"
                                    options={permissionsOptions}
                                    disabled={
                                        !methods?.watch()?.allowAutoReport
                                    }
                                />
                            </div>

                            <div className="flex gap-x-4 items-center">
                                <Button
                                    text="Cancel"
                                    variant="secondary"
                                    onClick={() => {
                                        onCancel && onCancel()
                                    }}
                                />
                                <Button
                                    text={'Confirm'}
                                    variant={'success'}
                                    submit
                                    loading={allowPermissionsResult.isLoading}
                                    disabled={allowPermissionsResult.isLoading}
                                />
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </GlobalModal>
        </>
    )
}
