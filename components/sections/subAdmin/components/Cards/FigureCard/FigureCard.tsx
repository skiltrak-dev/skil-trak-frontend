import Image from 'next/image'
// import CountUp from 'react-countup'

import { Card } from '@components/cards'
import { PuffLoader } from 'react-spinners'
import Link from 'next/link'

type FigureCardProps = {
    imageUrl?: string | undefined
    count: number
    title: string
    loading?: boolean
    link?: string
}

export const FigureCard = ({
    imageUrl,
    count,
    title,
    loading,
    link = '/#',
}: FigureCardProps) => {
    return (
        <Link legacyBehavior href={link || '/#'}>
            <a className="w-full">
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
                                    {/* <CountUp end={count} /> */}
                                    {count}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 leading-3 uppercase">
                                {title}
                            </p>
                        </div>
                    </div>
                </Card>
            </a>
        </Link>
    )
}
