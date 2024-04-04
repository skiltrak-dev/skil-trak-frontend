import { useContextBar, useNavbar, useNotification } from '@hooks'
import { SubAdminLayout } from '@layouts'
import { Course, NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { ShowErrorNotifications } from '@components'
import {
    CreatedStudentsList,
    ImportStudentFromWithOtp,
    ImportStudentVerificationModal,
    useImportStudents,
} from '@partials/common'
import { RtoApi, useGetSubAdminRTOCoursesQuery } from '@queries'

const RtoStudentLists: NextPageWithLayout = () => {
    const { notification } = useNotification()
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    useEffect(() => {
        navBar.setTitle('RTO Detail')
        contextBar.hide()
    }, [])
    const [foundStudents, setFoundStudents] = useState<any>([])

    const [existingEmails, setExistingEmails] = useState<any>([])
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [importedStudentsResult, setImportedStudentsResult] =
        useState<any>(null)

    const [sendVerificationCode, sendVerificationCodeResult] =
        RtoApi.Students.useSendVerificationCode()

    const rtoCourses = useGetSubAdminRTOCoursesQuery(
        Number(router?.query?.rtoId),
        {
            skip: !router?.query?.id,
        }
    )

    const rtoCoursesOptions =
        rtoCourses.isSuccess && rtoCourses?.data && rtoCourses?.data?.length > 0
            ? rtoCourses?.data?.map((course: Course) => ({
                  label: course?.title,
                  value: course?.id,
                  item: course,
              }))
            : []

    const { onSubadminImportStudents, importStudentsResult } =
        useImportStudents()

    const onCancel = () => setModal(null)

    const onSubmit = async (values: any) => {
        // const courses = values?.courses?.map((c: any) => c.value)

        // const formData = new FormData()
        // courses?.forEach((c: any) => {
        //     formData.append('courses[]', c)
        // })

        // formData.append('batch', values.batch)
        // formData.append('expiry', values.expiry)

        // formData.append('file', file)

        // await importStudents({ id: Number(router.query.id), body: formData })

        sendVerificationCode({}).then((res: any) => {
            if (res?.data) {
                setModal(
                    <ImportStudentVerificationModal
                        values={values}
                        onCancel={onCancel}
                        foundStudents={foundStudents}
                        existingEmails={existingEmails}
                        setImportedStudentsResult={setImportedStudentsResult}
                        onImportStudentsList={onSubadminImportStudents}
                    />
                )
            }
        })

        // let list = foundStudents.filter((fs: any) => !!fs.email)

        // if (existingEmails.length) {
        //     existingEmails.forEach((item: any) => {
        //         if (list.findIndex((o: any) => o.email === item.email) !== -1) {
        //             list = list.filter((o: any) => o.email !== item.email)
        //         }
        //     })
        // }

        // if (list.length === 0) {
        //     notification.error({
        //         title: 'No Student Found',
        //         description: 'List is invalid or empty',
        //     })
        // } else {
        //     await importStudents({
        //         id: Number(router.query.id),
        //         body: {
        //             ...values,
        //             // courses,
        //             list: list?.map((o: any) => ({
        //                 ...o,
        //                 email: trimText(o?.email),
        //             })),
        //         },
        //     })
        // }
    }

    return (
        <>
            {modal}
            <ShowErrorNotifications result={importStudentsResult} />

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
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default RtoStudentLists
