import { RtoApi } from '@queries'
import { MdCancel } from 'react-icons/md'
import { UploadInsuranceDocForm } from '../form'
import { GlobalModal, ShowErrorNotifications, Typography } from '@components'
import { useNotification } from '@hooks'

export const UploadDocModal = ({
    onCancel,
    insuranceDocumentType,
}: {
    onCancel: () => void
    insuranceDocumentType: number
}) => {
    const [upload, uploadDoc] = RtoApi.Insurance.uploadInsuranceDocs()

    const { notification } = useNotification()

    const onSubmit = async (values: any) => {
        const formData = new FormData()

        const { file, ...rest } = values

        Object.entries(rest).forEach(([key, value]: any) => {
            formData.append(key, value)
        })
        formData?.append('file', file?.[0])
        formData?.append('insuranceDocumentType', insuranceDocumentType + '')

        const res: any = await upload(formData)

        if (res?.data) {
            notification.success({
                title: 'Document Uploaded',
                description: 'Document Uploaded Successfully',
            })
            onCancel()
        }
    }
    return (
        <>
            <ShowErrorNotifications result={uploadDoc} />
            <GlobalModal>
                <div className="max-w-2xl p-5 relative flex flex-col gap-y-2 py-5">
                    {onCancel ? (
                        <MdCancel
                            onClick={() => {
                                if (onCancel) {
                                    onCancel()
                                }
                            }}
                            className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                        />
                    ) : null}
                    <div className="flex flex-col gap-y-2 justify-between items-center">
                        <div className="mx-auto">
                            <Typography center semibold>
                                Upload Insurance Document
                            </Typography>
                        </div>
                    </div>
                    <div>
                        <UploadInsuranceDocForm
                            result={uploadDoc}
                            onSubmit={onSubmit}
                        />
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}
