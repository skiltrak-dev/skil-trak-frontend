import { ActionButton } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { BiCheck } from 'react-icons/bi'
import { IoClose } from 'react-icons/io5'
import * as Yup from 'yup'
import { ShowCourseError } from '../components'

export const AddCourseDateForm = ({
    timing,
    result,
    onSubmit,
    onCancel,
    active,
}: {
    timing?: any
    result?: any
    active: boolean
    onCancel: () => void
    onSubmit: (values: any) => void
}) => {
    const validationSchema = Yup.object({
        startTime: Yup.string().required('Start Time is required!'),
        endTime: Yup.string().required('End Time is required!'),
    })

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            startTime: timing?.startDate?.slice(0, 10),
            endTime: timing?.endDate?.slice(0, 10),
        },
    })

    return (
        <div className="pb-1">
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="flex justify-center items-end gap-1">
                        <div className="flex flex-col gap-x-1 items-">
                            <label
                                className={`text-xs ${
                                    active ? 'text-white' : 'text-[#979797]'
                                } whitespace-pre`}
                            >
                                Start Date
                            </label>
                            <div className="col-span-2">
                                <input
                                    {...methods.register('startTime')}
                                    className="py-0.5 rounded-sm border text-xs px-1.5"
                                    type="date"
                                />
                                <ShowCourseError name="startTime" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-x-1 items-">
                            <label
                                className={`text-xs  ${
                                    active ? 'text-white' : 'text-[#979797]'
                                } `}
                            >
                                End Date
                            </label>
                            <div className="col-span-2">
                                <input
                                    {...methods.register('endTime')}
                                    className="py-0.5 rounded-sm border text-xs px-1.5"
                                    type="date"
                                />
                                <ShowCourseError name={'endTime'} />
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-x-1">
                            <ActionButton
                                Icon={BiCheck}
                                submit
                                variant={'info'}
                                loading={result.isLoading}
                                disabled={result.isLoading}
                                small
                            />
                            <ActionButton
                                Icon={IoClose}
                                onClick={() => {
                                    onCancel()
                                }}
                                variant={'error'}
                                title={'Close'}
                                small
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
