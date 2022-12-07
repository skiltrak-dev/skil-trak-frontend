import { useContextBar } from '@hooks'
import { useEffect, Fragment } from 'react'
import { Typography } from '@components'

export const ViewFoldersCB = ({ folders }: any) => {
    const { setTitle } = useContextBar()

    useEffect(() => {
        setTitle('View Folders')
    }, [])

    return (
        <>
            <div>
                <div>
                    <div>
                        {/* <Typography>j</Typography> */}
                    </div>
                </div>
                {Object.keys(folders).map((folder) => {
                    return (
                        <Fragment key={folder}>
                            <span className="text-xs font-medium text-slate-400 border-t pt-2">
                                {folder}
                            </span>

                            {(folders as any)[folder].map(
                                (f: any, i: number) => (
                                    <div className="flex gap-x-0.5" key={i}>
                                        <Typography
                                            variant={'small'}
                                            color={'text-gray-500'}
                                        >
                                            {`${i + 1})`},
                                        </Typography>
                                        <Typography
                                            variant={'small'}
                                            color={'text-gray-500'}
                                        >
                                            <a href={f.file}>{f.file}</a>
                                        </Typography>{' '}
                                    </div>
                                )
                            )}
                        </Fragment>
                    )
                })}
            </div>
        </>
    )
}
