import { useContextBar, useNavbar, useNotification } from '@hooks'
import { AdminLayout } from '@layouts'
import {
    Course,
    ImportStudentFileList,
    ImportStudentFormType,
    NextPageWithLayout,
    OptionType,
} from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { ShowErrorNotifications } from '@components'
import { ImportStudentList } from '@partials/common'
import { AdminApi } from '@queries'

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
        AdminApi.Rtos.useRtoImportStudents()

    const rto = AdminApi.Rtos.useDetailQuery(Number(router.query.id), {
        skip: !router.query?.id,
        refetchOnMountOrArgChange: true,
    })

    const rtoCoursesOptions =
        rto.isSuccess && rto?.data?.courses && rto?.data?.courses?.length > 0
            ? rto?.data?.courses?.map((course: Course) => ({
                  label: course?.title,
                  value: course?.id,
              }))
            : []

    const onSubmit = async (values: ImportStudentFormType) => {
        // const courses = values?.courses?.map((c: OptionType) => c.value)

        // const formData = new FormData()
        // courses?.forEach((c: any) => {
        //     formData.append('courses[]', c)
        // })

        // formData.append('batch', values.batch)
        // formData.append('expiry', values.expiry)

        // formData.append('file', file)

        // await importStudents({ id: Number(router.query.id), body: formData })

        let list = foundStudents.filter(
            (fs: ImportStudentFileList) => !!fs.email
        )

        if (existingEmails.length) {
            existingEmails.forEach((item: any) => {
                if (
                    list.findIndex(
                        (o: ImportStudentFileList) => o.email === item.email
                    ) !== -1
                ) {
                    list = list.filter(
                        (o: ImportStudentFileList) => o.email !== item.email
                    )
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
                    // courses: courses as number[],
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
                result={importStudentsResult}
                rtoCourses={rtoCoursesOptions}
            />
        </>
    )
}

RtoStudentLists.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default RtoStudentLists
