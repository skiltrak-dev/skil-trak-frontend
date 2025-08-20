import {
    NoData,
    Button,
    Tooltip,
    Typography,
    GlobalModal,
    LoadingAnimation,
} from '@components'
import { Folder } from '@types'
import { SubAdminApi } from '@queries'
import { MdCancel } from 'react-icons/md'
import { IoIosSend } from 'react-icons/io'
import { ReactElement, useState } from 'react'
import { IWorkplaceIndustries } from 'redux/queryTypes'
import { InitiateSigningModal } from '@partials/sub-admin/assessmentEvidence/modal'

export const GenerateEsignModal = ({
    workplace,
    courseId,
    onCancel,
}: {
    courseId: number
    onCancel: () => void
    workplace: IWorkplaceIndustries | null
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const esignDocumentsFolders = SubAdminApi.Student.esignDocumentsFolders(
        Number(workplace?.id),
        {
            skip: !workplace,
            refetchOnMountOrArgChange: true,
        }
    )

    const onCancelModal = () => setModal(null)

    const onInitiateSigning = (folder: any) => {
        setModal(
            <InitiateSigningModal
                onCancel={() => {
                    onCancelModal()
                }}
                courseId={courseId}
                folder={folder}
            />
        )
    }

    return (
        <GlobalModal>
            {modal}
            <div className="max-w-4xl rounded-lg relative flex flex-col gap-y-2 ">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-white hover:text-gray-300 text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="w-full">
                    {/* Header */}
                    <div className="bg-primaryNew-dark text-center py-4 px-6 rounded-t-lg">
                        <Typography variant="title" bold color="!text-white">
                            SUCCESSFUL APPOINTMENT
                        </Typography>
                    </div>

                    {/* Content */}
                    <div className="px-5 py-3 bg-gray-50 border-l border-r border-b border-gray-200 rounded-b-lg">
                        {/* Sub-header */}
                        <div className="bg-green-700 text-white py-3 px-6 rounded-md">
                            <Typography
                                color="text-white"
                                center
                                block
                                variant="label"
                            >
                                Release the following documents for e-signing:
                            </Typography>
                        </div>

                        {/* Document List */}
                        {esignDocumentsFolders?.isError && (
                            <NoData
                                text="There is some technical issue!"
                                isError
                            />
                        )}
                        {esignDocumentsFolders?.isLoading ? (
                            <LoadingAnimation size={90} />
                        ) : esignDocumentsFolders?.data &&
                          esignDocumentsFolders?.data?.length > 0 ? (
                            <div className="py-3 space-y-2">
                                {esignDocumentsFolders?.data?.map(
                                    (folder: Folder) => (
                                        <div
                                            key={folder?.id}
                                            className="flex items-center justify-between gap-x-2 py-2 px-6 bg-white border border-gray-200 rounded-lg shadow-sm"
                                        >
                                            <div className="flex items-center gap-x-1">
                                                <Typography
                                                    variant="label"
                                                    semibold
                                                    color="text-primaryNew"
                                                >
                                                    {folder?.name}
                                                </Typography>{' '}
                                                {folder?.course?.esignTemplates?.find(
                                                    (temp: any) =>
                                                        temp?.documents
                                                            ?.length > 0
                                                ) && (
                                                    <div className="relative group">
                                                        <IoIosSend />
                                                        <Tooltip>
                                                            Document Initiated
                                                        </Tooltip>
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                text="RELEASE DOCUMENT"
                                                onClick={() =>
                                                    onInitiateSigning(folder)
                                                }
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        ) : esignDocumentsFolders?.isSuccess ? (
                            <NoData text="No Folders were found! Please create the esign templete to move forward" />
                        ) : null}
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
