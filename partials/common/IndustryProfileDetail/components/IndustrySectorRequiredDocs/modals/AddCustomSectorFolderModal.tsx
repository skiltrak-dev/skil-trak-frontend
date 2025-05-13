import React from 'react'
import { IndustryApi } from '@queries'
import { useNotification } from '@hooks'
import { MdCancel } from 'react-icons/md'
import { AddSectoIndustryChecksForm } from '@partials/admin/sector/form'
import { GlobalModal, ShowErrorNotifications, Typography } from '@components'

export const AddCustomSectorFolderModal = ({
    onCancel,
    selectedSector,
    industryId,
}: {
    industryId: number
    selectedSector: number | null
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [addCustomDocs, addCustomDocsResult] =
        IndustryApi.Folders.addCustomIndustryDocs()
    const onSubmit = async (values: any) => {
        const res: any = await addCustomDocs({
            id: Number(selectedSector),
            industry: industryId,
            ...values,
        })

        if (res?.data) {
            notification.success({
                title: 'Doc Added',
                description: 'Doc Added Successfully',
            })
            onCancel()
        }
    }
    return (
        <GlobalModal>
            <ShowErrorNotifications result={addCustomDocsResult} />
            <div className="relative p-5">
                <MdCancel
                    onClick={() => {
                        if (onCancel) {
                            onCancel()
                        }
                    }}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="mt-4">
                    <Typography variant={'muted'} color={'text-gray-400'}>
                        Add Industry Checks
                    </Typography>
                    <AddSectoIndustryChecksForm
                        onSubmit={onSubmit}
                        result={addCustomDocsResult}
                        onCancel={() => onCancel()}
                    />
                </div>
            </div>
        </GlobalModal>
    )
}
