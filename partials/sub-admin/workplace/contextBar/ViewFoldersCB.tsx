import { useContextBar } from '@hooks'
import { useEffect, Fragment } from 'react'
import { Typography, ActionButton, NoData } from '@components'
import { ellipsisText } from '@utils'
import { AiFillEye } from 'react-icons/ai'
import { FaCloudDownloadAlt } from 'react-icons/fa'

export const ViewFoldersCB = ({ folders }: any) => {
    const { setTitle } = useContextBar()

    useEffect(() => {
        setTitle('View Folders')
    }, [])

    return (
        <>
            <div>
                {folders && folders?.length > 0 ? (
                    folders?.map((folder: any) => (
                        <div key={folder?.id} className="mb-4">
                            <Typography variant={'label'}>
                                <span className="font-semibold">
                                    {folder?.folder?.name}
                                </span>
                            </Typography>
                            {folder?.uploaded ? (
                                <div>
                                    {folder?.uploaded?.map((uploaded: any) => (
                                        <div
                                            className="flex justify-between items-center gap-x-0.5"
                                            key={uploaded?.id}
                                        >
                                            <Typography
                                                variant={'small'}
                                                color={'text-slate-500'}
                                            >
                                                <span className="font-medium">
                                                    {ellipsisText(
                                                        uploaded?.fileName,
                                                        11
                                                    )}
                                                </span>
                                            </Typography>
                                            <div className="flex items-center gap">
                                                <a
                                                    href={uploaded?.file}
                                                    target="_blank"
                                                >
                                                    <ActionButton
                                                        simple
                                                        Icon={AiFillEye}
                                                        variant="success"
                                                    >
                                                        View
                                                    </ActionButton>
                                                </a>
                                                <a
                                                    href={uploaded?.file}
                                                    target="_blank"
                                                >
                                                    <ActionButton
                                                        simple
                                                        variant="link"
                                                        Icon={
                                                            FaCloudDownloadAlt
                                                        }
                                                    >
                                                        <a
                                                            href={
                                                                uploaded?.file
                                                            }
                                                        >
                                                            Download
                                                        </a>
                                                    </ActionButton>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <NoData text={'No Files Uploaded'} />
                            )}
                        </div>
                    ))
                ) : (
                    <NoData text={'Industry Folders were not found'} />
                )}
                {/* {Object.keys(folders).map((folder) => {
                    return (
                        <Fragment key={folder}>
                            <Typography variant={'label'}>
                                <span className="font-semibold">{folder}</span>
                            </Typography>

                            {(folders as any)[folder].map(
                                (f: any, i: number) => (
                                    <div
                                        className="flex justify-between items-center gap-x-0.5"
                                        key={i}
                                    >
                                        <Typography
                                            variant={'small'}
                                            color={'text-slate-500'}
                                        >
                                            <span className="font-medium">
                                                {elipiciseText(f?.fileName, 11)}
                                            </span>
                                        </Typography>
                                        <div className="flex items-center gap">
                                            <ActionButton
                                                simple
                                                Icon={AiFillEye}
                                                variant="success"
                                            >
                                                <a href={f?.file}>View</a>
                                            </ActionButton>
                                            <ActionButton
                                                simple
                                                variant="link"
                                                Icon={FaCloudDownloadAlt}
                                            >
                                                <a href={f?.file}>Download</a>
                                            </ActionButton>
                                        </div>
                                    </div>
                                )
                            )}
                        </Fragment>
                    )
                })} */}
            </div>
        </>
    )
}
