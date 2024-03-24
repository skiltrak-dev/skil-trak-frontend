import { Button, Modal, ShowErrorNotifications, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { ShowCourseError } from '../components/AssessmentsSubmission/components'
import { useState } from 'react'
export const UpdateDateModal = ({
    profile,
    onCancelClick,
}: {
    profile: any
    onCancelClick: () => void
}) => {
    const password = '12345678'
    const [enteredPassword, setEnteredPassword] = useState<boolean>(false)
    const [updateDate, updateDateResult] =
        SubAdminApi.Student.useUpdateStudentDate()

    const { notification } = useNotification()

    // const validationSchema = Yup.object({
    //     startDate: Yup.date()
    //         .typeError('Start Date is required')
    //         .required('Start Time is required!'),
    //     endDate: Yup.date()
    //         .typeError('End Time is required!')
    //         .required('End Time is required!'),
    // })
    const validationSchema = Yup.object().shape({
        startDate: Yup.date().when('enteredPassword', {
            is: enteredPassword,
            then: Yup.date()
                .typeError('Start Date must be a valid date')
                .required('Start Date is required'),
            otherwise: Yup.date().nullable(),
        }),
        endDate: Yup.date().when('enteredPassword', {
            is: enteredPassword,
            then: Yup.date()
                .typeError('End Date must be a valid date')
                .required('End Date is required'),
            otherwise: Yup.date().nullable(),
        }),
    })

    const methods = useForm<{ startDate: Date; endDate: Date }>({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (values: { startDate: Date; endDate: Date }) => {
        updateDate({ id: profile?.id, range: values }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Date Updated',
                    description: 'Date Updated Successfully',
                })
                onCancelClick()
            }
        })
    }

    const onEnterPassword = (values: any) => {
        if (values?.password === password) {
            setEnteredPassword(true)
        } else {
            notification.error({
                title: 'Some thing is not right',
                description: 'Internal Server Error',
            })
        }
    }
    return (
        <Modal
            title={enteredPassword ? 'Update Date' : 'Update'}
            subtitle={
                enteredPassword
                    ? `Update Date for ${profile?.user?.name} `
                    : 'Update'
            }
            onCancelClick={onCancelClick}
            showActions={false}
        >
            {!enteredPassword ? (
                <FormProvider {...methods}>
                    <form
                        className="mt-2 w-full"
                        onSubmit={methods.handleSubmit(onEnterPassword)}
                    >
                        <TextInput name={'password'} validationIcons required />
                    </form>
                </FormProvider>
            ) : (
                <>
                    <ShowErrorNotifications result={updateDateResult} />
                    <div className="relative max-h-[70vh] max-w-[60vw]  overflow-y-auto overflow-hidden custom-scrollbar w-full">
                        <div className=" rounded-xl overflow-hidden">
                            <div className="flex justify-center items-center py-5">
                                <div className="pb-1">
                                    <FormProvider {...methods}>
                                        <form
                                            className="mt-2 w-full"
                                            onSubmit={methods.handleSubmit(
                                                onSubmit
                                            )}
                                        >
                                            <div className="flex flex-col justify-center items-center gap-2.5">
                                                <div className="flex flex-col w-64 gap-x-1 items-">
                                                    <label
                                                        className={`text-xs text-[#979797 whitespace-pre`}
                                                    >
                                                        Start Date
                                                    </label>
                                                    <div className="col-span-2 w-full">
                                                        <input
                                                            {...methods.register(
                                                                'startDate'
                                                            )}
                                                            className="py-2 rounded-sm border border-gray-400 text-xs px-1.5 w-full"
                                                            type="date"
                                                        />
                                                        <ShowCourseError name="startDate" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-x-1 items- w-64">
                                                    <label
                                                        className={`text-xs text-[#979797]`}
                                                    >
                                                        End Date
                                                    </label>
                                                    <div className="col-span-2">
                                                        <input
                                                            {...methods.register(
                                                                'endDate'
                                                            )}
                                                            className="py-2 rounded-sm border border-gray-400 text-xs px-1.5 w-full"
                                                            type="date"
                                                        />
                                                        <ShowCourseError
                                                            name={'endDate'}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end gap-x-1 w-1/2 mx-auto mt-2">
                                                    <Button
                                                        submit
                                                        fullWidth
                                                        text={'Update'}
                                                        variant="success"
                                                        loading={
                                                            updateDateResult.isLoading
                                                        }
                                                        disabled={
                                                            updateDateResult.isLoading
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </FormProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Modal>
    )
}
