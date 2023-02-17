import React from 'react'

// Icons
import { BsDot } from 'react-icons/bs'

// components
import { InitialAvatar, Typography } from '@components'
import { Button } from '@components/buttons'
import { ellipsisText } from '@utils'

export const SearchedUserCard = ({
    data,
    onClick,
    selected,
    selectedPerson,
}: any) => {
    const person = data[selectedPerson.toLocaleLowerCase()]

    console.log('selectedPerson', selectedPerson)

    return (
        <div
            className={`bg-gray-100 px-6 py-4 rounded-lg grid ${
                selectedPerson === 'Student' ? 'grid-cols-5' : 'grid-cols-4'
            }  gap-x-3 items-center`}
        >
            <div className="flex items-center relative">
                <div className="flex items-center gap-x-2">
                    <InitialAvatar name={data?.name} imageUrl={data?.avatar} />
                    <div>
                        <div className="flex items-center gap-x-1">
                            <Typography variant={'xs'}>{data?.id}</Typography>
                            <BsDot className="text-gray-400" />
                            {/* <Typography
                                variant={'xs'}
                                color={'text-success-dark'}
                            >
                                Completed
                            </Typography> */}
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Typography variant={'label'} color={'gray'}>
                                <span className="font-semibold">
                                    {data?.name}
                                </span>
                            </Typography>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Typography
                                variant={'muted'}
                                color={'text-gray-500'}
                            >
                                {data?.email}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            {/*  */}
            <div>
                <Typography variant={'xs'} color={'text-gray-400'}>
                    Phone
                </Typography>
                <Typography variant={'label'} color={'text-gray-700'}>
                    {person?.phone || person?.phoneNumber}
                </Typography>
            </div>

            {/*  */}
            <div>
                <Typography variant={'xs'} color={'text-gray-400'}>
                    Address
                </Typography>
                <div title={person?.addressLine1}>
                    <Typography variant={'label'} color={'text-gray-700'}>
                        {ellipsisText(person?.addressLine1, 25)}
                    </Typography>
                </div>
            </div>

            {/*  */}
            {data?.role === 'student' && (
                <div>
                    <Typography variant={'xs'} color={'text-gray-400'}>
                        RTO
                    </Typography>
                    <Typography variant={'label'} color={'text-gray-700'}>
                        {person?.rto?.user?.name}
                    </Typography>
                </div>
            )}

            {/*  */}
            {/* <div className="bg-primary-light px-5 py-1 flex items-center gap-x-2 rounded">
                <BsDot className="text-primary" />
                <Typography variant={'xs'} color={'text-primary'}>
                    Request Sent
                </Typography>
            </div> */}
            <div className="ml-auto">
                <Button
                    onClick={() => {
                        onClick()
                    }}
                    text={selected === data?.id ? 'Selected' : 'Select'}
                    outline={selected !== data?.id}
                />
            </div>
        </div>
    )
}
