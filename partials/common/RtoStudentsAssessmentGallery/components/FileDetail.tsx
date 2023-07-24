import {
    Button,
    LoadingAnimation,
    NoData,
    Typography,
    UserCreatedAt,
} from '@components'
import { CommonApi } from '@queries'
import React from 'react'
import { MdDownload } from 'react-icons/md'

export const FileDetail = ({
    fileId,
    url,
}: {
    fileId: number
    url: string
}) => {
    const fileDetail =
        CommonApi.StudentAssessmentFiles.useGalleryFileViewDetail(fileId, {
            skip: !fileId,
        })
    return (
        <>
            {fileDetail.isError && <NoData text={'Some Technical Issue'} />}
            {fileDetail.isLoading ? (
                <LoadingAnimation size={50} />
            ) : (
                fileDetail?.isSuccess && (
                    <div className="flex flex-col gap-y-5">
                        <div className="flex justify-between items-center pr-7">
                            <div>
                                <Typography variant={'subtitle'}>
                                    File:
                                </Typography>
                                <Typography
                                    variant={'label'}
                                    color={'text-gray-400'}
                                >
                                    {fileDetail?.data?.filename}
                                </Typography>
                            </div>
                            <div>
                                <UserCreatedAt
                                    createdAt={fileDetail?.data?.createdAt}
                                />
                            </div>
                        </div>
                        <div>
                            <Typography variant={'subtitle'}>
                                Assessment Folder:
                            </Typography>
                            <Typography
                                variant={'label'}
                                color={'text-gray-400'}
                            >
                                {
                                    fileDetail.data?.studentAssessmentEvidence
                                        ?.assessmentFolder?.name
                                }
                            </Typography>
                        </div>
                        <div>
                            <Typography variant={'subtitle'}>
                                Course Detail:
                            </Typography>
                            <Typography
                                variant={'label'}
                                color={'text-gray-400'}
                            >
                                {
                                    fileDetail.data?.studentAssessmentEvidence
                                        ?.assessmentFolder?.course?.title
                                }
                            </Typography>
                        </div>

                        {fileDetail?.isSuccess && (
                            <div className="mt-5">
                                <a
                                    href={url}
                                    className="text-sm font-semibold text-info"
                                >
                                    <Button
                                        variant={'success'}
                                        Icon={MdDownload}
                                        text={'Download'}
                                    />
                                </a>
                            </div>
                        )}
                    </div>
                )
            )}
        </>
    )
}
