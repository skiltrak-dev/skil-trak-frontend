import { ActionButton } from '@components'
import { ReactElement, useState } from 'react'
import { InitiateIndustryEsignModal } from '../../modal'

export const IndustryEsign = ({
    industryUserId,
    industryId,
}: {
    industryId?: number
    industryUserId?: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    const onInitiateSign = () => {
        setModal(
            <InitiateIndustryEsignModal
                industryId={industryId}
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
                text="My E-Sign"
                onClick={onInitiateSign}
            />
        </div>
    )
}
