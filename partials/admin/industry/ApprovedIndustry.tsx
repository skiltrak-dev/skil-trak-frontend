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
import { FaEdit, FaEye, FaFileExport } from 'react-icons/fa'

import { RtoCellInfo } from '@partials/admin/rto/components'
import { AdminApi } from '@queries'
import { Industry } from '@types'
import { ReactElement, useState } from 'react'
import { MdBlock } from 'react-icons/md'
import { IndustryCell, ProgressCell, SectorCell } from './components'
import { BlockModal } from './modals'
import { useRouter } from 'next/router'

export const ApprovedIndustry = () => {
  const [modal, setModal] = useState<ReactElement | null>(null)
  const router = useRouter()
  const [filterAction, setFilterAction] = useState(null)
  const [itemPerPage, setItemPerPage] = useState(5)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState({})
  const { isLoading, data } = AdminApi.Industries.useListQuery({
    search: `status:approved,${JSON.stringify(filter)
      .replaceAll('{', '')
      .replaceAll('}', '')
      .replaceAll('"', '')
      .trim()}`,
    skip: itemPerPage * page - itemPerPage,
    limit: itemPerPage,
  })

  const onModalCancelClicked = () => {
    setModal(null)
  }
  const onBlockClicked = (industry: Industry) => {
    setModal(
      <BlockModal industry={industry} onCancel={() => onModalCancelClicked()} />
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
        onClick: (row:any) => { router.push(`/portals/admin/industry/edit-industry/${row.id}`) },
        Icon: FaEdit,
      },
      {
        text: 'Block',
        onClick: (industry: Industry) => onBlockClicked(industry),
        Icon: MdBlock,
        color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
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
        <ActionButton Icon={FaEdit}>Edit</ActionButton>
        <ActionButton Icon={MdBlock} variant="error">
          Block
        </ActionButton>
      </div>
    ),
    common: (ids: number[]) => (
      <ActionButton Icon={MdBlock} variant="error">
        Block
      </ActionButton>
    ),
  }

  return (
    <>
      {modal && modal}
      <div className="flex flex-col gap-y-4 mb-32">
        <PageHeading
          title={'Approved Industries'}
          subtitle={'List of Approved Industries'}
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
              title={'No Approved Industry!'}
              description={'You have not approved any Industry request yet'}
              height={'50vh'}
            />
          )}
        </Card>
      </div>
    </>
  )
}
