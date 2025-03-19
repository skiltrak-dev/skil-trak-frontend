import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { RiMap2Line } from 'react-icons/ri'
import { DataKpiTable } from '../../DataKpiTable'
import { useState } from 'react'
import { CreatedAtDate, Typography } from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { IWorkplaceIndustries } from 'redux/queryTypes'
import moment from 'moment'
import { FileType, KpiTypes } from '@types'

export const StudentAgreementTable = () => {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const [itemPerPage] = useState(10)

    const workplace = AdminApi.Kpi.studentAgreementDetails(
        {
            limit: itemPerPage,
            id: Number(router.query.id),
            skip: itemPerPage * page - itemPerPage,
        },
        {
            skip: !router.query.id,
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
    ]

    return (
        <DataKpiTable
            colors="blue"
            data={workplace}
            Icon={RiMap2Line}
            setPage={setPage}
            columns={agreementColumns}
            title="Agreement by student provided workplace"
        />
    )
}
