import React from 'react'

// Icons
import { FaPencilAlt } from 'react-icons/fa'

// components
import { Card, Typography } from '@components'

export const Profile = ({ data }: { data: any }) => {
    return (
        <Card>
            <div className="flex justify-between items-center">
                <Typography variant={'label'} color={'text-gray-500'}>
                    Primary Info
                </Typography>
                <Typography variant={'label'} color={'primary'}>
                    <div className="flex items-center gap-x-2 cursor-pointer">
                        <FaPencilAlt className="text-primary text-sm" />
                        <span>Edit</span>
                    </div>
                </Typography>
            </div>

            {/*  */}
            <div className="mt-6 flex justify-between ">
                <div className="grid grid-cols-3 gap-x-5 w-full">
                    <div>
                        <Typography variant={'label'} color={'text-gray-500'}>
                            Name
                        </Typography>
                        <Typography variant={'subtitle'}>
                            {data?.user?.name}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant={'label'} color={'text-gray-500'}>
                            Phone No
                        </Typography>
                        <Typography variant={'subtitle'}>
                            {data?.phone}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant={'label'} color={'text-gray-500'}>
                            Faimly Name
                        </Typography>
                        <Typography variant={'subtitle'}>
                            {data?.rtoCode}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant={'label'} color={'text-gray-500'}>
                            Student Id
                        </Typography>
                        <Typography variant={'subtitle'}>
                            {data?.rtoCode}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant={'label'} color={'text-gray-500'}>
                            Date of Birth
                        </Typography>
                        <Typography variant={'subtitle'}>
                            {data?.rtoCode}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant={'label'} color={'text-gray-500'}>
                            Emergency Person
                        </Typography>
                        <Typography variant={'subtitle'}>
                            {data?.rtoCode}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant={'label'} color={'text-gray-500'}>
                            Emergency Person Phone
                        </Typography>
                        <Typography variant={'subtitle'}>
                            {data?.rtoCode}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant={'label'} color={'text-gray-500'}>
                            Email
                        </Typography>
                        <Typography variant={'subtitle'}>
                            {data?.user?.email}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant={'label'} color={'text-gray-500'}>
                            Address
                        </Typography>
                        <Typography variant={'subtitle'}>
                            {data?.address}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant={'label'} color={'text-gray-500'}>
                            Suburb
                        </Typography>
                        <Typography variant={'subtitle'}>
                            {data?.rtoCode}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant={'label'} color={'text-gray-500'}>
                            State
                        </Typography>
                        <Typography variant={'subtitle'}>
                            {data?.rtoCode}
                        </Typography>
                    </div>

                    <div>
                        <Typography variant={'label'} color={'text-gray-500'}>
                            Zip Code
                        </Typography>
                        <Typography variant={'subtitle'}>
                            {data?.rtoCode}
                        </Typography>
                    </div>
                </div>

                {/*  */}
                <div className="flex flex-col justify-center items-center">
                    <img
                        src="data:image/jpeg;base64,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"
                        alt=""
                    />
                    <div className="flex items-center gap-x-4">
                        <Typography variant={'label'} color={'info'}>
                            <span className="cursor-pointer">Change</span>
                        </Typography>
                        <Typography variant={'label'} color={'error'}>
                            <span className="cursor-pointer">Remove</span>
                        </Typography>
                    </div>
                </div>
            </div>
        </Card>
    )
}
