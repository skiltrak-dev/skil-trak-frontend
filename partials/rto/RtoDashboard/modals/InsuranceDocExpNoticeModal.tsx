import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { UploadDocModal } from '@partials/rto/insuranceDocuments/modal'
import { useUpdateWorkplaceStatusMutation } from '@queries'
import moment from 'moment'
import Image from 'next/image'
import { ReactElement, useState } from 'react'
import { MdCancel, MdOutlineError } from 'react-icons/md'

export const InsuranceDocExpNoticeModal = ({
    onCancel,
    industryName,
    insuranceDoc,
}: {
    insuranceDoc: any
    industryName: number
    onCancel: () => void
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [updateStatus, updateStatusResult] =
        useUpdateWorkplaceStatusMutation()

    const doc = insuranceDoc?.document

    const onCancelUploadeDocModal = () => setModal(null)

    const onUploadDocument = () => {
        setModal(
            <UploadDocModal
                insuranceDocumentType={insuranceDoc?.id}
                onCancel={(e) => {
                    onCancelUploadeDocModal()
                    if (e) {
                        onCancel()
                    }
                }}
            />
        )
    }

    return (
        <>
            {modal}
            <GlobalModal>
                <ShowErrorNotifications result={updateStatusResult} />
                <div className="max-w-4xl px-5 py-6 relative flex flex-col gap-y-2 ">
                    <MdCancel
                        onClick={onCancel}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                    />
                    <div className="lg:px-32">
                        <div className="flex flex-col gap-y-3.5 justify-between items-center">
                            <Image
                                src={'/images/workplace/incomplete.png'}
                                alt=""
                                width={81}
                                height={81}
                            />
                            <div className="mx-auto">
                                <Typography variant="h4" center semibold>
                                    Insurance Document Expiration Notice
                                </Typography>
                            </div>
                        </div>
                        <div className="mt-2 flex flex-col gap-y-3.5">
                            <Typography center variant="label" block>
                                <span className="leading-4 text-center">
                                    The insurance document for the student
                                    placement expired on{' '}
                                    <span className="font-bold">
                                        {moment(doc?.expiryDate).format(
                                            'DD-MM-YYYY'
                                        )}{' '}
                                    </span>
                                    . Please upload a new valid document by{' '}
                                    <span className="font-bold">
                                        {insuranceDoc?.title}
                                    </span>{' '}
                                    to ensure continued coverage.
                                </span>
                            </Typography>
                            <Typography center variant="label" block>
                                <span className="leading-4 text-center">
                                    Click on below Upload button this will
                                    redirect you to insurance document page.
                                </span>
                            </Typography>
                        </div>

                        <div className="flex items-center justify-center gap-x-5 mt-5 mb-4">
                            <Button
                                text="Upload"
                                onClick={() => {
                                    onUploadDocument()
                                }}
                            />
                        </div>
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}
