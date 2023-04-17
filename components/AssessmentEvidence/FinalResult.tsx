import { Card, Typography } from '@components'
import { Result } from '@constants'
import { UserStatus } from '@types'
import moment from 'moment'
import React from 'react'
import { BiErrorAlt } from 'react-icons/bi'
import {
    MdCancel,
    MdOutlinePendingActions,
    MdOutlineVerified,
    MdVerified,
} from 'react-icons/md'

export const FinalResult = ({
    results,
    folders,
    courseName,
}: {
    results: any
    folders: any
    courseName: string
}) => {
    const getResultBadge = (result: string) => {
        switch (result) {
            case Result.Competent:
                return (
                    <div className="flex items-center gap-x-2 text-green-500 font-medium">
                        <MdVerified />
                        <span className="uppercase">Competent</span>
                    </div>
                )
            case Result.NotCompetent:
                return (
                    <div className="flex items-center gap-x-2 text-red-500 font-medium">
                        <BiErrorAlt />
                        <span className="uppercase">Not Competent</span>
                    </div>
                )
            case Result.ReOpened:
                return (
                    <div className="flex items-center gap-x-2 text-red-500 font-medium">
                        <BiErrorAlt />
                        <span className="uppercase">Re Opened</span>
                    </div>
                )
        }
    }

    const getFolderStatusBadge = (status: string) => {
        switch (status) {
            case UserStatus.Approved:
                return (
                    <span className="text-green-400">
                        <MdOutlineVerified />
                    </span>
                )
            case UserStatus.Rejected:
                return (
                    <span className="text-red-400">
                        <MdCancel />
                    </span>
                )
            default:
                return (
                    <span>
                        <MdOutlinePendingActions />
                    </span>
                )
        }
    }

    return (
        <div className="mt-5 flex flex-col gap-y-2">
            {results &&
                results?.length > 0 &&
                [...results]
                    ?.filter((result: any) => result?.finalComment)
                    ?.sort(
                        (a: any, b: any) =>
                            (new Date(b?.createdAt) as any) -
                            (new Date(a?.createdAt) as any)
                    )
                    ?.map((result: any) => (
                        <Card key={result?.id}>
                            <div className="flex flex-col gap-y-2 border-b pb-3">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="font-medium text-slate-400">
                                            Result For Submission{'#'}
                                            {result?.totalSubmission}
                                        </p>
                                        <Typography variant={'title'}>
                                            {courseName}
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col items-end">
                                        <Typography
                                            variant={'muted'}
                                            color={'text-gray-400'}
                                        >
                                            <span className="font-semibold">
                                                Dated:
                                            </span>{' '}
                                            {moment(result?.updatedAt)?.format(
                                                'DD MMM YYYY, hh:mm a'
                                            )}
                                        </Typography>
                                        {getResultBadge(result?.result)}
                                    </div>
                                </div>

                                <Typography
                                    variant={'body'}
                                    color={'text-slate-600'}
                                >
                                    {result?.finalComment}
                                </Typography>
                            </div>

                            <p className="mt-4 text-sm font-medium">
                                Folder Results
                            </p>
                            <div className="flex flex-col gap-y-2">
                                {result?.comments?.map((comment: any) => {
                                    return (
                                        <div
                                            key={comment?.id}
                                            className="flex items-center border-b py-1"
                                        >
                                            <span className="w-6">
                                                {/* {getFolderStatusBadge(
                                                    folder?.studentResponse[0]
                                                        ?.status
                                                )} */}
                                                {getFolderStatusBadge(
                                                    comment?.status
                                                )}
                                            </span>
                                            <span className="w-2/6">
                                                <p className="font-medium text-sm">
                                                    {comment?.folder?.name}
                                                </p>
                                            </span>

                                            <Typography
                                                variant={'small'}
                                                color={'text-gray-500'}
                                            >
                                                {comment?.comment}
                                            </Typography>
                                        </div>
                                    )
                                })}
                            </div>
                        </Card>
                    ))}
        </div>
    )
}
