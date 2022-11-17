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
import { FaEdit, FaEye, FaFileExport, FaFilter, FaTrash } from 'react-icons/fa'

import { AdminApi } from '@queries/portals'
import {
  MdBlock,
  MdEmail,
  MdPhoneIphone,
  MdRestore,
  MdUnarchive,
} from 'react-icons/md'
import { useState } from 'react'
import { CgUnblock } from 'react-icons/cg'
import { RtoCellInfo } from './components'

export const ArchivedRto = () => {
  const [filterAction, setFilterAction] = useState(null)
  const [itemPerPage, setItemPerPage] = useState(5)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState({})

  const { isLoading, data } = AdminApi.rto.useRtosListQuery({
    search: `status:archived,${JSON.stringify(filter)
      .replaceAll('{', '')
      .replaceAll('}', '')
      .replaceAll('"', '')
      .trim()}`,
    skip: itemPerPage * page - itemPerPage,
    limit: itemPerPage,
  })

  const tableActionOptions: TableActionOption[] = [
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
    {
      text: 'Unarchive',
      onClick: () => {},
      Icon: MdUnarchive,
      color: 'text-orange-500 hover:bg-orange-100 hover:border-orange-200',
    },
    {
      text: 'Delete',
      onClick: () => {},
      Icon: FaTrash,
      color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
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
      accessorKey: 'students',
      header: () => <span>Students</span>,
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'sectors',
      header: () => <span>Sectors</span>,
      cell: (info) => info.getValue(),
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
        <ActionButton>Sub Admins</ActionButton>
        <ActionButton Icon={MdUnarchive} variant="warning">
          Unarchive
        </ActionButton>
        <ActionButton Icon={FaTrash} variant="error">
          Delete
        </ActionButton>
      </div>
    ),
    common: (ids: number[]) => (
      <div className="flex gap-x-2">
        <ActionButton Icon={MdUnarchive} variant="warning">
          Unarchive
        </ActionButton>
        <ActionButton Icon={FaTrash} variant="error">
          Delete
        </ActionButton>
      </div>
    ),
  }

  return (
    <div className="flex flex-col gap-y-4 mb-32">
      <PageHeading title={'Archived RTOs'} subtitle={'List of Archived RTOs'}>
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
            title={'No Archived RTO!'}
            description={'You have not archived any RTO request yet'}
            height={'50vh'}
          />
        )}
      </Card>
    </div>
  )
}
