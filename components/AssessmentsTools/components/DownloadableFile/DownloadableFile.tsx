// components
import { Typography } from '@components'
// react icons
import { FaEdit } from 'react-icons/fa'

type DownloadableFileProps = {
    name: string
    archivedView: boolean
    actions?: Function | null
}

export const DownloadableFile = ({
    name,
    archivedView,
    actions,
}: DownloadableFileProps) => {
    return (
        <>
            <div className="rounded grid grid-cols-3 mb-1 items-center bg-slate-100 p-2">
                <Typography variant="tableCell" color="text-black">
                    {name}
                </Typography>
                <div>
                    {archivedView && (
                        <Typography variant="tableCell" color="text-black">
                            20 Oct, 2022
                        </Typography>
                    )}
                </div>
                <div className="ml-auto">{actions && actions()}</div>
            </div>
        </>
    )
}
