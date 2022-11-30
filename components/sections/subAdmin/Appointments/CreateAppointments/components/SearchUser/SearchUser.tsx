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
} from '@components'
import { SearchedUserCard } from '../SearchedUserCard'

// query
import { useSearchUserQuery } from '@queries'

export const SearchUser = ({
    onClick,
    selectedUser,
    selectedAppointment,
    type,
}: any) => {
    const [search, setSearch] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [industryNotFound, setIndustryNotFound] = useState(false)

    useEffect(() => {
        setIndustryNotFound(false)
    }, [selectedAppointment])

    const searchAppointment = useSearchUserQuery(
        {
            search,
            role: selectedAppointment?.toLowerCase(),
        },
        { skip: !search }
    )

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
                {!industryNotFound ? (
                    <div>
                        <Typography variant={'small'} color={'text-gray-500'}>
                            Appointment {type} {selectedAppointment}
                        </Typography>

                        <div>
                            <div className="grid grid-cols-3 gap-x-5 my-5">
                                <TextInput
                                    label={`Search ${selectedAppointment} BY Name/Email`}
                                    name={'name'}
                                    placeholder={'Search BY Name/Email...'}
                                    validationIcons
                                    onChange={(e: any) => {
                                        setSearchValue(searchValue)
                                        onFilterChange(e.target.value)
                                    }}
                                    value={searchValue}
                                />
                            </div>

                            {/*  */}
                            <div className="flex flex-col gap-y-2">
                                {searchAppointment.isLoading ? (
                                    <LoadingAnimation />
                                ) : searchAppointment?.data &&
                                  searchAppointment?.data?.length ? (
                                    searchAppointment?.data?.map((s: any) => (
                                        <SearchedUserCard
                                            key={s.id}
                                            data={s}
                                            onClick={() => {
                                                onClick(s)
                                            }}
                                            selected={selectedUser}
                                        />
                                    ))
                                ) : (
                                    searchAppointment.isSuccess && (
                                        <NoData
                                            text={`No ${selectedAppointment} Found`}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="mt-5">
                            <Typography
                                variant={'small'}
                                color={'text-gray-500'}
                            >
                                Book Appointment For
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
                )}
                {/*  */}
                {selectedAppointment === 'Industry' &&
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
                    )}
            </Card>
        </div>
    )
}
