import { ReactElement, useEffect, useState } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ImportStudentForm } from '@partials/rto/student/form'
import { Card } from '@components'
import { RtoApi } from '@queries'
import { useAlert } from '@hooks'
import { useRouter } from 'next/router'

const ImportStudents: NextPageWithLayout = () => {
    const { alert } = useAlert()
    const router = useRouter()
    const [foundStudents, setFoundStudents] = useState<any>([])
    const [file, setFile] = useState<any>(null)

    const onStudentFound = (students: any, file: any) => {
        setFoundStudents(students)
        setFile(file)
    }

    const [importStudents, importStudentsResult] =
        RtoApi.Students.useImportStudents()

    const onSubmit = async (values: any) => {
        const courses = values?.courses?.map((c: any) => c.value)

        const formData = new FormData()
        courses.forEach((c: any) => {
            formData.append('courses[]', c)
        })

        formData.append('batch', values.batch)
        formData.append('expiry', values.expiry)

        formData.append('file', file)

        await importStudents(formData)
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
    )
}

ImportStudents.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
            pageTitle={{ title: 'Import Students', backTitle: 'Students' }}
        >
            {page}
        </RtoLayout>
    )
}

export default ImportStudents
