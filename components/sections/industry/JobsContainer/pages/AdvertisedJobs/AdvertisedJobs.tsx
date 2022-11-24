import React, { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

// Icons
import { MdEdit } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'

// components
import {
    Popup,
    Button,
    EmptyData,
    ReactTable,
    Typography,
    BackButton,
    TableAction,
    //   ActionDropDown,
    //   ConfirmActionView,
} from '@components'
import { JobsFilter } from './components'

// hooks
// import { useContextBar } from "hooks";

// redux
import { useGetIndustryJobsQuery, useRemoveJobMutation } from '@queries'

// utills
import { getThemeColors } from '@theme'

// HOC
import { Filter } from '@hoc'
import { DeleteModal } from '../../modals'

const Colors = getThemeColors()

export const AdvertisedJobs = () => {
    const router = useRouter()

    const [queryFilters, setQueryFilters] = useState({})
    const [filterActionButton, setFilterActionButton] = useState(null)
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onDeleteClicked = (job: any) => {
        setModal(
            <DeleteModal job={job} onCancel={() => onModalCancelClicked()} />
        )
    }

    // Right Sidebar
    // useEffect(() => {
    // 	hideContextbar();
    // 	setContent(<ContextbarContent />);
    // }, [setContent]);

    const TableActionOption = [
        {
            text: 'View',
            Icon: MdEdit,
            onClick: (job: any) => {
                router.push(`/portals/industry/jobs/job-detail/${job.id}`)
            },
        },
        {
            text: 'Edit',
            Icon: MdEdit,
            onClick: (job: any) => {
                router.push(`/jobs/advertise-new-job/${job.id}`)
            },
        },
        {
            text: 'Delete',
            Icon: AiFillDelete,
            onClick: (job: any) => {
                console.log('Jobbbbbbbbbbbbb', job.title)
                onDeleteClicked(job)
            },
        },
    ]

    const Columns = [
        {
            Header: 'Job Title',
            accessor: 'title',
            sort: true,
            Cell: ({ row }) => {
                const { title, industry } = row.original
                return (
                    <Link
                        href={`/jobs/job-detail/${row.original.id}`}
                        className="flex items-center gap-x-2 relative"
                    >
                        <a>
                            <div className="absolute top-1">
                                {/* <SimpleCheckbox /> */}
                            </div>

                            <div>
                                <Typography color={'black'}>
                                    {' '}
                                    {title}{' '}
                                </Typography>
                                <Typography variant={'muted'} color={'gray'}>
                                    {industry?.user?.name}
                                </Typography>
                            </div>
                        </a>
                    </Link>
                )
            },
        },
        {
            Header: 'Type',
            accessor: 'employmentType',
            Cell: ({ row }) => {
                const { employmentType } = row.original
                switch (employmentType) {
                    case 'fullTime':
                        return 'Full Time'

                    case 'partTime':
                        return 'Part Time'

                    default:
                        return 'Temporary'
                }
            },
            disableFilters: true,
        },
        {
            Header: 'Phone',
            accessor: 'phone',
        },
        {
            Header: 'Status',
            accessor: 'isActive',
            disableFilters: true,
            Cell: ({ row }) => {
                const { isActive } = row.original
                return isActive ? 'Approved' : 'Pending'
            },
        },
        {
            Header: 'Action',
            accessor: 'Action',
            Cell: ({ row }) => {
                return (
                    <TableAction
                        title={'More'}
                        options={TableActionOption}
                        rowItem={row.original}
                    />
                )
            },
        },
    ]

    const filterInitialValues = {
        title: '',
        type: '',
        status: '',
    }
    return (
        <div>
            {modal}
            <div className="flex justify-between items-center pb-4">
                <BackButton link={'jobs'} text={'Back To Jobs'} />
                <div className="flex items-center gap-x-2">
                    {filterActionButton && filterActionButton}
                    <Button
                        variant={'dark'}
                        onClick={() =>
                            router.push(
                                '/portals/industry/jobs/advertise-new-job'
                            )
                        }
                    >
                        Advertise New Job
                    </Button>
                </div>
            </div>

            <Filter
                component={JobsFilter}
                setQueryFilters={setQueryFilters}
                setFilterAction={setFilterActionButton}
                filterInitialValues={filterInitialValues}
            />

            {/* Showing Alert on Any Action */}

            {/* Jobs List */}

            <div className="flex justify-between items-center">
                <p className="text-sm font-bold">Your Jobs</p>
            </div>
            <ReactTable
                pagesize
                pagination
                Columns={Columns}
                querySort={'title'}
                action={useGetIndustryJobsQuery}
            />

            {/* Delete */}
            {/* <ConfirmActionView
        actionData={removeJob}
        setActionData={setRemoveJob}
        action={async () => {
          await deleteJob(removeJob.id)
        }}
        actionResult={deleteJobResult}
        type={'Job'}
        description={`You are about to Delete ${removeJob.title} Job. Are you sure you want to delete this Job.`}
        actionText={'Delete'}
        variant={'error'}
      /> */}
        </div>
    )
}
