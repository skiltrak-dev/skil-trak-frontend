import { useContextBar, useNavbar } from '@hooks'
import { Course } from '@types'
import { ReactElement, useEffect, useState } from 'react'

import { ShowErrorNotifications } from '@components'
import {
    CreatedStudentsList,
    ImportStudentVerificationModal,
    useImportStudents,
} from '@partials/common'
import { RtoApi } from '@queries'
import { ImportStudentsListFormWithOTP } from '../components'

export const ImportStudentsTab = () => {
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [importedStudentsResult, setImportedStudentsResult] =
        useState<any>(null)

    useEffect(() => {
        navBar.setTitle('RTO Detail')
        contextBar.hide()

        return () => {
            navBar.setTitle('')
        }
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
        console.log({ values })
        return
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
    }

    return (
        <>
            {modal}
            <ShowErrorNotifications result={RTOImportStudentsResult} />
            {!importedStudentsResult ? (
                <ImportStudentsListFormWithOTP
                    onSubmit={onSubmit}
                    setFoundStudents={setFoundStudents}
                    setExistingEmails={setExistingEmails}
                    foundStudents={foundStudents}
                    rtoCourses={rtoCoursesOptions}
                    result={sendVerificationCodeResult}
                    onCancel={onCancel}
                />
            ) : (
                <CreatedStudentsList
                    importedStudentsResult={importedStudentsResult}
                />
            )}
        </>
    )
}
