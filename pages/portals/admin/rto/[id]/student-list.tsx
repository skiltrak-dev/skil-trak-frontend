import { useAlert, useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { AdminApi } from '@queries'
import { BackButton, Card, PageTitle } from '@components'
import { PageHeading } from '@components/headings'
import { ImportStudentForm } from '@partials/admin/rto/students'
import { RtoApi } from '@queries'

const RtoStudentLists: NextPageWithLayout = () => {
    const { alert } = useAlert()
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const rto = AdminApi.Rtos.useDetailQuery(Number(router.query.id), {
        skip: !router.query?.id,
    })

    useEffect(() => {
        navBar.setTitle('RTO Detail')
        contextBar.hide()
    }, [])
    const [foundStudents, setFoundStudents] = useState<any>([])
    const [file, setFile] = useState<any>(null)

    const onStudentFound = (students: any, file: any) => {
        setFoundStudents(students)
        setFile(file)
    }

    const [importStudents, importStudentsResult] =
        AdminApi.Rtos.useRtoImportStudents()

    const onSubmit = async (values: any) => {
        const courses = values?.courses?.map((c: any) => c.value)

        const formData = new FormData()
        courses.forEach((c: any) => {
            formData.append('courses[]', c)
        })

        formData.append('batch', values.batch)
        formData.append('expiry', values.expiry)

        formData.append('file', file)

        await importStudents({id: Number(router.query.id), body: formData})
    }

    useEffect(() => {
        if (importStudentsResult.isSuccess) {
            alert.success({
                title: `Import Successful`,
                description: `${importStudentsResult.data.created} Student(s) has been added`,
            })
            router.back()
        }
    }, [importStudentsResult])
    return (
        <>
            <div className="p-6">
                <div className="">
                    <BackButton text="Profile" />
                    <PageHeading
                        title={'Student List'}
                        subtitle={'Students you have imported using lists'}
                    ></PageHeading>
                </div>
            </div>
            <div className="w-full mb-16 flex gap-x-2">
                <div className="w-3/5">
                    <Card>
                        <ImportStudentForm
                            onSubmit={onSubmit}
                            onStudentFound={onStudentFound}
                        />
                    </Card>
                </div>
                {foundStudents.length ? (
                    <div className="w-2/5">
                        <Card>
                            <p>
                                <span className="text-sm font-semibold text-gray-700">
                                    {foundStudents.length}
                                </span>{' '}
                                -{' '}
                                <span className="text-sm font-medium text-gray-500">
                                    Student(s) Found
                                </span>
                            </p>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Student Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Contact</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {foundStudents.map((s: any, i: number) => (
                                        <tr key={i}>
                                            <td>{s.Student_id}</td>
                                            <td>{s.name}</td>
                                            <td>{s.email}</td>
                                            <td>{s.contact}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                ) : null}
            </div>
        </>
    )
}

RtoStudentLists.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default RtoStudentLists
