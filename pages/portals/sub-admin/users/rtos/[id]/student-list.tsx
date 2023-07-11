import { useContextBar, useNavbar, useNotification } from '@hooks'
import { RtoLayout, SubAdminLayout } from '@layouts'
import { Course, NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { ShowErrorNotifications } from '@components'
import { ImportStudentList } from '@partials/common'
import {
    SubAdminApi,
    useGetSubAdminRTOCoursesQuery,
    useGetSubAdminRTODetailQuery,
} from '@queries'

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

    const [importStudents, importStudentsResult] =
        SubAdminApi.Rto.useImportStudentList()
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
              }))
            : []

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

        let list = foundStudents.filter((fs: any) => !!fs.email)

        if (existingEmails.length) {
            existingEmails.forEach((item: any) => {
                if (list.findIndex((o: any) => o.email === item.email) !== -1) {
                    list = list.filter((o: any) => o.email !== item.email)
                }
            })
        }

        if (list.length === 0) {
            notification.error({
                title: 'No Student Found',
                description: 'List is invalid or empty',
            })
        } else {
            await importStudents({
                id: Number(router.query.id),
                body: {
                    ...values,
                    // courses,
                    list,
                },
            })
        }
    }

    return (
        <>
            <ShowErrorNotifications result={importStudentsResult} />
            <ImportStudentList
                onSubmit={onSubmit}
                setFoundStudents={setFoundStudents}
                setExistingEmails={setExistingEmails}
                foundStudents={foundStudents}
                rtoCourses={rtoCoursesOptions}
                result={importStudentsResult}
            />
        </>
    )
}

RtoStudentLists.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default RtoStudentLists
