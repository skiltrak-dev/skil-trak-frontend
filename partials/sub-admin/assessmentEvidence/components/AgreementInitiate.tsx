import { Button, Typography } from '@components'
import React, { ReactElement, useState } from 'react'
import { InitiateSigningModal } from '../modal'

export const AgreementInitiate = ({
    rto,
    folder,
    courseId,
    onEsignRefetch,
}: {
    rto: any
    folder: any
    courseId: any
    onEsignRefetch: () => void
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancelModal = () => {
        onEsignRefetch()
        setModal(null)
    }

    const onInitiateSigning = () => {
        setModal(
            <InitiateSigningModal
                onCancel={() => {
                    onCancelModal()
                }}
                courseId={courseId}
                rto={rto}
                folder={folder}
            />
        )
    }
    return (
        <>
            {modal}
            <div className="p-3 flex justify-center items-center h-full">
                <div className="w-60 border border-dashed h-48 flex flex-col gap-y-2 justify-center items-center">
                    <Button
                        text="Initiate Signing"
                        onClick={() => {
                            onInitiateSigning()
                        }}
                    />
                    {/* <Typography variant="small">Or</Typography>
                    <Typography variant="small" color={'text-info'}>
                        Upload
                    </Typography> */}
                </div>
            </div>
        </>
    )
}
