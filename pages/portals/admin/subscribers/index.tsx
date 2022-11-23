import { ReactElement, useEffect, useState } from 'react'

import {
   ActionModal,
   Button,
   Card,
   EmptyData,
   Filter,
   LoadingAnimation,
   SubscriberFilters,
   Table,
   TableAction,
   TableActionOption,
} from '@components'
import { PageHeading } from '@components/headings'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { AdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { NextPageWithLayout, Subscriber, UnsubscribedBy } from '@types'
import { filterify } from '@utils'
import { FaBan, FaCheck, FaFileExport, FaTimes, FaTrash } from 'react-icons/fa'
import { UnsubscribeModal } from '@modals'
import { useResubscribe } from '@partials/admin/subscribers/hooks'

const Subscribers: NextPageWithLayout = () => {
   const navBar = useNavbar()
   const contextBar = useContextBar()
   const [modal, setModal] = useState<ReactElement | null>(null)

   const [filterAction, setFilterAction] = useState(null)
   const [itemPerPage, setItemPerPage] = useState(5)
   const [page, setPage] = useState(1)
   const [filter, setFilter] = useState({})
   const { isLoading, data } = AdminApi.Subscribers.useListQuery({
      search: filterify(filter),
      skip: itemPerPage * page - itemPerPage,
      limit: itemPerPage,
   })

   useEffect(() => {
      navBar.setTitle('Subscribers')
      contextBar.switchOff(true)
   }, [])

   const onModalCancelClicked = () => {
      setModal(null)
   }

   const onUnsubscribeClicked = (subscriber: Subscriber) => {
      setModal(
         <UnsubscribeModal
            subscriber={subscriber}
            onCancel={onModalCancelClicked}
         />
      )
   }

   const { onResubscribe } = useResubscribe()
   const onResubscribeClicked = async (subscriber: Subscriber) => {
      await onResubscribe(subscriber)
   }

   const onDeleteClicked = async (subscriber: Subscriber) => {}

   const getTableOptions = (subscriber: Subscriber): TableActionOption[] => {
      if (subscriber.isSubscribed)
         return [
            {
               text: 'Unsubscribe',
               onClick: () => onUnsubscribeClicked(subscriber),
            },
         ]
      if (
         !subscriber.isSubscribed &&
         subscriber.unsubscribedBy === UnsubscribedBy.Admin
      )
         return [
            {
               text: 'Re-Subscribe',
               onClick: () => onResubscribeClicked(subscriber),
            },
            {
               text: 'Delete',
               onClick: () => onDeleteClicked(subscriber),
               Icon: FaTrash,
               color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
         ]
      return [
         {
            text: 'Delete',
            onClick: () => onDeleteClicked(subscriber),
            Icon: FaTrash,
            color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
         },
      ]
   }

   const columns: ColumnDef<Subscriber>[] = [
      {
         accessorKey: 'email',
         header: () => <span>Email</span>,
         cell: (info) => info.getValue(),
      },
      {
         accessorKey: 'isSubscribed',
         header: () => <span>Subscribed</span>,
         cell: (info) => {
            return info.row.original.isSubscribed ? (
               <span className="text-green-500">
                  <FaCheck />
               </span>
            ) : (
               <span className="text-gray-400">
                  <FaTimes />
               </span>
            )
         },
      },
      {
         accessorKey: 'unsubscribedBy',
         header: () => <span>Unsubscribed By</span>,
         cell: (info) => {
            return (
               <span className="capitalize">
                  {!info.row.original.isSubscribed &&
                  info.row.original.unsubscribedBy
                     ? info.row.original.unsubscribedBy
                     : '-'}
               </span>
            )
         },
      },

      {
         accessorKey: 'action',
         header: () => <span>Action</span>,
         cell: (info) => {
            return (
               <div className="flex gap-x-1 items-center">
                  <TableAction options={getTableOptions(info.row.original)} />
               </div>
            )
         },
      },
   ]

   return (
      <>
         {modal && modal}
         <div className="flex flex-col gap-y-4 mb-32 px-6">
            <PageHeading title={''} subtitle={''}>
               {data && data?.data.length ? (
                  <>
                     {filterAction}
                     <Button
                        text="Export"
                        variant="action"
                        Icon={FaFileExport}
                     />
                  </>
               ) : null}
            </PageHeading>

            {data && data?.data.length ? (
               <Filter
                  component={SubscriberFilters}
                  initialValues={{
                     isSubscribed: '',
                     unsubscribedBy: '',
                     email: '',
                  }}
                  setFilterAction={setFilterAction}
                  setFilter={setFilter}
               />
            ) : null}

            <Card noPadding>
               {isLoading ? (
                  <LoadingAnimation height="h-[60vh]" />
               ) : data && data?.data.length ? (
                  <Table columns={columns} data={data.data}>
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
                     title={'No Subscriber!'}
                     description={'Maybe No One Has Subscribed Yet!'}
                     height={'50vh'}
                  />
               )}
            </Card>
         </div>
      </>
   )
}

Subscribers.getLayout = (page: ReactElement) => {
   return <AdminLayout>{page}</AdminLayout>
}

export default Subscribers
