import { useEffect } from 'react'
// Icons
import { ShowErrorNotifications } from '@components'

import { FileUpload } from '@hoc'

// components
import { Typography } from '@components'
import { Button } from '@components/buttons'
import { MdCloudUpload } from 'react-icons/md'
import { UploadAgreement } from './UploadAgreement'
import { useUploadAgreementMutation } from '@queries'
import { useNotification } from '@hooks'
import { Course } from '@types'

export const StepSignAgreement = ({
    appliedIndustryId,
    course,
}: {
    appliedIndustryId: any
    course: Course
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
                <p className="text-pink-700 font-medium">
                    Agreement Instructions{' '}
                </p>
                <p className="text-gray-500">
                    <strong>Have a soft copy?</strong> Click Upload Agreement
                    below. <br /> <strong>Don’t have one?</strong> Wait for your
                    coordinator to send the e-sign link.
                </p>

                <div className="mt-4">
                    <FileUpload
                        onChange={(doc: any) => {
                            const formData = new FormData()
                            formData.append(`file`, doc)
                            if (doc.type === 'application/pdf') {
                                agreementSign({
                                    appliedIndustryId,
                                    course: course?.id,
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
