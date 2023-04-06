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
import { setupListeners } from '@reduxjs/toolkit/dist/query'

const RtoStudentLists: NextPageWithLayout = () => {
    const { alert } = useAlert()
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const [emailExistList, setEmailExistList] = useState<any | null>(null)

    const rto = AdminApi.Rtos.useDetailQuery(Number(router.query.id), {
        skip: !router.query?.id,
    })

    const [checkMails, checkMailsResult] =
        AdminApi.Rtos.useRtoStudentAccountCheck()

    useEffect(() => {
        navBar.setTitle('RTO Detail')
        contextBar.hide()
    }, [])
    const [foundStudents, setFoundStudents] = useState<any>([])
    const [studentList, setStudentList] = useState<any>([])
    const [existingEmails, setExistingEmails] = useState<any>([])

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
        setFoundStudents(students)
        setStudentList(students)

        const mails = students.map((std: any) => std.email)
        checkMails({
            emails: mails,
        })
            .then((res: any) => {
                if (res.data?.length) {
                    setExistingEmails(res.data?.map((o: any) => o.email))
                }
                // let list = [...foundStudents]
                // res.data?.forEach((item: any) => {
                //     if (list.findIndex((o) => o.email === item.email) !== -1) {
                //         list = list.filter((o) => o.email !== item.email)
                //     }
                // })
                // setStudentList([...list])
            })
            .catch((err) => {})
    }

    const [importStudents, importStudentsResult] =
        AdminApi.Rtos.useRtoImportStudents()

    const onSubmit = async (values: any) => {
        const courses = values?.courses?.map((c: any) => c.value)

        // const formData = new FormData()
        // courses?.forEach((c: any) => {
        //     formData.append('courses[]', c)
        // })

        // formData.append('batch', values.batch)
        // formData.append('expiry', values.expiry)

        // formData.append('file', file)

        // await importStudents({ id: Number(router.query.id), body: formData })

        let list = [...foundStudents]
        if (existingEmails.length) {
            existingEmails.forEach((item: any) => {
                if (list.findIndex((o) => o.email === item.email) !== -1) {
                    list = list.filter((o) => o.email !== item.email)
                }
            })
        }

        await importStudents({
            id: Number(router.query.id),
            body: {
                ...values,
                courses,
                list,
            },
        })
    }
    const onColumnsChange = (columns: any) => {
        setColumnsToRead(columns)
    }
    useEffect(() => {
        if (importStudentsResult.isSuccess) {
            // alert.success({
            //     title: `Import Successful`,
            //     description: `${importStudentsResult.data.created} Student(s) has been added`,
            // })
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
                {!importStudentsResult.data ||
                !importStudentsResult.isSuccess ? (
                    <div className="flex flex-col gap-2">
                        <div className="w-full flex items-stretch gap-2">
                            <Card>
                                <ImportStudentForm
                                    onSubmit={onSubmit}
                                    onStudentFound={onStudentFound}
                                    setEmailExistList={setEmailExistList}
                                    result={importStudentsResult}
                                />
                            </Card>
                        </div>
                        <div className="w-full">
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
                                                <span className="text-sm text-gray-500">
                                                    Total of
                                                </span>{' '}
                                                <span className="text-sm font-semibold text-gray-700">
                                                    {foundStudents.length}
                                                </span>{' '}
                                                <span className="text-sm text-gray-500">
                                                    student(s) were found:
                                                </span>
                                            </p>

                                            {checkMailsResult.data?.length ? (
                                                <div className="bg-red-50 text-red-600 text-sm p-2 rounded-lg my-2">
                                                    <p>
                                                        Following user already
                                                        have accounts, their
                                                        accounts will not be
                                                        ignores:
                                                    </p>
                                                    <ul>
                                                        {checkMailsResult.data?.map(
                                                            (mail: any) => (
                                                                <li
                                                                    key={
                                                                        mail.email
                                                                    }
                                                                >
                                                                    -{' '}
                                                                    {mail.email}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            ) : null}

                                            <table className="w-full">
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
                                                                ).map(
                                                                    (
                                                                        k: any
                                                                    ) => {
                                                                        return (
                                                                            <td
                                                                                key={
                                                                                    k?.id
                                                                                }
                                                                            >
                                                                                {k ===
                                                                                    'email' &&
                                                                                checkMailsResult.data?.findIndex(
                                                                                    (
                                                                                        obj: any
                                                                                    ) =>
                                                                                        student[
                                                                                            k
                                                                                        ] ===
                                                                                        obj.email
                                                                                ) !==
                                                                                    -1 ? (
                                                                                    <s>
                                                                                        {
                                                                                            student[
                                                                                                k
                                                                                            ]
                                                                                        }
                                                                                    </s>
                                                                                ) : (
                                                                                    student[
                                                                                        k
                                                                                    ]
                                                                                )}
                                                                            </td>
                                                                        )
                                                                    }
                                                                )}
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
                ) : (
                    <div>
                        {importStudentsResult.data?.created.length ? (
                            <div className="bg-green-100 rounded-lg p-4">
                                <p className="text-green-600 font-medium">
                                    {importStudentsResult.data?.created.length |
                                        0}{' '}
                                    student(s) imported successfully
                                </p>

                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th>Student Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {importStudentsResult.data?.created.map(
                                            (student: any, i: number) => (
                                                <tr key={i}>
                                                    <td>{student.studentId}</td>
                                                    <td>{student.user.name}</td>
                                                    <td>
                                                        {student.user.email}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <></>
                        )}

                        <div className="my-4" />

                        {importStudentsResult.data?.ignored.length ? (
                            <div className="bg-red-100 rounded-lg p-4">
                                <p className="text-red-600 font-medium">
                                    {importStudentsResult.data?.ignored.length |
                                        0}{' '}
                                    student(s) were ignored
                                </p>

                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {importStudentsResult.data?.ignored.map(
                                            (student: any, i: number) => (
                                                <tr key={i}>
                                                    <td>{student}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

RtoStudentLists.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default RtoStudentLists
