import {
    ActionButton,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Portal,
    Table,
    TableAction,
    TechnicalError,
    Typography,
    UserCreatedAt,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaFileExport } from 'react-icons/fa'

import { useActionModal, useSubadminProfile } from '@hooks'
import Modal from '@modals/Modal'
import { CourseDot } from '@partials/admin/industry/components'
import { useChangeStatus } from '@partials/admin/industry/hooks'
import {
    MultiAcceptModal,
    MultiRejectModal,
} from '@partials/admin/industry/modals'
import { IndustryCellInfo } from '@partials/sub-admin/Industries'
import { AddToFavoriteModal } from '@partials/sub-admin/rto/modals'
import { SubAdminApi } from '@queries'
import { Industry, PendingIndustry, SubAdmin } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { AcceptModal, RejectModal, ViewIndustryReviewAnswers } from '../modal'

export const PendingIndustries = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const { isLoading, data, isError } =
        SubAdminApi.SubAdmin.useDepartmentPendingIndustries({
            // search: `status:${UserStatus.Pending}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })
    const subadmin = useSubadminProfile()
    const isHod = subadmin?.departmentMember?.isHod

    const { changeStatusResult } = useChangeStatus()
    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onAcceptClicked = (industry: Industry) => {
        setModal(
            <AcceptModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
        // setModal(
        //     <ApproveIndustryWithQuestionsModal
        //         industry={industry}
        //         onCancel={() => onModalCancelClicked()}
        //     />
        // )
    }

    const onRejectClicked = (industry: Industry) => {
        setModal(
            <RejectModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onMultiAcceptClicked = (industries: Industry[]) => {
        setModal(
            <MultiAcceptModal
                industries={industries}
                onCancel={() => {
                    onModalCancelClicked()
                }}
            />
        )
    }

    const onMultiRejectClicked = (industries: Industry[]) => {
        setModal(
            <MultiRejectModal
                industries={industries}
                onCancel={() => {
                    onModalCancelClicked()
                }}
            />
        )
    }
    const onFavoriteClicked = (industry: any) => {
        setModal(
            <Portal>
                <AddToFavoriteModal
                    industry={industry}
                    onCancel={() => onModalCancelClicked()}
                />
            </Portal>
        )
    }
    const subadminId = getUserCredentials()?.id
    const isFavorite = (subAdmin: SubAdmin[] | undefined) =>
        subAdmin?.find((subadmin: any) => subadmin?.user?.id === subadminId)

    const tableActionOptions = (industry: any) => {
        const subAdmin = isFavorite(industry?.subAdmin)
        return [
            {
                text: `${
                    industry?.favoriteBy &&
                    industry?.favoriteBy?.user?.id === subadminId
                        ? 'Un Favourite'
                        : 'Add Favourite'
                }`,
                onClick: (industry: any) => onFavoriteClicked(industry),
                Icon: subAdmin ? MdFavorite : MdFavoriteBorder,
                color: `${
                    industry?.subAdmin && industry?.subAdmin?.length > 0
                        ? 'text-error'
                        : 'text-primary'
                }`,
            },
        ]
    }

    const columns: ColumnDef<PendingIndustry>[] = [
        {
            accessorKey: 'industry.user',
            cell: (info) => (
                <IndustryCellInfo
                    industry={info?.row?.original?.industry}
                    isFavorite={info?.row?.original?.industry?.favoriteBy}
                />
            ),
            header: () => <span>Industry</span>,
        },
        {
            accessorKey: 'industry.abn',
            header: () => <span>ABN</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'contactPerson',
            header: () => <span>Contact Person</span>,
            cell: (info) => (
                <div>
                    <p>{info.row.original?.industry?.contactPerson}</p>
                    <p className="text-xs text-gray-500">
                        {info.row.original.industry?.contactPersonNumber}
                    </p>
                </div>
            ),
        },
        {
            accessorKey: 'courses',
            header: () => <span>Courses</span>,
            cell: (info) => (
                <div className="flex gap-x-1">
                    {info?.row?.original?.courses?.map((c: any) => (
                        <CourseDot key={c?.id} course={c} />
                    ))}
                </div>
            ),
        },
        {
            accessorKey: 'sector',
            header: () => <span>Sector</span>,
            cell: (info) => (
                <div className="flex items-center gap-x-1">
                    <Typography variant={'muted'}>
                        {info?.row?.original?.sector?.name ?? 'NA'}
                    </Typography>{' '}
                    -{' '}
                    <Typography variant={'muted'}>
                        {info?.row?.original?.sector?.code}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'channel',
            header: () => <span>Created By</span>,
            cell: (info) => (
                <div>
                    {info.row.original?.industry?.createdBy !== null ? (
                        <p>{info?.row?.original?.industry?.createdBy?.name}</p>
                    ) : (
                        <p>{info?.row?.original?.industry?.channel}</p>
                    )}
                    <UserCreatedAt
                        createdAt={info.row.original?.industry?.createdAt}
                    />
                </div>
            ),
        },
        {
            accessorKey: 'industry.approvalReviewQuestions',
            header: () => <span>Industry Answer</span>,
            cell: (info) => (
                <Modal>
                    <Modal.Open opens="viewIndustryAnswers">
                        <Button variant="info" text="VIEW" outline />
                    </Modal.Open>
                    <Modal.Window name="viewIndustryAnswers">
                        <ViewIndustryReviewAnswers
                            industryQuestions={
                                info?.row?.original?.industry
                                    ?.approvalReviewQuestion
                            }
                        />
                    </Modal.Window>
                </Modal>
            ),
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                const tableActionOption = tableActionOptions(
                    info?.row?.original?.industry
                )
                return (
                    <TableAction
                        options={tableActionOption}
                        rowItem={info?.row?.original?.industry}
                    />
                )
            },
        },
    ]

    if (isHod) {
        columns.splice(columns.length - 1, 0, {
            accessorKey: 'request',
            header: () => <span>Request</span>,
            cell: (info: any) => (
                <div className="flex gap-x-2 items-center">
                    <ActionButton
                        variant="success"
                        onClick={() => onAcceptClicked(info.row?.original)}
                        loading={changeStatusResult.isLoading}
                        disabled={changeStatusResult.isLoading}
                    >
                        Accept
                    </ActionButton>
                    <ActionButton
                        variant="error"
                        onClick={() => onRejectClicked(info.row?.original)}
                        loading={changeStatusResult.isLoading}
                        disabled={changeStatusResult.isLoading}
                    >
                        Reject
                    </ActionButton>
                </div>
            ),
        })
    }

    const quickActionsElements = {
        id: 'id',
        individual: (id: Industry) => (
            <div className="flex gap-x-2">
                <ActionButton variant="success" onClick={() => {}}>
                    Accept
                </ActionButton>
                <ActionButton variant="error" onClick={() => {}}>
                    Reject
                </ActionButton>
            </div>
        ),
        common: (industries: Industry[]) => (
            <div className="flex gap-x-2">
                <ActionButton
                    onClick={() => {
                        onMultiAcceptClicked(industries)
                    }}
                    variant="success"
                >
                    Accept
                </ActionButton>
                <ActionButton
                    onClick={() => {
                        onMultiRejectClicked(industries)
                        // const arrayOfIds = ids.map((id: any) => id?.user.id)
                        // bulkAction({ ids: arrayOfIds, status: 'rejected' })
                    }}
                    variant="error"
                >
                    Reject
                </ActionButton>
            </div>
        ),
    }

    return (
        <>
            {modal && modal}

            <div className="flex flex-col gap-y-4 mb-32">
                <PageHeading
                    title={'Pending Industries'}
                    subtitle={'List of Pending Industries'}
                >
                    {data && data?.data.length ? (
                        <>
                            <Button
                                text="Export"
                                variant="action"
                                Icon={FaFileExport}
                            />
                        </>
                    ) : null}
                </PageHeading>

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data?.length ? (
                        <Table
                            columns={columns}
                            data={data?.data}
                            quickActions={quickActionsElements}
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
                                )
                            }}
                        </Table>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Pending Industry!'}
                                description={'You have no pending Industry'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
