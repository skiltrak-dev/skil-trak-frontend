import React from 'react'

// Icons
import { AiFillEye } from 'react-icons/ai'
import { MdCloudDownload } from 'react-icons/md'
import { BsFileEarmarkText } from 'react-icons/bs'

// components
import {
    Typography,
    LoadingAnimation,
    EmptyData,
    TechnicalError,
} from '@components'

// hooks
import { useContextBar } from 'hooks'
import { AdminApi } from '@queries'
import { ellipsisText } from '@utils'

export const FileView = ({ id, docType }: any) => {
    const { hide, setContent } = useContextBar()

    const { data, isLoading, isError, isFetching } =
        AdminApi.Students.studentsRequiredDocsDetail(
            { id: Number(id), docType },
            { skip: !id }
        )

    return (
        <>
            <Typography>
                <span className="font-semibold">Document Detail</span>
            </Typography>
            {isError && <TechnicalError />}
            {isLoading || isFetching ? (
                <LoadingAnimation />
            ) : data ? (
                <div>
                    {/*  */}
                    <div className="my-6 grid grid-cols-3 justify-between">
                        <Typography variant={'muted'} color={'gray'}>
                            Folder Name
                        </Typography>
                        <Typography variant={'muted'} color={'gray'}>
                            Files
                        </Typography>
                        <Typography variant={'muted'} color={'gray'}>
                            Size
                        </Typography>

                        {Array.isArray(data?.files) ? (
                            data?.files.map((file: any) => (
                                <>
                                    <Typography variant={'label'}>
                                        <span className="font-semibold">
                                            {ellipsisText(file?.filename, 8)}
                                        </span>
                                    </Typography>
                                    <Typography variant={'label'}>1</Typography>
                                    <Typography variant={'label'}>
                                        1.5 mb
                                    </Typography>
                                </>
                            ))
                        ) : (
                            <>
                                <Typography variant={'label'}>
                                    {data?.name}
                                </Typography>
                                <Typography variant={'label'}>1</Typography>
                                <Typography variant={'label'}>
                                    1.5 mb
                                </Typography>
                            </>
                        )}
                    </div>

                    {/* div */}
                    <div className="mt-6">
                        <Typography variant={'muted'} color={'gray'}>
                            Folder Content
                        </Typography>

                        {Array.isArray(data?.files) ? (
                            data?.files.map((file: any) => (
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center gap-x-2">
                                        <BsFileEarmarkText />
                                        <Typography variant={'label'}>
                                            <span className="font-semibold">
                                                {ellipsisText(
                                                    file?.filename,
                                                    8
                                                )}
                                            </span>
                                        </Typography>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <div className="flex items-center gap-x-2">
                                            <AiFillEye className="text-success" />
                                            <Typography
                                                variant={'muted'}
                                                color={'primary'}
                                            >
                                                <a
                                                    href={`${process.env.NEXT_PUBLIC_END_POINT}/${data?.file}`}
                                                    target="_blank"
                                                >
                                                    View
                                                </a>
                                            </Typography>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <MdCloudDownload className="text-info" />
                                            <Typography
                                                variant={'muted'}
                                                color={'info'}
                                            >
                                                <a
                                                    href={`${process.env.NEXT_PUBLIC_END_POINT}/${data?.file}`}
                                                    target="_blank"
                                                >
                                                    Download
                                                </a>
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center gap-x-2">
                                    <BsFileEarmarkText />
                                    <Typography variant={'muted'}>
                                        {data?.name}
                                    </Typography>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <div className="flex items-center gap-x-2">
                                        <AiFillEye className="text-success" />
                                        <Typography
                                            variant={'muted'}
                                            color={'primary'}
                                        >
                                            <a
                                                href={`${process.env.NEXT_PUBLIC_END_POINT}/${data?.file}`}
                                                target="_blank"
                                            >
                                                View
                                            </a>
                                        </Typography>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <MdCloudDownload className="text-info" />
                                        <Typography
                                            variant={'muted'}
                                            color={'info'}
                                        >
                                            <a
                                                href={`${process.env.NEXT_PUBLIC_END_POINT}/${data?.file}`}
                                                target="_blank"
                                            >
                                                Download
                                            </a>
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                !isError && (
                    <EmptyData
                        title={'No Folders'}
                        description={'No Folders'}
                    />
                )
            )}
        </>
    )
}
