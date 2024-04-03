import { useContextBar, useNavbar } from '@hooks'
import { RtoLayout } from '@layouts'
import { Course, NextPageWithLayout } from '@types'
import { ReactElement, useEffect, useState } from 'react'

import {
    CreatedStudentsList,
    ImportStudentFromWithOtp,
    ImportStudentVerificationModal,
    useImportStudents,
} from '@partials/common'
import { RtoApi } from '@queries'
import { ShowErrorNotifications } from '@components'

const RtoStudentLists: NextPageWithLayout = () => {
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [importedStudentsResult, setImportedStudentsResult] =
        useState<any>(null)

    useEffect(() => {
        navBar.setTitle('RTO Detail')
        contextBar.hide()
    }, [])
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [foundStudents, setFoundStudents] = useState<any>([])

    const [existingEmails, setExistingEmails] = useState<any>([])

    const [sendVerificationCode, sendVerificationCodeResult] =
        RtoApi.Students.useSendVerificationCode()
    const rto = RtoApi.Rto.useProfile()

    const rtoCoursesOptions =
        rto.isSuccess && rto?.data?.courses && rto?.data?.courses?.length > 0
            ? rto?.data?.courses?.map((course: Course) => ({
                  label: course?.title,
                  value: course?.id,
                  item: course,
              }))
            : []

    const { onRtoImportStudents, RTOImportStudentsResult } = useImportStudents()

    const onCancel = () => setModal(null)

    const onSubmit = async (values: any) => {
        sendVerificationCode({}).then((res: any) => {
            if (res?.data) {
                setModal(
                    <ImportStudentVerificationModal
                        values={values}
                        onCancel={onCancel}
                        foundStudents={foundStudents}
                        existingEmails={existingEmails}
                        setImportedStudentsResult={setImportedStudentsResult}
                        onImportStudentsList={onRtoImportStudents}
                    />
                )
            }
        })

        // const courses = values?.courses?.map((c: any) => c.value)

        // const formData = new FormData()
        // courses?.forEach((c: any) => {
        //     formData.append('courses[]', c)
        // })

        // formData.append('batch', values.batch)
        // formData.append('expiry', values.expiry)

        // formData.append('file', file)

        // await importStudents({ id: Number(router.query.id), body: formData })
    }

    return (
        <>
            {modal}
            <ShowErrorNotifications result={RTOImportStudentsResult} />
            {!importedStudentsResult ? (
                <ImportStudentFromWithOtp
                    onSubmit={onSubmit}
                    setFoundStudents={setFoundStudents}
                    setExistingEmails={setExistingEmails}
                    foundStudents={foundStudents}
                    rtoCourses={rtoCoursesOptions}
                    result={sendVerificationCodeResult}
                />
            ) : (
                <CreatedStudentsList
                    importedStudentsResult={importedStudentsResult}
                />
            )}
        </>
    )
}

RtoStudentLists.getLayout = (page: ReactElement) => {
    return <RtoLayout>{page}</RtoLayout>
}

export default RtoStudentLists
