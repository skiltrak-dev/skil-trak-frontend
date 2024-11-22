import { Button, GlobalModal, Typography } from '@components'
import Image from 'next/image'
import React, { useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { DocUpload } from '../components'

export const EmployerDocuments = ({
    onCancel,
    action,
    result,
}: {
    result: any
    action: any
    onCancel: () => void
}) => {
    const [files, setFiles] = useState({})
    console.log({ files })
    return (
        <GlobalModal>
            <div className="w-full max-w-5xl px-24">
                <MdCancel
                    onClick={onCancel}
                    className="absolute top-2 right-2 transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                />

                <div className="py-6 px">
                    <div className="flex flex-col items-center gap-y-6">
                        <Image
                            src={'/images/workplace/document.png'}
                            alt={''}
                            width={50}
                            height={50}
                        />
                        <Typography variant="title" normal>
                            Please upload one of the following employer
                            documents to add the workplace
                        </Typography>
                    </div>

                    {/*  */}
                    <div className="flex flex-col items-center gap-y-3 mt-7">
                        <div className="w-full">
                            <DocUpload
                                name="paySlip"
                                title="Pay Slip"
                                setFile={(e) => {
                                    setFiles((files) => {
                                        return {
                                            ...files,
                                            paySlip: e,
                                        }
                                    })
                                }}
                            />
                        </div>
                        <Typography variant="h4" color="text-[#6F6C90]" normal>
                            OR
                        </Typography>
                        <div className="w-full">
                            <DocUpload
                                name="employmentContract"
                                title="Employment Contract"
                                setFile={(e) => {
                                    setFiles((files) => ({
                                        ...files,
                                        employmentContract: e,
                                    }))
                                }}
                            />
                        </div>
                    </div>

                    {/*  */}
                    <div className="w-40 mt-6 mx-auto">
                        <Button
                            text={'Proceed'}
                            fullWidth
                            loading={result?.isLoading}
                            disabled={result?.isLoading}
                            onClick={() => {
                                action()
                            }}
                        />
                    </div>

                    {/*  */}
                    <div className="max-w-lg w-full mx-auto mt-6">
                        <Typography center>
                            If you do not have these documents, please contact
                            Skiltrak at{' '}
                            <span className="font-bold">(03) 9363-6378</span>.
                            Our coordinator will be happy to assist you.
                        </Typography>
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
