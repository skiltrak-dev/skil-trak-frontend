import { useEffect } from 'react'
// Icons
import { ShowErrorNotifications } from '@components'

import { FileUpload } from '@hoc'

// components
import { Typography } from 'components'
import { Button } from '@components/buttons'
import { MdCloudUpload } from 'react-icons/md'
import { UploadAgreement } from './UploadAgreement'
import { useUploadAgreementMutation } from '@queries'
import { useNotification } from '@hooks'

export const StepSignAgreement = ({
    appliedIndustryId,
}: {
    appliedIndustryId: any
}) => {
    const { notification } = useNotification()
    const [agreementSign, agreementSignResult] = useUploadAgreementMutation()
    useEffect(() => {
        if (agreementSignResult?.isSuccess) {
            notification.success({
                title: 'Agreement File Uploaded',
                description: 'Agreement File Uploaded Successfully',
            })
        }
    }, [agreementSignResult])

    const UploadAgreementFile = ({ name }: any) => {
        return (
            <UploadAgreement
                name={name}
                loading={agreementSignResult.isLoading}
            />
        )
    }
    return (
        <>
            <ShowErrorNotifications result={agreementSignResult} />
            <div className="border border-pink-700  px-2 py-3 rounded-md text-sm">
                <p className="text-pink-700 font-medium">Sign Agreement</p>
                <p className="text-gray-500">
                    You need to sign agreement to start placement
                </p>

                <div className="mt-4">
                    <FileUpload
                        onChange={(doc: any) => {
                            const formData = new FormData()
                            formData.append(`file`, doc)
                            if (doc.type === 'application/pdf') {
                                agreementSign({
                                    appliedIndustryId,
                                    body: formData,
                                })
                            } else {
                                notification.error({
                                    title: 'Wrong File Selected',
                                    description:
                                        'You selected a wrong file, Please select a pdf file',
                                })
                            }
                        }}
                        name={'file'}
                        component={UploadAgreementFile}
                        acceptTypes={['pdf']}
                    />
                </div>
            </div>
        </>
    )
}
