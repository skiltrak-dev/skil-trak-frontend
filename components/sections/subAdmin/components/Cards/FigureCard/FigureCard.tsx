import Image from 'next/image'
import CountUp from 'react-countup'

import { Card } from '@components/cards'
import { PuffLoader } from 'react-spinners'

type FigureCardProps = {
    imageUrl?: string | undefined
    count: number
    title: string
    loading?: boolean
}

export const FigureCard = ({
    imageUrl,
    count,
    title,
    loading,
}: FigureCardProps) => {
    return (
        <>
            <Card>
                <div className="flex justify-between">
                    {imageUrl && (
                        <div className="flex items-center gap-x-2 justify-between">
                            <Image
                                src={imageUrl || ''}
                                alt={title}
                                width={48}
                                height={48}
                            />
                        </div>
                    )}

                    <div className="flex flex-col items-end">
                        {loading ? (
                            <div className="h-[36px]">
                                <PuffLoader size={28} />
                            </div>
                        ) : (
                            <p className="text-3xl font-bold">
                                <CountUp end={count} />
                            </p>
                        )}
                        <p className="text-xs text-gray-500 leading-3 uppercase">
                            {title}
                        </p>
                    </div>
                </div>
            </Card>
        </>
    )
}
