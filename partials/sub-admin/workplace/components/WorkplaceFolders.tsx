import React, { useEffect, useState } from 'react'
import { Typography } from '@components'
import { useContextBar } from '@hooks'
import moment from 'moment'

// query
import { useGetWorkplaceFoldersQuery } from '@queries'
import { ViewFoldersCB } from '../contextBar'

export const WorkplaceFolders = ({ workplace }: any) => {
    const [folders, setFolders] = useState<any | null>(null)

    // hooks
    const { setContent, show } = useContextBar()

    // query
    const workplaceFolders = useGetWorkplaceFoldersQuery(Number(workplace?.id))

    useEffect(() => {
        const getFolders = () => {
            const allFolders = {}
            workplaceFolders?.data?.forEach((folder: any) => {
                if ((allFolders as any)[folder.name]) {
                    ;(allFolders as any)[folder.name].push(folder)
                } else {
                    ;(allFolders as any)[folder.name] = []
                    ;(allFolders as any)[folder.name].push(folder)
                }
            })
            setFolders(allFolders)
        }
        getFolders()
    }, [workplaceFolders])

    return (
        <div className="flex items-center gap-x-5">
            {!workplace?.byExistingAbn &&
                !workplace?.studentProvidedWorkplace && (
                    <div className="flex flex-col items-end gap-y-1">
                        <Typography variant={'small'}>
                            <span className="bg-primary-light text-primary rounded-md p-1">
                                Documents Pending
                            </span>
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
