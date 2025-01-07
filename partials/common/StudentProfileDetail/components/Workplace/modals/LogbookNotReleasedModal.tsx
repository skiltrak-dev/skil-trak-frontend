import Image from 'next/image'
import { SubAdminApi } from '@queries'
import { MdCancel } from 'react-icons/md'
import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { useAssessmentDocumentsView } from '../../AssessmentsSubmission'
import { Rto } from '@types'

export const LogbookNotReleasedModal = ({
    onCancel,
    selectedWorkplaceId,
    rto,
}: {
    rto: Rto
    selectedWorkplaceId: number
    onCancel: () => void
}) => {
    const { notification } = useNotification()
    const { onFileClicked, documentsViewModal } = useAssessmentDocumentsView()

    const [releaseLogbook, releaseLogbookResult] =
        SubAdminApi.Student.releaseStudentLogbook()

    const onReleaseLogbook = async () => {
        const res: any = await releaseLogbook(selectedWorkplaceId)

        if (res?.data) {
            notification.success({
                title: 'Logbook Released',
                description: 'Logbook Released Successfully',
            })
            onCancel()
        }
    }

    const file = rto?.assessmentTools?.[0]

    let fileName = file ? file?.file?.split('\\') : ''
    if (fileName?.length === 1) {
        fileName = file?.file?.split('/')

        if (fileName.length > 1) {
            fileName = fileName[fileName?.length - 1]
        }
    }

    const extension = file?.file?.split('.')?.reverse()[0]
    return (
        <>
            {documentsViewModal}
            <ShowErrorNotifications result={releaseLogbookResult} />
            <GlobalModal className="!max-w-5xl !w-full">
                <div className="w-full px-7 sm:px-16 md:px-32 xl:px-44 relative flex flex-col gap-y-5 py-10">
                    <MdCancel
                        onClick={onCancel}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                    />
                    <div className="flex flex-col gap-y-2 justify-between items-center">
                        <Image
                            alt={''}
                            width={50}
                            height={50}
                            src={'/images/students/schedule.png'}
                        />
                        <div className="mx-auto">
                            <Typography center semibold>
                                Reminder Logbook Release Pending
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <Typography center>
                            <span className="text-[15px] leading-4 text-center">
                                The logbook has not yet been released. However,
                                the student’s placement has already started.
                                This message will remain until the logbook is
                                released for the student.
                            </span>
                        </Typography>
                        <div className="mt-3 bg-primaryNew-dark rounded-[5px] flex justify-between items-center px-5 py-2.5">
                            <Typography
                                variant="small"
                                medium
                                color="text-white"
                            >
                                {file?.title}
                            </Typography>
                            <Button
                                text="View Document"
                                onClick={() =>
                                    onFileClicked({
                                        ...file,
                                        file: file?.file
                                            .replaceAll('{"', '')
                                            .replaceAll('"}', ''),
                                        extension,
                                        type: 'all',
                                        showEdit: false,
                                    })
                                }
                            />
                        </div>
                    </div>

                    {/*  */}
                    <div className="flex justify-center">
                        <Button
                            text="Release LOGBOOK"
                            onClick={onReleaseLogbook}
                            loading={releaseLogbookResult?.isLoading}
                            disabled={releaseLogbookResult?.isLoading}
                        />
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}
