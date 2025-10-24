import {
    GlobalModal,
    ShowErrorNotifications,
    TextArea,
    Typography,
} from '@components'
import { Button } from '@components/buttons/Button/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import classNames from 'classnames'
import { XCircle } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { MdCancel } from 'react-icons/md'
import * as Yup from 'yup'

interface CloseEnquiryModalProps {
    enquiryId: number
    onClose: () => void
}

export const CloseEnquiryModal = ({
    onClose,
    enquiryId,
}: CloseEnquiryModalProps) => {
    const { notification } = useNotification()

    const [closeEnquiry, closeEnquiryResult] =
        AdminApi.RtoEnquiry.closeEnquiry()

    const bgClasses = classNames({
        'relative px-6 pt-6 pb-4 bg-[#8c8c8c] overflow-hidden': true,
    })

    const validationSchema = Yup.object({
        closeNote: Yup.string().required('Note is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = async (values: any) => {
        const res: any = await closeEnquiry({ id: enquiryId, ...values })

        if (res?.data) {
            notification.success({
                title: 'Enquiry Closed',
                description: 'Enquiry Closed Successfully',
            })
            onClose()
        }
    }

    return (
        <GlobalModal className="!overflow-hidden">
            <ShowErrorNotifications result={closeEnquiryResult} />
            <MdCancel
                onClick={onClose}
                className="z-30 transition-all  duration-500 text-gray-100 hover:text-gray-50 text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
            />

            <div className={bgClasses}>
                <div className="relative">
                    <div className="flex items-start gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-premium border border-white/30 shrink-0">
                            <XCircle
                                className="h-7 w-7 text-white"
                                strokeWidth={2.5}
                            />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                            <Typography className="text-white text-xl">
                                Close Enquiry
                            </Typography>
                            <Typography className="text-white/90 text-sm leading-relaxed">
                                Add any final notes or reasons for closing this
                                enquiry. This action will mark the enquiry as
                                closed.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="overflow-auto custom-scrollbar p-4">
                    <div className="space-y-4">
                        {/* Closure Notes */}
                        <FormProvider {...methods}>
                            <form>
                                <TextArea
                                    name="closeNote"
                                    label={'Closure Notes'}
                                    placeholder="Enter any notes about why this enquiry is being closed..."
                                    rows={6}
                                />
                            </form>
                        </FormProvider>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                            <Button
                                variant="secondary"
                                text="Cancel"
                                fullWidth
                                onClick={onClose}
                            />
                            <Button
                                text="Close Enquiry"
                                fullWidth
                                className="!bg-[#8c8c8c]"
                                onClick={methods.handleSubmit(onSubmit)}
                                loading={closeEnquiryResult?.isLoading}
                                disabled={closeEnquiryResult?.isLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
