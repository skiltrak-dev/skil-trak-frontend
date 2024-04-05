import { Typography } from '@components'

export const InfoTabCard = ({ title, description }: any) => {
    return (
        <div className="py-1.5 px-4 rounded-md border-2 border-dashed">
            <Typography variant={'small'} color={'text-primaryNew'}>
                {title}
            </Typography>
            <Typography variant={'label'} color={'text-primaryNew'} medium>
                {description}
            </Typography>
        </div>
    )
}
