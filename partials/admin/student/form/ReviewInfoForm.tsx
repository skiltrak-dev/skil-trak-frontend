import { Button, Typography } from '@components'
import { useRouter } from 'next/router'
import React from 'react'
import { AuthApi } from '@queries'

type Props = {}

export const ReviewInfoForm = ({ signUpValues }: { signUpValues: any }) => {
    const router = useRouter()
    const [signUpStudent] = AuthApi.useRegisterStudent()

    // console.log("router");

    return (
        <div>
            <div className="w-full pb-10">
                <div>
                    <div className="w-full pb-10 lg:pr-10">
                        {/* RTO Information */}
                        <div>
                            <div className="border-b border-secondary-dark mt-8">
                                <Typography
                                    variant={'muted'}
                                    color={'grayLight'}
                                >
                                    Student Information
                                </Typography>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:max-w-lg mt-4">
                                <div>
                                    <Typography
                                        variant={'label'}
                                        color={'gray'}
                                    >
                                        Name
                                    </Typography>
                                    <Typography variant={'subtitle'}>
                                        {signUpValues?.firstName}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography
                                        variant={'label'}
                                        color={'gray'}
                                    >
                                        ABN
                                    </Typography>
                                    <Typography variant={'subtitle'}>
                                        {signUpValues?.abn}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography
                                        variant={'label'}
                                        color={'gray'}
                                    >
                                        Code
                                    </Typography>
                                    <Typography variant={'subtitle'}>
                                        {/* {rtoCode || ''} */}
                                    </Typography>
                                </div>
                                <div>
                                    <Typography
                                        variant={'label'}
                                        color={'gray'}
                                    >
                                        Phone Number
                                    </Typography>
                                    <Typography variant={'subtitle'}>
                                        {signUpValues?.phoneNo}
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        {/* Profile Information */}
                        <div>
                            <div className="border-b border-secondary-dark mt-8">
                                <Typography
                                    variant={'muted'}
                                    color={'grayLight'}
                                >
                                    Profile Information
                                </Typography>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:max-w-lg mt-4">
                                <div>
                                    <Typography
                                        variant={'label'}
                                        color={'gray'}
                                    >
                                        E-Mail
                                    </Typography>
                                    <Typography variant={'subtitle'}>
                                        {signUpValues?.email || ''}
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        {/* Sector Info */}
                        <div>
                            <div className="border-b border-secondary-dark mt-8">
                                <Typography
                                    variant={'muted'}
                                    color={'grayLight'}
                                >
                                    Sector Information
                                </Typography>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
                                <div className="flex flex-col">
                                    <div className="mb-1">
                                        <Typography
                                            variant={'label'}
                                            color={'gray'}
                                        >
                                            Sector
                                        </Typography>
                                    </div>

                                    {signUpValues?.sectors?.map(
                                        (sector: any) => (
                                            <div className="border-t pt-1">
                                                <Typography
                                                    // key={sector.value}
                                                    variant={'label'}
                                                >
                                                    {sector?.label} sector
                                                </Typography>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div>
                                    <div className="mb-1">
                                        <Typography
                                            variant={'label'}
                                            color={'gray'}
                                        >
                                            Courses
                                        </Typography>
                                    </div>

                                    {/* {courses?.map((course, i) => ( */}
                                    <div className="border-t pt-1">
                                        <Typography
                                            // key={course.value}
                                            variant={'label'}
                                        >
                                            {/* {course.label} */}
                                        </Typography>
                                    </div>
                                    {/* ))} */}
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <div className="border-b border-secondary-dark mt-8">
                                <Typography
                                    variant={'muted'}
                                    color={'grayLight'}
                                >
                                    Address Information
                                </Typography>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:max-w-lg mt-4">
                                <div>
                                    <Typography
                                        variant={'label'}
                                        color={'gray'}
                                    >
                                        Address Line 1
                                    </Typography>
                                    <Typography variant={'subtitle'}>
                                        {signUpValues?.addressLine1 || '-'}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography
                                        variant={'label'}
                                        color={'gray'}
                                    >
                                        Address Line 2
                                    </Typography>
                                    <Typography variant={'subtitle'}>
                                        {signUpValues?.addressLine2 || '-'}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography
                                        variant={'label'}
                                        color={'gray'}
                                    >
                                        State
                                    </Typography>
                                    <Typography variant={'subtitle'}>
                                        {signUpValues?.state || '-'}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography
                                        variant={'label'}
                                        color={'gray'}
                                    >
                                        Suburb
                                    </Typography>
                                    <Typography variant={'subtitle'}>
                                        {signUpValues?.suburb || '-'}
                                    </Typography>
                                </div>

                                <div>
                                    <Typography
                                        variant={'label'}
                                        color={'gray'}
                                    >
                                        Zip Code
                                    </Typography>
                                    <Typography variant={'subtitle'}>
                                        {signUpValues?.zipCode || '-'}
                                    </Typography>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex items-center gap-x-8">
                            <Button
                                variant={'primary'}
                                onClick={() => {
                                    signUpStudent(signUpValues)
                                }}
                            >
                                Continue
                            </Button>
                            <Button
                                variant={'secondary'}
                                onClick={() => {
                                    router.push('/auth/signup/student')
                                }}
                            >
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
