import { ActionButton, Typography } from '@components'
import { CommonApi } from '@queries'
import { ReactElement, useState } from 'react'
import { BiSolidPencil } from 'react-icons/bi'
import { AddIndustryWPTypeModal, DeleteIndustryWPTypeModal } from '../../modal'
import { MdDelete } from 'react-icons/md'

export const IndustryWpType = ({
    industryUserId,
}: {
    industryUserId: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const industryWpType =
        CommonApi.Industries.getIndustryWPType(industryUserId)

    const onCancel = () => setModal(null)

    const onAddIndustryWPType = (typeId?: number) => {
        setModal(
            <AddIndustryWPTypeModal
                onCancel={onCancel}
                industryUserId={industryUserId}
                typeId={typeId}
            />
        )
    }
    const onDeleteIndustryWPType = (type: any) => {
        setModal(
            <DeleteIndustryWPTypeModal
                onCancel={onCancel}
                industryUserId={industryUserId}
            />
        )
    }
    return (
        <div>
            {modal}
            {industryWpType?.data && industryWpType?.isSuccess ? (
                <div>
                    <Typography variant="xxs" color="text-gray-500">
                        Industry Type
                    </Typography>
                    <div className="flex items-center gap-x-1">
                        <Typography variant="small">
                            {industryWpType?.data?.name}
                        </Typography>
                        <div
                            className="rounded-full p-1 shadow-lg bg-white cursor-pointer"
                            onClick={() => {
                                onAddIndustryWPType(industryWpType?.data?.id)
                            }}
                        >
                            <BiSolidPencil className="text-info" />
                        </div>
                        <div
                            className="rounded-full p-1 shadow-lg bg-white cursor-pointer"
                            onClick={() => {
                                onDeleteIndustryWPType(industryWpType?.data)
                            }}
                        >
                            <MdDelete className="text-error" />
                        </div>
                    </div>
                </div>
            ) : (
                <ActionButton
                    onClick={() => {
                        onAddIndustryWPType()
                    }}
                >
                    Add Type
                </ActionButton>
            )}
        </div>
    )
}
