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
  TableActionOption,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEdit, FaEye, FaFileExport, FaFilter } from 'react-icons/fa'

import { AdminApi } from '@queries/portals'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { useContextBar } from '@hooks'
import { ViewSectors } from './contextBar'
import { Rto } from '@types'
import { RtoCellInfo } from './components'

export const PendingRto = () => {
  const contextBar = useContextBar()

  const [filterAction, setFilterAction] = useState(null)
  const [itemPerPage, setItemPerPage] = useState(5)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState({})
  const { isLoading, data } = AdminApi.rto.useRtosListQuery({
    search: `status:pending,${JSON.stringify(filter)
      .replaceAll('{', '')
      .replaceAll('}', '')
      .replaceAll('"', '')
      .trim()}`,
    skip: itemPerPage * page - itemPerPage,
    limit: itemPerPage,
  })

  const onViewSectorClicked = (rto: Rto) => {
    contextBar.setContent(<ViewSectors rto={rto} />)
    contextBar.show()
  }

  const tableActionOptions: TableActionOption[] = [
    {
      text: 'Accept',
      onClick: () => {},
      color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
    },
    {
      text: 'Reject',
      onClick: () => {},
      color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
    },
    {
      text: 'View',
      onClick: () => {},
      Icon: FaEye,
    },
    {
      text: 'Edit',
      onClick: () => {},
      Icon: FaEdit,
    },
  ]

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'user.name',
      cell: (info) => {
        return <RtoCellInfo rto={info.row.original} />
      },
      header: () => <span>Name</span>,
    },
    {
      accessorKey: 'rtoCode',
      header: () => <span>Code</span>,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'sectors',
      header: () => <span>Sectors</span>,
      cell: (info) => {
        return (
          <ActionButton
            variant="link"
            onClick={() => onViewSectorClicked(info.row.original)}
            simple
          >
            View
          </ActionButton>
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
      cell: (info) => {
        return (
          <div className="flex gap-x-1 items-center">
            <ActionButton variant="success" onClick={() => {}}>
              Accept
            </ActionButton>
            <ActionButton variant="error" onClick={() => {}}>
              Reject
            </ActionButton>

            <TableAction options={tableActionOptions} />
          </div>
        )
      },
    },
  ]

  const quickActionsElements = {
    id: 'id',
    individual: (id: number) => (
      <div className="flex gap-x-2">
        <ActionButton variant="success" onClick={() => {}}>
          Accept
        </ActionButton>
        <ActionButton variant="error" onClick={() => {}}>
          Reject
        </ActionButton>
      </div>
    ),
    common: (ids: number[]) => (
      <ActionButton variant="error" onClick={() => {}}>
        Reject
      </ActionButton>
    ),
  }

  return (
    <div className="flex flex-col gap-y-4 mb-32">
      <PageHeading title={'Pending RTOs'} subtitle={'List of Pending RTOs'}>
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
            title={'No Pending RTO!'}
            description={'You have no pending RTO request yet'}
            height={'50vh'}
          />
        )}
      </Card>
    </div>
  )
}
