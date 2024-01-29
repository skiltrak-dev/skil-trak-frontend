import {
    Badge,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { UserRoles } from '@constants'
import { IndustryCellInfo } from '@partials/sub-admin/Industries'
import { RTOCellInfo } from '@partials/sub-admin/rto/components'
import { StudentCellInfo } from '@partials/sub-admin/students'
import { ColumnDef } from '@tanstack/react-table'
import { checkListLength } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaEdit, FaEye } from 'react-icons/fa'
import { CoordinatorCellInfo } from '../components'

export const FilterdEsignDocuments = ({
    setPage,
    itemPerPage,
    eSign,
    setItemPerPage,
}: {
    setPage: any
    itemPerPage: any
    eSign: any
    setItemPerPage: any
}) => {
    const router = useRouter()

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (eSign: any) => {
                router.push(`/portals/sub-admin/e-sign/${eSign?.id}`)
            },
            Icon: FaEye,
        },
        {
            text: 'Edit',
            onClick: (rto: any) => {
                // router.push(`/portals/admin/rto/${rto.id}/edit-profile`)
            },
            Icon: FaEdit,
        },
        {
            text: 'Cancel',
            onClick: (rto: any) => {},
            Icon: FaEdit,
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'template.name',
            header: () => <span>Document</span>,
            cell: (info) => (
                <Typography variant="small" semibold>
                    {info.row.original?.template?.name}
                </Typography>
            ),
        },

        {
            accessorKey: 'template.course.title',
            header: () => <span>Course</span>,
            cell: (info) => (
                <Typography variant="small" semibold>
                    {info.row.original?.template?.course?.title}
                </Typography>
            ),
        },
        {
            accessorKey: 'template.folder.name',
            header: () => <span>Folder</span>,
            cell: (info) => (
                <Link
                    href={`/portals/sub-admin/students/223?tab=submissions&course=${info.row.original?.template?.course?.id}&folder=${info.row.original?.template?.folder?.id}`}
                >
                    <Typography variant="small" semibold>
                        {info.row.original?.template?.folder?.name}
                    </Typography>
                </Link>
            ),
        },
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-fit">
                        {info.row?.original?.signers?.map((signer: any) => {
                            switch (signer?.user?.role) {
                                case UserRoles.STUDENT:
                                    return (
                                        <div>
                                            <Typography
                                                variant="xs"
                                                bold
                                                uppercase
                                            >
                                                {signer?.user?.role}
                                            </Typography>
                                            <StudentCellInfo student={signer} />
                                        </div>
                                    )
                                case UserRoles.RTO:
                                    return (
                                        <div>
                                            <Typography
                                                variant="xs"
                                                bold
                                                uppercase
                                            >
                                                {signer?.user?.role}
                                            </Typography>
                                            <RTOCellInfo rto={signer} />
                                        </div>
                                    )
                                case UserRoles.INDUSTRY:
                                    return (
                                        <div>
                                            <Typography
                                                variant="xs"
                                                bold
                                                uppercase
                                            >
                                                {signer?.user?.role}
                                            </Typography>
                                            <IndustryCellInfo
                                                industry={signer}
                                            />
                                        </div>
                                    )
                                case UserRoles.SUBADMIN:
                                    return (
                                        <div>
                                            <Typography
                                                variant="xs"
                                                bold
                                                uppercase
                                            >
                                                {signer?.user?.role}
                                            </Typography>
                                            <CoordinatorCellInfo
                                                subAdmin={signer}
                                            />
                                        </div>
                                    )
                                default:
                                    return
                            }
                        })}
                    </div>
                )
            },
            header: () => <span>Signers</span>,
        },
        {
            accessorKey: 'status',
            header: () => <span>Status</span>,
            cell: (info) => <Badge text={info.row.original?.status} />,
        },

        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: ({ row }: any) => (
                <div className="flex items-center gap-x-2">
                    <Button
                        text={
                            row.original?.status === 'signed'
                                ? 'View Document'
                                : 'Sign Document'
                        }
                        onClick={() => {
                            router.push(
                                `/portals/sub-admin/e-sign/${row?.original?.id}`
                            )
                        }}
                    />
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={row.original}
                            lastIndex={checkListLength<any>(
                                eSign?.data?.data as any
                            )?.includes(row?.index)}
                        />
                    </div>
                </div>
            ),
        },
    ]

    return (
        <div className="flex flex-col gap-y-4 p-4">
            <PageHeading
                title={'Filtered Esign Documents'}
                subtitle={'List of Filtered ESign Documents'}
            />

            <Card noPadding>
                {eSign?.isLoading || eSign?.isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : eSign?.data?.data && eSign?.data?.data?.length ? (
                    <Table
                        columns={columns}
                        data={eSign?.data?.data}
                        // quickActions={quickActionsElements}
                        enableRowSelection
                    >
                        {({
                            table,
                            pagination,
                            pageSize,
                            quickActions,
                        }: any) => {
                            return (
                                <div>
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize(
                                            itemPerPage,
                                            setItemPerPage,
                                            eSign?.data?.data?.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                eSign?.data?.pagination,
                                                setPage
                                            )}
                                        </div>
                                    </div>
                                    <div className="px-6">{table}</div>
                                </div>
                            )
                        }}
                    </Table>
                ) : (
                    eSign.isSuccess && (
                        <EmptyData
                            title={'No Filtered Documents!'}
                            description={'No Filtered Documents yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
