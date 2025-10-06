import { Typography } from '@components'
import { useNotification } from '@hooks'
import { ReactElement, useState } from 'react'
import { IndustryListingCallModal } from '../modal'
import { CopyData } from './CopyData'

export const PhoneNumberCell = ({
    id,
    note,
    phoneNumber,
}: {
    id: number
    note: string
    phoneNumber: string
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { notification } = useNotification()

    const onModalCancelClicked = () => setModal(null)

    const onPhoneClicked = (id: number, note: string) => {
        setModal(
            <IndustryListingCallModal
                note={note}
                id={id}
                onCancel={onModalCancelClicked}
            />
        )
    }
    return (
        <>
            {modal}
            <div className="group flex items-center gap-x-1">
                <div
                    className="whitespace-pre  "
                    onClick={() => {
                        onPhoneClicked(id, note)
                    }}
                >
                    <Typography variant="label" cursorPointer>
                        {phoneNumber}
                    </Typography>
                </div>
                <CopyData text={phoneNumber} type={'Phone Number'} />
            </div>
        </>
    )
}
