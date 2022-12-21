import { useRouter } from 'next/router'

// Icons
import { GiCancel } from 'react-icons/gi'
import { BsCheckCircleFill, BsArrowUpCircle } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'

// hooks
import { useContextBar } from 'hooks'

// components
import {
    LoadingAnimation,
    Typography,
    EmptyData,
    TechnicalError,
} from '@components'

// query
import { AdminApi } from '@queries'
import { useEffect, useState } from 'react'

export const CourseDetails = ({ courseId }: any) => {
    const { hide, setContent } = useContextBar()

    const [folders, setFolders] = useState<any | null>(null)

    const router = useRouter()
    const { id } = router.query

    const { data, isLoading, isFetching, isSuccess, isError } =
        AdminApi.Students.studentCourseDetail(
            { id: courseId, studentId: Number(id) },
            { skip: !id }
        )

    useEffect(() => {
        if (isSuccess && data) {
            setFolders(
                data?.folders?.map((f: any) => f.documents).flat(Infinity)
            )
        }
    }, [data])

    return (
        <>
            <Typography>
                <span className="font-semibold">Course Detail</span>
            </Typography>

            {isError && <TechnicalError />}
            {isLoading || isFetching ? (
                <LoadingAnimation />
            ) : data ? (
                <div>
                    {/*  */}
                    <Typography variant={'muted'} color={'gray'}>
                        Coordinators
                    </Typography>
                    <Typography variant={'label'}>{data?.title}</Typography>

                    {/*  */}
                    <div className="my-6 grid grid-cols-3 justify-between">
                        <Typography variant={'muted'} color={'gray'}>
                            Course Code
                        </Typography>
                        <Typography variant={'muted'} color={'gray'}>
                            Course Hours
                        </Typography>
                        <Typography variant={'muted'} color={'gray'}>
                            Requirement File
                        </Typography>
                        <Typography variant={'label'}>{data?.code}</Typography>
                        <Typography variant={'label'}>{data?.hours}</Typography>
                        <Typography variant={'label'} color={'info'}>
                            Download
                        </Typography>
                    </div>

                    {/* recuirement Docs */}
                    <div>
                        <Typography variant={'muted'} color={'gray'}>
                            Required Documents
                        </Typography>

                        {/* folders */}
                        <div className="my-2">
                            {folders?.map((folder: any, i: number) => (
                                <div
                                    key={folder.id}
                                    className={`flex justify-between items-center py-2 ${
                                        folders.length - 1 !== i
                                            ? 'border-b border-secondary-dark'
                                            : ''
                                    }`}
                                >
                                    <div className="flex items-center gap-x-1">
                                        {folder?.uploaded ? (
                                            <BsCheckCircleFill className="text-success" />
                                        ) : (
                                            <MdCancel className="text-error text-lg" />
                                        )}

                                        <Typography variant={'muted'}>
                                            {folder?.folder?.name}
                                        </Typography>
                                        <Typography
                                            variant={'small'}
                                            color={'gray'}
                                        >
                                            ({folder.uploadedDocs}/
                                            {folder?.folder?.capacity})
                                        </Typography>
                                    </div>
                                    <div className="flex items-center gap-x-1">
                                        <BsArrowUpCircle className="text-info" />
                                        <Typography
                                            variant={'muted'}
                                            color={'info'}
                                        >
                                            Change
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                !isError && <EmptyData />
            )}
        </>
    )
}
