import { GlobalModal, ShowErrorNotifications, Typography } from '@components'
import { AddSectoIndustryChecksForm } from '@partials/admin/sector/form'
import React from 'react'
import { MdCancel } from 'react-icons/md'
import { IndustryApi } from '@queries'
import { useNotification } from '@hooks'

export const UpdateCustomSectorFolderModal = ({
    doc,
    onCancel,
    industryId,
}: {
    doc: any
    industryId: number
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [updateCustomDocs, updateCustomDocsResult] =
        IndustryApi.Folders.updateIndustrySectorDoc()
    const onSubmit = async (values: any) => {
        const res: any = await updateCustomDocs({
            id: Number(doc?.id),
            industry: industryId,
            ...values,
        })

        if (res?.data) {
            notification.success({
                title: 'Doc Updated',
                description: 'Doc Updated Successfully',
            })
            onCancel()
        }
    }
    return (
        <GlobalModal>
            <ShowErrorNotifications result={updateCustomDocsResult} />
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
                        edit
                        initialValues={doc}
                        onSubmit={onSubmit}
                        onCancel={() => onCancel()}
                        result={updateCustomDocsResult}
                    />
                </div>
            </div>
        </GlobalModal>
    )
}
