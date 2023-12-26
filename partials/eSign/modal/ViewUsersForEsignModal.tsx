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
    document,
    onClick,
}: {
    document: any
    onClick: () => void
}) => {
    const [isSigning, setIsSigning] = useState<boolean>(false)

    return (
        <GlobalModal>
            <div className="p-8">
                <div>
                    <Typography color="text-[#6B7280]" variant="label" medium>
                        Following documents are pending to be signed
                    </Typography>

                    <div className="flex justify-between items-center py-4 mt-4">
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
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
