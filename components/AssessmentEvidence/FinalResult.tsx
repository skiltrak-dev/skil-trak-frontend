import { Card, Typography } from '@components'
import moment from 'moment'
import React from 'react'

export const FinalResult = ({
    results,
    folders,
    courseName,
}: {
    results: any
    folders: any
    courseName: string
}) => {
    return (
        <div className="mt-5 flex flex-col gap-y-2">
            {results &&
                results?.length > 0 &&
                [...results]
                    ?.filter((result: any) => result?.finalComment)
                    ?.sort(
                        (a: any, b: any) =>
                            a?.totalSubmission - b?.totalSubmission
                    )
                    ?.map((result: any) => (
                        <Card key={result?.id}>
                            <div className="flex flex-col gap-y-2 border-b pb-3">
                                <Typography variant={'title'}>
                                    Result - Submission{' '}
                                    {result?.totalSubmission} for {courseName} -{' '}
                                    <span className="uppercase">
                                        {result?.result}
                                    </span>
                                </Typography>
                                <Typography variant={'label'}>
                                    <span className="font-semibold">
                                        Comment:
                                    </span>{' '}
                                    {result?.finalComment}
                                </Typography>
                                <Typography variant={'label'}>
                                    <span className="font-semibold">Date:</span>{' '}
                                    {moment(result?.updatedAt)?.format(
                                        'DD-MMM-YY hh:mm a'
                                    )}
                                </Typography>
                            </div>

                            <div className="flex flex-col gap-y-2">
                                {folders?.map((folder: any) => {
                                    return (
                                        <div
                                            key={folder?.id}
                                            className="flex flex-col"
                                        >
                                            <Typography variant={'subtitle'}>
                                                Result for {folder?.name} -
                                                <span className="uppercase">
                                                    {
                                                        folder
                                                            ?.studentResponse[0]
                                                            ?.status
                                                    }
                                                </span>
                                            </Typography>
                                            <Typography
                                                variant={'small'}
                                                color={'text-gray-500'}
                                            >
                                                <span className="font-semibold text-black">
                                                    Comment:
                                                </span>{' '}
                                                {
                                                    folder?.studentResponse[0]
                                                        ?.comment
                                                }
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
