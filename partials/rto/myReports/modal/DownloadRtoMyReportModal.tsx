import { GlobalModal, TextInput } from '@components'

import { Button } from '@components/buttons'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthUtils } from '@utils'
import { FormProvider, useForm } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'
import * as Yup from 'yup'

export const DownloadRtoMyReportModal = ({
    onClose,
    user,
}: {
    onClose: () => void
    user?: number
}) => {
    const token = AuthUtils.token()

    const validationSchema = Yup.object({
        startDate: Yup.string().required('Start Date is required'),
        endDate: Yup.string().required('End Date is required'),
    })

    const methods = useForm<{ startDate: string; endDate: string }>({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: { startDate: string; endDate: string }) => {
        window.open(
            `${process.env.NEXT_PUBLIC_END_POINT}/statistics/rto/data?token=${token}&startDate=${values?.startDate}&endDate=${values?.endDate}`
        )
    }

    return (
        <>
            <GlobalModal className="p-5">
                <FormProvider {...methods}>
                    <form
                        className="mt-2 w-full"
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <>
                            <div className="flex justify-end w-full">
                                <FaTimes
                                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                                    onClick={() => {
                                        onClose && onClose()
                                    }}
                                />
                            </div>
                            <div className="flex flex-col items-start mr-auto">
                                <div className="flex gap-x-2">
                                    <div>
                                        <TextInput
                                            placeholder="YYYY-MM-DD"
                                            name="startDate"
                                            label={'Start Date'}
                                            type="date"
                                        />
                                    </div>
                                    <div>
                                        <TextInput
                                            placeholder="YYYY-MM-DD"
                                            name="endDate"
                                            label={'End Date'}
                                            type="date"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <Button
                                    text="Download as CSV"
                                    variant="info"
                                    submit
                                />
                            </div>
                        </>
                    </form>
                </FormProvider>
            </GlobalModal>
        </>
    )
}
