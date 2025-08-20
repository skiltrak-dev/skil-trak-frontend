import { ActionButton } from '@components'
import { ReactElement, useState } from 'react'
import { InitiateIndustryEsignModal } from '../../modal'

export const IndustryEsign = ({
    industryUserId,
}: {
    industryUserId?: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    const onInitiateSign = () => {
        setModal(
            <InitiateIndustryEsignModal
                onCancel={onCancel}
                industryUserId={Number(industryUserId)}
            />
        )
    }
    return (
        <div>
            {modal}
            <ActionButton
                variant="info"
                text="Initiate E-Sign"
                onClick={onInitiateSign}
            />
        </div>
    )
}
