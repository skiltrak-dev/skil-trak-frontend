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
import { IndustryProfileDetail } from '@partials/common'

const Detail: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const industry = useGetRTOWorkplaceDetailQuery(Number(id), {
        skip: !id,
    })
    useEffect(() => {
        navBar.setTitle('Workplace Detail')
        contextBar.hide()

        return () => {
            navBar.setTitle('')
        }
    }, [])
    return (
        <>
            {/* {isError && <TechnicalError />}
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
                        <Typography
                            variant={'subtitle'}
                            color={'text-gray-400'}
                        >
                            Workplace Details
                        </Typography>
                    </div>

                    <div className="grid grid-cols-3 gap-x-5 gap-y-4 py-4">
                        <div className="flex flex-col gap-y-4">
                            <div className="bg-[#95C6FB] bg-opacity-15 rounded-md p-2 border border-[#6B7280]">
                                <Typography
                                    variant={'muted'}
                                    color={'text-[#24556D]'}
                                >
                                    Industry Id
                                </Typography>
                                <Typography variant="body">
                                    {data?.id}
                                </Typography>
                            </div>
                            <div className="bg-[#95C6FB] bg-opacity-15 rounded-md p-2 border border-[#6B7280]">
                                <Typography
                                    variant={'muted'}
                                    color={'text-[#24556D]'}
                                >
                                    ABN
                                </Typography>
                                <Typography variant="body">
                                    {data?.abn}
                                </Typography>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-4">
                            <div className="bg-[#95C6FB] bg-opacity-15 rounded-md p-2 border border-[#6B7280]">
                                <Typography
                                    variant={'muted'}
                                    color={'text-[#24556D]'}
                                >
                                    Industry Name
                                </Typography>
                                <Typography variant="body">
                                    {' '}
                                    {data?.user?.name}
                                </Typography>
                            </div>

                            <div className="bg-[#95C6FB] bg-opacity-15 rounded-md p-2 border border-[#6B7280]">
                                <Typography
                                    variant={'muted'}
                                    color={'text-[#24556D]'}
                                >
                                    Phones
                                </Typography>
                                <Typography variant="body">
                                    {' '}
                                    {data?.phoneNumber}
                                </Typography>
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-4">
                            <div className="bg-[#95C6FB] bg-opacity-15 rounded-md p-2 border border-[#6B7280]">
                                <Typography
                                    variant={'muted'}
                                    color={'text-[#24556D]'}
                                >
                                    Email
                                </Typography>
                                <Typography variant="body">
                                    {' '}
                                    {data?.user?.email}
                                </Typography>
                            </div>
                            <div className="bg-[#95C6FB] bg-opacity-15 rounded-md p-2 border border-[#6B7280]">
                                <Typography
                                    variant={'muted'}
                                    color={'text-[#24556D]'}
                                >
                                    Address
                                </Typography>
                                <Typography variant="body">
                                    {' '}
                                    {data?.addressLine1 || 'N/A'}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-secondary-dark pb-1">
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            Student
                        </Typography>
                    </div>

                    {data?.students?.length > 0 &&
                        data.students.map((student: any, index: number) => (
                            <>
                                <div className="mt-2">
                                    <Typography
                                        variant={'muted'}
                                        color={'text-[#24556D]'}
                                    >
                                        {index === 0 ? 1 : index + 1}
                                    </Typography>
                                </div>
                                <div
                                    key={data?.id}
                                    className="border-b grid grid-cols-3 gap-x-5 gap-y-4 py-4"
                                >
                                    <div className="flex flex-col gap-y-4">
                                        <div className="bg-[#95C6FB] bg-opacity-15 rounded-md p-2 border border-[#6B7280]">
                                            <Typography
                                                variant={'muted'}
                                                color={'text-[#24556D]'}
                                            >
                                                Student Id
                                            </Typography>
                                            <Typography variant="body">
                                                {student?.id}
                                            </Typography>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-y-1">
                                        <div className="bg-[#95C6FB] bg-opacity-15 rounded-md p-2 border border-[#6B7280]">
                                            <Typography
                                                variant={'muted'}
                                                color={'text-[#24556D]'}
                                            >
                                                Student Name
                                            </Typography>
                                            <Typography variant="body">
                                                {student?.user?.name}
                                            </Typography>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-y-4">
                                        <div className="bg-[#95C6FB] bg-opacity-15 rounded-md p-2 border border-[#6B7280]">
                                            <Typography
                                                variant={'muted'}
                                                color={'text-[#24556D]'}
                                            >
                                                Student Email
                                            </Typography>
                                            <Typography variant="body">
                                                {student?.user?.email}
                                            </Typography>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-y-1">
                                        <div className="bg-[#95C6FB] bg-opacity-15 rounded-md p-2 border border-[#6B7280]">
                                            <Typography
                                                variant={'muted'}
                                                color={'text-[#24556D]'}
                                            >
                                                Student Phone
                                            </Typography>
                                            <Typography variant="body">
                                                {student?.phone}
                                            </Typography>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-y-1">
                                        <div className="bg-[#95C6FB] bg-opacity-15 rounded-md p-2 border border-[#6B7280]">
                                            <Typography
                                                variant={'muted'}
                                                color={'text-[#24556D]'}
                                            >
                                                Address
                                            </Typography>
                                            <Typography variant="body">
                                                {student?.addressLine1 || 'N/A'}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                </>
            )} */}
            {industry.isError && <TechnicalError />}
            {industry.isLoading || industry?.isFetching ? (
                <LoadingAnimation height={'h-[70vh]'} />
            ) : industry.data ? (
                <IndustryProfileDetail industry={industry?.data} />
            ) : (
                !industry.isError &&
                industry.isSuccess && (
                    <EmptyData
                        title={'No Industry Found'}
                        description={'No Industry Found on your request'}
                    />
                )
            )}
        </>
    )
}

Detail.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
        // pageTitle={{
        //     title: 'Workplace',
        // }}
        >
            {page}
        </RtoLayout>
    )
}

export default Detail
