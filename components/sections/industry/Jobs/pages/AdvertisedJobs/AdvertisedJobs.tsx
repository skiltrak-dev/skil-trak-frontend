import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

// Icons
import { MdEdit } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'

// components
import {
    Card,
    Popup,
    Button,
    EmptyData,
    ReactTable,
    Typography,
    GoBackButton,
    ActionDropDown,
    ConfirmActionView,
} from 'components'
import { JobsFilter } from './components'

// hooks
// import { useContextBar } from "hooks";

// redux
import { useGetJobsQuery, useRemoveJobMutation } from 'redux/query'

// utills
import { Colors } from 'utills'

// HOC
import { Filter } from 'HigherOrderComponents'

// context
import { JobDataContext } from 'pages/Jobs'

export const AdvertisedJobs = () => {
    const [pageSizeComponent, setPageSizeComponent] = useState(null)
    const [queryFilters, setQueryFilters] = useState({})
    const [filterActionButton, setFilterActionButton] = useState(null)

    const { setJobData } = useContext(JobDataContext)

    //
    const navigate = useNavigate()

    // for Delete Popup
    const [removeJob, setRemoveJob] = useState({
        show: false,
        id: '',
        title: '',
    })

    // query
    const [deleteJob, deleteJobResult] = useRemoveJobMutation()

    // Right Sidebar
    // useEffect(() => {
    // 	hideContextbar();
    // 	setContent(<ContextbarContent />);
    // }, [setContent]);

    const TableActionOption = (row) => {
        const actions = [
            {
                text: 'View',
                Icon: MdEdit,
                action: () => {
                    navigate(`/jobs/job-detail/${row.id}`)
                },
                color: Colors.secondaryText,
            },
            {
                text: 'Edit',
                Icon: MdEdit,
                action: () => {
                    setJobData({
                        ...row,
                        isEditing: true,
                    })
                    navigate(`/jobs/advertise-new-job/${row.id}`)
                },
                color: Colors.secondaryText,
            },
            {
                text: 'Delete',
                Icon: AiFillDelete,
                action: () => {
                    setRemoveJob({
                        show: true,
                        id: row.id,
                        title: row.title,
                    })
                },
                color: Colors.error,
            },
        ]
        return actions
    }

    const Columns = [
        {
            Header: 'Job Title',
            accessor: 'title',
            sort: true,
            Cell: ({ row }) => {
                const { title, industry } = row.original
                return (
                    <NavLink
                        to={`/jobs/job-detail/${row.original.id}`}
                        className="flex items-center gap-x-2 relative"
                    >
                        <div className="absolute top-1">
                            {/* <SimpleCheckbox /> */}
                        </div>

                        <div>
                            <Typography color={'black'}> {title} </Typography>
                            <Typography variant={'muted'} color={'gray'}>
                                {industry?.user?.name}
                            </Typography>
                        </div>
                    </NavLink>
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
                const action = TableActionOption(row.original)
                return <ActionDropDown title={'More'} dropDown={action} />
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
            <div className="flex justify-between items-center pb-4">
                <GoBackButton link={'jobs'}>Back To Jobs</GoBackButton>
                <div className="flex items-center gap-x-2">
                    {filterActionButton && filterActionButton}
                    <Button
                        variant={'dark'}
                        onClick={() => navigate('/jobs/advertise-new-job')}
                    >
                        Advertise New Job
                    </Button>
                </div>
            </div>

            {/* Filter */}
            {/* <JobsFilter
        setQueryFilters={setQueryFilters}
        setFilterAction={setFilterActionButton}
      /> */}

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
            <Card mt={6} px={'0'}>
                <ReactTable
                    Columns={Columns}
                    pagination
                    pagesize
                    borderBottom={1}
                    borderColor={'secondaryDark'}
                    action={useGetJobsQuery}
                    queryFilters={queryFilters}
                    querySort={'title'}
                    setPageSizeComponent={setPageSizeComponent}
                />
            </Card>

            {/* Delete */}
            <ConfirmActionView
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
            />
        </div>
    )
}
