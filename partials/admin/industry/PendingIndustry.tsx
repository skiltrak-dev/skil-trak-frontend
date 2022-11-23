import {
  ActionButton,
  Button,
  Card,
  EmptyData,
  Filter,
  LoadingAnimation,
  RtoFilters,
  Table,
  TableAction,
  TableActionOption
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaFileExport } from 'react-icons/fa'

import { AdminApi } from '@queries'
import { Industry } from '@types'
import { ReactElement, useState } from 'react'
import { IndustryCell } from './components'
import { useChangeStatus } from './hooks'
import { AcceptModal, RejectModal } from './modals'
import { useRouter } from 'next/router'

export const PendingIndustry = () => {
  const [modal, setModal] = useState<ReactElement | null>(null)
  const router = useRouter()
  const [filterAction, setFilterAction] = useState(null)
  const [itemPerPage, setItemPerPage] = useState(5)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState({})
  const { isLoading, data } = AdminApi.Industries.useListQuery({
    search: `status:pending,${JSON.stringify(filter)
      .replaceAll('{', '')
      .replaceAll('}', '')
      .replaceAll('"', '')
      .trim()}`,
    skip: itemPerPage * page - itemPerPage,
    limit: itemPerPage,
  })

  console.log("::: INDUSTRY DATA", data)

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
  }
  const onRejectClicked = (industry: Industry) => {
    setModal(
      <RejectModal
        industry={industry}
        onCancel={() => onModalCancelClicked()}
      />
    )
  }

  const tableActionOptions = (row: TableActionOption) => {
    return [
      {
        text: 'View',
        onClick: () => { },
        Icon: FaEye,
      },
      {
        text: 'Edit',
        onClick: () => { router.push(`/portals/admin/industry/edit-industry/${row?.id}`) },
        Icon: FaEdit,
      },
    ]
  }

  const columns: ColumnDef<Industry>[] = [
    {
      accessorKey: 'user.name',
      cell: (info) => {
        return <IndustryCell industry={info.row.original} />
      },
      header: () => <span>Industry</span>,
    },
    {
      accessorKey: 'abn',
      header: () => <span>ABN</span>,
      cell: (info) => info.getValue(),
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
      accessorKey: 'suburb',
      header: () => <span>Address</span>,
      cell: (info) => info.getValue(),
    },

    {
      accessorKey: 'action',
      header: () => <span>Action</span>,
      cell: (info: any) => {
        const options = tableActionOptions(info.row.original)
        return (
          <div className="flex gap-x-1 items-center">
            <ActionButton
              variant="success"
              onClick={() => onAcceptClicked(info.row.original)}
              loading={changeStatusResult.isLoading}
              disabled={changeStatusResult.isLoading}
            >
              Accept
            </ActionButton>
            <ActionButton
              variant="error"
              onClick={() => onRejectClicked(info.row.original)}
              loading={changeStatusResult.isLoading}
              disabled={changeStatusResult.isLoading}
            >
              Reject
            </ActionButton>

            <TableAction
              options={options}
              rowItem={info.row.original}
            />
          </div>
        )
      },
    },
  ]

  const quickActionsElements = {
    id: 'id',
    individual: (id: number) => (
      <div className="flex gap-x-2">
        <ActionButton variant="success" onClick={() => { }}>
          Accept
        </ActionButton>
        <ActionButton variant="error" onClick={() => { }}>
          Reject
        </ActionButton>
      </div>
    ),
    common: (ids: number[]) => (
      <ActionButton variant="error" onClick={() => { }}>
        Reject
      </ActionButton>
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
              {filterAction}
              <Button text="Export" variant="action" Icon={FaFileExport} />
            </>
          ) : null}
        </PageHeading>

        {data && data?.data.length ? (
          <Filter
            component={RtoFilters}
            initialValues={{ name: '', email: '', rtoCode: '' }}
            setFilterAction={setFilterAction}
            setFilter={setFilter}
          />
        ) : null}

        <Card noPadding>
          {isLoading ? (
            <LoadingAnimation height="h-[60vh]" />
          ) : data && data?.data.length ? (
            <Table
              columns={columns}
              data={data.data}
              quickActions={quickActionsElements}
              enableRowSelection
            >
              {({ table, pagination, pageSize, quickActions }: any) => {
                return (
                  <div>
                    <div className="p-6 mb-2 flex justify-between">
                      {pageSize(itemPerPage, setItemPerPage)}
                      <div className="flex gap-x-2">
                        {quickActions}
                        {pagination(data?.pagination, setPage)}
                      </div>
                    </div>
                    <div className="px-6">{table}</div>
                  </div>
                )
              }}
            </Table>
          ) : (
            <EmptyData
              title={'No Pending Industry!'}
              description={'You have no pending Industry'}
              height={'50vh'}
            />
          )}
        </Card>
      </div>
    </>
  )
}
