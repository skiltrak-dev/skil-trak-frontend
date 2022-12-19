import React, { useEffect, useState } from 'react'
import { Typography } from '@components'
import { useContextBar } from '@hooks'
import moment from 'moment'

// query
import { useGetWorkplaceFoldersQuery } from '@queries'
import { ViewFoldersCB } from '../contextBar'

export const WorkplaceFolders = ({
    courseId,
    workplace,
    appliedIndustryId,
    folders,
}: any) => {
    const [isAllDocumentsUploaded, setIsAllDocumentsUploaded] = useState<
        boolean | null
    >(false)

    // hooks
    const { setContent, show } = useContextBar()

    useEffect(() => {
        setIsAllDocumentsUploaded(
            folders?.length > 0 && folders?.every((f: any) => f.uploaded)
        )
    }, [folders])

    return (
        <div className="flex items-center gap-x-5">
            {!workplace?.byExistingAbn &&
                !workplace?.studentProvidedWorkplace && (
                    <div className="flex flex-col items-end gap-y-1">
                        <Typography variant={'small'}>
                            {isAllDocumentsUploaded ? (
                                <span className="bg-green-500 text-white rounded-md p-1">
                                    Documents Uploaded
                                </span>
                            ) : (
                                <span className="bg-primary-light text-primary rounded-md p-1">
                                    Documents Pending
                                </span>
                            )}
                        </Typography>
                        <Typography variant={'small'} color={'text-info'}>
                            <span
                                className="font-semibold cursor-pointer"
                                onClick={() => {
                                    setContent(
                                        <ViewFoldersCB folders={folders} />
                                    )
                                    show()
                                }}
                            >
                                View Folders
                            </span>
                        </Typography>
                    </div>
                )}
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
    )
}
