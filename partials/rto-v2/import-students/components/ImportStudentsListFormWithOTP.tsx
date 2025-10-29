import { Button, Card } from '@components'
import { SpecifyColumns } from '@partials/admin/rto/students'
import { AdminApi } from '@queries'
import { ImportStudentFormType } from '@types'
import { trimText } from '@utils'
import { useState } from 'react'
import { ImportStudentFormV2 } from './ImportStudentFormV2'
import { AlertCircle, Download } from 'lucide-react'

export const ImportStudentsListFormWithOTP = ({
    onSubmit,
    setFoundStudents,
    setExistingEmails,
    foundStudents,
    result,
    rtoCourses,
    onCancel
}: {
    onSubmit: (values: ImportStudentFormType) => void
    setFoundStudents: any
    setExistingEmails: any
    foundStudents: any
    result: any
    rtoCourses: any
    onCancel?:any
}) => {
    const [checkMails, checkMailsResult] =
        AdminApi.Rtos.useRtoStudentAccountCheck()

    const [studentList, setStudentList] = useState<any>([])
    const [emailExistList, setEmailExistList] = useState<any | null>(null)

    const [columnsToRead, setColumnsToRead] = useState<any>({
        id: 'id',
        name: 'name',
        email: 'email',
        contact: 'contact',
        address: 'address',
        // state: 'state',
        // zipcode: 'zipcode',
    })

    const onColumnsChange = (columns: any) => {
        setColumnsToRead(columns)
    }

    const onStudentFound = (students: any, file: any, emailExists: any) => {
        setFoundStudents(students)
        setStudentList(students)

        const mails = students.map((std: any) => trimText(std.email))
        checkMails({
            emails: mails,
        })
            .then((res: any) => {
                if (res.data?.length) {
                    setExistingEmails(res.data?.map((o: any) => o.email))
                }
            })
            .catch((err) => {})
    }

    return (
        <div className="">
            <div className="flex items-start gap-2 rounded-md border border-[#F7A619]/30 bg-[#F7A619]/5 p-3">
                <AlertCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <p className="text-sm text-gray-400">
                    Please ensure your file adheres to the following format. As an example, please refer to the sample file provided.
                </p>
            </div>
            <a 
                className="text-xs font-medium text-orange-500 flex justify-end mt-4"
                href="https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/downloadable/Sample+Import+Student+List.xlsx"
                download
                referrerPolicy="no-referrer"
            >
                <Button Icon={Download}>Download Format</Button>
            </a>
            <div className="flex flex-col gap-2">
                <div className="w-full flex items-stretch gap-2">
                    
                        <ImportStudentFormV2
                            onSubmit={onSubmit}
                            onStudentFound={onStudentFound}
                            setEmailExistList={setEmailExistList}
                            result={result}
                            rtoCourses={rtoCourses}
                            onCancel={onCancel}
                        />
                </div>
                <div className="w-full">
                    {/* <div className="w-full mb-2">
                        <SpecifyColumns
                            initialValues={{ ...columnsToRead }}
                            onColumnsChange={onColumnsChange}
                        />
                    </div> */}
                    <div className="w-full">
                        {foundStudents && foundStudents?.length > 0 && (
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
                                                Following user already have
                                                accounts, their accounts will
                                                ignored:
                                            </p>
                                            <ul>
                                                {checkMailsResult.data?.map(
                                                    (mail: any) => (
                                                        <li key={mail.email}>
                                                            - {mail.email}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    ) : null}

                                    {/* <table className="w-full">
                                        <thead>
                                            <tr>
                                                <th>Student Id</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Contact</th>
                                                <th>Address</th>
                                                
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {foundStudents.map(
                                                (student: any, i: number) => (
                                                    <tr key={i}>
                                                        {Object.values(
                                                            columnsToRead
                                                        ).map((k: any) => {
                                                            return (
                                                                <td key={k?.id}>
                                                                    {k ===
                                                                        columnsToRead?.email &&
                                                                    checkMailsResult?.isSuccess &&
                                                                    checkMailsResult.data?.findIndex(
                                                                        (
                                                                            obj: any
                                                                        ) =>
                                                                            student[
                                                                                k
                                                                            ] ===
                                                                            obj.email
                                                                    ) !== -1 ? (
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
                                                        })}
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table> */}
                                </Card>
                            </div>
                        ) }
                    </div>
                </div>
            </div>
            

        </div>
    )
}
