import { AssessmentFolderCard } from '../components'

type Props = {}

export const AssessmentFolders = (props: Props) => {
    const folders = [
        {
            status: 'Approved',
        },
        {
            status: 'Not Approved',
        },
        {
            status: 'Approved',
        },
        {
            status: 'Not Assessed',
        },
        {
            status: 'Approved',
        },
        {
            status: 'Not Assessed',
        },
    ]

    return (
        <div className=''>
            {folders.map((folder,idx) => (
                <AssessmentFolderCard key={idx} status={folder.status} />
            ))}
        </div>
    )
}
