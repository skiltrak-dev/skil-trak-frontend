import { CreatedAtDate, Typography } from '@components'
import { AdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { KpiTypes } from '@types'
import moment, { Moment } from 'moment'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { RiMap2Line } from 'react-icons/ri'
import { DataKpiTable } from '../../DataKpiTable'
import { useColumnsAction } from '../../hooks'

export const StudentAgreementTable = ({
    startDate,
    endDate,
}: {
    startDate: Moment | null
    endDate: Moment | null
}) => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [itemPerPage] = useState(10)

    const { columnAction, modal } = useColumnsAction()

    const workplace = AdminApi.Kpi.studentAgreementDetails(
        {
            limit: itemPerPage,
            id: Number(router.query.id),
            skip: itemPerPage * page - itemPerPage,
            search: `startDate:${moment(startDate).format(
                'YYYY-MM-DD'
            )},endDate:${moment(endDate).format('YYYY-MM-DD')}`,
        },
        {
            skip: !router.query.id || !startDate || !endDate,
        }
    )

    const getLatestFile = (files: any) => {
        return files?.reduce(
            (a: any, b: any) => (a?.createdAt > b?.createdAt ? a : b),
            {
                result: '---',
            }
        )
    }

    const agreementColumns: ColumnDef<KpiTypes>[] = [
        {
            accessorKey: 'student.studentId',
            header: 'Student ID',
            cell: (info: any) => info.getValue() as string,
        },
        {
            accessorKey: 'student.user.name',
            header: 'Name',
        },
        {
            accessorKey: 'student.user.email',
            header: 'Email',
        },
        {
            accessorKey: 'student.phone',
            header: 'Phone',
        },
        {
            accessorKey: 'courses',
            header: 'COURSES',
            cell: (info) => (
                <div>
                    <Typography variant="small" normal>
                        {info?.row?.original?.course?.code}
                    </Typography>
                    <Typography variant="label" normal>
                        {info?.row?.original?.course?.title}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'uploadedDate',
            header: 'Uploaded Date',
            cell: (info) => (
                <CreatedAtDate createdAt={info?.row?.original?.createdAt} />
            ),
        },
        // {
        //     accessorKey: 'documentType',
        //     header: 'Document Type',
        //     cell: (info) => {
        //         const latestData: FileType = getLatestFile(
        //             info?.row?.original?.courses?.[0]?.assessmentEvidence?.[0]
        //                 ?.studentResponse?.[0]?.files
        //         )
        //         const extension = latestData?.file?.split('.').pop()
        //         return (
        //             <Typography variant="label" uppercase>
        //                 {extension}
        //             </Typography>
        //         )
        //     },
        // },
        {
            accessorKey: 'verificationStatus',
            header: 'Verification',
        },
        ...(columnAction as ColumnDef<KpiTypes>[]),
    ]

    return (
        <>
            {modal}
            <DataKpiTable
                colors="blue"
                data={workplace}
                Icon={RiMap2Line}
                setPage={setPage}
                columns={agreementColumns}
                title="Agreement (Student Provided Workplace)"
            />
        </>
    )
}
