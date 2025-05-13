import { Button, GlobalModal, Typography } from '@components'
import { StudentApi } from '@queries'
import { Folder } from '@types'
import Image from 'next/image'
import { MdCancel } from 'react-icons/md'
import { IndustryCheckUploadCard } from '../components'

export const IndustryChecksModal = ({
    studentId,
    industryChecks,
    onCancel,
}: {
    studentId: number
    industryChecks: any
    onCancel: () => void
}) => {
    return (
        <GlobalModal className="max-h-[90vh] overflow-auto !max-w-5xl !w-full">
            <div className="w-full px-7 sm:px-16 md:px-28 xl:px-36 relative flex flex-col gap-y-5 py-7">
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
                            Documents Required Before Placement
                        </Typography>
                    </div>
                </div>
                <div>
                    <Typography center variant="label" block>
                        <span className="leading-4 text-center">
                            Before your Skiltrak coordinator can finalize your
                            placement with the [industry name], please upload
                            the required industry checks. Completing this step
                            is essential to proceed to placement started status.
                        </span>
                    </Typography>

                    <div className="max-h-48 overflow-auto mt-4 flex flex-col gap-y-2 border border-[#6B7280] rounded-md px-7 py-4">
                        {industryChecks?.assessmentEvidence?.map(
                            (assessment: Folder, i: number) => (
                                <IndustryCheckUploadCard
                                    key={i}
                                    folder={assessment}
                                />
                            )
                        )}

                        {industryChecks?.otherDocs?.map(
                            (assessment: Folder, i: number) => (
                                <IndustryCheckUploadCard
                                    key={i}
                                    otherDocs
                                    folder={assessment}
                                    studentId={studentId}
                                />
                            )
                        )}
                    </div>
                </div>

                {/*  */}
                <div className="flex justify-center">
                    <Button
                        variant="primaryNew"
                        text="Close"
                        onClick={onCancel}
                    />
                </div>
            </div>
        </GlobalModal>
    )
}
