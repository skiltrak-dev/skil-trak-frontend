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

import { AdminApi } from '@queries'
import { MdBlock, MdEmail, MdPhoneIphone } from 'react-icons/md'
import { ReactElement, useEffect, useState } from 'react'
import { RtoCellInfo } from './components'
import { DeleteModal } from './modals'
import { Rto } from '@types'
import { useRouter } from 'next/router'
import { useContextBar } from '@hooks'

export const Courses = () => {
   const router = useRouter()
   const contextBar = useContextBar()
   const [modal, setModal] = useState<ReactElement | null>(null)

   const [filterAction, setFilterAction] = useState(null)
   const [itemPerPage, setItemPerPage] = useState(5)
   const [page, setPage] = useState(1)
   const [filter, setFilter] = useState({})

   const { isLoading, data } = AdminApi.Courses.useListQuery({
      search: `${JSON.stringify(filter)
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
   const onAcceptClicked = (rto: Rto) => {}
   const onDeleteClicked = (rto: Rto) => {
      // setModal(
      //    <DeleteModal sector={rto} onCancel={() => onModalCancelClicked()} />
      // )
   }

   useEffect(() => {
      contextBar.hide()
   }, [])

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
         text: 'Accept',
         onClick: (rto: Rto) => onAcceptClicked(rto),
         color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
      },

      {
         text: 'Delete',
         onClick: (rto: Rto) => onDeleteClicked(rto),
         Icon: FaTrash,
         color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
      },
   ]

   const columns: ColumnDef<any>[] = [
      {
         accessorKey: 'title',
         cell: (info) => {
            return (
               <div className='relative group cursor-pointer'>
                  <div>
                     <p className="text-xs font-medium text-gray-500">
                        {info.row.original.code}
                     </p>
                     <p className="font-semibold">{info.row.original.title}</p>
                  </div>

                  <div className='hidden group-hover:block px-4 py-2 bg-white rounded-xl shadow-xl absolute top-10 left-0 z-10'>
                     <p className='text-xs font-semibold mb-1 text-gray-500'>Course Description</p>
                     <p className='text-sm text-gray-700'>{info.row.original.description}</p>
                  </div>
               </div>
            )
         },
         header: () => <span>Name</span>,
      },
      {
         accessorKey: 'hours',
         header: () => <span>Hours</span>,
         cell: (info) => info.getValue(),
      },

      {
         accessorKey: 'sector',
         header: () => <span>Sector</span>,
         cell: (info) => {
            return (
               <div>
                  <p className="text-xs font-medium text-gray-500">
                     {info.row.original.sector.code}
                  </p>
                  <p className="font-semibold">
                     {info.row.original.sector.name}
                  </p>
               </div>
            )
         },
      },
      {
         accessorKey: 'requirement',
         header: () => <span>Requirement</span>,
         cell: (info) => {
            return <span>View</span>
         },
      },
      {
         accessorKey: 'action',
         header: () => <span>Action</span>,
         cell: (info) => {
            return (
               <div className="flex gap-x-1 items-center">
                  <TableAction
                     options={tableActionOptions}
                     rowItem={info.row.original}
                  />
               </div>
            )
         },
      },
   ]

   const quickActionsElements = {
      id: 'id',
      individual: (item: Rto) => (
         <div className="flex gap-x-2">
            <ActionButton Icon={FaEdit}>Edit</ActionButton>
            <ActionButton
               variant="success"
               onClick={() => onAcceptClicked(item)}
            >
               Accept
            </ActionButton>
            <ActionButton
               Icon={FaTrash}
               variant="error"
               onClick={() => onDeleteClicked(item)}
            >
               Delete
            </ActionButton>
         </div>
      ),
      common: (items: Rto[]) => (
         <div className="flex gap-x-2">
            <ActionButton variant="success">Accept</ActionButton>
            <ActionButton Icon={FaTrash} variant="error">
               Delete
            </ActionButton>
         </div>
      ),
   }

   return (
      <>
         {modal && modal}
         <div className="flex flex-col gap-y-4 mb-32">
            <PageHeading title={'Courses'} subtitle={'List of all courses'}>
               <Button
                  text="Add Course"
                  onClick={() => {
                     router.push('sectors/courses/form')
                  }}
               />
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
                     title={'No Courses!'}
                     description={'You have not added any course yet'}
                     height={'50vh'}
                  />
               )}
            </Card>
         </div>
      </>
   )
}
