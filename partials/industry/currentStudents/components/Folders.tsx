import { useEffect, useState } from 'react'
import moment from 'moment'

import { Typography } from '@components'

// query
import { useGetIndustryWorkplaceFoldersQuery } from '@queries'

// hooks
import { useContextBar } from '@hooks'
import { ViewFoldersCB } from '../contextBar'

export const Folders = ({
    workplace,
    workplaceId,
    appliedIndustryId,
    courseId,
}: any) => {
    const [folders, setFolders] = useState([])
    const [isAllDocumentsUploaded, setIsAllDocumentsUploaded] = useState(false)

    // hooks
    const { setContent, show } = useContextBar()

    const getWorkplaceFolders = useGetIndustryWorkplaceFoldersQuery(
        {
            workplaceId: Number(workplaceId),
            appliedIndustryId: Number(appliedIndustryId),
            courseId: Number(courseId),
        },
        { skip: !workplaceId || !appliedIndustryId || !courseId }
    )

    useEffect(() => {
        setIsAllDocumentsUploaded(
            folders?.length > 0 && folders?.every((f: any) => f.uploaded)
        )
    }, [folders])

    useEffect(() => {
        const getFolders = () => {
            const uploadedFolders = {}
            getWorkplaceFolders?.data?.uploaded?.forEach((folder: any) => {
                if ((uploadedFolders as any)[folder.name]) {
                    ;(uploadedFolders as any)[folder.name].push(folder)
                } else {
                    ;(uploadedFolders as any)[folder.name] = []
                    ;(uploadedFolders as any)[folder.name].push(folder)
                }
            })
            const allFolders = getWorkplaceFolders?.data?.folders?.map(
                (folder: any) => ({
                    ...folder,
                    uploaded: (uploadedFolders as any)[folder?.folder?.name],
                })
            )
            setFolders(allFolders)
        }
        getFolders()
    }, [getWorkplaceFolders])

    return (
        <div className="flex justify-between md:justify-start items-center gap-x-5">
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
