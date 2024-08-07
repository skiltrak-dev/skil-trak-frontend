import {
    Button,
    Checkbox,
    GlobalModal,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useAddExistingIndustriesMutation } from '@queries'
import { MdCancel } from 'react-icons/md'
import { IndustryPinnedNotes } from '../components'
import { IndustryShiftingHours } from '@partials/common/IndustryProfileDetail/components'
import { useNotification } from '@hooks'
import { useState } from 'react'

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
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const { notification } = useNotification()

    const [addExistingIndustry, addExistingIndustryResult] =
        useAddExistingIndustriesMutation()

    const onApply = () => {
        addExistingIndustry({
            workplaceId,
            industryId,
        }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Industry Added Successfully',
                    description: 'Industry Added Successfully',
                })

                onCancel(true)
            }
        })
    }

    return (
        <GlobalModal>
            <ShowErrorNotifications result={addExistingIndustryResult} />
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
                        <IndustryPinnedNotes industryUserId={industryUserId} />
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
                                I hereby confirm that I have thoroughly reviewed
                                and understood all pinned notes and the official
                                trading hours of{' '}
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
                                onApply()
                            }}
                            loading={addExistingIndustryResult.isLoading}
                            disabled={
                                addExistingIndustryResult.isLoading ||
                                !isChecked
                            }
                        />
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
