import { Typography } from '@components/Typography'
import Image from 'next/image'

type AssessmentFolderFileCardProps = {
    imageUrl: string
}

export const AssessmentFolderFileCard = ({
    imageUrl,
}: AssessmentFolderFileCardProps) => {
    return (
        <div className="">
            <Image
                src={imageUrl || '/images/assessment-file-images/img-1.png'}
                width={100}
                height={100}
            />
            <Typography variant="body">File Name</Typography>
        </div>
    )
}
