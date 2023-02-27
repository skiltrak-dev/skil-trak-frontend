import {
    Card,
    LoadingAnimation,
    EmptyData,
    Typography,
    TechnicalError,
} from '@components'

import { useContextBar, useNavbar } from '@hooks'
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { useGetRTOWorkplaceDetailQuery } from '@queries'
import { MdPlace } from 'react-icons/md'

const Detail: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const { data, isLoading, isSuccess, isError } =
        useGetRTOWorkplaceDetailQuery(Number(id), {
            skip: !id,
        })
    useEffect(() => {
        navBar.setTitle('Workplace Detail')
        contextBar.hide()
    }, [])
    return (
        <Card>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation height={'h-[60vh]'} />
            ) : !data ? (
                !isError &&
                isSuccess && (
                    <EmptyData
                        title={'No Workplace Found'}
                        description={'No Workplace Detail were found'}
                        height={'60vh'}
                    />
                )
            ) : (
                <>
                    <div className="border-b border-secondary-dark pb-1">
                        <Typography variant={'subtitle'} color={'text-gray-400'}>
                            Workplace Details
                        </Typography>
                    </div>

                    {/* Appointment Details */}
                    <div className="grid grid-cols-2 gap-y-4 py-4">
                        {/* ID */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'subtitle'} color={'text-gray-400'}>
                                Industry Id
                            </Typography>
                            <Typography color={'text-orange-400'} capitalize>
                                {data?.id}
                            </Typography>
                            <Typography variant={'subtitle'} color={'text-gray-400'}>
                                ABN
                            </Typography>
                            <Typography color={'text-orange-400'} capitalize>
                                {data?.abn}
                            </Typography>
                        </div>

                        {/* Job Title */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'subtitle'} color={'text-gray-400'}>
                                Industry Name
                            </Typography>
                            <Typography color={'text-orange-400'} capitalize>
                                {data?.user?.name}
                            </Typography>
                        </div>

                        {/* Employment Type */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'subtitle'} color={'text-gray-400'}>
                                Email
                            </Typography>
                            <Typography color={'text-orange-400'}>
                                {data?.user?.email}
                            </Typography>
                        </div>

                        {/*  Salary */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'text-gray-400'}>
                                Phone
                            </Typography>
                            <Typography color={'text-orange-400'}>
                                {data?.phoneNumber}
                            </Typography>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'text-gray-400'}>
                                Address
                            </Typography>
                            <Typography color={'text-orange-400'}>
                                {data?.addressLine1 || "N/A"}
                            </Typography>
                        </div>
                    </div>

                    <div className="border-b border-secondary-dark pb-1">
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            Student
                        </Typography>
                    </div>

                    {/* Appointment Details */}
                    {data?.students?.length > 0 && data.students.map((student: any) => (
                        <div key={data?.id} className="border-b grid grid-cols-2 gap-y-4 py-4">
                            {/* ID */}
                            <div className="flex flex-col gap-y-1">
                                <Typography variant={'subtitle'} color={'text-gray-400'}>
                                    Student Id
                                </Typography>
                                <Typography color={'text-orange-400'} capitalize>
                                    {student?.id}
                                </Typography>
                            </div>

                            {/* Job Title */}
                            <div className="flex flex-col gap-y-1">
                                <Typography variant={'subtitle'} color={'text-gray-400'}>
                                    Student Name
                                </Typography>
                                <Typography color={'text-orange-400'} capitalize>
                                    {student?.user?.name}
                                </Typography>
                            </div>

                            {/* Employment Type */}
                            <div className="flex flex-col gap-y-1">
                                <Typography variant={'subtitle'} color={'text-gray-400'}>
                                    Student Email
                                </Typography>
                                <Typography color={'text-orange-400'}>
                                    {student?.user?.email}
                                </Typography>
                            </div>

                            {/*  Salary */}
                            <div className="flex flex-col gap-y-1">
                                <Typography variant={'subtitle'} color={'text-gray-400'}>
                                    Student Phone
                                </Typography>
                                <Typography color={'text-orange-400'}>
                                    {student?.phone}
                                </Typography>
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <Typography variant={'subtitle'} color={'text-gray-400'}>
                                    Address
                                </Typography>
                                <Typography color={'text-orange-400'}>
                                    {student?.addressLine1 || "N/A"}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </Card>
    )
}

Detail.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
            pageTitle={{
                title: 'Workplace',
            }}
        >
            {page}
        </RtoLayout>
    )
}

export default Detail
