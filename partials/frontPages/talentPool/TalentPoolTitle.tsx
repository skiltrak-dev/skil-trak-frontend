import { Typography } from '@components'
import Image from 'next/image'

export const TalentPoolTitle = ({ title }: any) => {
    return (
        <div className={`flex justify-center items-center flex-col`}>
            <Typography variant="h2" color="text-[#24556D]" capitalize>
                {title ?? 'title here'}
            </Typography>
            <Image
                src={'/images/site/home-page-v3/who-we-serve/title-line.svg'}
                alt={`title line`}
                height={18}
                width={280}
                className=""
            />
        </div>
    )
}
