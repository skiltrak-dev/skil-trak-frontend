import { Button } from '@components/buttons'
import { Typography } from '@components/Typography'
import { AssessmentFolderDetail } from '../components'
import { MdCloudUpload } from 'react-icons/md'

type Props = {}

export const AssessmentFolderDetails = (props: Props) => {
    const folderDetails = [
        {
            imageUrl: '/images/assessment-file-images/img-1.png',
        },
        {
            imageUrl: '/images/assessment-file-images/img-2.png',
        },
        {
            imageUrl: '/images/assessment-file-images/img-1.png',
        },
        {
            imageUrl: '/images/assessment-file-images/img-2.png',
        },
        {
            imageUrl: '/images/assessment-file-images/img-1.png',
        },
        {
            imageUrl: '/images/assessment-file-images/img-2.png',
        },
    ]
    return (
        <>
            <div className="flex justify-between items-center p-2">
                <div>
                    <Typography variant="title">Restaurant Menus</Typography>
                    <Typography variant="label" color="text-gray-400">
                        Uploaded 6/10
                    </Typography>
                </div>
                <div className="ml-auto">
                    <Button
                        variant="error"
                        Icon={MdCloudUpload}
                        text={'Add File'}
                    />
                </div>
            </div>
            <div className="bg-white p-2 min-h-[290px] flex flex-col justify-between">
                <div className="grid grid-cols-6 gap-x-2">
                    {folderDetails.map((folder, idx) => (
                        <AssessmentFolderDetail
                            key={idx}
                            imageUrl={folder.imageUrl}
                        />
                    ))}
                </div>
                <div className="mt-4 border-dashed border border-gray-300 rounded-lg p-2">
                    <Typography variant="muted" color="text-gray-400">
                        Assessed On: 5th Oct, 2022
                    </Typography>
                    <Typography variant="body" color="text-gray-600">
                        This comment was left by one of coordinator. All of he
                        comments will appear in this section
                    </Typography>
                </div>
            </div>
        </>
    )
}
