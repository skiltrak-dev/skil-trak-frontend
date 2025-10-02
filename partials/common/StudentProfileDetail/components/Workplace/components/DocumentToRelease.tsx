import { Button, Tooltip, Typography } from '@components'
import { AssessmentEvidenceDetailType } from '@types'
import { IoIosSend } from 'react-icons/io'

export const DocumentToRelease = ({
    folder,
    onInitiateSigning,
}: {
    folder: AssessmentEvidenceDetailType
    onInitiateSigning: (folder: AssessmentEvidenceDetailType) => void
}) => {
    return (
        <>
            <div className="flex items-center justify-between gap-x-2 py-2 px-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="flex items-center gap-x-1">
                    <Typography
                        variant="label"
                        semibold
                        color="text-primaryNew"
                    >
                        {folder?.name}
                    </Typography>{' '}
                    {folder?.course?.esignTemplates?.find(
                        (temp: any) => temp?.documents?.length > 0
                    ) && (
                        <div className="relative group">
                            <IoIosSend />
                            <Tooltip>Document Initiated</Tooltip>
                        </div>
                    )}
                </div>
                <Button
                    text="RELEASE DOCUMENT"
                    onClick={() => onInitiateSigning(folder)}
                />
            </div>
        </>
    )
}
