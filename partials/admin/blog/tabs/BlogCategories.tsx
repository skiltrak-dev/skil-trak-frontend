import {
    ActionButton,
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Modal,
    Table,
    TableAction,
    TableActionOption,
    TableChildrenProps,
    TechnicalError,
    Typography,
} from '@components'
import { adminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { checkListLength } from '@utils'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import {
    DeleteCategoryModal,
    BulkDeleteCategoriesModal,
    BlogCategory,
} from '../components'
export const BlogCategories = () => {
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [addCategories, addCategoriesResult] =
        adminApi.useAddBlogCategoriesMutation()

    const router = useRouter()
    const { data, isLoading, isError, isFetching } =
        adminApi.useGetCategoriesQuery({
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onDeleteClicked = (blog: any) => {
        setModal(
            <DeleteCategoryModal
                category={blog}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onBulkDeleteClicked = (ids: any) => {
        setModal(
            <BulkDeleteCategoriesModal
                onCancel={onModalCancelClicked}
                categoriesIds={ids}
            />
        )
    }
    const onAddCategoriesClicked = () => {
        setModal(
            <Modal
                onCancelClick={onModalCancelClicked}
                onConfirmClick={onModalCancelClicked}
                title={'Add Category'}
                confirmText={'Close'}
                subtitle={'Add New Category'}
                showActions={false}
            >
                <BlogCategory
                    addCategories={addCategories}
                    addCategoriesResult={addCategoriesResult}
                />
            </Modal>
        )
    }
    const tableActionOptions: TableActionOption<any>[] = [
        {
            text: 'Delete',
            onClick: (blog: any) => onDeleteClicked(blog),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        },
    ]

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'title',
            cell: (info: any) => {
                return (
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            router.push({
                                pathname: `/portals/admin/blogs`,
                                query: {
                                    tab: 'published',
                                    page: 1,
                                    pageSize: 50,
                                    category: info.row?.original?.id,
                                },
                            })
                        }}
                    >
                        {info?.row?.original?.title}
                    </div>
                )
            },
            header: () => <span>Title</span>,
        },
        {
            accessorKey: 'blogsCount',
            cell: (info: any) => {
                return (
                    <Typography variant="label">
                        {info?.row?.original?.blogsCount}
                    </Typography>
                )
            },
            header: () => <span>Blogs Count</span>,
        },
        {
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: (info) => {
                return (
                    <>
                        <Typography variant={'small'} color={'text-gray-600'}>
                            <span className="font-semibold whitespace-pre">
                                {moment(info?.row?.original?.createdAt).format(
                                    'Do MMM YYYY'
                                )}
                            </span>
                        </Typography>
                        <Typography variant={'small'} color={'text-gray-600'}>
                            <span className="font-semibold whitespace-pre">
                                {moment(info?.row?.original?.createdAt).format(
                                    'hh:mm:ss a'
                                )}
                            </span>
                        </Typography>
                    </>
                )
            },
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info) => {
                const length = checkListLength<any>(data?.data)

                return (
                    <div className="flex gap-x-1 items-center">
                        <TableAction
                            options={tableActionOptions}
                            rowItem={info.row.original}
                            lastIndex={length.includes(info.row?.index)}
                        />
                    </div>
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (blog: any) => {
            return (
                <div className="flex gap-x-2">
                    {/* <ActionButton
                        onClick={() => {
                            router.push(`http://localhost:3000/blogs/${blog?.id}`)
                        }}
                    >
                        View
                    </ActionButton> */}
                    {/* <ActionButton
                        Icon={FaEdit}
                        onClick={() => {
                            router.push(`/portals/admin/blogs/${blog?.id}`)
                        }}
                    >
                        Edit
                    </ActionButton> */}
                    <ActionButton
                        Icon={FaTrash}
                        variant="error"
                        onClick={() => {
                            onDeleteClicked(blog)
                        }}
                    >
                        Delete
                    </ActionButton>
                </div>
            )
        },
        common: (ids: any) => (
            <div className="flex gap-x-2">
                <ActionButton
                    onClick={() => {
                        const arrayOfIds = ids?.map((id: any) => id?.id)
                        onBulkDeleteClicked(arrayOfIds)
                    }}
                    Icon={FaTrash}
                    variant="error"
                >
                    Delete
                </ActionButton>
            </div>
        ),
    }

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    return (
        <>
            {modal}
            <div className="">
                <Card noPadding>
                    <div className="w-full flex justify-end">
                        <Button
                            text={'Add New Category'}
                            variant={'success'}
                            onClick={onAddCategoriesClicked}
                        />
                    </div>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
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
                            }: TableChildrenProps) => {
                                return (
                                    <div>
                                        <div
                                            // ref={listingRef}
                                            // onScroll={handleScroll}
                                            className="p-6 mb-2 flex justify-between"
                                        >
                                            {pageSize
                                                ? pageSize(
                                                      itemPerPage,
                                                      setItemPerPage,
                                                      data?.data?.length
                                                  )
                                                : null}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination
                                                    ? pagination(
                                                          data?.pagination,
                                                          setPage
                                                      )
                                                    : null}
                                            </div>
                                        </div>
                                        <div className=" overflow-x-scroll remove-scrollbar">
                                            <div className="px-6 w-full">
                                                {table}
                                            </div>
                                        </div>
                                        {data?.data?.length > 10 && (
                                            <div className="p-6 mb-2 flex justify-between">
                                                {pageSize
                                                    ? pageSize(
                                                          itemPerPage,
                                                          setItemPerPage,
                                                          data?.data?.length
                                                      )
                                                    : null}
                                                <div className="flex gap-x-2">
                                                    {quickActions}
                                                    {pagination
                                                        ? pagination(
                                                              data?.pagination,
                                                              setPage
                                                          )
                                                        : null}
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
                                title={'No Categories'}
                                description={'You have no categories yet.'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
