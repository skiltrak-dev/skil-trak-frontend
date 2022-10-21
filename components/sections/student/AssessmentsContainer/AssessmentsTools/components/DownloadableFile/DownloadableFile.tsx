import { Button } from '@components/buttons'
import { Typography } from '@components/Typography'

type DownloadableFileProps = {
    name: string
   

}

export const DownloadableFile = ({
    name,
}: DownloadableFileProps) => {
    return (
        <div>
            <div className="rounded flex justify-between mb-1 items-center bg-slate-100 p-2">
                <Typography variant="tableCell" color="text-black">
                    {name}
                </Typography>
                <Typography variant="tableCell" color="text-blue-600">
                    Download
                </Typography>
            </div>
        </div>
    )
}
