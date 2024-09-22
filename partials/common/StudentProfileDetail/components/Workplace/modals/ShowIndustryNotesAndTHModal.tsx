import { Button, Checkbox, GlobalModal, Typography } from '@components'
import { useNotification } from '@hooks'
import { IndustryShiftingHours } from '@partials/common/IndustryProfileDetail/components'
import { ReactElement, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { IndustryPinnedNotes } from '../components'
import { SelectAppointDateModal } from './SelectAppointDateModal'

export const ShowIndustryNotesAndTHModal = ({
    industryUserName,
    onCancel,
    industryUserId,
    workplaceId,
    industryId,
}: {
    industryUserName: string
    industryUserId: number
    industryId: number
    workplaceId: number
    onCancel: (val?: boolean) => void
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [isChecked, setIsChecked] = useState<boolean>(false)

    const onCancelClicked = () => setModal(null)

    return (
        <>
            {modal}
            <GlobalModal>
                <div className="relative w-full lg:max-w-5xl h-full p-2">
                    <MdCancel
                        onClick={() => {
                            onCancel()
                        }}
                        className="absolute top-2 right-2 transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                    <div className="py-2 border-b">
                        <Typography bold>{industryUserName}</Typography>
                    </div>
                    <div className="grid grid-cols-5 divide-x-2 h-[380px] overflow-auto custom-scrollbar">
                        <div className="col-span-3">
                            <IndustryShiftingHours
                                showTitle={false}
                                industryUserId={industryUserId}
                            />
                        </div>
                        <div className="col-span-2">
                            <IndustryPinnedNotes
                                industryUserId={industryUserId}
                            />
                        </div>
                    </div>

                    {/*  */}
                    <div className="py-3 flex flex-col gap-y-2">
                        <Checkbox
                            name="check"
                            onChange={(e: any) => {
                                setIsChecked(e?.target?.checked)
                            }}
                            label={
                                <>
                                    I hereby confirm that I have thoroughly
                                    reviewed and understood all pinned notes and
                                    the official trading hours of{' '}
                                    <strong>{industryUserName}</strong>.
                                </>
                            }
                            showError={false}
                        />
                        <div className={'flex items-center gap-x-4  '}>
                            <Button
                                text="Cancel"
                                variant="error"
                                onClick={() => {
                                    onCancel()
                                }}
                            />
                            <Button
                                text={'Proceed'}
                                variant="success"
                                onClick={() => {
                                    setModal(
                                        <SelectAppointDateModal
                                            onCancel={onCancelClicked}
                                            industryId={industryId}
                                            workplaceId={workplaceId}
                                        />
                                    )
                                }}
                                disabled={!isChecked}
                            />
                        </div>
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}
