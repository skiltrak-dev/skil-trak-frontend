import {
    Button,
    Checkbox,
    GlobalModal,
    RadioGroup,
    ShowErrorNotifications,
    Switch,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { InvoiceTypeEnum } from '@partials/admin/invoices'
import { AdminApi } from '@queries'
import { OptionType, Rto } from '@types'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TbReportSearch } from 'react-icons/tb'

export const AllowInvoicingModal = ({
    rto,
    onCancel,
}: {
    rto: Rto
    onCancel: () => void
}) => {
    const [invoiceSettingData, setInvoiceSettingData] = useState<number[]>(
        rto?.invoiceSettings?.map((invSetting) => invSetting?.invoiceAction?.id)
    )

    // useEffect(() => {
    //     setInvoiceSettingData(
    //         rto?.invoiceSettings?.map(
    //             (invSetting) => invSetting?.invoiceAction?.id
    //         )
    //     )
    // }, [])

    const { notification } = useNotification()

    const [allowPermissions, allowPermissionsResult] =
        AdminApi.Rtos.allowInvoicingPermission()
    const [invoiceSetting, invoiceSettingResult] =
        AdminApi.Invoice.addRtoInvoiceSetting()
    const categoriesList = AdminApi.Invoice.invoiceCategorisList()

    const methods = useForm<{
        allowInvoicing: boolean
        invoicingType: InvoiceTypeEnum
        invoiceAction: number[]
    }>({
        defaultValues: {
            allowInvoicing: rto?.allowInvoicing,
            invoicingType: rto?.invoiceSettings?.[0]?.type,
            invoiceAction: rto?.invoiceSettings?.map(
                (invSetting) => invSetting?.invoiceAction?.id
            ),
        },
        mode: 'all',
    })

    const onChangeIvoicingStatus = async () => {
        await allowPermissions(rto?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Auto Complete Accessed Changed',
                    description: 'Auto Complete Accessed Changed',
                })
                // onCancel()
            }
        })
    }

    const permissionsOptions = Object.entries(InvoiceTypeEnum).map(
        ([label, value]) => ({
            label,
            value,
        })
    )
    const categoriesOptions = categoriesList?.data?.map((cate: any) => ({
        label: cate?.name,
        value: cate?.id,
    }))

    const onSubmit = async (values: any) => {
        const res: any = await invoiceSetting({
            id: rto?.id,
            invoiceAction: values?.invoiceAction?.map(Number),
            type: values?.invoicingType,
        })
        if (res?.data) {
            notification.success({
                title: 'Invoice Type Added',
                description: 'Invoice Type Added Successfully',
            })
            onCancel()
        }
    }

    return (
        <>
            <ShowErrorNotifications result={allowPermissionsResult} />
            <ShowErrorNotifications result={invoiceSettingResult} />
            <GlobalModal>
                <FormProvider {...methods}>
                    <form
                        className="mt-2 w-full p-4"
                        onSubmit={methods.handleSubmit(onSubmit)}
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
                                        Allow Invoicing
                                    </Typography>
                                </div>

                                <div>
                                    <div className="pt-1.5">
                                        <Switch
                                            name="allowInvoicing"
                                            customStyleClass="profileSwitch"
                                            onChange={() => {
                                                onChangeIvoicingStatus()
                                            }}
                                            loading={
                                                allowPermissionsResult?.isLoading
                                            }
                                            disabled={
                                                allowPermissionsResult?.isLoading
                                            }
                                            // defaultChecked={rto?.allowInvoicing}
                                            // value={rto?.allowInvoicing}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <RadioGroup
                                    name="invoicingType"
                                    options={permissionsOptions}
                                    disabled={!methods?.watch()?.allowInvoicing}
                                />
                            </div>

                            {categoriesOptions &&
                                categoriesOptions?.length > 0 && (
                                    <>
                                        <Typography>Select Category</Typography>
                                        <div className="grid grid-cols-3 gap-x-2 flex-wrap">
                                            {categoriesOptions?.map(
                                                (cate: OptionType) => (
                                                    <Checkbox
                                                        name={'invoiceAction'}
                                                        label={cate?.label}
                                                        value={Number(
                                                            cate?.value
                                                        )}
                                                        disabled={
                                                            !methods?.watch()
                                                                ?.invoicingType ||
                                                            !methods?.watch()
                                                                ?.allowInvoicing
                                                        }
                                                        defaultChecked={invoiceSettingData?.includes(
                                                            Number(cate?.value)
                                                        )}
                                                        onChange={(e: any) => {
                                                            setInvoiceSettingData(
                                                                invoiceSettingData?.includes(
                                                                    Number(
                                                                        e
                                                                            ?.target
                                                                            ?.value
                                                                    )
                                                                )
                                                                    ? [
                                                                          ...invoiceSettingData?.filter(
                                                                              (
                                                                                  invSetting
                                                                              ) =>
                                                                                  invSetting !==
                                                                                  Number(
                                                                                      e
                                                                                          ?.target
                                                                                          ?.value
                                                                                  )
                                                                          ),
                                                                      ]
                                                                    : [
                                                                          ...invoiceSettingData,
                                                                          Number(
                                                                              e
                                                                                  ?.target
                                                                                  ?.value
                                                                          ),
                                                                      ]
                                                            )
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </>
                                )}

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
                                    loading={invoiceSettingResult.isLoading}
                                    disabled={invoiceSettingResult.isLoading}
                                />
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </GlobalModal>
        </>
    )
}
