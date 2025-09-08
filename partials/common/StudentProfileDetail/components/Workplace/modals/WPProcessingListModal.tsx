import { GlobalModal } from '@components'
import { MdCancel } from 'react-icons/md'
import { WPProcessingList } from '../components/IndustryDetail/components/WPProcessingList'

export const WPProcessingListModal = ({
    onCancel,
    workplaceId,
}: {
    workplaceId: number
    onCancel: () => void
}) => {
    return (
        <GlobalModal>
            <MdCancel
                onClick={() => {
                    onCancel()
                }}
                className="transition-all duration-500 text-gray-400 hover:text-black text-2xl cursor-pointer hover:rotate-90 absolute top-2 right-2 z-50"
            />

            <WPProcessingList workplaceId={workplaceId} />
        </GlobalModal>
    )
}
