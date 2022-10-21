import { Typography } from '@components/Typography'
import Image from 'next/image'

type AssessmentFolderDetailProps = {
    imageUrl: string
}

export const AssessmentFolderDetail = ({
    imageUrl,
}: AssessmentFolderDetailProps) => {
    return (
        <div className=''>
            <Image
                src={imageUrl || '/images/assessment-file-images/img-1.png'}
                width={100}
                height={100}
            />
            <Typography variant='body'>
                File Name
            </Typography>
        </div>
    )
}
