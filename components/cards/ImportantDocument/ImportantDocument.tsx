import Image from 'next/image'

// components
import { Typography } from '@components'

type ImportantDocumentProps = {
    title: string
    description: string
    imageUrl: string
}

export const ImportantDocumentCard = ({
    title,
    description,
    imageUrl,
}: ImportantDocumentProps) => {
    const backgroundColor =
        title === 'Work Flow'
            ? 'bg-[#BCDEFF]'
            : title === 'Course Requirements'
            ? 'bg-orange-100'
            : title === 'Induction Process'
            ? 'bg-red-100'
            : title === 'Placement Info'
            ? 'bg-green-100'
            : 'bg-[#CACBF4]'
    return (
        <>
            <div className={`flex gap-x-3  ${backgroundColor} rounded-lg p-1`}>
                <div className="w-28 min-h-full">
                    <Image
                        src={imageUrl || ' '}
                        alt="work flow"
                        layout="responsive"
                        width={90}
                        height={80}
                        className="w-full h-full rounded-lg"
                    />
                </div>
                <div>
                    <Typography
                        variant="muted"
                        color={
                            title === 'Work Flow'
                                ? 'text-[#2763CA]'
                                : title === 'Course Requirements'
                                ? 'text-orange-500'
                                : title === 'Induction Process'
                                ? 'text-red-600'
                                : title === 'Placement Info'
                                ? 'text-green-600'
                                : 'text-[#3931B5]'
                        }
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="small"
                        color={
                            title === 'Work Flow'
                                ? 'text-[#2B87F0]'
                                : title === 'Course Requirements'
                                ? 'text-orange-400'
                                : title === 'Induction Process'
                                ? 'text-red-500'
                                : title === 'Placement Info'
                                ? 'text-green-500'
                                : 'text-[#4947CD]'
                        }
                    >
                        {description}
                    </Typography>
                </div>
            </div>
        </>
    )
}
