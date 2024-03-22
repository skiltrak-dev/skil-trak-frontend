import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    TextInput,
    Typography,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { RtoApi } from '@queries'
import { trimText } from '@utils'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { MdCancel } from 'react-icons/md'
import * as Yup from 'yup'

export const ImportStudentVerificationModal = ({
    values,
    result,
    onCancel,
    foundStudents,
    existingEmails,
    onImportStudentsList,
    setImportedStudentsResult,
}: {
    result: any
    values: any
    foundStudents: any
    existingEmails: any
    onCancel: () => void
    onImportStudentsList: any
    setImportedStudentsResult: any
}) => {
    const [compareCode, compareCodeResult] = RtoApi.Students.useCompareCode()

    const { notification } = useNotification()

    const validationSchema = Yup.object({
        otp: Yup.string().required('Code is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onImportStudents = () => {
        let list = foundStudents.filter((fs: any) => !!fs.email)

        if (existingEmails.length) {
            existingEmails.forEach((item: any) => {
                if (list.findIndex((o: any) => o.email === item.email) !== -1) {
                    list = list.filter((o: any) => o.email !== item.email)
                }
            })
        }

        if (list.length === 0) {
            notification.error({
                title: 'No Student Found',
                description: 'List is invalid or empty',
            })
        } else {
            onImportStudentsList({
                ...values,
                list: list?.map((o: any) => ({
                    ...o,
                    email: trimText(o?.email),
                })),
            }).then((res: any) => {
                console.log({ res })
                if (res?.data) {
                    setImportedStudentsResult(res?.data)
                    onCancel()
                }
            })
        }
    }

    const onSubmit = async (otp: any) => {
        compareCode(otp).then((res: any) => {
            if (res?.data) {
                onImportStudents()
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
                                    result?.isLoading
                                }
                                disabled={
                                    compareCodeResult.isLoading ||
                                    result?.isLoading
                                }
                            />
                        </form>
                    </FormProvider>
                </div>
            </div>
        </GlobalModal>
    )
}
