import moment from 'moment'
import React from 'react'
import { RiBook2Fill } from 'react-icons/ri'
import {
    Button,
    TechnicalError,
    EmptyData,
    Card,
    Typography,
} from '@components'
import {
    CurrentStudentCard,
    Notes,
    StudentAvailability,
    StudentDetail,
} from './components'

// query
import { useGetIndustryWorkplaceQuery } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { UserStatus } from '@types'

export const PendingStudents = () => {
    // query
    const industryWorkplace = useGetIndustryWorkplaceQuery({
        search: `status:${UserStatus.Pending}`,
    })

    return (
        <>
            {industryWorkplace.isError && <TechnicalError />}
            {industryWorkplace.isLoading && industryWorkplace.isFetching ? (
                <LoadingAnimation />
            ) : industryWorkplace.data?.data &&
              industryWorkplace.data?.data?.length > 0 ? (
                <div className="flex flex-col gap-y-2">
                    {industryWorkplace?.data?.data?.map((workplace: any) => (
                        <CurrentStudentCard
                            key={workplace.id}
                            workplace={workplace}
                        />
                    ))}
                </div>
            ) : (
                !industryWorkplace.isError && (
                    <EmptyData
                        title={'There is no any Pending Student'}
                        description={'There is no any Pending Student'}
                    />
                )
            )}
        </>
    )
}
