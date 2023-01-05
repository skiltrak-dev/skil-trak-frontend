import { ReactElement, useEffect, useState } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ImportStudentForm } from '@partials/rto/student/form'
import { Card } from '@components'
import { RtoApi } from '@queries'
import { useAlert } from '@hooks'
import { useRouter } from 'next/router'
import { SpecifyColumns } from '@partials/rto/student/form/SpecifyColumns'

const ImportStudents: NextPageWithLayout = () => {
    const { alert } = useAlert()
    const router = useRouter()
    const [foundStudents, setFoundStudents] = useState<any>([])
    const [columnsToRead, setColumnsToRead] = useState<any>({
        id: 'id',
        name: 'name',
        email: 'email',
        contact: 'contact',
        address: 'address',
        state: 'state',
        zipcode: 'zipcode'

    })
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
    const onColumnsChange = (columns: any) => {
        setColumnsToRead(columns)
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
            <div className="w-full mb-16 flex gap-x-2">
                <div className="w-full">
                    <Card>
                        <ImportStudentForm
                            onSubmit={onSubmit}
                            onStudentFound={onStudentFound}
                        />
                    </Card>
                </div>
            </div>
            <div className="flex justify-between items-stretch gap-6">
                <div className="w-2/6">

                    <SpecifyColumns
                        initialValues={{ ...columnsToRead }}
                        onColumnsChange={onColumnsChange}
                    />

                </div>
                <div className='w-4/6'>
                    {foundStudents.length ? (
                        <div className="w-full">
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
                                            <th>Address</th>
                                            <th>State</th>
                                            <th>Zip Code</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {/* {foundStudents.map(
                                            (s: any, i: number) => (
                                                <tr key={i}>
                                                    <td>{s.Student_id}</td>
                                                    <td>{s.name}</td>
                                                    <td>{s.email}</td>
                                                    <td>{s.contact}</td>
                                                </tr>
                                            )
                                        )} */}
                                        {foundStudents.map((student: any, i: number) => (
                                            <tr key={i}>
                                                {Object.values(columnsToRead).map((k: any) => (
                                                    <td key={k?.id}>{student[k]}</td>
                                                ))
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Card>
                        </div>
                    ) : <div className='border-2 border-dashed rounded-md flex flex-col items-center justify-center h-full'>
                        <p className='text-lg font-semibold text-gray-600'>No Students</p>
                        <p className='text-md font-medium text-gray-500'>Students not found, or you have not selected any file</p>
                        <p className='text-sm font-medium text-gray-400'>Also try to specify column names for particular field</p>
                    </div>}
                </div>
            </div></>
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
