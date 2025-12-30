import { Badge } from '@components'
import { useAppSelector } from '@redux/hooks'
import { FileText } from 'lucide-react'
import { useState } from 'react'
import { IndustryNoteModal } from '../modals'

export function AddNoteButton() {
    const [showNoteAddModal, setShowNoteAddModal] = useState(false)
    const industryUserId = useAppSelector(
        (state) => state.industry.industryDetail?.user?.id
    )

    return (
        <>
            <Badge
                onClick={() => setShowNoteAddModal(true)}
                Icon={FileText}
                className="!bg-primary !text-white cursor-pointer hover:shadow-lg transition-all active:scale-95"
                title="Note"
            >
                Note
            </Badge>

            <IndustryNoteModal
                open={showNoteAddModal}
                industryUserId={industryUserId!}
                onOpenChange={setShowNoteAddModal}
            />
        </>
    )
}
