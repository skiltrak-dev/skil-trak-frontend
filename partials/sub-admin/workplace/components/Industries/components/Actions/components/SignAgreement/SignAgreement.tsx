import { useEffect } from 'react'
// Icons
import { ShowErrorNotifications } from '@components'

import { FileUpload } from '@hoc'

// components
import { useNotification } from '@hooks'
import { useAgrementSignMutation } from '@queries'
import { UploadAgreement } from './UploadAgreement'
import { Course, Student } from '@types'

export const SignAgreement = ({
    studentId,
    appliedIndustryId,
    student,
    courses,
}: {
    studentId: number
    appliedIndustryId: number
    student: Student | undefined
    courses: Course[]
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

    const UploadAgreementFile = ({ name }: { name: string }) => {
        return (
            <UploadAgreement
                name={name}
                loading={agrementSignResult.isLoading}
            />
        )
    }

    const course = courses[0]

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
                    // const formData = new FormData()
                    // docs.forEach((doc: File) => {
                    //     formData.append('file', doc)
                    // })
                    // const fileType = docs.map((doc: File) => doc.type)
                    // // formData.append(`file`, doc)
                    // if (
                    //     fileType.every(
                    //         (type: string) => type === 'application/pdf'
                    //     )
                    // ) {
                    //     agrementSign({
                    //         studentId,
                    //         appliedIndustryId,
                    //         course: course?.id,
                    //         body: formData,
                    //     })
                    // } else {
                    //     notification.error({
                    //         title: 'Wrong File Selected',
                    //         description:
                    //             'You selected a wrong file, Please select a pdf file',
                    //     })
                    // }
                }}
                name={
                    studentId + appliedIndustryId + (student?.user?.name ?? '')
                }
                component={UploadAgreementFile}
                acceptTypes={['pdf']}
            />
        </>
    )
}
