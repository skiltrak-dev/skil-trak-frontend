import {
    Button,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableChildrenProps,
    TechnicalError,
    Typography,
} from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { Student } from '@types'
import { ReactElement, useState } from 'react'
import { AiFillEye } from 'react-icons/ai'
import { AdminApi } from '@queries'
import { ApiKeysModal, DeactivateKeyModal, GenerateKeyModal } from '../modal'
import { ApiKeyStatus } from '../enum'
import moment from 'moment'
export const RTOList = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const { isLoading, isFetching, data, isError } =
        AdminApi.GenerateKey.getKeys(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            { refetchOnMountOrArgChange: true }
        )

    const onCancel = () => setModal(null)

    const onGenerateKeyClicked = () => {
        setModal(<GenerateKeyModal onCancel={onCancel} />)
    }

    const onDeactivateClicked = (key: any) => {
        setModal(<DeactivateKeyModal onCancel={onCancel} keyData={key} />)
    }

    const onViewApiKeys = (clientId: string, clientSecret: string) => {
        setModal(
            <ApiKeysModal
                onCancel={onCancel}
                keyData={{ clientId, clientSecret }}
            />
        )
    }

    const getDaysLeft = (futureDate: Date) => {
        const now = moment()
        const future = moment(futureDate)
        const daysLeft = future.diff(now, 'days')
        return `${daysLeft} days left`
    }

    const StatusView = ({
        status,
        expiresOn,
    }: {
        expiresOn: Date
        status: ApiKeyStatus
    }) => {
        switch (status) {
            case ApiKeyStatus.Active:
                return (
                    <>
                        <Typography color="text-[#128C7E]" bold variant="small">
                            Active
                        </Typography>
                        <Typography variant="small">
                            Time Left : {getDaysLeft(expiresOn)}
                        </Typography>
                    </>
                )

            default:
                return <></>
        }
    }

    const tableActionOption = [
        {
            text: 'Send',
            onClick: (student: any) => {},
        },
        {
            text: 'Deactivate',
            onClick: (key: any) => {
                onDeactivateClicked(key)
            },
        },
    ]
    const maskApiKey = (key: string) => {
        // Convert to string in case it's a number
        const keyStr = key.toString()
        // Get the last 4 digits
        const lastFour = keyStr.slice(-6)
        // Create asterisks for the rest of the length
        const mask = '*'.repeat(keyStr.length - 6)

        return mask + lastFour
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <Typography variant="label">
                    {info.row.original?.user?.name}
                </Typography>
            ),
            header: () => <span>Name</span>,
        },
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <Typography variant="label">
                    {info.row.original?.user?.email}
                </Typography>
            ),
            header: () => <span>Email</span>,
        },
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <div className="flex items-center gap-x-1">
                    <Typography variant="label">
                        {maskApiKey(info?.row?.original?.clientId)}
                    </Typography>
                    <AiFillEye
                        className="text-xl text-[#374151]"
                        onClick={() => {
                            onViewApiKeys(
                                info?.row?.original?.clientId,
                                info?.row?.original?.clientSecret
                            )
                        }}
                    />
                </div>
            ),
            header: () => <span>API Key</span>,
        },
        {
            accessorKey: 'status',
            cell: (info) => (
                <div className="flex items-center justify-between gap-x-8">
                    <StatusView
                        status={info?.row?.original?.status}
                        expiresOn={info?.row?.original?.expiresOn}
                    />
                </div>
            ),
            header: () => <span>Status</span>,
        },
        {
            accessorKey: 'user.name',
            cell: (info) => (
                <div className="flex gap-x-1 items-center">
                    <TableAction
                        options={tableActionOption}
                        rowItem={info?.row?.original}
                    />
                </div>
            ),
            header: () => <span>API Key</span>,
        },
    ]
    return (
        <div>
            {modal}
            <div className="flex items-center justify-between mb-2.5">
                <Typography variant="h3" bold>
                    RTO List
                </Typography>
                <Button
                    text="Generate API Key"
                    onClick={() => {
                        onGenerateKeyClicked()
                    }}
                />
            </div>
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table columns={columns} data={data.data}>
                        {({
                            table,
                            pagination,
                            pageSize,
                            quickActions,
                        }: TableChildrenProps) => {
                            return (
                                <div>
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
                                    <div className="overflow-x-auto remove-scrollbar">
                                        <div
                                            className="px-6 w-full"
                                            id={'studentScrollId'}
                                        >
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
                            title={'No Generated Key Yet!'}
                            description={'You Have Not Generated Any Key Yet!'}
                            height={'50vh'}
                        />
                    )
                )}  
            </Card>
        </div>
    )
}
