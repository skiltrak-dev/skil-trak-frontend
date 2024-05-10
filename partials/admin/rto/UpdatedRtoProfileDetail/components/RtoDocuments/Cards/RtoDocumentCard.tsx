import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'
import { CgFileDocument } from 'react-icons/cg'

export const RtoDocumentCard = ({
    title,
    name,
    file,
}: {
    file: string
    name: string
    title: string
}) => {
    console.log({ file })
    return (
        <div className="bg-[#F8F8FF] p-4 rounded border border-dashed flex flex-col items-center">
            <div className="flex flex-col items-center gap-y-2">
                <CgFileDocument className="text-2xl" />
                <Typography color="text-[#374151]" medium>
                    {title}
                </Typography>
            </div>

            {/*  */}
            {file ? (
                <div>
                    <Image
                        alt={''}
                        width={0}
                        height={0}
                        sizes={'100vw 100vh'}
                        className={'h-10 w-24 object-cover'}
                        src={file}
                    />
                </div>
            ) : null}

            <div className="mt-3.5">
                <Typography
                    underline
                    variant="small"
                    color={'text-primaryNew-light'}
                >
                    <label
                        htmlFor={`file_id_${name}`}
                        className="cursor-pointer"
                    >
                        Browse
                    </label>
                </Typography>
            </div>
            <div className="mt-4">
                <Typography variant="small" color={'text-[#676767]'}>
                    Supported formate : PNG
                </Typography>
            </div>
        </div>
    )
}
