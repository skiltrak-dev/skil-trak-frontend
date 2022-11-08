// components
import { Typography } from '@components'
// react icons
import { FaEdit } from 'react-icons/fa'

type DownloadableFileProps = {
    name: string
    role: 'RTO' | 'Student'
    archivedView: boolean
    actions?: Function | null
}

export const DownloadableFile = ({
    name,
    archivedView,
    role,
    actions,
}: DownloadableFileProps) => {
    return (
        <>
            <div className="rounded flex justify-between mb-1 items-center bg-slate-100 p-2">
                <Typography variant="tableCell" color="text-black">
                    {name}
                </Typography>
                {archivedView && (
                    <Typography variant="tableCell" color="text-black">
                        20 Oct, 2022
                    </Typography>
                )}
                {actions && actions()}
            </div>
        </>
    )
}
