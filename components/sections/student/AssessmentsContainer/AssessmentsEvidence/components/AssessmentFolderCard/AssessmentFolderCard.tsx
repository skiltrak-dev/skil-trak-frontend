type AssessmentFolderCardProps = {
    status: string
}
import { Typography } from '@components/Typography'
import { FaFolder } from 'react-icons/fa'
export const AssessmentFolderCard = ({ status }: AssessmentFolderCardProps) => {
    const statusColor =
        status === 'Approved'
            ? 'bg-green-100'
            : status === 'Not Approved'
            ? 'bg-red-100'
            : 'bg-blue-100'
    return (
        <>
            <div
                className={`${
                    status === 'Not Approved' ? 'bg-red-100' : 'bg-white'
                } p-2 mb-1 cursor-pointer`}
            >
                <div className="flex justify-between">
                    <div className="flex items-center gap-x-2 ">
                        <div className="">
                            <FaFolder className="text-blue-500" />
                        </div>
                        <div>
                            <Typography variant="label">Folder Name</Typography>
                        </div>
                    </div>
                    <div>
                        <div className={`${statusColor} px-2 `}>
                            <Typography
                                variant="body"
                                color={
                                    status === 'Approved'
                                        ? 'text-green-500'
                                        : status === 'Not Approved'
                                        ? 'text-red-500'
                                        : 'text-blue-500'
                                }
                            >
                                {status}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div>
                    <Typography
                        variant="small"
                        color={
                            status === 'Approved'
                                ? 'text-green-500'
                                : status === 'Not Approved'
                                ? 'text-red-500'
                                : 'text-blue-500'
                        }
                    >
                        All videos are provided
                    </Typography>
                </div>
            </div>
        </>
    )
}
