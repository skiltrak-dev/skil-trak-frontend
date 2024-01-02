import {
    BackButton,
    Button,
    GlobalModal,
    InitialAvatar,
    Typography,
} from '@components'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { FaFileSignature } from 'react-icons/fa'
import { IoIosDocument } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { DocumentSignature } from '../components'
import ReactSignatureCanvas from 'react-signature-canvas'
import { Router, useRouter } from 'next/router'

const UserCellInfo = ({ profile }: { profile: any }) => (
    <div>
        <Typography capitalize variant="label">
            {profile?.user?.role}
        </Typography>
        <div className="flex items-center gap-x-2">
            <div className="shadow-inner-image rounded-full">
                {profile?.user?.name && (
                    <InitialAvatar
                        name={profile?.user?.name}
                        imageUrl={profile?.user?.avatar}
                    />
                )}
            </div>
            <div>
                {profile?.studentId && (
                    <p className={'font-light text-[10px] text-gray-600'}>
                        {profile?.studentId}
                    </p>
                )}
                <p className={'font-medium'}>{profile?.user?.name}</p>
                <div className="font-medium text-xs text-gray-500">
                    <p className="flex items-center gap-x-1">
                        <span>
                            <MdEmail />
                        </span>
                        {profile?.user?.email}
                    </p>
                </div>
            </div>
        </div>
    </div>
)

export const ViewUsersForEsignModal = ({
    documents,
    onClick,
    route,
}: {
    documents: any
    onClick: () => void
    route: string
}) => {
    const [isSigning, setIsSigning] = useState<boolean>(false)

    const router = useRouter()

    return (
        <GlobalModal>
            <div className="p-8 h-[85vh] overflow-auto custom-scrollbar">
                <div>
                    <Typography color="text-[#6B7280]" variant="label" medium>
                        Following documents are pending to be signed
                    </Typography>

                    <p className="text-sm font-bold">
                        {documents?.length} Pending Documents Esigns
                    </p>

                    <div className='mt-3.5'>
                        {documents?.map((document: any) => (
                            <div className="pb-2">
                                <div className="grid grid-cols-2 gap-1.5">
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Template
                                        </p>
                                        <p className="text-sm text-gray-700 font-semibold">
                                            {' '}
                                            {document?.template?.name}{' '}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Course
                                        </p>
                                        <p className="text-sm text-gray-700 font-semibold">
                                            {document?.template?.course?.title}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Folder
                                        </p>
                                        <p className="text-sm text-gray-700 font-semibold">
                                            {document?.template?.folder?.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 ">
                                    {document?.signers?.map((signer: any) => (
                                        <div className="flex items-center gap-x-1">
                                            {signer?.user?.name && (
                                                <InitialAvatar
                                                    name={signer?.user?.name}
                                                    imageUrl={
                                                        signer?.user?.avatar
                                                    }
                                                />
                                            )}
                                            <div>
                                                <h3 className="text-sm font-bold ">
                                                    {signer?.user?.name}
                                                </h3>
                                                <p className="text-xs text-gray-400">
                                                    {signer?.user?.email}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {signer?.user?.role}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-end mt-1">
                                    <Button
                                        text={'Sign Document'}
                                        onClick={() => {
                                            router.push(
                                                `${route}/${document?.id}`
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* <div className="flex justify-between items-center py-4 mt-4">
                        <div className="flex items-center gap-x-2">
                            <FaFileSignature />
                            <Typography semibold>Agreement</Typography>
                        </div>
                        <Typography variant="small">
                            {moment(new Date()).format('DD MMM, YYYY')}
                        </Typography>
                    </div>

                    <Typography variant="label" color={'text-[#6B7280]'}>
                        Signing Parties
                    </Typography>

                    <div className="mt-4 flex flex-col gap-y-4">
                        {document?.signers?.map((signer: any) => (
                            <UserCellInfo profile={signer} />
                        ))}
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button
                            text="Sign Document"
                            onClick={() => {
                                onClick()
                            }}
                        />
                    </div> */}
                </div>
            </div>
        </GlobalModal>
    )
}
