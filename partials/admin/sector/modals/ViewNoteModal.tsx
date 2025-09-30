import { Badge, Button, Modal } from '@components'
import { Sector } from '@types'
import { BiPencil } from 'react-icons/bi'

export const ViewNoteModal = ({
    sector,
    onCancel,
    onAddNote,
}: {
    onAddNote: (sector: Sector) => void
    sector: Sector
    onCancel: () => void
}) => {
    return (
        <Modal
            title="View Sector Keywords"
            subtitle=""
            onCancelClick={onCancel}
            showActions={false}
        >
            <div className="flex flex-col gap-y-3 items-start gap-x-2">
                {sector?.keywords && sector?.keywords && (
                    <div className="flex items-center gap-3 flex-wrap">
                        {sector?.keywords?.map((keyword) => (
                            <Badge text={keyword} size="md" variant="info" />
                        ))}
                    </div>
                )}

                <div className="flex justify-end w-full">
                    <div className="w-40">
                        <Button
                            fullWidth
                            Icon={BiPencil}
                            variant="primaryNew"
                            text="Edit"
                            onClick={() => {
                                onAddNote(sector)
                            }}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
