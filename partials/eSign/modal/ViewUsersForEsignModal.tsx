import { Button, InitialAvatar, Modal, Table } from '@components'
import { UserRoles } from '@constants'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/router'

export const ViewUsersForEsignModal = ({
    documents,
    onClick,
    route,
    onCancel,
}: {
    documents: any
    onClick: () => void
    route: string
    onCancel?: any
}) => {
    const router = useRouter()

    const usersColumns = (signers: any) => {
        if (signers && signers?.length > 0) {
            return signers?.map((signer: any) => ({
                accessorKey: 'template.name',
                header: () => <span>Template</span>,
                cell: (info: any) => info.getValue(),
            }))
        }
        return []
    }

    const Abc = ({ signer }: any) => (
        <div className="flex items-center gap-x-1">
            {signer?.user?.name && (
                <InitialAvatar
                    name={signer?.user?.name}
                    imageUrl={signer?.user?.avatar}
                />
            )}
            <div>
                <h3 className="text-sm font-bold ">{signer?.user?.name}</h3>
                <p className="text-xs text-gray-400">{signer?.user?.email}</p>
                <p className="text-xs text-gray-400">{signer?.user?.role}</p>
            </div>
        </div>
    )

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'template.name',
            header: () => <span>Template</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'template.course.title',
            header: () => <span>Course</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: 'template.folder.name',
            header: () => <span>Folder</span>,
            cell: (info) => info.getValue(),
        },
        {
            accessorKey: `signers`, // Use a unique identifier, e.g., document id
            header: () => <span>Signers</span>,
            cell: (info: any) => {
                const documentSigners = info.row?.original?.signers || []
                return documentSigners.map((signer: any) => (
                    <Abc signer={signer} />
                ))
            },
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: ({ row }: any) => (
                <Button
                    text={'Sign Document'}
                    onClick={() => {
                        router.push(`${route}/${row?.original?.id}`)
                    }}
                />
            ),
        },
    ]

    // const uniqueColumns = columns.filter(
    //     (column: any, index, self) =>
    //         index ===
    //         self.findIndex((c: any) => c?.accessorKey === column?.accessorKey)
    // )

    const uniqueColumns = columns?.filter((col: any, i: number) =>
        col?.id ? (Number(col?.id) === i ? col : null) : col
    )

    return (
        <Modal
            showActions={false}
            {...(onCancel
                ? {
                      onCancelClick: onCancel,
                  }
                : {})}
            title="Following documents are pending to be signed"
            subtitle={`${documents?.length} Pending Documents Esigns`}
        >
            <div className="min-w-[75vw] max-w-[85vw]">
                <Table<any>
                    columns={columns}
                    data={documents}
                    // quickActions={quickActionsElements}
                    enableRowSelection
                >
                    {({ table, pagination, pageSize, quickActions }: any) => {
                        return (
                            <div>
                                {/* <div className="p-6 mb-2 flex justify-between">
                            {pageSize(
                                itemPerPage,
                                setItemPerPage,
                                data.data.length
                            )}
                            <div className="flex gap-x-2">
                                {quickActions}
                                {pagination(data?.pagination, setPage)}
                            </div>
                        </div> */}
                                <div className="px-6 w-full overflow-x-scroll custom-scrollbar max-h-[70vh]">
                                    {table}
                                </div>
                            </div>
                        )
                    }}
                </Table>
            </div>
        </Modal>
    )

    return (
        <Modal
            showActions={false}
            {...(onCancel
                ? {
                      onCancelClick: onCancel,
                  }
                : {})}
            onCancelClick={onCancel}
            title="Following documents are pending to be signed"
            subtitle={`${documents?.length} Pending Documents Esigns`}
        >
            <div className="px-2 max-h-[85vh] overflow-auto custom-scrollbar">
                <div>
                    <div className="mt-3.5">
                        {documents?.map((document: any) => (
                            <div className="pb-2">
                                <div className="grid grid-cols-2 gap-1.5">
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Template
                                        </p>
                                        <p className="text-sm text-gray-700 font-semibold">
                                            {' '}
                                            {document?.template?.name}{' '}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Course
                                        </p>
                                        <p className="text-sm text-gray-700 font-semibold">
                                            {document?.template?.course?.title}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Folder
                                        </p>
                                        <p className="text-sm text-gray-700 font-semibold">
                                            {document?.template?.folder?.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3 ">
                                    {document?.signers?.map((signer: any) => (
                                        <div className="flex items-center gap-x-1">
                                            {signer?.user?.name && (
                                                <InitialAvatar
                                                    name={signer?.user?.name}
                                                    imageUrl={
                                                        signer?.user?.avatar
                                                    }
                                                />
                                            )}
                                            <div>
                                                <h3 className="text-sm font-bold ">
                                                    {signer?.user?.name}
                                                </h3>
                                                <p className="text-xs text-gray-400">
                                                    {signer?.user?.email}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {signer?.user?.role}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-end gap-x-3 py-4 mt-1">
                                    <Button
                                        text={'Sign Document'}
                                        onClick={() => {
                                            router.push(
                                                `${route}/${document?.id}`
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end">
                            {onCancel && (
                                <Button
                                    text={'Sign Later'}
                                    onClick={() => {
                                        onCancel()
                                    }}
                                    outline
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
