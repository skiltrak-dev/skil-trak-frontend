import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { AddIndustryWPTypeModal } from '@partials/common/IndustryProfileDetail/modal'
import { useUpdateWorkplaceStatusMutation } from '@queries'
import { ReactElement, useState } from 'react'
import { MdCancel, MdOutlineError } from 'react-icons/md'

export const WorkplaceTypeNotFoundModal = ({
    onCancel,
    industryName,
    industryUserId,
}: {
    industryUserId: number
    industryName: string
    onCancel: () => void
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [updateStatus, updateStatusResult] =
        useUpdateWorkplaceStatusMutation()

    const onAddIndustryWPType = () => {
        setModal(
            <AddIndustryWPTypeModal
                onCancel={onCancel}
                industryUserId={industryUserId}
            />
        )
    }
    return (
        <>
            {modal}
            <GlobalModal>
                <ShowErrorNotifications result={updateStatusResult} />
                <div className="max-w-4xl px-5 py-6 relative flex flex-col gap-y-2 ">
                    <MdCancel
                        onClick={onCancel}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                    />
                    <div className="lg:px-32">
                        <div className="flex flex-col gap-y-3.5 justify-between items-center">
                            <MdOutlineError className="text-error text-8xl" />
                            <div className="mx-auto">
                                <Typography variant="h4" center semibold>
                                    Industry Workplace Type Not Found
                                </Typography>
                            </div>
                        </div>
                        <div className="mt-2">
                            <Typography center variant="label" block>
                                Add Industry Workplace Type for{' '}
                                <span className="font-bold">
                                    {industryName}
                                </span>
                            </Typography>
                        </div>

                        <div className="flex items-center justify-center gap-x-5 mt-5 mb-4">
                            <Button
                                text="Add Industry Type"
                                onClick={() => {
                                    onAddIndustryWPType()
                                }}
                            />
                        </div>
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}
