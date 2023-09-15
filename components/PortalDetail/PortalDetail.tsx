import { Typography, VideoPreview } from '@components'

interface PortalDetailProps {
    text: string
    description?: string
    videoUrl: string
}
export const PortalDetail = ({
    text,
    description,
    videoUrl,
}: PortalDetailProps) => {
    return (
        <div className="w-full h-auto">
            <Typography variant={'h4'}>Beginning As A text</Typography>
            <p>
                Here are the things, you can do as a{' '}
                <span className="text-primary capitalize">{text}</span> on
                SkilTrak
            </p>
            <div className="w-full h-48 rounded-lg overflow-hidden mt-4 bg-secondary">
                <VideoPreview url={videoUrl} />
            </div>
        </div>
    )
}
