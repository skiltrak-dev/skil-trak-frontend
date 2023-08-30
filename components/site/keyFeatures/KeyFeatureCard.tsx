import { Typography } from '@components/Typography'


export const KeyFeatureCard = ({ icon, title, content, color }: any) => {
    return (
        <>
            <div className={`${color} rounded-xl p-6`}>
                <div className="mb-4 text-3xl">{icon}</div>
                <div className='mb-2'>
                    <Typography variant="title">{title}</Typography>
                </div>
                <div>
                    <Typography variant="muted">{content}</Typography>
                </div>
            </div>
        </>
    )
}
