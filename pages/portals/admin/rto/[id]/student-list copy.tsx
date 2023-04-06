import { useAlert, useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { AdminApi } from '@queries'
import {
    BackButton,
    Card,
    PageTitle,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ImportStudentForm, SpecifyColumns } from '@partials/admin/rto/students'
import { RtoApi } from '@queries'

const RtoStudentLists: NextPageWithLayout = () => {
    const { alert } = useAlert()
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [emailExistList, setEmailExistList] = useState<any | null>(null)

    const rto = AdminApi.Rtos.useDetailQuery(Number(router.query.id), {
        skip: !router.query?.id,
    })

    useEffect(() => {
        navBar.setTitle('RTO Detail')
        contextBar.hide()
    }, [])
    const [foundStudents, setFoundStudents] = useState<any>([])
    const [emailFound, setEmailFound] = useState<any>([])
    const [columnsToRead, setColumnsToRead] = useState<any>({
        id: 'id',
        name: 'name',
        email: 'email',
        contact: 'contact',
        address: 'address',
        // state: 'state',
        // zipcode: 'zipcode',
    })
    const [file, setFile] = useState<any>(null)

    const onStudentFound = (students: any, file: any, emailExists: any) => {
        setEmailFound(emailExists)

        setFoundStudents(students)
        setFile(file)
    }

    const [importStudents, importStudentsResult] =
        AdminApi.Rtos.useRtoImportStudents()

    const onSubmit = async (values: any) => {
        const courses = values?.courses?.map((c: any) => c.value)

        const formData = new FormData()
        courses?.forEach((c: any) => {
            formData.append('courses[]', c)
        })

        formData.append('batch', values.batch)
        formData.append('expiry', values.expiry)

        formData.append('file', file)

        await importStudents({ id: Number(router.query.id), body: formData })
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
            <ShowErrorNotifications result={importStudentsResult} />
            <div className="p-6">
                <div className="mb-4">
                    <div className="">
                        <BackButton text="Profile" />
                        <PageHeading
                            title={'Student List'}
                            subtitle={'Students you have imported using lists'}
                        ></PageHeading>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="w-1/3 mb-16 flex gap-x-2">
                        <div className="w-full">
                            <Card>
                                <ImportStudentForm
                                    onSubmit={onSubmit}
                                    onStudentFound={onStudentFound}
                                    setEmailExistList={setEmailExistList}
                                    result={importStudentsResult}
                                />
                            </Card>
                        </div>
                    </div>
                    {/* <div className="w-2/3 flex justify-between items-stretch gap-6"> */}
                    <div className="w-2/3">
                        <div className="w-full mb-2">
                            <SpecifyColumns
                                initialValues={{ ...columnsToRead }}
                                onColumnsChange={onColumnsChange}
                            />
                        </div>
                        <div className="w-full">
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
                                                    {/* <th>State</th> */}
                                                    {/* <th>Zip Code</th> */}
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {foundStudents.map(
                                                    (
                                                        student: any,
                                                        i: number
                                                    ) => (
                                                        <tr key={i}>
                                                            {Object.values(
                                                                columnsToRead
                                                            ).map((k: any) => (
                                                                <td key={k?.id}>
                                                                    {k ===
                                                                    'email' ? (
                                                                        <div className="flex items-center gap-x-1">
                                                                            {
                                                                                student[
                                                                                    k
                                                                                ]
                                                                            }
                                                                            <Typography
                                                                                variant={
                                                                                    'badge'
                                                                                }
                                                                                color={
                                                                                    'text-error'
                                                                                }
                                                                            >
                                                                                {emailExistList.map(
                                                                                    (
                                                                                        item: any
                                                                                    ) =>
                                                                                        item.includes(
                                                                                            student[
                                                                                                'email'
                                                                                            ]
                                                                                        )
                                                                                            ? '- email already exists'
                                                                                            : ''
                                                                                )}
                                                                            </Typography>
                                                                        </div> // check email exist
                                                                    ) : (
                                                                        student[
                                                                            k
                                                                        ]
                                                                    )}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </Card>
                                </div>
                            ) : (
                                <div className="mt-2 w-full border-2 border-dashed rounded-md flex flex-col items-center justify-center h-40">
                                    <p className="text-lg font-semibold text-gray-600">
                                        No Students
                                    </p>
                                    <p className="text-md font-medium text-gray-500">
                                        Students not found, or you have not
                                        selected any file
                                    </p>
                                    <p className="text-sm font-medium text-gray-400">
                                        Also try to specify column names for
                                        particular field
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

RtoStudentLists.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default RtoStudentLists
