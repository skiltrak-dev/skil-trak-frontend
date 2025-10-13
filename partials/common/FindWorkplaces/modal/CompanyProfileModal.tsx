import { Modal } from '@components'
import React from 'react'
import { ResultProfileView } from '..'

interface CompanyProfileModalProps {
    onCancel: () => void
    selectedCompany: any
}

export const CompanyProfileModal: React.FC<CompanyProfileModalProps> = ({
    onCancel,
    selectedCompany,
}) => {
    return (
        <Modal
            showActions={false}
            title="Company Profile"
            onCancelClick={onCancel}
            subtitle="Detailed information about the selected company"
        >
            <ResultProfileView selectedCompany={selectedCompany} />
        </Modal>
    )
}
