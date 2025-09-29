import { Modal } from '@components'
import { FiltersPanel } from '../components'

export const RunListingAutomationModal = ({
    onCancel,
}: {
    onCancel: () => void
}) => {
    return (
        <Modal
            title="Filters Panel"
            subtitle="Configure your search parameters to find the perfect workplace opportunities"
            showActions={false}
            onCancelClick={onCancel}
        >
            <div className="max-h-[70vh] lg:max-h-[80vh] w-full lg:w-[900px] overflow-auto custom-scrollbar">
                <FiltersPanel onClose={onCancel} />
            </div>
        </Modal>
    )
}
