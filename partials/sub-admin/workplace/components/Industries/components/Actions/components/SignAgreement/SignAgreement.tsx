import { useEffect } from 'react'
// Icons
import { ShowErrorNotifications } from '@components'

import { FileUpload } from '@hoc'

// components
import { useNotification } from '@hooks'
import { useAgrementSignMutation } from '@queries'
import { UploadAgreement } from './UploadAgreement'

export const SignAgreement = ({
    studentId,
    appliedIndustryId,
    student,
}: {
    studentId: any
    appliedIndustryId: any
    student: any
}) => {
    const { notification } = useNotification()
    const [agrementSign, agrementSignResult] = useAgrementSignMutation()

    useEffect(() => {
        if (agrementSignResult?.isSuccess) {
            notification.success({
                title: 'Agreement File Uploaded',
                description: 'Agreement File Uploaded Successfully',
            })
        }
    }, [agrementSignResult])

    const UploadAgreementFile = ({ name }: any) => {
        return (
            <UploadAgreement
                name={name}
                loading={agrementSignResult.isLoading}
            />
        )
    }

    return (
        <>
            <ShowErrorNotifications result={agrementSignResult} />
            <FileUpload
                onChange={(doc: any) => {
                    const formData = new FormData()
                    formData.append(`file`, doc)
                    if (doc.type === 'application/pdf') {
                        agrementSign({
                            studentId,
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
                name={studentId + appliedIndustryId + student?.user?.name}
                component={UploadAgreementFile}
                multiple
                acceptTypes={['pdf']}
            />
        </>
    )
}
