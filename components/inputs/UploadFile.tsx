import { Typography } from '@components/Typography'
import Image from 'next/image'
import React from 'react'
import { AiFillDelete, AiFillFileImage } from 'react-icons/ai'

export const ObjectType = {
    COVER: 'object-cover',
    CONTAIN: 'object-contain',
}

export const UploadFile = ({
    name,
    dragging,
    file,
    handleRemove,
    fileObject,
    objectType,
}: any) => {
    const fileType = fileObject?.type?.split('/')[0]

    return (
        <div
            className={`w-full h-40 ${
                dragging ? 'bg-amber-200 border-amber-200' : 'border-blue-600'
            } flex flex-col justify-center items-center border border-dashed  rounded-md`}
        >
            {dragging ? (
                <div className="flex items-center w-full h-full justify-center">
                    <Typography
                        variant={'small'}
                        color={'text-gray-400'}
                        center
                    >
                        Drop a file here
                    </Typography>
                </div>
            ) : file ? (
                <div className="relative w-full h-full">
                    <div
                        className="absolute top-2 right-2 z-10 cursor-pointer bg-white p-1 rounded-full"
                        onClick={() => {
                            handleRemove()
                        }}
                    >
                        <AiFillDelete className=" text-lg text-red-500 " />
                    </div>
                    {fileType === 'image' ? (
                        <Image
                            fill
                            src={file}
                            alt={'filename || fileName'}
                            className={`w-full h-full ${
                                (ObjectType as any)[objectType || 'CONTAIN']
                            }`}
                        />
                    ) : (
                        ''
                    )}
                    <div className="absolute bottom-2 left-2 bg-white rounded-md px-3 py-0.5">
                        <Typography variant={'small'} color={'text-primary'}>
                            <label
                                htmlFor={`file_id_${name}`}
                                className="cursor-pointer"
                            >
                                Change
                            </label>
                        </Typography>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-y-2 items-center">
                    <label
                        htmlFor={`file_id_${name}`}
                        className="cursor-pointer"
                    >
                        <AiFillFileImage className="text-primary" size={50} />
                    </label>
                    <div>
                        <label
                            htmlFor={`file_id_${name}`}
                            className="cursor-pointer"
                        >
                            <Typography
                                variant={'subtitle'}
                                color={'text-primary'}
                                center
                            >
                                Select your file to Upload
                            </Typography>
                        </label>
                        <Typography
                            variant={'small'}
                            color={'text-gray-400'}
                            center
                        >
                            Or drag and drop it here
                        </Typography>
                    </div>
                </div>
            )}
        </div>
    )
}