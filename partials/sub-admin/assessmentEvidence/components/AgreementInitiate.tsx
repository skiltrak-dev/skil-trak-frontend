import { AuthorizedUserComponent, Button } from '@components'
import { ReactElement, useState } from 'react'
import { InitiateSigningModal } from '../modal'
import { UserRoles } from '@constants'

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
                folder={folder}
            />
        )
    }
    return (
        <>
            {modal}
            <AuthorizedUserComponent excludeRoles={[UserRoles.OBSERVER]}>
                <div className="p-3 flex justify-center items-center h-full">
                    <div className="w-60 border border-dashed h-24 flex flex-col gap-y-2 justify-center items-center">
                        <Button
                            text="Initiate Signing"
                            onClick={() => {
                                onInitiateSigning()
                            }}
                        />
                    </div>
                </div>
            </AuthorizedUserComponent>
        </>
    )
}
