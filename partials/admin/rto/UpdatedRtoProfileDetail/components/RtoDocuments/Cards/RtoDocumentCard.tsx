import React from 'react'
import Image from 'next/image'
import { LoadingAnimation, Typography } from '@components'
import { CgFileDocument } from 'react-icons/cg'
import { IoMdDocument } from 'react-icons/io'

export const RtoDocumentCard = ({
    title,
    name,
    file,
    loading,
}: {
    file: string
    name: string
    title: string
    loading?: boolean
}) => {
    const docs = ['pdf', 'document', 'msword']
    const images = ['jpg', 'png', 'jpeg', 'JPG', 'jfif', 'webp', 'heic']
    const videos = [
        'mp4',
        'mkv',
        'avi',
        'mpeg',
        'quicktime',
        'mov',
        'octet-stream',
    ]


    const extension = file
        ?.replaceAll('{"', '')
        .replaceAll('"}', '')
        ?.split('.')
        .reverse()[0]

    return (
        <div className="bg-[#F8F8FF] relative p-4 rounded border-2 border-[#384EB74D] border-dashed flex flex-col items-center">
            {loading && (
                <div className="w-full h-full absolute top-0 right-0 flex justify-center items-center bg-[#00000040]">
                    <LoadingAnimation size={60} />
                </div>
            )}
            <div className="flex flex-col items-center gap-y-2">
                <CgFileDocument className="text-2xl" />
                <Typography color="text-[#374151]" medium>
                    {title}
                </Typography>
            </div>

            {/*  */}
            {file ? (
                <div className="mt-2 h-10 w-24">
                    {images?.includes(extension) ? (
                        <Image
                            alt={''}
                            width={0}
                            height={0}
                            sizes={'100vw 100vh'}
                            className={'h-full w-full object-cover'}
                            src={file}
                        />
                    ) : docs?.includes(extension) ? (
                        <div className=" h-full flex justify-center items-center w-full bg-slate-200 text-gray-500">
                            <IoMdDocument className="text-2xl text-gray" />
                        </div>
                    ) : (
                        ''
                    )}
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
                        {file ? 'Edit' : 'Browse'}
                    </label>
                </Typography>
            </div>
            <div className="mt-4">
                <Typography variant="small" color={'text-[#676767]'}>
                    Supported format : PNG
                </Typography>
            </div>
        </div>
    )
}
