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

import { RtoApi } from '@queries'
import { MdPlace } from 'react-icons/md'

const Detail: NextPageWithLayout = () => {
    const router = useRouter()
    const { id } = router.query
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const { data, isLoading, isSuccess, isError } =
        RtoApi.Coordinator.useDetail(Number(id), {
            skip: !id,
        })

    useEffect(() => {
        navBar.setTitle('Coordinator Detail')
        contextBar.hide()
    }, [])

    return (
        <Card>
            {isError && <TechnicalError />}
            {isLoading ? (
                <LoadingAnimation />
            ) : !data ? (
                !isError &&
                isSuccess && (
                    <EmptyData
                        title={'No Coordinator Found'}
                        description={
                            'Coordinator Detail were not found on your request'
                        }
                    />
                )
            ) : (
                <>
                    <div className="border-b border-secondary-dark pb-1">
                        <Typography variant={'muted'} color={'gray'}>
                            Coordinator Details
                        </Typography>
                    </div>

                    {/* Appointment Details */}
                    <div className="grid grid-cols-2 gap-y-4 py-4">
                        {/* ID */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Coordinator Id
                            </Typography>
                            <Typography color={'black'} capitalize>
                                {data?.coordinatorId}
                            </Typography>
                        </div>

                        {/* Job Title */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Name
                            </Typography>
                            <Typography color={'black'} capitalize>
                                {data?.user?.name}
                            </Typography>
                        </div>

                        {/* Employment Type */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Email
                            </Typography>
                            <Typography color={'black'}>
                                {data?.user?.email}
                            </Typography>
                        </div>

                        {/*  Salary */}
                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Phone
                            </Typography>
                            <Typography color={'black'}>
                                {data?.phone}
                            </Typography>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <Typography variant={'muted'} color={'gray'}>
                                Address
                            </Typography>
                            <Typography color={'black'}>
                                {data?.addressLine1}
                            </Typography>
                        </div>
                    </div>
                </>
            )}
        </Card>
    )
}

Detail.getLayout = (page: ReactElement) => {
    return <RtoLayout pageTitle={{ title: 'Coordinator' }}>{page}</RtoLayout>
}

export default Detail
