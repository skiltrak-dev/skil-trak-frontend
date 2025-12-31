import { GlobalModal, Typography } from '@components'
import { Industry } from '@types'
import { IndustryInfoMessageForm } from '../components/IndustryInfoMessage'

export const IndustryInfoMessageModal = ({
    onCancel,
    industry,
}: {
    industry: Industry
    onCancel: () => void
}) => {
    return (
        <GlobalModal onCancel={onCancel} className="!p-4">
            <Typography variant="title">Send Info Message</Typography>
            <div className="py-4 max-h-[75vh] overflow-auto custom-scrollbar">
                <IndustryInfoMessageForm onCancel={onCancel} industry={industry} />
            </div>
        </GlobalModal>
    )
}
