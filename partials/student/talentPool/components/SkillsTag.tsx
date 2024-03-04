import { Typography } from '@components'

export const SkillsTag = ({ title, tags }: any) => {
    return (
        <div>
            <div className="mb-2">
                <Typography variant="title">{title || 'N/A'}</Typography>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
                {tags?.map((tag: any, index: number) => (
                    <div key={index} className="bg-[#D4D7FF] p-3 text-center rounded-md">
                        <Typography variant="small">{tag || 'N/A'}</Typography>
                    </div>
                ))}
            </div>
        </div>
    )
}
