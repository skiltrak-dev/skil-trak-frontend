import moment from 'moment'

// Icons
import { RiBook2Fill } from 'react-icons/ri'

// components
import {
    Card,
    Typography,
    Button,
    ActionButton,
    InitialAvatar,
    ShowErrorNotifications,
} from '@components'

// utils
import { ellipsisText, userStatus } from '@utils'

// query
import {
    useAssignToSubAdminMutation,
    useCancelWorkplaceStatusMutation,
    useGetWorkplaceFoldersQuery,
} from '@queries'
import { useEffect, useState } from 'react'
import { useContextBar } from '@hooks'
import {
    AssignToMe,
    StudentDetail,
    WorkplaceFolders,
    Notes,
} from '../components'
import { Industries } from './Industries'
import { RequestType } from './RequestType'
import { RequestTypeAbn } from './RequestTypeAbn'

export const WorkplaceRequest = ({ workplace }: any) => {
    const [appliedIndustry, setAppliedIndustry] = useState<any | null>(null)
    const [course, setCourse] = useState<any | null>(null)
    const [folders, setFolders] = useState<any | null>(null)

    // query
    const [cancelWorkplace, cancelWorkplaceResult] =
        useCancelWorkplaceStatusMutation()
    // query
    const workplaceFolders = useGetWorkplaceFoldersQuery(
        {
            workplaceId: Number(workplace?.id),
            appliedIndustryId: appliedIndustry?.industry?.id,
            courseId: course?.id,
        },
        { skip: !workplace || !appliedIndustry || !course }
    )

    useEffect(() => {
        setAppliedIndustry(workplace.industries?.find((i: any) => i.applied))
        setCourse(workplace?.courses ? workplace?.courses[0] : {})
    }, [workplace])

    useEffect(() => {
        const getFolders = () => {
            const uploadedFolders = {}
            workplaceFolders?.data?.uploaded?.forEach((folder: any) => {
                if ((uploadedFolders as any)[folder.name]) {
                    ;(uploadedFolders as any)[folder.name].push(folder)
                } else {
                    ;(uploadedFolders as any)[folder.name] = []
                    ;(uploadedFolders as any)[folder.name].push(folder)
                }
            })
            const allFolders = workplaceFolders?.data?.folders?.map(
                (folder: any) => ({
                    ...folder,
                    uploaded: (uploadedFolders as any)[folder?.folder?.name],
                })
            )
            setFolders(allFolders)
        }
        getFolders()
    }, [workplaceFolders])

    const { setContent, show } = useContextBar()

    return (
        <Card noPadding>
            <ShowErrorNotifications result={cancelWorkplaceResult} />
            <div
                className={`w-full h-full p-4 rounded-md shadow-lg ${
                    appliedIndustry?.isCompleted ? 'bg-gray-50' : ''
                } `}
            >
                <div className="flex justify-between items-center pb-2.5 border-b border-dashed">
                    <AssignToMe
                        workplace={workplace}
                        appliedIndustry={appliedIndustry}
                    />

                    <div className="flex items-center relative">
                        <div className="flex items-center gap-x-2">
                            <InitialAvatar
                                name={workplace?.student?.rto?.user?.name}
                                imageUrl={workplace?.student?.rto?.user?.avatar}
                            />
                            <div>
                                <Typography color={'black'} variant={'small'}>
                                    {workplace?.student?.rto?.user?.name}
                                </Typography>
                                <div className="flex items-center gap-x-2">
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-400'}
                                    >
                                        {workplace?.student?.rto?.user?.email}
                                    </Typography>
                                    <span className="text-gray-400">|</span>
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-400'}
                                    >
                                        {workplace?.student?.rto?.phone}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  */}
                    <div className="flex items-center relative">
                        <div className="flex items-center gap-x-2">
                            <RiBook2Fill className="text-gray-400 text-2xl" />
                            <div>
                                <Typography color={'black'} variant={'xs'}>
                                    {course?.sector?.name}
                                </Typography>
                                <Typography variant={'muted'}>
                                    {course?.code} - {course?.title}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    {/* Request Type Selection */}
                    {appliedIndustry?.studentProvidedWorkplace ? (
                        <RequestType
                            appliedIndustry={appliedIndustry}
                            workplace={workplace}
                        />
                    ) : (
                        <RequestTypeAbn
                            appliedIndustry={appliedIndustry}
                            workplace={workplace}
                        />
                    )}
                </div>

                {/* Student Small Details */}
                <div className="mt-3 flex justify-between items-center">
                    <StudentDetail data={workplace?.student} />

                    {/*  */}
                    <div>
                        <Typography variant={'xs'}>Recieved On:</Typography>
                        <Typography variant={'small'}>
                            <span className="font-semibold">
                                {moment(
                                    workplace?.createdAt,
                                    'YYYY-MM-DD hh:mm:ss Z'
                                ).format('Do MMM, YYYY')}
                            </span>
                        </Typography>
                    </div>
                </div>

                {/* Industries and notes */}
                <div className="grid grid-cols-2 gap-x-3 mt-4">
                    {/* Industries */}
                    <div>
                        <Industries
                            appliedIndustry={appliedIndustry}
                            industries={workplace?.industries}
                            workplaceId={workplace?.id}
                            workplace={workplace}
                            courseId={course?.id}
                            folders={folders}
                        />
                        {!appliedIndustry?.cancelled &&
                            appliedIndustry?.industryResponse !== 'rejected' &&
                            !appliedIndustry?.isCompleted &&
                            !appliedIndustry?.terminated && (
                                <div className="mt-3">
                                    <ActionButton
                                        variant={'error'}
                                        onClick={async () => {
                                            await cancelWorkplace(
                                                Number(workplace?.id)
                                            )
                                        }}
                                        loading={
                                            cancelWorkplaceResult.isLoading
                                        }
                                        disabled={
                                            cancelWorkplaceResult.isLoading
                                        }
                                    >
                                        Cancel Request
                                    </ActionButton>
                                </div>
                            )}
                    </div>

                    {/* Notes */}
                    <Notes workplace={workplace} />
                </div>
            </div>
        </Card>
    )
}
