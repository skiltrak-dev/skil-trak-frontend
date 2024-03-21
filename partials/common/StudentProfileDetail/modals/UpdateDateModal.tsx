import * as Yup from 'yup'
import { SubAdminApi } from '@queries'
import { MdCancel } from 'react-icons/md'
import { Button, GlobalModal, ShowErrorNotifications } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { ShowCourseError } from '../components/AssessmentsSubmission/components'
import { useNotification } from '@hooks'
export const UpdateDateModal = ({
    profile,
    onCancelClick,
}: {
    profile: any
    onCancelClick: () => void
}) => {
    const [updateDate, updateDateResult] =
        SubAdminApi.Student.useUpdateStudentDate()

    const { notification } = useNotification()

    const validationSchema = Yup.object({
        startTime: Yup.string().required('Start Time is required!'),
        endTime: Yup.string().required('End Time is required!'),
    })

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = () => {
        updateDate(profile?.id).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Date Updated',
                    description: 'Date Updated Successfully',
                })
                onCancelClick()
            }
        })
    }
    return (
        <GlobalModal>
            <ShowErrorNotifications result={updateDateResult} />
            <div className="relative max-h-[70vh] max-w-[60vw] min-w-[50vw] overflow-y-auto overflow-hidden custom-scrollbar w-full">
                <MdCancel
                    onClick={onCancelClick}
                    className="absolute top-2 right-2 transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                />

                <div className="grid grid-cols-3 rounded-xl overflow-hidden">
                    <div className="bg-gray-600 flex justify-center items-center py-10">
                        Saad
                    </div>
                    <div className="col-span-2 flex justify-center items-center py-20">
                        <div className="pb-1">
                            <FormProvider {...methods}>
                                <form
                                    className="mt-2 w-full"
                                    onSubmit={methods.handleSubmit(onSubmit)}
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
                                                        'startTime'
                                                    )}
                                                    className="py-2 rounded-sm border border-gray-400 text-xs px-1.5 w-full"
                                                    type="date"
                                                />
                                                <ShowCourseError name="startTime" />
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
                                                        'endTime'
                                                    )}
                                                    className="py-2 rounded-sm border border-gray-400 text-xs px-1.5 w-full"
                                                    type="date"
                                                />
                                                <ShowCourseError
                                                    name={'endTime'}
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
        </GlobalModal>
    )
}

// export const AddCourseDateForm = ({
//     timing,
//     result,
//     onSubmit,
//     onCancel,
//     active,
// }: {
//     timing?: any
//     result?: any
//     active: boolean
//     onCancel: () => void
//     onSubmit: (values: any) => void
// }) => {

//     return (

//     )
// }
