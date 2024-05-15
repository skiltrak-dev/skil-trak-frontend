import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    TextInput,
    Typography,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { SubAdminApi, RtoApi } from '@queries'
import { ReactElement, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { MdCancel } from 'react-icons/md'
import * as Yup from 'yup'

export const ImportRtoListVerificationModal = ({
    onCancel,
    rtos,
    onSetImportListResult,
}: {
    rtos: any
    onCancel: () => void
    onSetImportListResult: any
}) => {
    const [compareCode, compareCodeResult] = RtoApi.Students.useCompareCode()
    const [importList, importListResult] =
        SubAdminApi.SubAdmin.useImportRtosList()

    const { notification } = useNotification()

    const validationSchema = Yup.object({
        otp: Yup.string().required('Code is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onImportIndustriesList = () => {
        importList({
            rtos: rtos?.map((rto: any) => ({
                // ...rto,
                email: rto?.email ? rto?.email?.replace(/\r\n\r\n/g, '') : '',
                businessName: rto?.businessName,
                phone: rto?.phone,
                address: rto?.address,
                country: rto?.country,
                states: rto?.states,
                sector: rto?.sector
                    ? String(rto?.sector)
                          ?.split(',')
                          ?.map((s: any) => Number(s))
                    : null,
            })),
        }).then((res: any) => {
            if (res?.data) {
                onSetImportListResult(res?.data)
                onCancel()
                notification.success({
                    title: 'Success',
                    description: 'RTOs imported successfully',
                })
            }
        })
    }

    const onSubmit = async (otp: any) => {
        compareCode(otp).then((res: any) => {
            if (res?.data) {
                onImportIndustriesList()
            } else {
                notification.error({
                    title: 'Otp is Invalid!',
                    description: 'Otp is expired or invalid',
                })
            }
        })
    }
    return (
        <GlobalModal>
            <ShowErrorNotifications result={compareCodeResult} />
            <ShowErrorNotifications result={importListResult} />
            <div className="relative max-w-[500px] py-8 px-3">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all absolute top-2 right-2 duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                />
                <div className="flex flex-col gap-y-6 w-3/4 mx-auto">
                    <Typography variant="title" center>
                        Code sent to your email
                    </Typography>
                    <Typography variant="label">
                        <span className="block text-center">
                            Please enter the provided code snippet into the form
                            below. Check your email for the details. Thank you.
                        </span>
                    </Typography>
                </div>

                {/*  */}
                <div className="mt-7 w-3/4 mx-auto flex flex-col">
                    <FormProvider {...methods}>
                        <form
                            className="mt-2 w-full"
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <TextInput name="otp" placeholder="Enter code..." />
                            <Button
                                submit
                                fullWidth
                                text={'Submit'}
                                loading={
                                    compareCodeResult.isLoading ||
                                    importListResult.isLoading
                                }
                                disabled={
                                    compareCodeResult.isLoading ||
                                    importListResult.isLoading
                                }
                            />
                        </form>
                    </FormProvider>
                </div>
            </div>
        </GlobalModal>
    )
}
