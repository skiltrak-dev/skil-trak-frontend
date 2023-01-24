import { ReactElement, useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import { AdminLayout } from '@layouts'
import { AppointmentType, Job, NextPageWithLayout } from '@types'

// query
import { AdminApi } from '@queries'

// components
import { PageHeading } from '@components/headings'

import { useNavbar } from '@hooks'
import {
  ActionButton,
  AppointmentTypeFilters,
  Button,
  Card,
  EmptyData,
  Filter,
  InitialAvatar,
  LoadingAnimation,
  Table,
  TableAction,
  TableActionOption,
  TechnicalError,
} from '@components'
import { DeleteModal, RequirementModal } from '@partials/admin/job'
import { FaEnvelope, FaFileExport, FaPhone, FaTrash } from 'react-icons/fa'

type Props = {}

const RPLList: NextPageWithLayout = (props: Props) => {
  const navBar = useNavbar()
  const [modal, setModal] = useState<ReactElement | null>(null)

  const [filterAction, setFilterAction] = useState(null)
  const [itemPerPage, setItemPerPage] = useState(50)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState({})
  const { isLoading, data, isError } = AdminApi.Industries.useRplList({
    search: `${JSON.stringify(filter)
      .replaceAll('{', '')
      .replaceAll('}', '')
      .replaceAll('"', '')
      .trim()}`,
    skip: itemPerPage * page - itemPerPage,
    limit: itemPerPage,
  })
  console.log("rpl data", data)
  const onModalCancelClicked = () => {
    setModal(null)
  }
  const onViewContentClicked = (appointmentType: AppointmentType) => {
    setModal(
      <RequirementModal
        appointmentType={appointmentType}
        onCancel={onModalCancelClicked}
      />
    )
  }

  const onDeleteClicked = (appointmentType: AppointmentType) => {
    setModal(
      <DeleteModal
        appointmentType={appointmentType}
        onCancel={() => onModalCancelClicked()}
      />
    )
  }
  useEffect(() => {
    navBar.setTitle('Workplace Request')
  }, [])
  const tableActionOptions: TableActionOption[] = [
    {
      text: 'Delete',
      onClick: (item: any) => onDeleteClicked(item),
      Icon: FaTrash,
      color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
    },
  ]

  const columns: ColumnDef<any>[] = [
    // {
    //   header: () => <span>Title</span>,
    //   accessorKey: '',
    //   cell: (info) => {
    //     return (
    //       <div>
    //         <p className="font-semibold">
    //           {info.row.original.id}
    //         </p>

    //       </div>
    //     )
    //   },
    // },
    // {
    //   header: () => <span>Description</span>,
    //   accessorKey: '',
    //   cell: (info) => {
    //     return (
    //       <ActionButton variant="link" simple>
    //         View
    //       </ActionButton>
    //     )
    //   },
    // },
    {
      header: () => <span>Job Description</span>,
      accessorKey: 'jobDescription',
      cell: (info) => {
        return (
          <div>
            {info.row.original?.jobDescription}
          </div>
        )
      },
    },
    // {
    //   header: () => <span>Contact Person</span>,
    //   accessorKey: 'contactPerson',
    //   cell: (info) => {
    //     return (
    //       <div className="flex items-center gap-x-2">
    //         <InitialAvatar
    //           name={info.row.original.contactPerson}
    //           small
    //         />
    //         <p>{info.row.original.contactPerson}</p>
    //       </div>
    //     )
    //   },
    // },
    // {
    //   header: () => <span>Address</span>,
    //   accessorKey: 'suburb',
    //   cell: (info) => info.getValue(),
    // },
    // {
    //   header: () => <span>Salary</span>,
    //   accessorKey: 'salaryFrom',
    //   cell: (info) => {
    //     return (
    //       <div>
    //         <span className="text-gray-400">AUD</span>{' '}
    //         <span className="text-gray-600 font-semibold">
    //           {info.row.original.salaryFrom}
    //         </span>{' '}
    //         - <span className="text-gray-400">AUD</span>{' '}
    //         <span className="text-gray-600 font-semibold">
    //           {info.row.original.salaryTo}
    //         </span>
    //       </div>
    //     )
    //   },
    // },

    // {
    //   accessorKey: 'action',
    //   header: () => <span>Action</span>,
    //   cell: (info) => {
    //     return (
    //       <div className="flex gap-x-1 items-center">
    //         <TableAction
    //           options={tableActionOptions}
    //           rowItem={info.row.original}
    //         />
    //       </div>
    //     )
    //   },
    // },
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
    <div className='p-6'>
      {modal && modal}
      <div className="flex flex-col gap-y-4 mb-32">
        <PageHeading title={'RPL List'} subtitle={'List of Requested RPL'}>
          {filterAction}
          {data && data?.data.length ? (
            <Button
              text="Export"
              variant="action"
              Icon={FaFileExport}
            />
          ) : null}
        </PageHeading>

        <Filter
          component={AppointmentTypeFilters}
          initialValues={{ title: '', appointmentFor: '' }}
          setFilterAction={setFilterAction}
          setFilter={setFilter}
        />

        <Card noPadding>
          {isError && <TechnicalError />}
          {isLoading ? (
            <LoadingAnimation height="h-[60vh]" />
          ) : data && data?.data.length ? (
            <Table
              columns={columns}
              data={data.data}
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
                        setItemPerPage
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
                  </div>
                )
              }}
            </Table>
          ) : (
            !isError && (
              <EmptyData
                title={'No Jobs!'}
                description={'You have no jobs yet'}
                height={'50vh'}
              />
            )
          )}
        </Card>
      </div>
    </div>
  )
}
RPLList.getLayout = (page: ReactElement) => {
  return <AdminLayout>{page}</AdminLayout>
}
export default RPLList