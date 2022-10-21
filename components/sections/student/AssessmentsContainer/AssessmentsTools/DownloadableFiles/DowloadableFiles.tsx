import { Card } from '@components/cards'
import { DownloadableFile } from '../components'

type Props = {}

export const DowloadableFiles = (props: Props) => {
    const downloadableFiles = [
        {
            id: 1,
            name: 'Placement Agreement',
        },
        {
            id: 2,
            name: 'Suitability Checklist',
        },
        {
            id: 3,
            name: 'Third Party Report (logbook)',
        },
    ]
    return (
        <div className='min-h-[260px]'>
            {downloadableFiles.map((file) => (
                <DownloadableFile key={file.id} name={file.name} />
            ))}
        </div>
    )
}
