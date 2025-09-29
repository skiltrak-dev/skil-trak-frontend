import { ActionButton } from '@components'
import { ReactElement, useState } from 'react'
import { InitiateIndustryEsignModal } from '../../modal'

export const IndustryEsign = ({
    industryId,
    industryUserId,
}: {
    industryId?: number
    industryUserId?: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    const onInitiateSign = () => {
        setModal(
            <InitiateIndustryEsignModal
                onCancel={onCancel}
                industryId={industryId}
                industryUserId={Number(industryUserId)}
            />
        )
    }
    return (
        <div>
            {modal}
            <ActionButton
                variant="info"
                text="My E-Sign"
                onClick={onInitiateSign}
            />
        </div>
    )
}
