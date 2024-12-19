import {
    AuthorizedUserComponent,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEye, FaFileExport, FaRemoveFormat, FaUser } from 'react-icons/fa'

import { SubAdminApi } from '@queries'
import { Industry } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useRef, useState } from 'react'

// hooks
import {
    AddBranchesModal,
    RemoveBranchModal,
} from '@partials/common/IndustryBranches/modal'
import { UserRoles } from '@constants'
import { IndustryCell } from '@partials/admin/industry/components'
import { IndustryCellInfo } from '@partials/sub-admin/Industries'
import { getUserCredentials } from '@utils'

export enum BranchOrHeadofficeType {
    HeadOffice = 'headOffice',
    Branch = 'branch',
}

export const BranchesIndustries = ({
    industry,
    industries,
}: {
    industry: Industry
    industries: Industry[]
}) => {
    const selectInputRef = useRef(null)

    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const { isLoading, data, isError } =
        SubAdminApi.Industry.useGetIndustryBranches({
            id: industry?.id,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onRemoveBranch = (industry: Industry) => {
        setModal(
            <RemoveBranchModal
                industry={industry}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onAddBranches = () => {
        setModal(
            <AddBranchesModal
                onCancel={onModalCancelClicked}
                type={BranchOrHeadofficeType.Branch}
                industries={industries}
            />
        )
    }

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (industry: any) => {
                router.push(
                    `/portals/admin/industry/${industry.id}?tab=sectors`
                )
            },
            Icon: FaEye,
        },
        {
            text: 'Students',
            onClick: (industry: Industry) => {
                getUserCredentials()?.role === UserRoles.ADMIN
                    ? router.push(
                          `/portals/admin/industry/${industry?.id}?tab=students`
                      )
                    : getUserCredentials()?.role === UserRoles.SUBADMIN
                    ? router.push(
                          `/portals/sub-admin/users/industries/${industry?.id}?tab=students`
                      )
                    : ''
            },
            Icon: FaUser,
        },
        {
            text: 'Remove Branch',
            onClick: (industry: Industry) => onRemoveBranch(industry),
            Icon: FaRemoveFormat,
        },
    ]

    const columns: ColumnDef<Industry>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => {
                return (
                    <>
                        <AuthorizedUserComponent roles={[UserRoles.ADMIN]}>
                            <IndustryCell industry={info.row.original} />
                        </AuthorizedUserComponent>
                        <AuthorizedUserComponent roles={[UserRoles.SUBADMIN]}>
                            <IndustryCellInfo industry={info.row.original} />
                        </AuthorizedUserComponent>
                    </>
                )
            },
            header: () => <span>Industry</span>,
        },
        {
            accessorKey: 'abn',
            header: () => <span>ABN</span>,
        },
        {
            accessorKey: 'contactPerson',
            header: () => <span>Contact Person</span>,
            cell: (info) => {
                return (
                    <div>
                        <p>{info.row.original.contactPerson}</p>
                        <p className="text-xs text-gray-500">
                            {info.row.original.contactPersonNumber}
                        </p>
                    </div>
                )
            },
        },
        {
            accessorKey: 'addressLine1',
            header: () => <span>Address</span>,
            cell: (info) => info.getValue(),
        },

        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={info.row.original}
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <>
            {modal && modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Industry Branches'}
                    subtitle={'List of Industry Branches'}
                >
                    <Button
                        text="Add Branches"
                        variant="info"
                        Icon={FaFileExport}
                        onClick={onAddBranches}
                    />
                </PageHeading>

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data?.length ? (
                        <Table columns={columns} data={data.data}>
                            {({
                                table,
                                pagination,
                                pageSize,
                                quickActions,
                            }: any) => (
                                <div>
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize(
                                            itemPerPage,
                                            setItemPerPage,
                                            data?.data?.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                data?.pagination,
                                                setPage
                                            )}
                                        </div>
                                    </div>
                                    <div className="px-6">{table}</div>
                                    {data?.data?.length > 10 && (
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize(
                                                itemPerPage,
                                                setItemPerPage,
                                                data?.data?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    data?.pagination,
                                                    setPage
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Table>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Industry Branches!'}
                                description={'There is no Industry Branches'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
