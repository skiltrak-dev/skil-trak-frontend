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
                <LoadingAnimation />
            ) : !data ? (
                !isError &&
                isSuccess && <EmptyData title={'No Workplace Found'} />
            ) : (
                <>
                    <div className="border-b border-secondary-dark pb-1">
                        <Typography variant={'muted'} color={'gray'}>
                            Workplace Details
                        </Typography>
                    </div>

                    {/* Appointment Details */}
                    <div className="grid grid-cols-2 gap-y-4 py-4">
                        {/* ID */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Industry Id
                            </Typography>
                            <Typography color={'black'} capitalize>
                                {data?.id}
                            </Typography>
                        </div>

                        {/* Job Title */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Industry Name
                            </Typography>
                            <Typography color={'black'} capitalize>
                                {data?.industry?.user?.name}
                            </Typography>
                        </div>

                        {/* Employment Type */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Email
                            </Typography>
                            <Typography color={'black'}>
                                {data?.industry?.user?.email}
                            </Typography>
                        </div>

                        {/*  Salary */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Phone
                            </Typography>
                            <Typography color={'black'}>
                                {data?.industry?.phoneNumber}
                            </Typography>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Address
                            </Typography>
                            <Typography color={'black'}>
                                {`${data?.industry?.addressLine1}, ${data?.industry?.addressLine2}`}
                            </Typography>
                        </div>
                    </div>

                    <div className="border-b border-secondary-dark pb-1">
                        <Typography variant={'muted'} color={'gray'}>
                            Student
                        </Typography>
                    </div>

                    {/* Appointment Details */}
                    <div className="grid grid-cols-2 gap-y-4 py-4">
                        {/* ID */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Student Id
                            </Typography>
                            <Typography color={'black'} capitalize>
                                {data?.workplaceRequest?.student?.id}
                            </Typography>
                        </div>

                        {/* Job Title */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Student Name
                            </Typography>
                            <Typography color={'black'} capitalize>
                                {data?.workplaceRequest?.student?.user?.name}
                            </Typography>
                        </div>

                        {/* Employment Type */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Student Email
                            </Typography>
                            <Typography color={'black'}>
                                {data?.workplaceRequest?.student?.user?.email}
                            </Typography>
                        </div>

                        {/*  Salary */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Student Phone
                            </Typography>
                            <Typography color={'black'}>
                                {data?.workplaceRequest?.student?.phone}
                            </Typography>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Address
                            </Typography>
                            <Typography color={'black'}>
                                {`${data?.workplaceRequest?.student?.addressLine1}, ${data?.workplaceRequest?.student?.addressLine2}`}
                            </Typography>
                        </div>
                    </div>
                </>
            )}
        </Card>
    )
}

Detail.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Workplace">{page}</RtoLayout>
}

export default Detail
