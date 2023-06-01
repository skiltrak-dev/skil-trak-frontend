import React, { useState, useCallback, useEffect } from 'react'
import debounce from 'lodash/debounce'

// components
import {
    TextInput,
    Card,
    Typography,
    LoadingAnimation,
    Button,
    NoData,
    PageSize,
    Pagination,
} from '@components'
import { SearchedUserCard } from './SearchedUserCard'

// query
import { useSearchSubAdminUsersQuery, useSearchUserQuery } from '@queries'
import { getUserCredentials } from '@utils'
import { RequiredStar } from '@components/inputs/components'
import { UserRoles } from '@constants'

export const SearchUserCard = ({
    onClick,
    selectedUser,
    selectedAppointment,
    type,
    selectedPerson,
}: any) => {
    const [search, setSearch] = useState('')
    const [searchValue, setSearchValue] = useState<string>('')
    const [industryNotFound, setIndustryNotFound] = useState(false)

    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(10)
    const [searchAppointment, setSearchAppointment] = useState<any>({})

    useEffect(() => {
        setIndustryNotFound(false)
    }, [selectedAppointment])

    useEffect(() => {
        setPage(1)
        setItemPerPage(10)
    }, [searchValue])

    const role = getUserCredentials()?.role

    const subAdminUsers = useSearchSubAdminUsersQuery(
        {
            search,
            role:
                selectedAppointment === 'Coordinator'
                    ? 'subadmin'
                    : selectedAppointment?.toLowerCase(),
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        { skip: !search || role === 'admin' }
    )
    const adminUsers = useSearchUserQuery(
        {
            search,
            role:
                selectedAppointment === 'Coordinator'
                    ? 'subadmin'
                    : selectedAppointment?.toLowerCase(),
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        { skip: !search || role === 'subadmin' }
    )

    useEffect(() => {
        setSearchAppointment(adminUsers)
    }, [adminUsers])
    useEffect(() => {
        setSearchAppointment(subAdminUsers)
    }, [subAdminUsers])

    const delayedSearchFor = useCallback(
        debounce((values: any) => {
            setSearch(values)
        }, 700),
        []
    )

    const onFilterChange = (value: any) => {
        delayedSearchFor(value)
    }

    return (
        <div>
            <Card>
                <div>
                    <Typography variant={'small'} color={'text-gray-500'}>
                        Appointment {type} {selectedAppointment}
                    </Typography>

                    <div>
                        <div className="grid grid-cols-3 gap-x-5 my-5">
                            <TextInput
                                label={`Search ${selectedAppointment} BY ${
                                    selectedAppointment?.toLowerCase() ===
                                    UserRoles.STUDENT
                                        ? 'StudentId/'
                                        : ''
                                }Name/Email`}
                                name={'name'}
                                placeholder={'Search BY Name/Email...'}
                                validationIcons
                                required
                                onChange={(e: any) => {
                                    setSearchValue(e.target.value)
                                    onFilterChange(e.target.value)
                                }}
                                value={searchValue}
                            />
                        </div>

                        {/*  */}
                        {searchAppointment.isError && (
                            <NoData
                                text={`There is some network issue, please refresh your browser`}
                            />
                        )}
                        {searchAppointment.data?.data?.length > 0 && (
                            <div className="flex items-center justify-between">
                                <PageSize
                                    itemPerPage={itemPerPage}
                                    setItemPerPage={setItemPerPage}
                                />
                                <Pagination
                                    pagination={
                                        searchAppointment?.data?.pagination
                                    }
                                    setPage={setPage}
                                />
                            </div>
                        )}
                        <div className="flex flex-col gap-y-2">
                            {searchAppointment.isLoading ||
                            searchAppointment.isFetching ? (
                                <LoadingAnimation />
                            ) : searchAppointment?.data?.data &&
                              searchAppointment?.data?.data?.length ? (
                                searchAppointment?.data?.data?.map((s: any) => (
                                    <SearchedUserCard
                                        key={s.id}
                                        data={s}
                                        onClick={() => {
                                            onClick(s)
                                        }}
                                        selected={selectedUser}
                                        selectedPerson={selectedPerson}
                                    />
                                ))
                            ) : (
                                !searchAppointment.isError &&
                                searchAppointment.isSuccess && (
                                    <NoData
                                        text={`No ${selectedAppointment} Found`}
                                    />
                                )
                            )}
                            {!searchAppointment.isSuccess &&
                                !searchAppointment.isError &&
                                !searchAppointment.isLoading && (
                                    <NoData
                                        text={`Search ${selectedAppointment}`}
                                    />
                                )}
                        </div>
                    </div>
                </div>
                {/* {selectedAppointment === 'Student' &&
                    searchAppointment.isSuccess && (
                        <div>
                            <div className="mt-5">
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-500'}
                                >
                                    Student Workplace
                                </Typography>
                                <div className="grid grid-cols-3 gap-x-5 mb-2">
                                    <TextInput
                                        label={'Name'}
                                        name={'name'}
                                        placeholder={'Name...'}
                                        validationIcons
                                    />
                                    <TextInput
                                        label={'Email'}
                                        name={'email'}
                                        placeholder={'Email...'}
                                        validationIcons
                                    />
                                    <TextInput
                                        label={'Phone'}
                                        name={'phone'}
                                        placeholder={'Phone...'}
                                        validationIcons
                                    />
                                </div>
                                <TextInput
                                    label={'Address'}
                                    name={'address'}
                                    placeholder={'Address...'}
                                    validationIcons
                                />
                            </div>
                        </div>
                    )} */}

                {/*  */}
                {/* {selectedAppointment === 'Industry' &&
                    searchAppointment.isSuccess &&
                    !searchAppointment.data.length && (
                        <Button
                            text={
                                industryNotFound
                                    ? 'Search Industry'
                                    : 'Add Industry'
                            }
                            onClick={() => {
                                setIndustryNotFound(!industryNotFound)
                            }}
                        />
                    )} */}
            </Card>
        </div>
    )
}
