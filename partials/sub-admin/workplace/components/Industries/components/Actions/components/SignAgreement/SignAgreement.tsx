import { useEffect } from 'react'
// Icons
import { ShowErrorNotifications } from '@components'

import { FileUpload } from '@hoc'

// components
import { Typography } from 'components'
import { Button } from '@components/buttons'
import { MdCloudUpload } from 'react-icons/md'
import { UploadAgreement } from './UploadAgreement'
import { useAgrementSignMutation } from '@queries'
import { useNotification } from '@hooks'

export const SignAgreement = ({
    studentId,
    appliedIndustryId,
}: {
    studentId: any
    appliedIndustryId: any
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
                name={'folder?.name'}
                component={UploadAgreementFile}
                // component={uploadDocsResult.isLoading ? Loading : UploadFile}
                acceptTypes={['pdf']}
            />
        </>
    )
}
